import React, { useState } from "react";
import styles from "./ConnectSection.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";

const ConnectSection = () => {
  // 1️⃣ Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    project: "",
    consent: false,
  });

  // 2️⃣ Error state
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "", "loading", "success", "error"

  // 3️⃣ Handle input changes + clear field error
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field as user types/selects
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // 4️⃣ Validation function
  const validate = (data) => {
    const newErrors = {};

    // Name: required + letters only
    if (!data.name.trim()) newErrors.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(data.name))
      newErrors.name = "Name can only contain letters";

    // Email: required + format
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      newErrors.email = "Invalid email address";

    // Reason: required
    if (!data.reason) newErrors.reason = "Please select a reason";

    // Consent: required
    if (!data.consent) newErrors.consent = "You must give consent to submit";

    // Phone: optional but validated if filled
    if (data.phone && !/^[0-9+\-\s()]{7,20}$/.test(data.phone))
      newErrors.phone = "Invalid phone number";

    return newErrors;
  };

  // 5️⃣ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "loading") return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "contact" }),
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "",
        project: "",
        consent: false,
      });

      setTimeout(() => setStatus(""), 4000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <section id="connect" className={styles.connectSection}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          LET’S <br /> CONNECT
        </h2>
      </div>

      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.inputError : ""}
              />
              {errors.name && (
                <span className={styles.fieldError}>{errors.name}</span>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ""}
              />
              {errors.email && (
                <span className={styles.fieldError}>{errors.email}</span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? styles.inputError : ""}
              />
              {errors.phone && (
                <span className={styles.fieldError}>{errors.phone}</span>
              )}
            </div>

            <div>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={`${styles.select} ${
                  errors.reason ? styles.inputError : ""
                }`}
              >
                <option value="" disabled>
                  Reason
                </option>
                <option value="career">Career</option>
                <option value="product">Product Enquiry</option>
                <option value="branding">Branding</option>
              </select>
              {errors.reason && (
                <span className={styles.fieldError}>{errors.reason}</span>
              )}
            </div>
          </div>

          <div>
            <textarea
              name="project"
              placeholder="Tell us about your project"
              rows={5}
              value={formData.project}
              onChange={handleChange}
            ></textarea>
          </div>

          <label className={styles.customCheckbox}>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <span
              className={`${styles.checkmark} ${
                errors.consent ? styles.inputError : ""
              }`}
            ></span>
            <span className={styles.checkboxText}>
              I consent to GenLab collecting and processing my information to
              respond to my request and for future communication.
            </span>
          </label>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === "loading"}
          >
            <span>
              {status === "loading"
                ? "Submitting..."
                : status === "success"
                ? "Submitted ✓"
                : status === "error"
                ? "Failed ✕"
                : "SUBMIT"}
            </span>
            <div className={styles.arrow}>
              <ArrowIcon />
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConnectSection;