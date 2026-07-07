import ConnectSection from "@/components/ConnectSection/ConnectSection";
import MeetSection from "@/pages/People/sections/MeetSection.jsx";

import styles from "./People.module.css";

import personImg1 from "@/assets/images/people/Henrich.webp";
import personImg2 from "@/assets/images/people/Ashvin.webp";
import personImg4 from "@/assets/images/people/Bency.webp";
import personImg5 from "@/assets/images/people/Esther.webp";
import personImg6 from "@/assets/images/people/Reshma.webp";
import personImg7 from "@/assets/images/people/Akshen.webp";
import personImg8 from "@/assets/images/people/Gowri.webp";
import personImg9 from "@/assets/images/people/Ashmi.webp";
import personImg10 from "@/assets/images/people/Britta.webp";


const people = [
  { id: 1, name: "Henrich", role: "Visionary", image: personImg1 },
  { id: 2, name: "Ashvin", role: "Chief Operating Officer", image: personImg2 },
  { id: 4, name: "Bency", role: "Operations Manager", image: personImg4 },
  { id: 5, name: "Esther Beni", role: "HR Executive", image: personImg5 },
  { id: 6, name: "Reshma", role: "Senior Developer", image: personImg6 },
  { id: 7, name: "Akshen", role: "AI/ML Engineer", image: personImg7 },
  { id: 8, name: "Gowri", role: "UI/UX Designer", image: personImg8 },
  { id: 9, name: "Ashmi", role: "Brand Growth Strategist", image: personImg9 },
  { id: 10, name: "Britta", role: "Software Engineer", image: personImg10 },
];

const People = () => {
  return (
    <div>
      <section className={styles.peopleSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            Meet the crew.<br />
            Team spirit you can feel.
          </h2>

          <div className={styles.grid}>
            {people.map((person) => (
              <div key={person.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={person.image} alt={person.name} />
                </div>

                <div className={styles.info}>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MeetSection />
      <ConnectSection />
    </div>
  );
};

export default People;
