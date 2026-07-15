import type { BuildingBlock, BuildCost } from '../data/buildingModels';

// Brackets for block count
const BRACKETS = [
    { max: 15, rate: 0.10 },
    { max: 50, rate: 0.15 },
    { max: 125, rate: 0.20 },
    { max: Infinity, rate: 0.333333 }
];

export function getEffectiveTaxRate(count: number): number {
    if (count <= 0) return 0;
    
    let totalTaxedCount = 0;
    let remaining = count;
    let previousMax = 0;

    for (const bracket of BRACKETS) {
        const capacity = bracket.max - previousMax;
        const countInBracket = Math.min(remaining, capacity);
        
        if (countInBracket > 0) {
            totalTaxedCount += countInBracket * bracket.rate;
            remaining -= countInBracket;
        }
        
        previousMax = bracket.max;
        if (remaining <= 0) break;
    }

    return totalTaxedCount / count;
}

export function calculateUpkeep(
    counts: Record<string, number>,
    blocks: BuildingBlock[]
): { initial: BuildCost; upkeep: BuildCost; totalBlocks: number } {
    const initial: BuildCost = { wood: 0, stone: 0, metalFrags: 0, hqm: 0, gears: 0 };
    
    let totalBlocks = 0;
    
    // Sum initial cost and count building blocks
    for (const block of blocks) {
        const count = counts[block.id] || 0;
        if (count <= 0) continue;

        initial.wood += block.cost.wood * count;
        initial.stone += block.cost.stone * count;
        initial.metalFrags += block.cost.metalFrags * count;
        initial.hqm += block.cost.hqm * count;
        if (block.cost.gears) {
            initial.gears = (initial.gears || 0) + block.cost.gears * count;
        }

        if (block.shape !== 'door') {
            totalBlocks += count;
        }
    }

    const effectiveBlockRate = getEffectiveTaxRate(totalBlocks);
    
    const upkeep: BuildCost = { wood: 0, stone: 0, metalFrags: 0, hqm: 0, gears: 0 };

    for (const block of blocks) {
        const count = counts[block.id] || 0;
        if (count <= 0) continue;

        // Doors use a separate bracket in Rust, but practically for a small number of doors, it's 10%.
        const rate = block.shape === 'door' ? 0.10 : effectiveBlockRate; 

        upkeep.wood += block.cost.wood * count * rate;
        upkeep.stone += block.cost.stone * count * rate;
        upkeep.metalFrags += block.cost.metalFrags * count * rate;
        upkeep.hqm += block.cost.hqm * count * rate;
    }

    // Round up upkeep values as Rust does
    upkeep.wood = Math.ceil(upkeep.wood);
    upkeep.stone = Math.ceil(upkeep.stone);
    upkeep.metalFrags = Math.ceil(upkeep.metalFrags);
    upkeep.hqm = Math.ceil(upkeep.hqm);

    return { initial, upkeep, totalBlocks };
}
