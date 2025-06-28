"use client"

import { useState, useMemo } from "react"
import { getImageUrl } from "../../utils"
import styles from "./ProjectCard.module.css"

export const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { title, imageSrc, description, skills, demo, source } = project

  // Memoize particle positions and delays for stable animation
  const particleStyles = useMemo(
    () =>
      Array.from({ length: 8 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 1000}ms`,
      })),
    []
  )

  return (
    <div className={styles.container} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.cardInner}>
        {/* Project Image */}
        <div className={styles.imageContainer}>
          <img src={getImageUrl(imageSrc) || "/placeholder.svg"} alt={`Image of ${title}`} className={styles.image} />
          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>

          <ul className={styles.description}>
            {description.map((point, index) => (
              <li key={index} className={styles.descriptionItem}>
                <span className={styles.bullet}>▸</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className={styles.skillsContainer}>
            {skills.map((skill, id) => (
              <span key={id} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={styles.links}>
            <a href={source} className={styles.sourceLink} target="_blank" rel="noopener noreferrer">
              <span className={styles.linkContent}>
                <svg className={styles.linkIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </span>
            </a>
            {demo && (
              <a href={demo} className={styles.demoLink} target="_blank" rel="noopener noreferrer">
                <span className={styles.linkContent}>
                  <svg className={styles.linkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Animated border */}
        {isHovered && <div className={styles.animatedBorder} />}

        {/* Floating particles */}
        {isHovered && (
          <div className={styles.particles}>
            {particleStyles.map((style, i) => (
              <div
                key={i}
                className={styles.particle}
                style={style}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
