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
    

    const [purchaseMode, setPurchaseMode] = useState<'smoke' | 'f1' | 'scope'>('smoke');

    const grenadeCost = 8;
    const smokeCost = 5;
    const scopeCost = 300;

    const potF1Count = Math.floor(scrap / grenadeCost);
    const potF1Gp = potF1Count * 15;
    const potF1Metal = potF1Count * 15;

    const potSmokeCount = Math.floor(scrap / smokeCost);
    const potSmokeGp = potSmokeCount * 21; 
    const potSmokeMetal = potSmokeCount * 30;

    const potScopeCount = Math.floor(scrap / scopeCost);
    const potScopeHqm = potScopeCount * 40; 

    // Actual selected yields
    const gunpowder = purchaseMode === 'smoke' ? potSmokeGp : purchaseMode === 'f1' ? potF1Gp : 0;
    const metalFragments = purchaseMode === 'smoke' ? potSmokeMetal : purchaseMode === 'f1' ? potF1Metal : 0;
    const hqMetal = purchaseMode === 'scope' ? potScopeHqm : 0;

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
        purchaseMode,
        setPurchaseMode,
        
        potF1Count,
        potF1Gp,
        potSmokeCount,
        potSmokeGp,
        potScopeCount,
        
        gunpowder,
        metalFragments,
        hqMetal,
        
        c4Count,
        rocketCount,
        satchelCount,
        expAmmoCount,
        grenadeCost,
        scopeCost,
        smokeCost,
        handleScrapInput
    };
};
