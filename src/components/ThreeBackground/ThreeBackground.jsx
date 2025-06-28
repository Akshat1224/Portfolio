import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import { OrbitControls, Stars, Float } from "@react-three/drei"

function FloatingGeometry() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 0, -2]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#4F46E5" wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, 2, -3]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#06B6D4" wireframe />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[0, -2, -4]}>
          <tetrahedronGeometry args={[1.2]} />
          <meshStandardMaterial color="#8B5CF6" wireframe />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[6, -1, -1]}>
          <dodecahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#F59E0B" wireframe />
        </mesh>
      </Float>
    </>
  )
}

export function ThreeBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Ensure canvas resizes with window
    const handleResize = () => {
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas')
        if (canvas) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      // Remove canvas on unmount to prevent artifacts
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas')
        if (canvas) canvas.remove()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F46E5" />

          <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade />
          <FloatingGeometry />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
