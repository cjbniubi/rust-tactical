"use client";

import { Categories, RaidTargets } from '../../data/models';
import { IconMap, MaterialItem , ModeChip} from './Shared';
import { Minus, Plus, Crosshair, Trash2 } from 'lucide-react';
import type { TargetItem } from '../../data/models';

const MicroTargetCard = ({ target, count, onUpdate }: { target: TargetItem, count: number, onUpdate: (d: number) => void }) => {
    const isActive = count > 0;
    return (
        <div className={`
            flex flex-col items-center p-1.5 rounded border transition-colors duration-200 relative
            ${isActive ? 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.2)]' : 'bg-[rgba(0,0,0,0.3)] border-[rgba(255,255,255,0.05)]'}
        `}>
            {/* The Icon */}
            <div className={`
                w-12 h-12 rounded flex items-center justify-center mb-1 transition-all
                ${isActive ? 'bg-[rgba(0,0,0,0.5)] shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'bg-transparent'}
            `}>
                {target.customImgName ? (
                    <img src={target.customImgName.startsWith('http') || target.customImgName.startsWith('/') ? target.customImgName : `${target.customImgName}`} alt={target.name} className="w-8 h-8 object-contain drop-shadow-md" />
                ) : (
                    <span style={{ color: isActive ? target.iconColor : (target.iconColor + '80') }}>
                        {IconMap[target.iconName] || <Crosshair size={20} />}
                    </span>
                )}
            </div>
            
            {/* Tiny Label */}
            <span className={`text-[10px] font-mono mb-1 w-full text-center truncate ${isActive ? 'text-white' : 'text-[#888]'}`}>
                {target.name}
            </span>

            {/* Micro Stepper */}
            <div className="flex w-full mt-auto bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)] rounded overflow-hidden">
                <button className="flex-1 h-8 flex items-center justify-center active:bg-[rgba(255,255,255,0.2)] text-[#aaa] hover:text-white" onClick={() => onUpdate(-1)}>
                    <Minus size={14} />
                </button>
                <div className={`w-6 h-8 flex items-center justify-center font-bebas text-base mt-0.5 ${isActive ? 'text-[#d2501a]' : 'text-[#555]'}`}>
                    {count}
                </div>
                <button className="flex-1 h-8 flex items-center justify-center active:bg-[rgba(255,255,255,0.2)] text-[#aaa] hover:text-white" onClick={() => onUpdate(1)}>
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
};

export const MobileSimulator = (props: any) => {
    const { counts, mode, setMode, handleUpdate, handleClear, totals, fullMaterials } = props;

    return (
        <div className="flex flex-col h-full overflow-hidden w-full relative">
            {/* Sticky Dashboard */}
            <div className="bg-[rgba(20,20,25,0.98)] border-b border-[rgba(255,255,255,0.1)] p-4 shrink-0 shadow-[0_5px_20px_rgba(0,0,0,0.5)] z-20 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[#aaa] font-bebas text-xs tracking-widest">硫磺总计 (SULFUR)</span>
                        <span className="text-[#d2501a] font-bebas text-4xl leading-none drop-shadow-[0_0_10px_rgba(210,80,26,0.3)]">
                            {totals.sulfur.toLocaleString()}
                        </span>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[#888] font-bebas text-[10px]">策略模式</span>
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 snap-x pt-1 w-full max-w-full">
                            <ModeChip current={mode} val="eco" label="极限经济" img="/rust-icon/resources/scrap.png" onSelect={setMode} />
                            <ModeChip current={mode} val="c4" label="纯 C4" img="/rust-icon/tools/explosive.timed.png" onSelect={setMode} />
                            <ModeChip current={mode} val="rocket" label="纯火箭弹" img="/rust-icon/ammmo/ammo.rocket.basic.png" onSelect={setMode} />
                            <ModeChip current={mode} val="satchel" label="纯豆子罐" img="/rust-icon/tools/explosive.satchel.png" onSelect={setMode} />
                            <ModeChip current={mode} val="expAmmo" label="纯爆炸弹" img="/rust-icon/ammmo/ammo.rifle.explosive.png" onSelect={setMode} />
                        </div>
                    </div>
                </div>
                
                {/* Mini Explosives Summary */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {totals.c4 > 0 && <div className="bg-[rgba(210,80,26,0.1)] border border-[rgba(210,80,26,0.3)] rounded px-2 py-1 flex items-center gap-1 shrink-0"><img src="/rust-icon/tools/explosive.timed.png" className="w-4 h-4 object-contain" alt="C4"/><span className="text-[#d2501a] font-bebas text-lg leading-none mt-0.5">{totals.c4}</span></div>}
                    {totals.rocket > 0 && <div className="bg-[rgba(210,80,26,0.1)] border border-[rgba(210,80,26,0.3)] rounded px-2 py-1 flex items-center gap-1 shrink-0"><img src="/rust-icon/ammmo/ammo.rocket.basic.png" className="w-4 h-4 object-contain" alt="Rocket"/><span className="text-[#d2501a] font-bebas text-lg leading-none mt-0.5">{totals.rocket}</span></div>}
                    {totals.satchel > 0 && <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 flex items-center gap-1 shrink-0"><img src="/rust-icon/tools/explosive.satchel.png" className="w-4 h-4 object-contain" alt="Satchel"/><span className="text-[#ddd] font-bebas text-lg leading-none mt-0.5">{totals.satchel}</span></div>}
                    {totals.expAmmo > 0 && <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 flex items-center gap-1 shrink-0"><img src="/rust-icon/ammmo/ammo.rifle.explosive.png" className="w-4 h-4 object-contain" alt="ExpAmmo"/><span className="text-[#ddd] font-bebas text-lg leading-none mt-0.5">{totals.expAmmo}</span></div>}
                    {totals.expAmmo > 0 && <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 flex items-center gap-1 shrink-0"><span className="text-sm">🔫</span><span className="text-[#ddd] font-bebas text-lg leading-none mt-0.5">{Math.ceil(totals.expAmmo / 200)} <span className="text-xs">SAR</span></span></div>}
                    
                    {totals.sulfur === 0 && <div className="text-[#555] font-mono text-xs py-1">选择下方目标以计算爆炸物</div>}
                </div>

                {/* Mini Raw Materials Summary */}
                {totals.sulfur > 0 && (
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 border-t border-[rgba(255,255,255,0.05)] pt-2 mt-1">
                        {fullMaterials.charcoal > 0 && <MaterialItem name="火药" count={Math.ceil(fullMaterials.charcoal / 3)} img="/rust-icon/resources/gunpowder.png" color="text-[#ddd]" />}
                        {fullMaterials.charcoal > 0 && <MaterialItem name="木炭" count={fullMaterials.charcoal} img="/rust-icon/resources/charcoal.png" color="text-[#aaa]" />}
                        {fullMaterials.metalFrags > 0 && <MaterialItem name="金属碎片" count={fullMaterials.metalFrags} img="/rust-icon/resources/metal.fragments.png" color="text-[#a9a9a9]" />}
                        {fullMaterials.lgf > 0 && <MaterialItem name="低级燃料" count={fullMaterials.lgf} img="/rust-icon/resources/lowgradefuel.png" color="text-[#cd4916]" />}
                        {fullMaterials.cloth > 0 && <MaterialItem name="布" count={fullMaterials.cloth} img="/rust-icon/resources/cloth.png" color="text-[#d2b48c]" />}
                        {fullMaterials.techTrash > 0 && <MaterialItem name="科技零件" count={fullMaterials.techTrash} img="/rust-icon/components/techparts.png" color="text-[#ff6b6b]" />}
                        {fullMaterials.pipes > 0 && <MaterialItem name="金属管" count={fullMaterials.pipes} img="/rust-icon/components/metalpipe.png" color="text-[#a9a9a9]" />}
                        {fullMaterials.rope > 0 && <MaterialItem name="绳子" count={fullMaterials.rope} img="/rust-icon/components/rope.png" color="text-[#d2b48c]" />}
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[rgba(15,15,18,0.6)] relative z-0">
                <div className="flex flex-col gap-6 pb-[80px]">
                    {Categories.map(cat => {
                        const targets = RaidTargets.filter(t => t.category === cat);
                        if (targets.length === 0) return null;
                        
                        return (
                            <div key={cat}>
                                <h3 className="mb-2 text-[#ddd] font-bebas text-lg tracking-widest uppercase drop-shadow flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#cd4916] rounded-full"></div>
                                    {cat}
                                </h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {targets.map(target => (
                                        <MicroTargetCard 
                                            key={target.id} 
                                            target={target} 
                                            count={counts[target.id] || 0} 
                                            onUpdate={(d) => handleUpdate(target.id, d)} 
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Action Button for Clear All */}
            {Object.keys(counts).length > 0 && (
                <button 
                    onClick={handleClear}
                    className="fixed bottom-6 right-6 w-12 h-12 bg-[rgba(255,68,68,0.9)] text-white rounded-full shadow-[0_4px_15px_rgba(255,68,68,0.4)] flex items-center justify-center z-50 active:scale-90 transition-transform backdrop-blur"
                >
                    <Trash2 size={20} />
                </button>
            )}
        </div>
    );
};
