import { useEffect, useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import reactImg from "../../assets/skills/react.png"
import nodeImg from "../../assets/skills/node.png"
import jsImg from "../../assets/skills/javascript.png"
import cssImg from "../../assets/skills/css.png"
import htmlImg from "../../assets/skills/html.png"
import figmaImg from "../../assets/skills/figma.png"
import mongoImg from "../../assets/skills/mongodb.png"

const skillsData = [
  {
    title: "React",
    imageSrc: reactImg,
    percentage: 90,
    color: "#61DAFB",
    description:
      "Advanced proficiency in React with hooks, context, and modern patterns. Building complex UIs with performance optimization.",
    experience: "2+ years",
    projects: 1, // Used in E-commerce website
    level: "Expert",
    technologies: ["Hooks", "Redux", "MERN", "SPA"],
  },
  {
    title: "Node.js",
    imageSrc: nodeImg,
    percentage: 85,
    color: "#68D391",
    description:
      "Backend development with Express, RESTful APIs, and database integration. Microservices architecture experience.",
    experience: "2+ years",
    projects: 2, // Restaurant website, E-commerce website
    level: "Expert",
    technologies: ["Express.js", "MERN", "API", "JWT"],
  },
  {
    title: "JavaScript",
    imageSrc: jsImg,
    percentage: 95,
    color: "#F7DF1E",
    description:
      "Expert level ES6+, async programming, and modern JavaScript. Deep understanding of closures, prototypes, and event loop.",
    experience: "2+ years",
    projects: 2, // Weather app, E-commerce website
    level: "Expert",
    technologies: ["ES6+", "Async/Await", "DOM", "React"],
  },
  {
    title: "MongoDB",
    imageSrc: mongoImg,
    percentage: 70,
    color: "#47A248",
    description:
      "NoSQL database design, aggregation pipelines, and performance optimization. Experience with Atlas and Compass.",
    experience: "1+ years",
    projects: 1, // E-commerce website
    level: "Proficient",
    technologies: ["MERN", "Atlas", "Mongoose"],
  },
  {
    title: "CSS",
    imageSrc: cssImg,
    percentage: 90,
    color: "#264de4",
    description:
      "Advanced CSS including Flexbox, Grid, animations, and responsive design. Experience with preprocessors and utility frameworks.",
    experience: "2+ years",
    projects: 2, // Restaurant website, Weather app
    level: "Expert",
    technologies: ["Flexbox", "Grid", "Responsive", "Animations"],
  },
  {
    title: "HTML",
    imageSrc: htmlImg,
    percentage: 95,
    color: "#e34c26",
    description:
      "Semantic HTML5, accessibility, SEO best practices, and building robust web layouts.",
    experience: "2+ years",
    projects: 2, // Restaurant website, Weather app
    level: "Expert",
    technologies: ["HTML5", "SEO", "Accessibility", "Web Components"],
  },
  {
    title: "Figma",
    imageSrc: figmaImg,
    percentage: 75,
    color: "#a259ff",
    description:
      "UI/UX design, prototyping, and collaboration using Figma. Creating design systems and interactive prototypes.",
    experience: "1+ years",
    projects: 1, // Used for design/prototyping
    level: "Proficient",
    technologies: ["Prototyping", "Design Systems", "Collaboration"],
  },
]

function SkillOrb({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={1 + Math.random()} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

function Skills3D() {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SkillOrb position={[-3, 2, 0]} color="#61DAFB" scale={0.8} />
        <SkillOrb position={[3, 1, -1]} color="#68D391" scale={1.2} />
        <SkillOrb position={[-2, -1, 1]} color="#F7DF1E" scale={0.9} />
        <SkillOrb position={[2, -2, 0]} color="#3178C6" scale={1.1} />
        <SkillOrb position={[0, 3, -2]} color="#3776AB" scale={0.7} />
        <SkillOrb position={[-4, 0, -1]} color="#47A248" scale={1.0} />
      </Canvas>
    </div>
  )
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const sectionRef = useRef(null)

  const particleStylesArr = useMemo(
    () =>
      skillsData.map(() =>
        Array.from({ length: 8 }).map(() => ({
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          animationDelay: `${Math.random() * 2000}ms`,
          animationDuration: `${1500 + Math.random() * 1500}ms`,
        })),
      ),
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.3; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 1; }
        }
        
        @keyframes skill-card-entrance {
          from { opacity: 0; transform: translateY(50px) rotateX(10deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: var(--progress-width); }
        }
        
        @media (max-width: 768px) {
          .skills-grid { 
            grid-template-columns: 1fr !important; 
            gap: 2rem !important; 
          }
          .skills-title, h2 {
            font-size: 2.2rem !important;
            line-height: 1.2 !important;
            word-break: break-word !important;
          }
          .skill-card { 
            min-height: auto !important; 
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: "5rem 0",
          margin: "0 5%",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #0f0f23 100%)",
          borderRadius: "2.5rem", // Add large border radius
          border: "none", // No border
        }}
        id="skills"
      >
        <Skills3D />

        <div style={{ position: "relative", zIndex: 10 }}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(50px)",
              transition: "all 1s ease-out",
            }}
          >
            <h2
              style={{
                fontSize: "4.5rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, #ffffff, #c4b5fd, #fbbf24)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 4s ease infinite",
              }}
            >
              Skills & Technologies
            </h2>
            <p
              style={{
                fontSize: "1.3rem",
                color: "#9ca3af",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: 1.6,
              }}
            >
              A comprehensive showcase of my technical expertise, experience levels, and project implementations
            </p>
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                margin: "0 auto",
                borderRadius: "2px",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* Skills Grid */}
          <div
            className="skills-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2.5rem",
              marginTop: "3rem",
            }}
          >
            {skillsData.map((skill, index) => {
              const isHovered = hoveredSkill === index

              return (
                <div
                  key={index}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(50px)",
                    transition: `all 0.8s ease-out`,
                    transitionDelay: `${index * 150}ms`,
                    animation: isVisible ? "skill-card-entrance 0.8s ease-out" : "none",
                    animationDelay: `${index * 150}ms`,
                    height: "100%", // Make all cards stretch equally
                  }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    style={{
                      position: "relative",
                      background: isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(15px)",
                      borderRadius: "20px",
                      padding: "1.2rem 1.2rem 1.5rem 1.2rem", // Reduce padding
                      border: isHovered ? `2px solid ${skill.color}40` : "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      minHeight: "370px", // Lower minHeight for compactness
                      maxHeight: "420px", // Lower maxHeight for compactness
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      boxSizing: "border-box",
                      height: "100%",
                      boxShadow: isHovered
                        ? `0 20px 60px ${skill.color}20, 0 0 0 1px ${skill.color}30`
                        : "0 10px 30px rgba(0, 0, 0, 0.2)",
                      overflow: "visible",
                    }}
                  >
                    {/* Animated background overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, ${skill.color}10, transparent)`,
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.4s ease",
                        borderRadius: "20px",
                      }}
                    />

                    {/* Icon Container */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: isHovered ? "1.1rem" : "0.7rem",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          background: isHovered
                            ? `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`
                            : "rgba(255, 255, 255, 0.1)",
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "0.7rem",
                          transition: "all 0.4s ease",
                          border: isHovered ? `2px solid ${skill.color}60` : "1px solid rgba(255, 255, 255, 0.1)",
                          transform: isHovered ? "scale(1.08) rotateY(4deg)" : "scale(1) rotateY(0deg)",
                          boxShadow: isHovered ? `0 10px 30px ${skill.color}30` : "none",
                        }}
                      >
                        <img
                          src={skill.imageSrc || "/placeholder.svg"}
                          alt={`${skill.title} icon`}
                          style={{
                            width: "36px",
                            height: "36px",
                            objectFit: "contain",
                            filter: isHovered ? "brightness(1.2)" : "brightness(1)",
                            transition: "all 0.3s ease",
                          }}
                        />
                      </div>

                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: isHovered ? skill.color : "#ffffff",
                          transition: "all 0.3s ease",
                          marginBottom: "0.3rem",
                          textShadow: isHovered ? `0 0 20px ${skill.color}50` : "none",
                        }}
                      >
                        {skill.title}
                      </h3>

                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.2rem 0.7rem",
                          background: `${skill.color}20`,
                          color: skill.color,
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          border: `1px solid ${skill.color}40`,
                          marginBottom: "0.7rem",
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        width: "100%",
                        height: "7px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "4px",
                        overflow: "hidden",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: isHovered ? `${skill.percentage}%` : "0%",
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                          borderRadius: "4px",
                          transition: "width 1s ease-out",
                          transitionDelay: isHovered ? "0.2s" : "0s",
                          boxShadow: `0 0 10px ${skill.color}50`,
                        }}
                      />
                    </div>

                    {/* Skill Details */}
                    <div
                      style={{
                        opacity: isHovered ? 1 : 0.7,
                        transform: isHovered ? "translateY(0)" : "translateY(10px)",
                        transition: "all 0.4s ease",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.92rem",
                          color: "#d1d5db",
                          lineHeight: 1.5,
                          marginBottom: "0.7rem",
                          height: "auto",
                          overflow: "visible",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {skill.description}
                      </p>

                      {/* Stats Grid */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "0.5rem",
                          marginBottom: "0.7rem",
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateY(0)" : "translateY(20px)",
                          transition: "all 0.4s ease",
                          transitionDelay: "0.1s",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: skill.color }}>
                            {skill.percentage}%
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Proficiency</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: skill.color }}>
                            {skill.experience}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Experience</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: skill.color }}>
                            {skill.projects}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Projects</div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateY(0)" : "translateY(20px)",
                          transition: "all 0.4s ease",
                          transitionDelay: "0.2s",
                        }}
                      >
                        <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
                          Key Technologies:
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                          {skill.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              style={{
                                padding: "0.2rem 0.6rem",
                                background: `${skill.color}15`,
                                color: skill.color,
                                borderRadius: "12px",
                                fontSize: "0.75rem",
                                border: `1px solid ${skill.color}30`,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Floating particles */}
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          zIndex: 10,
                        }}
                      >
                        {particleStylesArr[index].map((style, i) => (
                          <div
                            key={i}
                            style={{
                              position: "absolute",
                              width: "4px",
                              height: "4px",
                              backgroundColor: skill.color,
                              borderRadius: "50%",
                              animation: "particle-float 2s ease-in-out infinite",
                              boxShadow: `0 0 6px ${skill.color}`,
                              ...style,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "4rem",
              textAlign: "center",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s ease-out",
              transitionDelay: "1.5s",
            }}
          >
            <p style={{ color: "#9ca3af", marginBottom: "2rem", fontSize: "1.1rem" }}>
              Hover over skills to explore detailed information and interactive effects
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Expert Level (80%+)", color: "#22c55e" },
                { label: "Proficient (60-79%)", color: "#eab308" },
                { label: "Intermediate (40-59%)", color: "#3b82f6" },
              ].map((legend, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: legend.color,
                      boxShadow: `0 0 10px ${legend.color}50`,
                      animation: "pulse-glow 2s ease-in-out infinite",
                    }}
                  />
                  <span style={{ fontSize: "0.9rem", color: "#9ca3af" }}>{legend.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
