import React from "react";
import "./InputField.css";

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  id,
  readOnly = false,
  ...props
}) => {
  return (
    <div className="input-field-container">

      {label && (
        <label
          htmlFor={id}
          className="input-label"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        {...props}
        className={`input-element ${readOnly ? "read-only" : ""}`}
      />
    </div>
  );
};

export default React.memo(InputField);