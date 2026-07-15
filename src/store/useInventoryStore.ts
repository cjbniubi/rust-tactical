import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InventoryState {
    scrap: number;
    sulfur: number;
    gunpowder: number;
    metalFragments: number;
    highQualityMetal: number;
    updateMaterial: (material: keyof Omit<InventoryState, 'updateMaterial' | 'reset'>, amount: number) => void;
    reset: () => void;
}

export const useInventoryStore = create<InventoryState>()(
    persist(
        (set) => ({
            scrap: 0,
            sulfur: 0,
            gunpowder: 0,
            metalFragments: 0,
            highQualityMetal: 0,
            updateMaterial: (material, amount) => set((state) => ({ ...state, [material]: amount })),
            reset: () => set({ scrap: 0, sulfur: 0, gunpowder: 0, metalFragments: 0, highQualityMetal: 0 })
        }),
        {
            name: 'rust-calc-inventory'
        }
    )
);
