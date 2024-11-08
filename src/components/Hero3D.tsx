import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshDistortMaterial>(null);

  useFrame(({ clock, mouse }) => {
    if (sphereRef.current && materialRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      
      // Interactive distortion based on mouse position
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        Math.abs(mouse.x * mouse.y) * 0.8 + 0.2,
        0.1
      );
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <Sphere args={[1, 100, 200]} ref={sphereRef} scale={2.4}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#4c1d95"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8b5cf6"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0a0a']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 1, 1]} intensity={1.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <Stars
          radius={50}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <AnimatedSphere />
        <FloatingParticles />
        
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <fog attach="fog" args={['#0a0a0a', 5, 15]} />
      </Canvas>
    </div>
  );
};

export default Hero3D;