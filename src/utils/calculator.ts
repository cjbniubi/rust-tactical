import type { TargetItem, ExplosiveCost } from '../data/models';
import { ExplosiveTypes } from '../data/models';

export type RaidMode = 'eco' | 'c4' | 'rocket' | 'satchel' | 'expAmmo';
export type CraftingStrategy = 'balanced' | 'maxC4' | 'maxRocket' | 'maxSatchel' | 'maxExpAmmo';

export interface SimulatorTotals {
    c4: number;
    rocket: number;
    satchel: number;
    expAmmo: number;
    sulfur: number;
    charcoal: number;
}

export const calculateSimulatorTotals = (targetCounts: Record<string, number>, mode: RaidMode, targets: TargetItem[]): SimulatorTotals => {
    let c4 = 0;
    let rocket = 0;
    let satchel = 0;
    let expAmmo = 0;

    for (const target of targets) {
        const count = targetCounts[target.id] || 0;
        if (count > 0) {
            switch (mode) {
                case 'c4': c4 += target.c4 * count; break;
                case 'rocket': rocket += target.rocket * count; break;
                case 'satchel': satchel += target.satchel * count; break;
                case 'expAmmo': expAmmo += target.expAmmo * count; break;
                case 'eco':
                    c4 += target.ecoMix.c4 * count;
                    rocket += target.ecoMix.rocket * count;
                    satchel += target.ecoMix.satchel * count;
                    expAmmo += target.ecoMix.expAmmo * count;
                    break;
            }
        }
    }

    const sulfur = (c4 * ExplosiveTypes.c4.sulfur) +
                   (rocket * ExplosiveTypes.rocket.sulfur) +
                   (satchel * ExplosiveTypes.satchel.sulfur) +
                   (expAmmo * ExplosiveTypes.expAmmo.sulfur);

    const charcoal = (c4 * ExplosiveTypes.c4.charcoal) +
                     (rocket * ExplosiveTypes.rocket.charcoal) +
                     (satchel * ExplosiveTypes.satchel.charcoal) +
                     (expAmmo * ExplosiveTypes.expAmmo.charcoal);

    return { c4, rocket, satchel, expAmmo, sulfur, charcoal };
};

export interface BudgetInventory {
    c4: number;
    rocket: number;
    satchel: number;
    expAmmo: number;
    remaining: number;
}

export const calculateBudgetInventory = (totalSulfur: number, strategy: CraftingStrategy): BudgetInventory => {
    if (totalSulfur <= 0) return { c4: 0, rocket: 0, satchel: 0, expAmmo: 0, remaining: 0 };
    
    let remaining = totalSulfur;
    let c4 = 0, rocket = 0, satchel = 0, expAmmo = 0;

    switch (strategy) {
        case 'maxC4':
            c4 = Math.floor(remaining / ExplosiveTypes.c4.sulfur);
            remaining %= ExplosiveTypes.c4.sulfur;
            break;
        case 'maxRocket':
            rocket = Math.floor(remaining / ExplosiveTypes.rocket.sulfur);
            remaining %= ExplosiveTypes.rocket.sulfur;
            break;
        case 'maxSatchel':
            satchel = Math.floor(remaining / ExplosiveTypes.satchel.sulfur);
            remaining %= ExplosiveTypes.satchel.sulfur;
            break;
        case 'maxExpAmmo':
            expAmmo = Math.floor(remaining / ExplosiveTypes.expAmmo.sulfur);
            remaining %= ExplosiveTypes.expAmmo.sulfur;
            break;
        case 'balanced':
            const comboCount = Math.floor(remaining / 5000);
            c4 = comboCount * 1;
            rocket = comboCount * 2;
            remaining -= comboCount * 5000;
            
            const extraRockets = Math.floor(remaining / ExplosiveTypes.rocket.sulfur);
            rocket += extraRockets;
            remaining -= extraRockets * ExplosiveTypes.rocket.sulfur;
            
            const extraC4 = Math.floor(remaining / ExplosiveTypes.c4.sulfur);
            c4 += extraC4;
            remaining -= extraC4 * ExplosiveTypes.c4.sulfur;
            
            const extraSatchel = Math.floor(remaining / ExplosiveTypes.satchel.sulfur);
            satchel += extraSatchel;
            remaining -= extraSatchel * ExplosiveTypes.satchel.sulfur;
            
            expAmmo = Math.floor(remaining / ExplosiveTypes.expAmmo.sulfur);
            remaining %= ExplosiveTypes.expAmmo.sulfur;
            break;
    }

    return { c4, rocket, satchel, expAmmo, remaining };
};

export const calculateMaxDestroyable = (target: TargetItem, inv: BudgetInventory): number => {
    let { c4, rocket, satchel, expAmmo } = inv;
    let count = 0;
    
    while (true) {
        const eco = target.ecoMix;
        if ((eco.c4 > 0 || eco.rocket > 0 || eco.satchel > 0 || eco.expAmmo > 0) &&
            c4 >= eco.c4 && rocket >= eco.rocket && satchel >= eco.satchel && expAmmo >= eco.expAmmo) {
            c4 -= eco.c4;
            rocket -= eco.rocket;
            satchel -= eco.satchel;
            expAmmo -= eco.expAmmo;
            count++;
            continue;
        }
        
        if (target.c4 > 0 && c4 >= target.c4) {
            c4 -= target.c4;
            count++;
            continue;
        }
        
        if (target.rocket > 0 && rocket >= target.rocket) {
            rocket -= target.rocket;
            count++;
            continue;
        }
        
        if (target.satchel > 0 && satchel >= target.satchel) {
            satchel -= target.satchel;
            count++;
            continue;
        }
        
        if (target.expAmmo > 0 && expAmmo >= target.expAmmo) {
            expAmmo -= target.expAmmo;
            count++;
            continue;
        }
        
        break;
    }
    
    return count;
};

export const calculateMaterialsRequired = (inv: BudgetInventory): ExplosiveCost => {
    const calc = (key: keyof Omit<ExplosiveCost, 'customImgName'>) => (
        inv.c4 * (ExplosiveTypes.c4[key] as number) +
        inv.rocket * (ExplosiveTypes.rocket[key] as number) +
        inv.satchel * (ExplosiveTypes.satchel[key] as number) +
        inv.expAmmo * (ExplosiveTypes.expAmmo[key] as number)
    );

    return {
        sulfur: calc('sulfur'),
        charcoal: calc('charcoal'),
        metalFrags: calc('metalFrags'),
        lgf: calc('lgf'),
        cloth: calc('cloth'),
        techTrash: calc('techTrash'),
        pipes: calc('pipes'),
        rope: calc('rope')
    };
};
