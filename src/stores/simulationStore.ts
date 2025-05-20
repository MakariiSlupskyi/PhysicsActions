import { create } from 'zustand'

interface SimulationState {
    steps: number;
    setSteps: (speed: number) => void;
}

const useSimulationStore = create<SimulationState>()((set) => ({
    steps: 100,
    setSteps: (steps: number) => set({ steps }),
}))

export default useSimulationStore;