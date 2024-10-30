import React from "react";
import styles from "./Skills.module.css";
import skillsData from "../../data/skills.json";
import { getImageUrl } from "../../utils";

export const Skills = () => {
  return (
    <section className={styles.container} id="skills">
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.skillsGrid}>
        {skillsData.map((skill, index) => (
          <div key={index} className={styles.skillCard}>
            <img
              src={getImageUrl(skill.imageSrc)}
              alt={`${skill.title} icon`}
              className={styles.skillImage}
            />
            <h3 className={styles.skillTitle}>{skill.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
