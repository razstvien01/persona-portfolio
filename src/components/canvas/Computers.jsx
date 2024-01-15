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

const Computers = ({ isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={1.5} groundColor={"black"} />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene} 
        scale={isMobile ? 0.7 : 0.75 }
        position={isMobile ? [0, -3, -2.2] :[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    //* add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)')
    
    //* set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches)
    
    //* Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }
    
    //* add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange)
  
    //* remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])
  
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
        <Computers isMobile={isMobile}/>
      </Suspense>
      
      <Preload all/>
    </Canvas>
  )
}

export default ComputerCanvas;
