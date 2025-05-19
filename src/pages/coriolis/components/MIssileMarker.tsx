import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3, Mesh } from 'three';
import useMissileStore from "../../../stores/missileStore";
// import { Missile } from "../../../types/missle";

const G = 6.67430e-11;
const EARTH_MASS = 5.972e24;
const EARTH_RADIUS = 6.371e6;
const OMEGA = new Vector3(0, 0, 7.2921159e-5);

const MissileMarker = ({ id }: { id: string }) => {
  const { getMissile, selectMissile, selectedId } = useMissileStore(); 
   
  const [mass, setMass] = useState<number>(-1);
  const [pos, setPos] = useState<Vector3>(() => new Vector3(0, 0, 0));
  const [vel, setVel] = useState<number>(0);
  const ref = useRef<Mesh>(null);
  
  useEffect(() => {
    const missileData = getMissile(id);
    // console.log(missileData);
    if (missileData) {
      setMass(missileData.mass);
      setPos(missileData.pos);
      setVel(missileData.vel);
    }    
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Move
      const rMag = pos.length();

      const Fg = pos.clone().multiplyScalar(-100 / Math.pow(rMag, 2));

      // setVel(v => v.clone().add(Fg.multiplyScalar(0.1)));
      // setPos(p => p.clone().add(vel.clone().multiplyScalar(0.1)));
      ref.current?.position.copy(pos.clone());

      
      // Pulse
      const t = clock.getElapsedTime();
      const scale = 0.1 + 0.02 * Math.sin(t * 2) + (selectedId === id ? 0.1 : 0);
      const opacity = 0.7 + 0.3 * Math.sin(t * 2);
      
      ref.current.scale.set(scale, scale, scale);
      const material = ref.current.material;
      if (material && !Array.isArray(material) && 'opacity' in material) {
        material.transparent = true;
        material.opacity = opacity;
       }
    }
  })

  return (
    <mesh
      ref={ref}
      onPointerDown={() => {selectMissile(id)}}
    >
      <sphereGeometry args={[0.4, 64, 64]}  />
      <meshStandardMaterial color="#e6c629" transparent />
    </mesh>
  );
}

export default MissileMarker;