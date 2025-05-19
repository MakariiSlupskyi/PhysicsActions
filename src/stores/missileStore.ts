import { create } from 'zustand'
import type { Missile } from '../types/missle';
import { Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';

interface MissileState {
  selectedId: string | undefined;
  missiles: { id: string, data: Missile }[];
  addMissile: (mass: number, pos: Vector3, vel: number, phiDeg: number, alphaDeg: number) => void;
  getMissile: (index: string) => Missile | undefined;
  selectMissile: (index: string) => void;
  updateSelectedData: (partialData: Partial<Missile>) => void
}

const useMissileStore = create<MissileState>()((set, get) => ({
  selectedId: undefined,
  missiles: [],
  addMissile: (mass: number, pos: Vector3, vel: number, phiDeg: number, alphaDeg: number) => set((state) => ({
    missiles: [{ id: uuidv4(), data: { mass, pos, vel, phiDeg, alphaDeg } }, ...state.missiles]
  })),
  getMissile: (id: string) => get().missiles.find(m => m.id === id)?.data,
  selectMissile: (index: string) => set((state) => ({
    selectedId: state.missiles.map((m) => m.id).includes(index) ? index : undefined
  })),
  updateSelectedData: (partialData) => {
    const { missiles, selectedId } = get()
    if (!selectedId) return

    set({
      missiles: missiles.map(m =>
        m.id === selectedId
          ? { ...m, data: { ...m.data, ...partialData } }
          : m
      ),
    })
  },
}))

export default useMissileStore;