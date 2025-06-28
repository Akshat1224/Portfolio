import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial } from "@react-three/drei"
import profileImage from '../../assets/hero/profile.jpg'

function AnimatedSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.9}
          roughness={0.1}
          thickness={1}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#4F46E5"
        />
      </mesh>
    </Float>
  )
}

function Hero3D() {
  return (
    <div style={{ width: "100%", height: "100%", background: "transparent", pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: "transparent" }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  )
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    const hero = heroRef.current
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove)
      return () => hero.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 50px rgba(79, 70, 229, 0.4), 0 0 100px rgba(124, 58, 237, 0.2); }
          50% { box-shadow: 0 0 80px rgba(79, 70, 229, 0.6), 0 0 150px rgba(124, 58, 237, 0.4); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes floating-dots {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @media (max-width: 1024px) {
          .hero-content { 
            grid-template-columns: 1fr !important; 
            gap: 3rem !important; 
            text-align: center; 
            justify-items: center !important;
            align-items: center !important;
          }
          .hero-3d-container { 
            position: relative !important; 
            right: auto !important; 
            top: auto !important; 
            transform: none !important; 
            margin: 2rem auto 0 !important; 
          }
          .hero-title { font-size: 3.5rem !important; }
        }
        
        @media (max-width: 768px) {
          .photo-frame { 
            width: 180px !important; 
            height: 180px !important; 
            margin: 0 auto !important;
            box-sizing: border-box !important;
            max-width: 90vw !important;
          }
          .hero-title { font-size: 2.2rem !important; }
          .hero-description { font-size: 1.1rem !important; }
          .button-container { 
            flex-direction: column !important; 
            align-items: center !important; 
          }
          .contact-btn, .projects-btn { 
            font-size: 1rem !important; 
            padding: 1rem 2rem !important; 
          }
        }
        @media (max-width: 600px) {
          .photo-frame {
            width: 120px !important;
            height: 120px !important;
            margin: 0 auto !important;
            max-width: 95vw !important;
          }
          .hero-content {
            gap: 1.2rem !important;
          }
        }
        /* Fix navbar menu overlapping profile photo */
        @media (max-width: 768px) {
          .navbar-menu {
            z-index: 3001 !important;
            position: fixed !important;
            top: 1.2rem !important;
            right: 1.2rem !important;
          }
          .navbar-mobile {
            z-index: 3000 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: rgba(20,20,40,0.98) !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .photo-frame {
            z-index: 1 !important;
          }
        }
      `}</style>

      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 5% 40px 5%", // Only bottom margin for vertical gap
          overflow: "visible", // Allow content to overflow if needed
          background: "linear-gradient(135deg, #2d2d5a 0%, #44447a 50%, #2d2d5a 100%)", // Even lighter gradient
          borderRadius: "2.5rem",
          border: "none",
        }}
      >
        {/* Background Elements */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                backgroundColor: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#a855f7" : "#ec4899",
                borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floating-dots ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 10,
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "center",
            width: "100%",
            maxWidth: "1400px",
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s ease-out",
          }}
        >
          {/* Photo Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: isLoaded ? "translateX(0)" : "translateX(-50px)",
              opacity: isLoaded ? 1 : 0,
              transition: "all 1.2s ease-out",
              transitionDelay: "0.3s",
            }}
          >
            <div
              style={{
                position: "relative",
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <div
                className="photo-frame"
                style={{
                  position: "relative",
                  width: "320px",
                  height: "320px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid transparent",
                  background:
                    "linear-gradient(45deg, #4f46e5, #7c3aed, #ec4899) padding-box, linear-gradient(45deg, #4f46e5, #7c3aed, #ec4899) border-box",
                  animation: "pulse-glow 3s ease-in-out infinite",
                  boxShadow: "0 0 50px rgba(79, 70, 229, 0.4), 0 0 100px rgba(124, 58, 237, 0.2)",
                }}
              >
                <img
                  src={profileImage}
                  alt="Akshat Kushwaha"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>

              {/* Decorative Orbs */}
              {[
                { top: "10%", right: "5%", color: "#60a5fa", delay: "0s" },
                { bottom: "20%", left: "0%", color: "#a855f7", delay: "1s" },
                { top: "50%", right: "15%", color: "#ec4899", delay: "2s" },
              ].map((orb, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: `linear-gradient(45deg, ${orb.color}, ${orb.color}aa)`,
                    boxShadow: `0 0 20px ${orb.color}`,
                    animation: `float 4s ease-in-out infinite`,
                    animationDelay: orb.delay,
                    ...orb,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
              transform: isLoaded ? "translateX(0)" : "translateX(50px)",
              opacity: isLoaded ? 1 : 0,
              transition: "all 1.2s ease-out",
              transitionDelay: "0.6s",
            }}
          >
            <h1
              className="hero-title"
              style={{
                fontSize: "4.5rem",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(45deg, #ffffff, #bfdbfe, #c4b5fd)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "gradient-shift 4s ease infinite",
                  backgroundSize: "300% 300%",
                }}
              >
                Hi, I'm
              </span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(45deg, #60a5fa, #a855f7, #ec4899)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "gradient-shift 4s ease infinite",
                  animationDelay: "0.5s",
                  backgroundSize: "300% 300%",
                }}
              >
                Akshat
              </span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(45deg, #a855f7, #ec4899, #ef4444)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "gradient-shift 4s ease infinite",
                  animationDelay: "1s",
                  backgroundSize: "300% 300%",
                }}
              >
                Kushwaha
              </span>
            </h1>

            <div style={{ position: "relative" }}>
              <p
                className="hero-description"
                style={{
                  fontSize: "1.4rem",
                  lineHeight: 1.7,
                  color: "#d1d5db",
                  maxWidth: "600px",
                  position: "relative",
                }}
              >
                I'm a passionate{" "}
                <span
                  style={{
                    color: "#60a5fa",
                    fontWeight: 600,
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                >
                  full-stack developer
                </span>{" "}
                with hands-on experience in frameworks like{" "}
                <span style={{ color: "#a855f7", fontWeight: 600 }}>React</span> and{" "}
                <span style={{ color: "#34d399", fontWeight: 600 }}>Node.js</span>. As a Computer Science student, I'm
                always eager to learn more and collaborate on exciting projects.
              </p>

              <div
                style={{
                  position: "absolute",
                  right: "-3rem",
                  top: "-1rem",
                  opacity: 0.3,
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <code style={{ fontSize: "0.9rem", color: "#60a5fa" }}>{"<Developer />"}</code>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "-2rem",
                  bottom: "-1rem",
                  opacity: 0.3,
                  animation: "float 3s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              >
                <code style={{ fontSize: "0.9rem", color: "#a855f7" }}>{"{ creativity: true }"}</code>
              </div>
            </div>

            <div
              className="button-container"
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleContactClick}
                className="contact-btn"
                style={{
                  position: "relative",
                  padding: "1.2rem 2.5rem",
                  background: "linear-gradient(135deg, #2563eb, #7c3aed, #ec4899)",
                  borderRadius: "50px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                  boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 3s ease infinite",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05) translateY(-2px)"
                  e.target.style.boxShadow = "0 20px 40px rgba(37, 99, 235, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) translateY(0)"
                  e.target.style.boxShadow = "0 10px 30px rgba(37, 99, 235, 0.3)"
                }}
              >
                Contact Me
              </button>

              <button
                className="projects-btn"
                onClick={handleProjectsClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.2rem 2.5rem",
                  border: "2px solid #60a5fa",
                  color: "#60a5fa",
                  borderRadius: "50px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#60a5fa"
                  e.target.style.color = "white"
                  e.target.style.transform = "scale(1.05) translateY(-2px)"
                  e.target.style.boxShadow = "0 15px 30px rgba(96, 165, 250, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"
                  e.target.style.color = "#60a5fa"
                  e.target.style.transform = "scale(1) translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  View Projects
                  <svg
                    style={{ width: "1.2rem", height: "1.2rem", transition: "transform 0.3s ease" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Hero Element */}
        <div
          className="hero-3d-container"
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "350px",
            height: "350px",
            opacity: 0.7,
            zIndex: 0, // Move behind main content
            pointerEvents: "none",
            display: "none", // Hide by default
          }}
        >
          <Hero3D />
        </div>
      </section>
    </>
  )
}
