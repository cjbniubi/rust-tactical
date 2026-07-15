import { useState } from 'react';
import { calculateBudgetInventory, calculateMaterialsRequired } from '../../utils/calculator';
import type { CraftingStrategy } from '../../utils/calculator';

export const useBudget = () => {
    const [sulfur, setSulfur] = useState<string>('');
    const [strategy, setStrategy] = useState<CraftingStrategy>('balanced');

    const amount = parseInt(sulfur) || 0;
    const inv = calculateBudgetInventory(amount, strategy);
    const materials = calculateMaterialsRequired(inv);

    return {
        sulfur,
        setSulfur,
        strategy,
        setStrategy,
        amount,
        inv,
        materials
    };
};
