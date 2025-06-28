import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import projects from "../../data/projects.json"
import { ProjectCard } from "./ProjectCard"
import styles from "./Projects.module.css"

function ProjectCube({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} wireframe opacity={0.6} transparent />
      </mesh>
    </Float>
  )
}

function Projects3D() {
  return (
    <div className={styles.projects3d}>
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <ProjectCube position={[-3, 2, 0]} color="#4F46E5" />
        <ProjectCube position={[3, -1, -1]} color="#06B6D4" />
        <ProjectCube position={[0, 1, 2]} color="#8B5CF6" />
      </Canvas>
    </div>
  )
}

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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
    <section
      ref={sectionRef}
      className={styles.container}
      id="projects"
      style={{
        borderRadius: "2.5rem", // Add large border radius
        border: "none", // No border
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #0f0f23 100%)", // Match other sections
        margin: "0 5%",
        overflow: "hidden",
      }}
    >
      <Projects3D />
      <div className={styles.content}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>My Projects</h2>
          <p className={styles.subtitle}>
            A collection of web applications showcasing my skills in full-stack development, responsive design, and
            modern web technologies
          </p>
          <div className={styles.titleUnderline} />
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((project, id) => (
            <div
              key={id}
              className={`${styles.projectWrapper} ${isVisible ? styles.visible : ""}`}
              style={{ transitionDelay: `${id * 200}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        {/* Project Stats */}
        <div className={`${styles.statsContainer} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>3+</div>
            <div className={styles.statLabel}>Projects Completed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>6+</div>
            <div className={styles.statLabel}>Technologies Used</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Responsive Design</div>
          </div>
        </div>
      </div>
    </section>
  )
}
