"use client";

import type { BuildingBlock } from '../../data/buildingModels';
import { Minus, Plus, Crosshair } from 'lucide-react';
import { IconMap } from '../Simulator/Shared';

export const BlockCard = ({ block, count, onUpdate }: { block: BuildingBlock, count: number, onUpdate: (d: number) => void }) => {
    const isActive = count > 0;

    return (
        <div className={`
            flex flex-col items-center p-3 sm:p-4 rounded-lg border transition-all duration-300 relative
            ${isActive ? 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.3)] shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-[rgba(0,0,0,0.4)] border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.02)]'}
        `}>
            {/* Quick Add Buttons */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 {/* Can add quick +10 buttons here if needed */}
            </div>

            {/* The Icon */}
            <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                ${isActive ? 'bg-[rgba(0,0,0,0.4)] shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-110' : 'bg-transparent grayscale-[0.5] opacity-80'}
            `}>
                {block.customImgName ? (
                    <img src={block.customImgName} alt={block.name} className="w-10 h-10 object-contain drop-shadow-lg" />
                ) : (
                    <span style={{ color: isActive ? block.iconColor : (block.iconColor + '80') }} className="scale-150">
                        {IconMap["Square"] || <Crosshair size={24} />}
                    </span>
                )}
            </div>

            <span className={`text-sm font-bold tracking-wider mb-3 w-full text-center truncate ${isActive ? 'text-white' : 'text-[#888]'}`}>
                {block.name}
            </span>

            {/* Stepper */}
            <div className="flex w-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded overflow-hidden">
                <button 
                    className="flex-1 h-8 sm:h-10 flex items-center justify-center active:bg-[rgba(255,255,255,0.2)] text-[#aaa] hover:text-white transition-colors cursor-pointer"
                    onClick={() => onUpdate(-1)}
                >
                    <Minus size={16} />
                </button>
                <div className={`w-10 sm:w-12 h-8 sm:h-10 flex items-center justify-center font-bebas text-xl sm:text-2xl ${isActive ? 'text-[#00ffcc] drop-shadow-[0_0_5px_rgba(0,255,204,0.5)]' : 'text-[#555]'}`}>
                    {count}
                </div>
                <button 
                    className="flex-1 h-8 sm:h-10 flex items-center justify-center active:bg-[rgba(255,255,255,0.2)] text-[#aaa] hover:text-white transition-colors cursor-pointer"
                    onClick={() => onUpdate(1)}
                >
                    <Plus size={16} />
                </button>
            </div>
            
            {/* Quick add +10 */}
            <button 
                className="w-full mt-2 py-1 text-xs text-[#666] hover:text-[#aaa] active:text-white rounded bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer"
                onClick={() => onUpdate(10)}
            >
                +10
            </button>
        </div>
    );
};

export const BuilderMaterialItem = ({ name, count, img, color, showZero = false }: { name: string, count: number, img: string, color: string, showZero?: boolean }) => {
    if (count <= 0 && !showZero) return null;
    return (
        <div className="flex flex-col items-center shrink-0 min-w-[70px]">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] mb-1 bg-black/50 p-1">
                <img src={`/rust-icon/resources/${img}`} alt={name} className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] text-[#888] font-mono leading-none mb-1">{name}</span>
            <span className={`${color} font-bebas text-lg leading-none`}>{count.toLocaleString()}</span>
        </div>
    );
};
