import { Canvas, type ThreeEvent } from "@react-three/fiber"
import { OrbitControls, Stars } from '@react-three/drei';
import { Vector3 } from "three";

import Lignting from "./components/Lighting";
import NightSkyBG from "./components/NightSkyBG";
import Menu from "./components/Menu";
import useMissileStore from "../../stores/missileStore";
import MissileMarker from "./components/MIssileMarker";
import Planet from "./components/Planet";

const Coriolis = () => {
  const { missiles } = useMissileStore();

  return (
    <div className="h-screen">
      <NightSkyBG />
      <Canvas className="bg-transparent">
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Lignting />
      
        <Planet />

         {missiles.map((m) => (
          <MissileMarker
            key={m.id}
            id={m.id}            
          />
        ))}

        <OrbitControls enablePan={false} />
      </Canvas>
      <Menu />
    </div>
  )
}

export default Coriolis