import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HoverEffect = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3;
      meshRef.current.rotation.y = Math.cos(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <MeshDistortMaterial
        color="#4c1d95"
        speed={5}
        distort={0.3}
        opacity={0.3}
        transparent
      />
    </mesh>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  index: number;
}

const ProjectCard = ({ title, description, image, github, demo, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="relative group bg-gray-900 rounded-xl overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Canvas>
          <ambientLight intensity={0.5} />
          <HoverEffect />
        </Canvas>
      </div>

      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>
      
      <div className="relative p-6 z-10">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold text-white mb-2"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-4"
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-4"
        >
          {github && (
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-400 transition-colors duration-300"
            >
              <Github size={20} />
            </motion.a>
          )}
          {demo && (
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-400 transition-colors duration-300"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;