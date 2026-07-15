"use client";


import type { TargetItem } from '../../data/models';
import type { CraftingStrategy } from '../../utils/calculator';
import { audio } from '../../utils/audio';

export const OutputBadge = ({ name, count, img, color }: { name: string, count: number, img: string, color: string }) => {
    const isActive = count > 0;
    return (
        <div className={`
            flex items-center gap-3 p-3 rounded border transition-all min-w-[140px]
            ${isActive ? 'bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)] shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-[rgba(0,0,0,0.3)] border-transparent opacity-50'}
        `}>
            <img src={`${img}`} alt={name} className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            <div className="flex flex-col">
                <span className="font-bebas text-3xl leading-none" style={{ color: isActive ? color : '#777' }}>{count}</span>
                <span className="text-[#aaa] font-mono text-[10px] uppercase">{name}</span>
            </div>
        </div>
    );
}

export const MatCard = ({ name, val, img }: { name: string, val: number, img: string }) => (
    <div className="flex items-center gap-2 bg-[rgba(0,0,0,0.4)] rounded border border-[rgba(255,255,255,0.05)] p-2">
        <img src={`${img}`} className="w-6 h-6 object-contain" alt={name} />
        <div className="flex flex-col">
            <span className="text-white font-bebas text-lg leading-none">{val.toLocaleString()}</span>
            <span className="text-[#888] font-mono text-[9px] uppercase leading-tight">{name}</span>
        </div>
    </div>
);

export const BudgetTargetCard = ({ target, count }: { target: TargetItem, count: number }) => {
    const isCapable = count > 0;
    return (
        <div className={`
            flex items-center gap-3 p-3 rounded border transition-all
            ${isCapable ? 'bg-[rgba(109,142,72,0.15)] border-[rgba(109,142,72,0.4)] shadow-[0_0_10px_rgba(109,142,72,0.2)]' : 'bg-[rgba(0,0,0,0.3)] border-transparent opacity-60'}
        `}>
            <div className="w-10 h-10 bg-[rgba(0,0,0,0.4)] rounded flex items-center justify-center p-1">
                <img src={`${target.customImgName}`} alt={target.name} className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
            <div className="flex-1 flex flex-col">
                <span className={`font-mono text-xs font-bold leading-tight ${isCapable ? 'text-white' : 'text-[#888]'}`}>{target.name}</span>
                <span className="text-[#666] font-mono text-[10px] leading-tight">{target.category}</span>
            </div>
            
            <div className="flex items-baseline gap-1">
                <span className={`font-bebas text-3xl ${isCapable ? 'text-[#6d8e48]' : 'text-[#555]'}`}>
                    {count}
                </span>
                <span className="font-bebas text-[#888] text-sm">次</span>
            </div>
        </div>
    );
};

export const StrategyChip = ({ current, val, label, img, onSelect }: { current: string, val: CraftingStrategy, label: string, img?: string, onSelect: (v: CraftingStrategy) => void }) => {
    const isActive = current === val;
    return (
        <button 
            onClick={() => { audio.playClick(); onSelect(val); }}
            className={`
                shrink-0 snap-start px-4 py-2 flex items-center gap-2 rounded-full font-mono text-sm border transition-all cursor-pointer active:scale-95 active:bg-[rgba(255,255,255,0.2)]
                ${isActive ? 'bg-[rgba(255,255,255,0.15)] border-white text-white shadow-lg' : 'bg-[rgba(0,0,0,0.3)] border-[rgba(255,255,255,0.1)] text-[#aaa] hover:text-white'}
            `}
        >
            {img && <img src={img} className="w-5 h-5 object-contain" alt="" />}
            {label}
        </button>
    );
};
