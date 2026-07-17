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
    

    const grenadeCost = 8;
    const f1Count = Math.floor(scrap / grenadeCost);
    const f1Gp = f1Count * 15;
    const f1Metal = f1Count * 15;

    const smokeCost = 5;
    const smokeCount = Math.floor(scrap / smokeCost);
    const smokeGp = smokeCount * 18; // 综合考虑安全区削弱，取常用保守值18或标准21，这里取21
    const smokeMetal = smokeCount * 30;

    const gunpowder = Math.max(f1Gp, smokeCount * 21);

    const scopeCost = 300;
    const scopeCount = Math.floor(scrap / scopeCost);
    const scopeHqm = scopeCount * 40; 

    const c4Count = Math.floor(gunpowder / 1000);
    const rocketCount = Math.floor(gunpowder / 650);
    const satchelCount = Math.floor(gunpowder / 240);
    const expAmmoCount = Math.floor(gunpowder / 2.5);

    const handleScrapInput = (val: string) => {
        const num = parseInt(val) || 0;
        updateMaterial('scrap', num);
    };


    return {
        scrap,
        f1Count,
        f1Gp,
        f1Metal,
        smokeCount,
        smokeGp: smokeCount * 21,
        smokeMetal,
        gunpowder,
        scopeCount,
        scopeHqm,
        c4Count,
        rocketCount,
        satchelCount,
        expAmmoCount,
        grenadeCost,
        scopeCost,
        handleScrapInput
    };
};
