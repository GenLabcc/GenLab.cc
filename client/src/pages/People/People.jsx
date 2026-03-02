import ConnectSection from "@/components/ConnectSection/ConnectSection";
import MeetSection from "@/pages/People/sections/MeetSection.jsx";

import styles from "./People.module.css";

import personImg from "@/assets/images/people/henrich2.png";

const people = [
  { id: 1, name: "Henrich P", role: "Visionary", image: personImg },
  { id: 2, name: "Ashvin V S", role: "Chief Operating Officer", image: personImg },
  { id: 3, name: "Ranjit Pratap Singh N", role: "Head of Business", image: personImg },
  { id: 4, name: "Bency P", role: "Operations Manager", image: personImg },
  { id: 5, name: "Henrich P", role: "Founder", image: personImg },
  { id: 6, name: "Henrich P", role: "Founder", image: personImg },
  { id: 7, name: "Henrich P", role: "Founder", image: personImg },
  { id: 8, name: "Henrich P", role: "Founder", image: personImg },
  { id: 9, name: "Henrich P", role: "Founder", image: personImg },
];

const People = () => {
  return (
    <div>
      <section className={styles.peopleSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            Meet the crew. <br />
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
