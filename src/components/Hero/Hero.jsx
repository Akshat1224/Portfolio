import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Akshat Kushwaha</h1>
        <p className={styles.description}>
        "I'm a passionate full-stack developer with hands-on experience in frameworks like React and Node.js. As a Computer Science student, I'm always eager to learn more and collaborate on exciting projects. Feel free to reach out if you'd like to connect!"
        </p>
        <a href="mailto:akshatkushwaha7oct2003@gmail.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
