import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const LiquidDroplet = ({ position, scale, speed, color, distortion, type }: any) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={mesh} position={position} scale={scale}>
        {type === 'sphere' ? (
          <sphereGeometry args={[1, 64, 64]} />
        ) : (
          <icosahedronGeometry args={[1, 0]} />
        )}
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={2} 
          chromaticAberration={1} 
          anisotropy={0.3} 
          distortion={distortion} 
          distortionScale={0.5} 
          temporalDistortion={0.4} 
          color={color}
          transmission={1}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
};

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#06120C]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: false }}>
        <color attach="background" args={['#06120C']} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#B9673E" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#173C2A" />
        <spotLight position={[0, 10, 0]} intensity={2} color="#EAE6D9" penumbra={1} />
        
        {/* Floating Abstract Essential Oil Droplets */}
        <LiquidDroplet type="sphere" position={[-3, 2, -2]} scale={1.5} speed={0.2} color="#173C2A" distortion={0.8} />
        <LiquidDroplet type="sphere" position={[4, -1, -5]} scale={2} speed={0.15} color="#28563A" distortion={0.5} />
        <LiquidDroplet type="icosahedron" position={[-4, -3, -4]} scale={1.2} speed={0.3} color="#B9673E" distortion={0.2} />
        <LiquidDroplet type="sphere" position={[2, 4, -6]} scale={2.5} speed={0.1} color="#173C2A" distortion={0.6} />
        <LiquidDroplet type="sphere" position={[0, -2, -2]} scale={1} speed={0.25} color="#B9673E" distortion={0.7} />

        {/* Floating Magic Dust */}
        <Sparkles count={400} scale={15} size={3} speed={0.4} opacity={0.4} color="#EAE6D9" />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
