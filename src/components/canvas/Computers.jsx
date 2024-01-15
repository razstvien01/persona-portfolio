import { 
  Suspense, //* allow us to have a loader while the model is loading
  useEffect, 
  useState } from "react";
import {
  Canvas, //* just an empty canvas allowing to place something on it
} from "@react-three/fiber";

//* helpers to draw canvas
import {
  OrbitControls,
  Preload,
  useGLTF, //* allow us to import 3D models
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor={"black"} />
      <pointLight intensity={1} />
      <primitive 
        object={computer.scene} 
        scale={0.75}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{
        position: [20, 3, 5],
        fov: 25 //* field of view, how wide
      }}
      gl={{
        preserveDrawingBuffer: true
      }}
    >
      <Suspense fallback={<CanvasLoader/>}>
        
        {/* //* allow to move the model left and right */}
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2} //* ONLY rotate right and left specific angle
        /> 
        <Computers/>
      </Suspense>
      
      <Preload all/>
    </Canvas>
  )
}

export default ComputerCanvas;
