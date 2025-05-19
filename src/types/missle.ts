import * as THREE from 'three';

export interface Missile {
  mass: number;
  pos: THREE.Vector3;
  vel: number;
  phiDeg: number;
  alphaDeg: number;
}