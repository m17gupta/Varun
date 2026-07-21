"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function FloatingGeometry({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  const geometries = useMemo(
    () => [
      { position: [-2.5, 1.5, -3] as const, scale: 1.2, type: "torusKnot" as const, color: "#8B5CF6" },
      { position: [3, -1.8, -4] as const, scale: 0.9, type: "icosahedron" as const, color: "#3B82F6" },
      { position: [-1.5, -2.2, -2] as const, scale: 0.7, type: "octahedron" as const, color: "#EC4899" },
      { position: [2.2, 2.5, -5] as const, scale: 1.0, type: "torusKnot" as const, color: "#10B981" },
      { position: [0, 3.2, -6] as const, scale: 0.6, type: "dodecahedron" as const, color: "#F59E0B" },
    ],
    [],
  )

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.children as unknown as THREE.Mesh[]
      positions.forEach((child, i) => {
        const geo = geometries[i]
        child.rotation.x += 0.003 * (i % 2 === 0 ? 1 : -1)
        child.rotation.y += 0.005 * (i % 2 === 0 ? -1 : 1)
        child.position.x += (geo.position[0] + mouse.current.x * (0.3 + i * 0.05) - child.position.x) * 0.02
        child.position.y += (geo.position[1] + mouse.current.y * (0.3 + i * 0.05) - child.position.y) * 0.02
      })
    }
  })

  const geometryMap = {
    torusKnot: <torusKnotGeometry args={[1, 0.4, 128, 16]} />,
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
  }

  return (
    <group ref={meshRef}>
      {geometries.map((geo, i) => (
        <Float key={i} speed={0.5 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={geo.position} scale={geo.scale * 0.4}>
            {geometryMap[geo.type]}
            <MeshDistortMaterial
              color={geo.color}
              roughness={0.2}
              metalness={0.8}
              distort={0.2 + i * 0.05}
              speed={1.5}
              opacity={0.35}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function MouseTracker() {
  const mouse = useRef({ x: 0, y: 0 })
  const { pointer } = useThree()
  const mouseSmooth = useRef({ x: 0, y: 0 })

  useFrame(() => {
    mouseSmooth.current.x += (pointer.x * 0.5 - mouseSmooth.current.x) * 0.05
    mouseSmooth.current.y += (pointer.y * 0.5 - mouseSmooth.current.y) * 0.05
    mouse.current = { x: mouseSmooth.current.x, y: mouseSmooth.current.y }
  })

  return <FloatingGeometry mouse={mouse} />
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-5, -3, 5]} intensity={0.3} color="#8B5CF6" />
      <pointLight position={[0, 0, 5]} intensity={0.4} color="#3B82F6" />
      <MouseTracker />
    </>
  )
}

export default function AnimatedBackground3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
