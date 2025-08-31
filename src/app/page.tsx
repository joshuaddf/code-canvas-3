'use client'
import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

const Box = ({ z }: { z: number }) => {

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const boxRef = useRef<THREE.Mesh>(null!);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(width),
    y: THREE.MathUtils.randFloatSpread(height),
  })

  useFrame(() => {
    boxRef.current.position.set(data.x, data.y += 0.1, z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  })

  return (
    <mesh ref={boxRef}>
      <boxGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  )
}

const Banana = (props: any) => {
  const { scene } = useGLTF('/banana.glb');
  return <primitive object={scene} {...props} />;
}

export default function Home({ count = 600 }: { count: number }) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Canvas>
        {/* { Array.from({ length: count }, (_, i) => {
        return <Box key={i} z={-i}/>
      }) } */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="sunset" />
        <Suspense>
          <Banana scale={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
