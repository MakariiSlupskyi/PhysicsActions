import useMissileStore from "../../../stores/missileStore";
import type { ThreeEvent } from "@react-three/fiber";

const Planet = () => {
  const { addMissile } = useMissileStore();

  const handleOnPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!event.ctrlKey) return;
    addMissile(1, event.point.clone(), 1, 10, 0);
  }

  return (
    <mesh
      onPointerDown={(e) => handleOnPointerDown(e)}
      >
      <sphereGeometry args={[1, 124, 124]} />
      <meshPhysicalMaterial
        transmission={0.8}
        thickness={0.5} 
        color="#5e4875"
      />
    </mesh>
  );
}

export default Planet;