import { useState, useMemo, useEffect, useCallback } from 'react';
import { BuildingBlocks } from '../../data/buildingModels';
import type { PlacedBlock } from '../../data/buildingModels';
import { calculateUpkeep } from '../../utils/upkeepCalculator';
import { audio } from '../../utils/audio';

export const useBuilder = () => {
    const [placedBlocks, setPlacedBlocks] = useState<PlacedBlock[]>(() => {
        const saved = localStorage.getItem('rust_builder_save');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved builder blueprint", e);
            }
        }
        return [];
    });
    const [activeMaterial, setActiveMaterial] = useState<string>("wood");
    const [activeShape, setActiveShape] = useState<string>("foundation"); // 'foundation', 'wall', 'floor', 'triangle_foundation', 'triangle_floor', 'half_wall', 'low_wall', 'doorway'
    const [isRadialOpen, setIsRadialOpen] = useState(false);
    const [radialPosition, setRadialPosition] = useState({ x: 0, y: 0 });

    // Derive activeBlockId from material and shape
    const activeBlockId = useMemo(() => {
        if (activeShape === 'door') return `door_${activeMaterial === 'misc' ? 'wood' : activeMaterial}`; // fallback mapping
        
        let shapeSuffix = 'full';
        if (activeShape.includes('triangle')) shapeSuffix = 'triangle';
        if (activeShape.includes('half')) shapeSuffix = 'half';
        if (activeShape.includes('low')) shapeSuffix = 'low';
        
        return `${activeMaterial}_${shapeSuffix}`;
    }, [activeMaterial, activeShape]);

    // Auto-save to localStorage whenever placedBlocks changes
    useEffect(() => {
        localStorage.setItem('rust_builder_save', JSON.stringify(placedBlocks));
    }, [placedBlocks]);

    const handleAddBlock = useCallback((blockId: string, blockType: string, position: [number, number, number], rotation: [number, number, number] = [0, 0, 0]) => {
        audio.playClick();
        setPlacedBlocks(prev => [
            ...prev,
            {
                uid: Math.random().toString(36).substring(2, 9),
                blockId,
                blockType: blockType as any,
                position,
                rotation
            }
        ]);
    }, []);

    const handleRemoveBlock = (uid: string) => {
        audio.playClick();
        setPlacedBlocks(prev => prev.filter(b => b.uid !== uid));
    };

    const handleClear = () => {
        audio.playClick();
        if (confirm('确定要拆毁所有建筑吗？')) {
            setPlacedBlocks([]);
        }
    };

    // Derived counts for Upkeep Calculator
    const counts = useMemo(() => {
        const c: Record<string, number> = {};
        for (const b of placedBlocks) {
            c[b.blockId] = (c[b.blockId] || 0) + 1;
        }
        return c;
    }, [placedBlocks]);

    const { initial, upkeep, totalBlocks } = useMemo(() => {
        return calculateUpkeep(counts, BuildingBlocks);
    }, [counts]);

    return {
        placedBlocks,
        activeMaterial,
        setActiveMaterial,
        activeShape,
        setActiveShape,
        activeBlockId,
        isRadialOpen,
        setIsRadialOpen,
        radialPosition,
        setRadialPosition,
        handleAddBlock,
        handleRemoveBlock,
        handleClear,
        counts,
        initial,
        upkeep,
        totalBlocks
    };
};
