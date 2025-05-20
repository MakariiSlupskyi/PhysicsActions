import { create } from 'zustand'
import { Vector3 } from 'three';

interface PlanetState {
  mass: number;
  speed: number;
  radius: number;
  setMass: (mass: number) => void;
  setSpeed: (speed: number) => void;
  setRadius: (radius: number) => void;
  getGGrav: () => number;
  getAngularVelocity: () => Vector3;
}

const usePlanetStore = create<PlanetState>()((set, get) => ({
  mass: 10,
  speed: 1,
  radius: 1,
  setMass: (mass: number) => set({ mass }),
  setSpeed: (speed: number) => set({ speed }),
  setRadius: (radius: number) => set({ radius }),
  getGGrav: () => {
    const { mass, radius } = get();
    const G = 1;//6.67430e-11; 
    return mass * G / (radius * radius);
  },
  getAngularVelocity: () => {
    const { speed } = get();
    const omegaMagnitude = (2 * Math.PI) / speed;
    return new Vector3(0, omegaMagnitude, 0);
  },
}))

export default usePlanetStore;