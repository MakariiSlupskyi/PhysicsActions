import useMissileStore from "@/stores/missileStore";
import usePlanetStore from "@/stores/planetStore";
import useSimulationStore from "@/stores/simulationStore";
import { Line } from "@react-three/drei"
import * as THREE from 'three';

const Trajectory = ({ id }: { id: string }) => {
  const missile = useMissileStore((s) => s.missiles.find(i => i.id === id));

  if (!missile) return <div>An error getting missle</div>

  let direction = getDirection(missile.data.pos, missile.data.phiDeg, missile.data.alphaDeg);

  const trajectory = computeTrajectoryPoints(missile.data.pos, direction.clone().multiplyScalar(missile.data.vel));
  const coriolisTrajectory = computeCoriolisTrajectoryPoints(missile.data.pos, direction.clone().multiplyScalar(missile.data.vel));


  return <>
    <Line
      points={[missile.data.pos, missile.data.pos.clone().add(direction.multiplyScalar(0.1))]} 
      color="cyan"
      lineWidth={4}
    />

    <Line
      points={trajectory}
      color="cyan"
      lineWidth={1}
    />
    
    <Line
      points={coriolisTrajectory}
      color="yellow"
      lineWidth={1}
    />
  </>
}

function getDirection(pos: THREE.Vector3, phiDeg: number, alphaDeg: number) {
  const phi = THREE.MathUtils.degToRad(phiDeg);
  const alpha = THREE.MathUtils.degToRad(alphaDeg);

  const N = pos.clone().normalize(); // normal at point

  // Choose a vector not parallel to N
  const U = Math.abs(N.dot(new THREE.Vector3(0, 1, 0))) < 0.99
    ? new THREE.Vector3(0, 1, 0)
    : new THREE.Vector3(1, 0, 0);

  // Tangent basis vectors
  const T1 = new THREE.Vector3().crossVectors(U, N).normalize();
  const T2 = new THREE.Vector3().crossVectors(N, T1).normalize();

  // Tangent vector at phi angle
  const T_phi = T1.clone().multiplyScalar(Math.cos(phi))
    .add(T2.clone().multiplyScalar(Math.sin(phi)));

  // Final direction vector
  const direction = T_phi.clone().multiplyScalar(Math.cos(alpha))
    .add(N.clone().multiplyScalar(Math.sin(alpha)))
    .normalize();

  return direction;
}

function computeTrajectoryPoints(
  startPos: THREE.Vector3,
  startVel: THREE.Vector3,
  dt: number = 1 / 60
): THREE.Vector3[] {
  const { steps } = useSimulationStore();
  const { getGGrav } = usePlanetStore()

  const positions: THREE.Vector3[] = [];

  let pos = startPos.clone();
  let vel = startVel.clone();

  for (let i = 0; i < steps; i++) {
    
    positions.push(pos.clone());
    
    const r = pos.length();
    const gravityDir = pos.clone().normalize().negate(); // direction toward origin
    const gravityMagnitude = getGGrav() / (r * r);
    const gravityAccel = gravityDir.multiplyScalar(gravityMagnitude);
    
    // Euler integration
    vel.add(gravityAccel.multiplyScalar(dt));
    pos.add(vel.clone().multiplyScalar(dt));
    
    if (pos.length() < 1) break;
  }

  return positions;
}

function computeCoriolisTrajectoryPoints(
  startPos: THREE.Vector3,
  startVel: THREE.Vector3,
  dt: number = 1 / 60
): THREE.Vector3[] {
  const { steps } = useSimulationStore();
  const { speed, getGGrav, getAngularVelocity } = usePlanetStore()

  const positions: THREE.Vector3[] = [];

  // Initial position and velocity
  const pos = startPos.clone();
  const velocity = startVel.clone(); // initial velocity

  let currentPos = pos.clone();
  let currentVel = velocity.clone();

  for (let i = 0; i < steps; i++) {
    positions.push(currentPos.clone());

    const r = currentPos.length();

    // Gravitational acceleration (toward origin)
    const gravityDir = currentPos.clone().normalize().negate(); // direction toward origin
    const gravityMagnitude = getGGrav() / (r * r);
    const gravityAccel = gravityDir.multiplyScalar(gravityMagnitude);

    // Coriolis acceleration: -2 * omega x v
    const coriolisAccel = new THREE.Vector3().copy(currentVel)
      .cross(new THREE.Vector3(0, speed, 0))
      .multiplyScalar(-2);

    // Total acceleration
    const totalAccel = gravityAccel.add(coriolisAccel);

    // Euler integration
    currentVel.add(totalAccel.multiplyScalar(dt));
    currentPos.add(currentVel.clone().multiplyScalar(dt));
    
    if (currentPos.length() < 1) break;
  }

  return positions;
}


export default Trajectory;