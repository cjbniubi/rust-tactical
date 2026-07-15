import { useState, useMemo } from 'react';
import { RaidTargets } from '../../data/models';
import { calculateSimulatorTotals, calculateMaterialsRequired } from '../../utils/calculator';
import type { RaidMode } from '../../utils/calculator';
import { audio } from '../../utils/audio';

export const useSimulator = () => {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [mode, setMode] = useState<RaidMode>('eco');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleUpdate = (id: string, delta: number) => {
        if (delta > 0) audio.playClick();
        setCounts(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }));
    };

    const handleClear = () => {
        audio.playClick();
        setCounts({});
    };

    const totals = useMemo(() => calculateSimulatorTotals(counts, mode, RaidTargets), [counts, mode]);
    const fullMaterials = useMemo(() => calculateMaterialsRequired({
        c4: totals.c4,
        rocket: totals.rocket,
        satchel: totals.satchel,
        expAmmo: totals.expAmmo,
        remaining: 0
    }), [totals]);

    return {
        counts,
        setCounts,
        mode,
        setMode,
        isCartOpen,
        setIsCartOpen,
        handleUpdate,
        handleClear,
        totals,
        fullMaterials
    };
};
