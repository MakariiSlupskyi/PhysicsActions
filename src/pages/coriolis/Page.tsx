import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from '@react-three/drei';
import { Group } from "three";

import Lignting from "./components/Lighting";
import NightSkyBG from "./components/NightSkyBG";
import Menu from "./components/Menu";
import useMissileStore from "../../stores/missileStore";
import MissileMarker from "./components/MIssileMarker";
import Planet from "./components/Planet";
import useVisualStore from "@/stores/visualStore";
import { useRef } from "react";

const Coriolis = () => {
  const { missiles } = useMissileStore();

  return (
    <div className="h-screen">
      <NightSkyBG />
      <Canvas className="bg-transparent">
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Lignting />
      
        <RotatingGroup>
          <Planet />
          {missiles.map((m) => (
            <MissileMarker key={m.id} id={m.id} />
          ))}
        </RotatingGroup>

        <OrbitControls enablePan={false} />
      </Canvas>
      <Menu />
    </div>
  )
}

const RotatingGroup = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<Group>(null)
  const spin = useVisualStore((s) => s.spin)

  useFrame((_, delta) => {
    if (spin && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  return <group ref={groupRef}>{children}</group>
}

export default Coriolis