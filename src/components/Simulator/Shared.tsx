"use client";

import React from 'react';
import { audio } from '../../utils/audio';
import type { TargetItem } from '../../data/models';
import { Minus, Plus, Crosshair, Target, Shield, Box, Grid, Square, DoorOpen, DoorClosed, Menu, Lock, Video } from 'lucide-react';

export const IconMap: Record<string, React.ReactNode> = {
    DoorOpen: <DoorOpen size={24} />, DoorClosed: <DoorClosed size={24} />, Menu: <Menu size={24} />, Lock: <Lock size={24} />,
    Grid: <Grid size={24} />, Square: <Square size={24} />, Shield: <Shield size={24} />, ShieldAlert: <Shield size={24} />,
    Box: <Box size={24} />, Target: <Target size={24} />, Video: <Video size={24} />
};

export const TotalsContent = ({ totals, fullMaterials, hideSulfur }: any) => (
    <>
        {!hideSulfur && (
            <div>
                <div className="text-[#aaa] text-xs font-bebas tracking-widest mb-1">核心消耗总计 (SULFUR)</div>
                <div className="text-[#d2501a] font-bebas text-6xl drop-shadow-[0_0_15px_rgba(210,80,26,0.4)] leading-none">
                    {totals.sulfur.toLocaleString()}
                </div>
            </div>
        )}

        <div className="bg-[rgba(0,0,0,0.3)] rounded border border-[rgba(255,255,255,0.05)] shadow-inner overflow-hidden">
            <div className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)] px-4 py-2 text-[#888] font-bebas tracking-widest text-sm flex justify-between items-center">
                <span>全量原材料清单 (RAW MATERIALS)</span>
            </div>
            
            <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {totals.sulfur > 0 && <MaterialItem name="硫磺" count={totals.sulfur} img="/rust-icon/resources/sulfur.png" color="text-[#d2501a]" />}
                {fullMaterials.charcoal > 0 && <MaterialItem name="火药" count={Math.ceil(fullMaterials.charcoal / 3)} img="/rust-icon/resources/gunpowder.png" color="text-[#ddd]" />}
                {fullMaterials.charcoal > 0 && <MaterialItem name="木炭" count={fullMaterials.charcoal} img="/rust-icon/resources/charcoal.png" color="text-[#aaa]" />}
                {fullMaterials.metalFrags > 0 && <MaterialItem name="金属碎片" count={fullMaterials.metalFrags} img="/rust-icon/resources/metal.fragments.png" color="text-[#a9a9a9]" />}
                {fullMaterials.lgf > 0 && <MaterialItem name="低级燃料" count={fullMaterials.lgf} img="/rust-icon/resources/lowgradefuel.png" color="text-[#cd4916]" />}
                {fullMaterials.cloth > 0 && <MaterialItem name="布" count={fullMaterials.cloth} img="/rust-icon/resources/cloth.png" color="text-[#d2b48c]" />}
                {fullMaterials.techTrash > 0 && <MaterialItem name="科技零件" count={fullMaterials.techTrash} img="/rust-icon/components/techparts.png" color="text-[#ff6b6b]" />}
                {fullMaterials.pipes > 0 && <MaterialItem name="金属管" count={fullMaterials.pipes} img="/rust-icon/components/metalpipe.png" color="text-[#a9a9a9]" />}
                {fullMaterials.rope > 0 && <MaterialItem name="绳子" count={fullMaterials.rope} img="/rust-icon/components/rope.png" color="text-[#d2b48c]" />}
                
                {Object.values(fullMaterials).every(v => v === 0) && (
                    <div className="col-span-full text-[#555] font-mono text-xs px-2 py-1">无原材料消耗</div>
                )}
            </div>
        </div>
        
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 pb-6">
            <span className="text-[#aaa] font-bebas text-lg tracking-widest mb-3 block">需制造以下爆炸物 (EXPLOSIVES)</span>
            <div className="flex flex-col gap-2">
                <ExpBadge name="C4 定时炸药" count={totals.c4} img="/rust-icon/tools/explosive.timed.png" />
                <ExpBadge name="火箭弹" count={totals.rocket} img="/rust-icon/ammmo/ammo.rocket.basic.png" />
                <ExpBadge name="豆子罐炸药" count={totals.satchel} img="/rust-icon/tools/explosive.satchel.png" />
                <ExpBadge name="爆炸弹" count={totals.expAmmo} img="/rust-icon/ammmo/ammo.rifle.explosive.png" />
                {totals.expAmmo > 0 && (
                    <div className="flex items-center gap-3 p-2 rounded border transition-all bg-[rgba(0,0,0,0.5)] border-[rgba(255,255,255,0.1)]">
                        <div className="w-10 h-10 flex items-center justify-center rounded text-2xl">🔫</div>
                        <div className="flex flex-col">
                            <span className="font-bebas text-2xl leading-none text-[#ddd]">
                                {Math.ceil(totals.expAmmo / 200)}
                            </span>
                            <span className="text-[#aaa] font-mono text-[10px] uppercase">枪械损耗 (SAR)</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
);

export const TargetCard = ({ target, count, onUpdate }: { target: TargetItem, count: number, onUpdate: (d: number) => void }) => {
    const isActive = count > 0;
    return (
        <div className={`
            flex flex-col items-center p-2 rounded border transition-all duration-200
            ${isActive ? 'bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.3)] shadow-[0_0_10px_rgba(255,255,255,0.05)]' : 'bg-[rgba(0,0,0,0.3)] border-[rgba(255,255,255,0.05)]'}
        `}>
            <div className={`
                w-14 h-14 rounded flex items-center justify-center mb-1.5 transition-all
                ${isActive ? 'bg-[rgba(0,0,0,0.5)]' : 'bg-[rgba(0,0,0,0.2)]'}
            `}>
                {target.customImgName ? (
                    <img src={target.customImgName.startsWith('http') || target.customImgName.startsWith('/') ? target.customImgName : `${target.customImgName}`} alt={target.name} className="w-10 h-10 object-contain drop-shadow-md" />
                ) : (
                    <span style={{ color: isActive ? target.iconColor : '#666' }}>
                        {IconMap[target.iconName] || <Crosshair size={24} />}
                    </span>
                )}
            </div>
            
            <h4 className={`text-center font-mono text-[11px] mb-2 w-full truncate px-1 ${isActive ? 'text-white font-bold' : 'text-[#aaa]'}`}>
                {target.name}
            </h4>
            
            <div className="flex w-full mt-auto items-center bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.05)] rounded overflow-hidden h-7">
                <button className="flex-1 h-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.2)] active:scale-95 text-[#aaa] hover:text-white transition-all cursor-pointer" onClick={() => onUpdate(-1)}>
                    <Minus size={14} />
                </button>
                <div className={`w-8 h-full flex items-center justify-center font-bebas text-base mt-0.5 ${isActive ? 'text-white' : 'text-[#666]'}`}>
                    {count}
                </div>
                <button className="flex-1 h-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.2)] active:scale-95 text-[#aaa] hover:text-white transition-all cursor-pointer" onClick={() => onUpdate(1)}>
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
};

export const ExpBadge = ({ name, count, img }: { name: string, count: number, img: string }) => {
    const isActive = count > 0;
    return (
        <div className={`
            flex items-center gap-3 p-2 rounded border transition-all
            ${isActive ? 'bg-[rgba(0,0,0,0.5)] border-[rgba(210,80,26,0.3)]' : 'bg-[rgba(0,0,0,0.2)] border-transparent opacity-50'}
        `}>
            <div className="w-10 h-10 flex items-center justify-center rounded">
                <img src={img.startsWith('http') || img.startsWith('/') ? img : `${img}`} alt={name} className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
            <div className="flex flex-col">
                <span className={`font-bebas text-2xl leading-none ${isActive ? 'text-[#d2501a]' : 'text-[#888]'}`}>
                    {count}
                </span>
                <span className="text-[#aaa] font-mono text-[10px] uppercase">{name}</span>
            </div>
        </div>
    );
};

export const MaterialItem = ({ name, count, img, color }: { name: string, count: number, img: string, color: string }) => {
    return (
        <div className="bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.05)] rounded px-2.5 py-1.5 flex items-center gap-2 shrink-0 transition-colors">
            <img src={img.startsWith('http') || img.startsWith('/') ? img : `${img}`} alt={name} className="w-5 h-5 object-cover rounded-sm shadow-sm" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className={`font-bebas text-lg leading-none mt-[2px] ${color}`}>{count.toLocaleString()}</span>
            <span className="text-[11px] text-[#888] font-mono">{name}</span>
        </div>
    );
};

import type { RaidMode } from '../../utils/calculator';
export const ModeChip = ({ current, val, label, img, onSelect }: { current: string, val: RaidMode, label: string, img?: string, onSelect: (v: RaidMode) => void }) => {
    const isActive = current === val;
    return (
        <button 
            onClick={() => { audio.playClick(); onSelect(val); }}
            className={`
                shrink-0 snap-start px-3 py-1.5 flex items-center gap-1.5 rounded-full font-mono text-xs border transition-all cursor-pointer active:scale-95 active:bg-[rgba(255,255,255,0.2)]
                ${isActive ? 'bg-[rgba(255,255,255,0.15)] border-white text-white shadow-lg' : 'bg-[rgba(0,0,0,0.3)] border-[rgba(255,255,255,0.1)] text-[#aaa] hover:text-white'}
            `}
        >
            {img && <img src={img} className="w-4 h-4 object-contain" alt="" />}
            {label}
        </button>
    );
};
