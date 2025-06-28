import { useState, Suspense } from "react"
import ReactDOM from "react-dom"
import styles from "./Contact.module.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, MeshWobbleMaterial } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"

// You'll need to import your checkmark animation
import checkmarkAnimation from "../../../assets/lottie/checkmark.json";

const AnimatedSphere = () => (
  <mesh position={[0, 0, 0]} scale={2.5}>
    <sphereGeometry args={[1, 64, 64]} />
    <MeshWobbleMaterial color="#4f46e5" speed={1.2} factor={0.8} />
  </mesh>
)

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [modal, setModal] = useState({ open: false, success: true, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setModal({ open: true, success: true, message: "Sending your message..." })

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success) {
        setModal({ open: true, success: true, message: "Message sent successfully!" })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setModal({ open: true, success: false, message: data.message || "Something went wrong!" })
      }
    } catch (err) {
      setModal({ open: true, success: false, message: "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setModal((prev) => ({ ...prev, open: false }))
      }, 3000)
    }
  }

  return (
    <section id="contact" className={styles["contact-container"]} style={{
      borderRadius: "2.5rem", // Add large border radius
      border: "none", // No border
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #0f0f23 100%)", // Match other sections
      margin: "0 5%",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh"
    }}>
      {/* 3D Background */}
      <div className={styles["canvas-wrapper"]}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className={styles["contact-content"]}>
        {/* Left side - Contact info */}
        <motion.div
          className={styles["contact-info"]}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles["info-header"]}>
            <h2 className={styles["contact-title"]}>Let's Connect</h2>
            <p className={styles["contact-subtitle"]}>
              Ready to bring your ideas to life? Let's start a conversation and create something amazing together.
            </p>
          </div>

          <div className={styles["contact-links"]}>
            <div className={styles["contact-item"]}>
              <div className={styles["contact-icon"]}>📧</div>
              <div className={styles["contact-details"]}>
                <span className={styles["contact-label"]}>Email</span>
                <a href="mailto:akshatkushwaha7oct2003@gmail.com" className={styles["contact-link"]}>
                  akshatkushwaha7oct2003@gmail.com
                </a>
              </div>
            </div>

            <div className={styles["contact-item"]}>
              <div className={styles["contact-icon"]}>💻</div>
              <div className={styles["contact-details"]}>
                <span className={styles["contact-label"]}>GitHub</span>
                <a
                  href="https://github.com/akshat1224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["contact-link"]}
                >
                  github.com/akshat1224
                </a>
              </div>
            </div>

            <div className={styles["contact-item"]}>
              <div className={styles["contact-icon"]}>💼</div>
              <div className={styles["contact-details"]}>
                <span className={styles["contact-label"]}>LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/akshat-kushwaha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["contact-link"]}
                >
                  linkedin.com/in/akshat-kushwaha
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          className={styles["form-wrapper"]}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <form className={styles["contact-form"]} onSubmit={handleSubmit}>
            <div className={styles["form-header"]}>
              <h3>Send me a message</h3>
              <p>I'll get back to you as soon as possible</p>
            </div>

            <div className={styles["form-group"]}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                className={styles["form-input"]}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles["form-group"]}>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={handleChange}
                className={styles["form-input"]}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles["form-group"]}>
              <textarea
                name="message"
                placeholder="Your message"
                required
                value={formData.message}
                onChange={handleChange}
                className={styles["form-textarea"]}
                rows={5}
                disabled={isSubmitting}
              />
            </div>

            <button type="submit" className={styles["form-button"]} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className={styles["button-spinner"]}></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <span className={styles["button-arrow"]}>→</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Modal */}
      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {modal.open && (
              <>
                <motion.div
                  className={styles["modal-backdrop"]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setModal({ ...modal, open: false })}
                />
                <motion.div
                  className={styles["modal"]}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className={styles["modal-content"]}>
                    {modal.success ? (
                      <div className={styles["modal-icon"] + " " + styles["success"]}>✓</div>
                    ) : (
                      <div className={styles["modal-icon"] + " " + styles["error"]}>✕</div>
                    )}
                    <p className={styles["modal-message"] + " " + (modal.success ? styles["success"] : styles["error"])}>{modal.message}</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
