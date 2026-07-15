import { useState, useEffect } from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';

export const useScrap = () => {
    const store = useInventoryStore();
    const [hydrated, setHydrated] = useState(false);
    
    useEffect(() => {
        setHydrated(true);
    }, []);

    const scrap = hydrated ? store.scrap : 0;
    const updateMaterial = store.updateMaterial;
    
    const [gpInput, setGpInput] = useState<string>('');

    const grenadeCost = 8;
    const f1Count = Math.floor(scrap / grenadeCost);
    const gunpowder = f1Count * 15;
    const f1Metal = f1Count * 15;

    const scopeCost = 300;
    const scopeCount = Math.floor(scrap / scopeCost);
    const scopeHqm = scopeCount * 40; 

    const gpAmount = parseInt(gpInput) || 0;
    const c4Count = Math.floor(gpAmount / 1000);
    const rocketCount = Math.floor(gpAmount / 650);
    const satchelCount = Math.floor(gpAmount / 240);
    const expAmmoCount = Math.floor(gpAmount / 2.5);

    const handleScrapInput = (val: string) => {
        const num = parseInt(val) || 0;
        updateMaterial('scrap', num);
    };

    const handleGpInput = (val: string) => {
        setGpInput(val);
    };

    return {
        scrap,
        gpInput,
        f1Count,
        gunpowder,
        f1Metal,
        scopeCount,
        scopeHqm,
        c4Count,
        rocketCount,
        satchelCount,
        expAmmoCount,
        grenadeCost,
        scopeCost,
        handleScrapInput,
        handleGpInput
    };
};
