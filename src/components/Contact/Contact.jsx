import React from "react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a
            href="mailto:akshatkushwaha7oct2003@gmail.com?subject=Hello%20Akshat&body=I%20would%20like%20to%20connect%20with%20you!"
          >
            akshatkushwaha7oct2003@gmail.com
          </a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="LinkedIn icon"
          />
          <a
            href="https://www.linkedin.com/in/akshat-kushwaha"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/Akshat
          </a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a
            href="https://github.com/Akshat1224"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Akshat
          </a>
        </li>
      </ul>
    </footer>
  );
};
