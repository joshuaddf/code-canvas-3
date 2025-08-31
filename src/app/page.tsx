'use client'
import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

const Banana = ({ z }: { z: number }) => {
  const { nodes, materials } = useGLTF('/banana-transformed.glb');

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const bananaRef = useRef<THREE.Mesh>(null!);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(width),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame(() => {
    bananaRef.current.rotation.set((data.rX += 0.003), (data.rY += 0.003), (data.rZ += 0.003));
    bananaRef.current.position.set(data.x, data.y += 0.01, z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  })

  return (
    <mesh
      ref={bananaRef}
      geometry={(nodes.Banana as THREE.Mesh).geometry}
      material={materials.Banana_High}
      rotation={[-Math.PI / 2, 0, 0]}
      material-emissive="orange" />
  )
}



export default function Home({ count = 100, depth = 80 }: { count: number, depth: number }) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Canvas gl={{ alpha: false }} camera={{ near: 0.1, far: 110 }}>
        <color attach="background" args={["#ffbf40"]} />
        {/* <ambientLight intensity={0.5} /> */}
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="sunset" />
        <Suspense fallback={null}>
          {Array.from({ length: count }, (_, i) => {
            return <Banana key={i} z={-(i / count) * depth} />
          })}
        {/* <EffectComposer>
          <DepthOfField target={[0, 0, depth / 2]} focalLength={0.1} bokehScale={2} height={400} />
        </EffectComposer> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
