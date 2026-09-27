'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Line, OrbitControls, Text } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { graphLinks, graphSkills, milestones, type MilestoneKind } from '@/lib/portfolio-data'

const FONT = '/fonts/Geist-Regular.ttf'

const KIND_COLOR: Record<MilestoneKind, string> = {
  education: '#6fa8a9',
  work: '#f1e9ec',
  leadership: '#a8bfc2',
  project: '#da7b93',
  goal: '#ffd3de',
}

const experiences = milestones.filter((m) => graphLinks.some(([e]) => e === m.id) || m.id === 'next')

function useLayout() {
  return useMemo(() => {
    const pathPoints: THREE.Vector3[] = []
    const expPos = new Map<string, THREE.Vector3>()
    const n = experiences.length
    experiences.forEach((m, i) => {
      const t = i / (n - 1)
      const angle = t * Math.PI * 3
      const p = new THREE.Vector3(Math.cos(angle) * 2.2, (t - 0.5) * 6, Math.sin(angle) * 2.2)
      expPos.set(m.id, p)
      pathPoints.push(p)
    })
    const curve = new THREE.CatmullRomCurve3(pathPoints)

    const skillPos = new Map<string, THREE.Vector3>()
    graphSkills.forEach((skill, i) => {
      const linked = graphLinks.filter(([, s]) => s === skill).map(([e]) => expPos.get(e)!)
      const center = linked
        .reduce((acc, v) => acc.add(v), new THREE.Vector3())
        .divideScalar(Math.max(linked.length, 1))
      const outward = new THREE.Vector3(center.x, 0, center.z).normalize()
      if (outward.lengthSq() === 0) outward.set(Math.cos(i), 0, Math.sin(i))
      const jitter = ((i * 37) % 10) / 10 - 0.5
      skillPos.set(
        skill,
        new THREE.Vector3(
          center.x + outward.x * 2.2,
          center.y + jitter * 1.2,
          center.z + outward.z * 2.2,
        ),
      )
    })
    return { curve, expPos, skillPos }
  }, [])
}

type SceneProps = {
  activeId: string | null
  onSelect: (id: string | null) => void
}

function Graph({ activeId, onSelect }: SceneProps) {
  const { curve, expPos, skillPos } = useLayout()
  const [hovered, setHovered] = useState<string | null>(null)
  const focus = hovered ?? activeId
  const group = useRef<THREE.Group>(null)

  const connected = useMemo(() => {
    if (!focus) return null
    const set = new Set<string>([focus])
    graphLinks.forEach(([e, s]) => {
      if (e === focus) set.add(s)
      if (s === focus) set.add(e)
    })
    return set
  }, [focus])

  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 200, 0.035, 8, false), [curve])

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
  })

  const dim = (id: string) => connected !== null && !connected.has(id)

  return (
    <group ref={group}>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial color="#da7b93" emissive="#da7b93" emissiveIntensity={0.5} />
      </mesh>

      {graphLinks.map(([e, s]) => {
        const active = connected ? connected.has(e) && connected.has(s) && (e === focus || s === focus) : false
        return (
          <Line
            key={`${e}-${s}`}
            points={[expPos.get(e)!, skillPos.get(s)!]}
            color={active ? '#da7b93' : '#6fa8a9'}
            lineWidth={active ? 2 : 1}
            transparent
            opacity={connected ? (active ? 0.95 : 0.06) : 0.28}
          />
        )
      })}

      {experiences.map((m) => {
        const pos = expPos.get(m.id)!
        const isFocus = focus === m.id
        return (
          <group key={m.id} position={pos}>
            <mesh
              onPointerOver={(ev) => {
                ev.stopPropagation()
                setHovered(m.id)
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                setHovered(null)
                document.body.style.cursor = ''
              }}
              onClick={(ev) => {
                ev.stopPropagation()
                onSelect(activeId === m.id ? null : m.id)
              }}
              scale={isFocus ? 1.4 : 1}
            >
              <icosahedronGeometry args={[0.22, 1]} />
              <meshStandardMaterial
                color={KIND_COLOR[m.kind]}
                emissive={KIND_COLOR[m.kind]}
                emissiveIntensity={isFocus ? 0.9 : 0.35}
                transparent
                opacity={dim(m.id) ? 0.25 : 1}
                flatShading
              />
            </mesh>
            <Billboard position={[0, 0.48, 0]}>
              <Text
                font={FONT}
                fontSize={0.15}
                color="#f1e9ec"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#2e151b"
                fillOpacity={dim(m.id) ? 0.2 : 1}
                outlineOpacity={dim(m.id) ? 0.2 : 1}
                raycast={() => null}
              >
                {`${m.year} · ${m.title.split('—')[0].split('&')[0].trim()}`}
              </Text>
            </Billboard>
          </group>
        )
      })}

      {graphSkills.map((skill) => {
        const pos = skillPos.get(skill)!
        const isFocus = focus === skill
        return (
          <group key={skill} position={pos}>
            <mesh
              onPointerOver={(ev) => {
                ev.stopPropagation()
                setHovered(skill)
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                setHovered(null)
                document.body.style.cursor = ''
              }}
              onClick={(ev) => {
                ev.stopPropagation()
                onSelect(activeId === skill ? null : skill)
              }}
              scale={isFocus ? 1.5 : 1}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#6fa8a9"
                emissive="#376e6f"
                emissiveIntensity={0.8}
                transparent
                opacity={dim(skill) ? 0.2 : 1}
              />
            </mesh>
            <Billboard position={[0, -0.28, 0]}>
              <Text
                font={FONT}
                fontSize={0.12}
                color="#a8bfc2"
                anchorX="center"
                anchorY="middle"
                fillOpacity={dim(skill) ? 0.15 : 0.9}
                raycast={() => null}
              >
                {skill}
              </Text>
            </Billboard>
          </group>
        )
      })}
    </group>
  )
}

export default function ConstellationScene(props: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1, 11], fov: 45 }}
      dpr={[1, 2]}
      onPointerMissed={() => props.onSelect(null)}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#da7b93" />
      <pointLight position={[-5, -4, -3]} intensity={30} color="#6fa8a9" />
      <Graph {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!props.activeId}
        autoRotateSpeed={0.6}
      />
    </Canvas>
  )
}
