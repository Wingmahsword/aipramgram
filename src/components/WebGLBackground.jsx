import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import bgVideo from '../assets/bg-animation.mp4';

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;

  void main() {
    vec2 uv = vUv;
    
    // Smooth Mouse displacement
    float d = length(uv - (uMouse * 0.5 + 0.5));
    float strength = smoothstep(0.4, 0.0, d);
    uv += (uv - (uMouse * 0.5 + 0.5)) * strength * 0.08;

    // Sample video
    vec4 tex = texture2D(uTexture, uv);
    
    // Deep Contrast Grayscale for Dark Mode
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    
    // Create a "Neon/Electric" pulse effect
    float glow = sin(gray * 10.0 + uTime * 2.0) * 0.1;
    
    // Invert and tint for Slate/Indigo background integration
    vec3 color = vec3(0.38, 0.45, 0.94); // Indigo tint (#6366F1)
    vec3 finalColor = color * gray * 1.5 + glow;
    
    gl_FragColor = vec4(finalColor, 0.08); // Ultra-low alpha for atmospheric layering
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Scene() {
  const meshRef = useRef();
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  const texture = useVideoTexture(bgVideo, {
    unsuspended: 'canplay',
    muted: true,
    loop: true,
    start: true
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: texture }
  }), [texture]);

  useFrame((state) => {
    const { clock, mouse: stateMouse } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    mouse.current.lerp(stateMouse, 0.05);
    uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh ref={meshRef} scale={[2.5, 2.5, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      <div className="atmospheric-glow" />
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
