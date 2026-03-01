"use client";

import { useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface PushUpTube3DProps {
  textureUrl: string | null;
  rotation: { x: number; y: number; z: number };
  textureOffset?: number;
  tubeColor?: string;
}

export interface PushUpTube3DRef {
  captureScreenshot: () => string | null;
}

// Store gl reference for screenshot
let glRef: THREE.WebGLRenderer | null = null;

function SceneCapture() {
  const { gl } = useThree();
  glRef = gl;
  return null;
}

const LID_COLOR = "#1a1a1a";

function TubeModel({ textureUrl, rotation, textureOffset = 0, tubeColor = "#1a1a1a" }: PushUpTube3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Physical dimensions: 50mm diameter (25mm radius), 220mm height
  const tubeRadius = 0.025;
  const tubeHeight = 0.22;
  const capHeight = 0.0015;
  const strawRadius = 0.0055;
  const strawHeight = 0.23;

  // Load texture using useMemo
  const texture = useMemo(() => {
    if (!textureUrl) return null;
    
    const loader = new THREE.TextureLoader();
    const tex = loader.load(textureUrl, (loadedTex) => {
      loadedTex.needsUpdate = true;
    });
    
    // Critical texture settings for cylinder wrapping
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
    tex.flipY = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    
    return tex;
  }, [textureUrl]);

  // Update texture offset when slider changes
  useMemo(() => {
    if (texture) {
      // Convert percentage (0-100) to UV offset (0-1)
      texture.offset.x = textureOffset / 100;
      texture.needsUpdate = true;
    }
  }, [texture, textureOffset]);

  // Apply rotation from sliders
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.degToRad(rotation.x);
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(rotation.y);
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(rotation.z);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main tube - closed solid cylinder with texture on outside */}
      {/* Rotate so texture seam is behind the straw (at X-positive) */}
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 128, 1, false]} />
        <meshStandardMaterial 
          map={texture}
          color={texture ? "#ffffff" : tubeColor}
          side={THREE.FrontSide}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Top cap */}
      <group position={[0, tubeHeight / 2, 0]}>
        <mesh position={[0, capHeight / 2, 0]}>
          <cylinderGeometry args={[tubeRadius, tubeRadius, capHeight, 64]} />
          <meshStandardMaterial color={LID_COLOR} roughness={0.6} />
        </mesh>
        <mesh position={[0, capHeight, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[tubeRadius, 64]} />
          <meshStandardMaterial color={LID_COLOR} roughness={0.5} />
        </mesh>
      </group>

      {/* Bottom cap */}
      <group position={[0, -tubeHeight / 2, 0]}>
        <mesh position={[0, -capHeight / 2, 0]}>
          <cylinderGeometry args={[tubeRadius, tubeRadius, capHeight, 64]} />
          <meshStandardMaterial color={LID_COLOR} roughness={0.6} />
        </mesh>
        <mesh position={[0, -capHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[tubeRadius, 64]} />
          <meshStandardMaterial color={LID_COLOR} roughness={0.5} />
        </mesh>
      </group>

      {/* Transparent straw - 3mm from tube edge, 23cm height */}
      <group position={[tubeRadius + 0.003 + strawRadius, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[strawRadius, strawRadius, strawHeight, 32]} />
          <meshPhysicalMaterial 
            color="#e8e8e8"
            transparent
            opacity={0.55}
            roughness={0.15}
            transmission={0.5}
            thickness={1}
            clearcoat={0.3}
          />
        </mesh>
        
        {/* Top stopper - at end of straw (23cm / 2) */}
        <group position={[0, strawHeight / 2 + 0.0005, 0]}>
          {/* Visible cap part - 1mm height, full straw diameter */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[strawRadius, strawRadius, 0.001, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          {/* Inner plug part - 5mm height, slightly smaller */}
          <mesh position={[0, -0.003, 0]}>
            <cylinderGeometry args={[strawRadius * 0.85, strawRadius * 0.85, 0.005, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
        </group>

        {/* Bottom stopper - at end of straw (-23cm / 2) */}
        <group position={[0, -strawHeight / 2 - 0.0005, 0]}>
          {/* Visible cap part - 1mm height, full straw diameter */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[strawRadius, strawRadius, 0.001, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          {/* Inner plug part - 5mm height, slightly smaller */}
          <mesh position={[0, 0.003, 0]}>
            <cylinderGeometry args={[strawRadius * 0.85, strawRadius * 0.85, 0.005, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export const PushUpTube3D = forwardRef<PushUpTube3DRef, PushUpTube3DProps>(
  function PushUpTube3D(props, ref) {
    useImperativeHandle(ref, () => ({
      captureScreenshot: () => {
        if (glRef) {
          return glRef.domElement.toDataURL("image/png");
        }
        return null;
      },
    }));

    return (
      <div style={{ width: "100%", height: "100%", position: "relative", minHeight: 200 }}>
        <Canvas
          camera={{ position: [0.2, 0.03, 0.32], fov: 45 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          resize={{ debounce: 0 }}
          frameloop="always"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          onCreated={({ gl, size }) => {
            if (size.width === 0 || size.height === 0) {
              const parent = gl.domElement.parentElement;
              if (parent) {
                const rect = parent.getBoundingClientRect();
                gl.setSize(rect.width, rect.height);
              }
            }
          }}
        >
          <SceneCapture />
          <color attach="background" args={["#f5f5f5"]} />
          
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.6} />
          <directionalLight position={[0, -3, 5]} intensity={0.3} />
          <pointLight position={[0, 3, 3]} intensity={0.5} />
          <hemisphereLight args={["#ffffff", "#444444", 0.6]} />
          
          <TubeModel {...props} />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.25}
            maxDistance={0.6}
          />
        </Canvas>
      </div>
    );
  }
);
