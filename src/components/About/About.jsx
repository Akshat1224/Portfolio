"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { getImageUrl } from "../../utils"
import styles from "./About.module.css"

function RotatingCube({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  )
}

function About3D() {
  return (
    <div className={styles.about3d}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingCube position={[-2, 1, 0]} color="#4F46E5" />
        <RotatingCube position={[2, -1, 0]} color="#06B6D4" />
        <RotatingCube position={[0, 2, -1]} color="#8B5CF6" />
      </Canvas>
    </div>
  )
}

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skills = [
    {
      icon: "💻",
      title: "Frontend Developer",
      description:
        "Passionate about creating responsive and interactive user interfaces using React, JavaScript, and modern CSS frameworks like Tailwind CSS.",
      color: "blue",
      delay: "0ms",
      technologies: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      icon: "⚡",
      title: "Backend Developer",
      description:
        "Experienced in building robust server-side applications and APIs using Node.js, Express, and working with databases for scalable solutions.",
      color: "green",
      delay: "200ms",
      technologies: ["Node.js", "Express", "MongoDB", "REST APIs", "EJS"],
    },
    {
      icon: "🎨",
      title: "Full-Stack Developer",
      description:
        "Combining frontend and backend skills to deliver complete web solutions, from database design to user interface implementation.",
      color: "purple",
      delay: "400ms",
      technologies: ["MERN Stack", "Git", "Responsive Design", "SCSS", "API Integration"],
    },
  ]

  const personalInfo = [
    { label: "Name", value: "Akshat Kushwaha" },
    { label: "Education", value: "Computer Science Student" },
    { label: "Location", value: "India" },
    { label: "Email", value: "akshatkushwaha7oct2003@gmail.com" },
    { label: "Focus", value: "Full-Stack Web Development" },
    { label: "Experience", value: "Building Modern Web Applications" },
  ]

  return (
    <section ref={sectionRef} className={styles.container} id="about" style={{
      borderRadius: "2.5rem", // Add large border radius
      border: "none", // No border
      background: "linear-gradient(135deg, #2d2d5a 0%, #44447a 50%, #2d2d5a 100%)", // Even lighter gradient
      margin: "0 5% 40px 5%", // Only bottom margin for vertical gap
      overflow: "visible", // Allow content to overflow if needed
    }}>
      <About3D />

      <div className={styles.content} style={{ gap: "40px" }}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`} style={{ marginBottom: "32px" }}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.headerDescription}>
            A passionate Computer Science student dedicated to creating innovative web solutions
          </p>
          <div className={styles.titleUnderline} />
        </div>

        <div className={styles.mainContent} style={{ gap: "40px" }}>
          {/* Profile Section */}
          <div className={`${styles.profileSection} ${isVisible ? styles.visible : ""}`} style={{ marginBottom: "32px" }}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageGlow} />
              <div className={styles.imageCard}>
                <img
                  src={getImageUrl("about/aboutImage.png") || "/placeholder.svg"}
                  alt="Akshat Kushwaha"
                  className={styles.profileImage}
                />
                <div className={styles.floatingElement1} />
                <div className={styles.floatingElement2} />
                <div className={styles.floatingElement3} />
              </div>
            </div>

            {/* Personal Info */}
            <div className={styles.personalInfo}>
              <h3 className={styles.infoTitle}>Personal Information</h3>
              <div className={styles.infoGrid}>
                {personalInfo.map((info, index) => (
                  <div key={index} className={styles.infoItem}>
                    <span className={styles.infoLabel}>{info.label}:</span>
                    <span className={styles.infoValue}>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Cards */}
          <div className={styles.skillsContainer} style={{ marginBottom: "32px" }}>
            <h3 className={styles.skillsTitle}>What I Do</h3>
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`${styles.skillCard} ${styles[skill.color]} ${isVisible ? styles.visible : ""}`}
                style={{ transitionDelay: skill.delay, marginBottom: "24px" }}
              >
                <div className={styles.skillCardInner}>
                  <div className={styles.skillCardOverlay} />

                  <div className={styles.skillContent}>
                    <div className={styles.skillIcon}>{skill.icon}</div>

                    <div className={styles.skillText}>
                      <h4 className={styles.skillTitle}>{skill.title}</h4>
                      <p className={styles.skillDescription}>{skill.description}</p>

                      {/* Technologies */}
                      <div className={styles.technologies}>
                        {skill.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className={styles.tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.skillBorder} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className={`${styles.quoteSection} ${isVisible ? styles.visible : ""}`} style={{ marginTop: "32px" }}>
          <blockquote className={styles.quote}>
            "I'm always eager to learn more and collaborate on exciting projects. Feel free to reach out if you'd like
            to connect!"
          </blockquote>
          <div className={styles.quoteAuthor}>- Akshat Kushwaha</div>
        </div>
      </div>
    </section>
  )
}
