import { create } from 'zustand'

interface VisualState {
    wireframe: boolean;
    original: boolean; // Original trajectory
    coriolis: boolean; // Coriolis trajectory
    spin: number;
    setWireframe: (wireframe: boolean) => void;
    setOriginal: (original: boolean) => void;
    setCoriolis: (coriolis: boolean) => void;
    setSpin: (coriolis: number) => void;
}

const useVisualStore = create<VisualState>()((set) => ({
    wireframe: false,
    original: true,
    coriolis: true,
    spin: 0,
    setWireframe: (wireframe: boolean) => set({ wireframe }),
    setOriginal: (original: boolean) => set({ original }),
    setCoriolis: (coriolis: boolean) => set({ coriolis }),
    setSpin: (spin: number) => set({ spin }),
}))

export default useVisualStore;