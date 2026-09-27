'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const LAYERS = [4, 7, 7, 5, 3]
const ROSE = '#da7b93'
const TEAL = '#6fa8a9'

type Edge = { from: THREE.Vector3; to: THREE.Vector3 }

function buildNetwork() {
  const nodes: { pos: THREE.Vector3; layer: number }[] = []
  const spacingX = 1.6
  LAYERS.forEach((count, layer) => {
    const x = (layer - (LAYERS.length - 1) / 2) * spacingX
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + layer * 0.4
      const radius = count > 4 ? 1.35 : 0.9
      nodes.push({
        pos: new THREE.Vector3(x, Math.sin(angle) * radius, Math.cos(angle) * radius),
        layer,
      })
    }
  })
  const edges: Edge[] = []
  for (let l = 0; l < LAYERS.length - 1; l++) {
    const a = nodes.filter((n) => n.layer === l)
    const b = nodes.filter((n) => n.layer === l + 1)
    a.forEach((na) => b.forEach((nb) => edges.push({ from: na.pos, to: nb.pos })))
  }
  return { nodes, edges }
}

function Pulses({ edges }: { edges: Edge[] }) {
  const count = 36
  const ref = useRef<THREE.InstancedMesh>(null)
  const state = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.45,
      })),
    [edges.length],
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((_, delta) => {
    if (!ref.current) return
    state.forEach((p, i) => {
      p.t += delta * p.speed
      if (p.t > 1) {
        p.t = 0
        p.edge = Math.floor(Math.random() * edges.length)
      }
      const e = edges[p.edge]
      dummy.position.lerpVectors(e.from, e.to, p.t)
      dummy.scale.setScalar(Math.sin(p.t * Math.PI) * 0.9 + 0.1)
      dummy.updateMatrix()
      ref.current!.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color={ROSE} toneMapped={false} />
    </instancedMesh>
  )
}

function Network() {
  const group = useRef<THREE.Group>(null)
  const { nodes, edges } = useMemo(buildNetwork, [])

  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6)
    edges.forEach((e, i) => {
      positions.set([e.from.x, e.from.y, e.from.z, e.to.x, e.to.y, e.to.z], i * 6)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [edges])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.x += delta * 0.08
    const targetY = state.pointer.x * 0.5 - 0.35
    const targetZ = state.pointer.y * 0.2
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.04)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.04)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={TEAL} transparent opacity={0.22} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.layer === LAYERS.length - 1 ? 0.13 : 0.09, 24, 24]} />
          <meshStandardMaterial
            color={n.layer === LAYERS.length - 1 ? ROSE : '#f1e9ec'}
            emissive={n.layer === LAYERS.length - 1 ? ROSE : TEAL}
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
      <Pulses edges={edges} />
    </group>
  )
}

export default function NeuralScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]} aria-hidden>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={30} color={ROSE} />
      <pointLight position={[-4, -3, 2]} intensity={20} color={TEAL} />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <Network />
      </Float>
    </Canvas>
  )
}
