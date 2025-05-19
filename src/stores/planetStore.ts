import { create } from 'zustand'

interface PlanetState {
    mass: number;
    speed: number;
    radius: number;
    setMass: (mass: number) => void;
    setSpeed: (speed: number) => void;
    setRadius: (radius: number) => void;
}

const usePlanetStore = create<PlanetState>()((set) => ({
    mass: 10,
    speed: 1,
    radius: 1,
    setMass: (mass: number) => set({ mass }),
    setSpeed: (speed: number) => set({ speed }),
    setRadius: (radius: number) => set({ radius }),
}))

export default usePlanetStore;