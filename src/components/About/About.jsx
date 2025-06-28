"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { getImageUrl } from "../../utils"
import styles from "./About.module.css"

// ✅ Fixed typo: "RotatingC andube" ➝ "RotatingCube"
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
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
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
    <section
      ref={sectionRef}
      className={styles.container}
      id="about"
      style={{
        borderRadius: "2.5rem",
        border: "none",
        background: "linear-gradient(135deg, #2d2d5a 0%, #44447a 50%, #2d2d5a 100%)",
        margin: "0 5% 40px 5%",
        overflow: "visible",
      }}
    >
      <About3D />

      <div className={styles.content}>
        {/* Header Section */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.headerDescription}>
            A passionate Computer Science student dedicated to creating innovative web solutions
          </p>
          <div className={styles.titleUnderline} />
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Profile Section */}
          <div className={`${styles.profileSection} ${isVisible ? styles.visible : ""}`}>
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

          {/* Skills Section */}
          <div className={styles.skillsContainer}>
            <h3 className={styles.skillsTitle}>What I Do</h3>
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`${styles.skillCard} ${styles[skill.color]} ${isVisible ? styles.visible : ""}`}
                style={{ transitionDelay: skill.delay }}
              >
                <div className={styles.skillCardInner}>
                  <div className={styles.skillCardOverlay} />
                  <div className={styles.skillContent}>
                    <div className={styles.skillIcon}>{skill.icon}</div>
                    <div className={styles.skillText}>
                      <h4 className={styles.skillTitle}>{skill.title}</h4>
                      <p className={styles.skillDescription}>{skill.description}</p>
                      <div className={styles.technologies}>
                        {skill.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className={styles.tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className={`${styles.quoteSection} ${isVisible ? styles.visible : ""}`}>
          <blockquote className={styles.quote}>
            "I'm always eager to learn more and collaborate on exciting projects. Feel free to reach out if you'd like
            to connect!"
          </blockquote>
          <div className={styles.quoteAuthor}>- Akshat Kushwaha</div>
        </div>
      </div>
    


      <style>{`
        @media (max-width: 900px) {
          .${styles.content} {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
            padding: 0 0.5rem !important;
            width: 100% !important;
          }
          .${styles.mainContent} {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
            width: 100% !important;
          }
          .${styles.profileSection} {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin-bottom: 20px !important;
            width: 100% !important;
          }
          .${styles.imageWrapper} {
            width: 120px !important;
            height: 120px !important;
            margin: 0 auto 1rem auto !important;
          }
          .${styles.profileImage} {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 50% !important;
          }
          .${styles.personalInfo} {
            width: 100% !important;
            padding: 0 !important;
          }
          .${styles.skillsContainer} {
            margin-bottom: 20px !important;
            width: 100% !important;
          }
        }
        /* Extra mobile tweaks for About section */
        @media (max-width: 600px) {
          .${styles.about3d} {
            width: 100vw !important;
            min-width: 0 !important;
            height: 180px !important;
            max-height: 180px !important;
            margin-bottom: 1rem !important;
            overflow: visible !important;
          }
          .${styles.content} {
            padding: 0 0.2rem !important;
            gap: 12px !important;
          }
          .${styles.header} {
            text-align: center !important;
            padding: 0.5rem 0 !important;
          }
          .${styles.profileSection} {
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
            margin-bottom: 10px !important;
          }
          .${styles.imageWrapper} {
            width: 80px !important;
            height: 80px !important;
            margin: 0 auto 0.5rem auto !important;
          }
          .${styles.personalInfo} {
            width: 100% !important;
            padding: 0 !important;
            font-size: 0.95rem !important;
          }
          .${styles.infoGrid} {
            grid-template-columns: 1fr !important;
            gap: 0.3rem !important;
          }
          .${styles.skillsContainer} {
            width: 100% !important;
            margin-bottom: 10px !important;
          }
          .${styles.skillCard} {
            min-width: 0 !important;
            width: 100% !important;
            margin: 0.3rem 0 !important;
          }
          .${styles.quoteSection} {
            padding: 0.5rem 0.2rem !important;
            font-size: 0.95rem !important;
          }
        }
        /* Contact section extra mobile tweaks */
        @media (max-width: 480px) {
          .contact-title {
            font-size: 1.5rem !important;
          }
          .contact-subtitle {
            font-size: 0.95rem !important;
          }
          .form-wrapper {
            padding: 0.5rem !important;
          }
          .contact-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
            padding: 0.7rem !important;
          }
        }
      `}</style>
    </section>
  )
}
