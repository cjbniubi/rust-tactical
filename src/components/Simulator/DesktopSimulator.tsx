"use client";


import { Categories, RaidTargets } from '../../data/models';
import { TargetCard, TotalsContent , ModeChip} from './Shared';
import { Trash2 } from 'lucide-react';

export const DesktopSimulator = (props: any) => {
    const { counts, mode, setMode, handleUpdate, handleClear, totals, fullMaterials } = props;

    return (
        <div className="flex flex-row h-full overflow-hidden w-full">
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex flex-row justify-between items-end gap-4 mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                    <div>
                        <h1 className="text-white text-3xl font-bebas tracking-widest m-0 uppercase drop-shadow-md">抄家消耗模拟器</h1>
                        <p className="text-[#aaa] font-mono text-sm mt-1">选择你需要摧毁的目标。右侧面板将实时计算所需的精确硫磺消耗。</p>
                    </div>
                    
                    <div className="flex flex-col gap-1 w-auto">
                        <span className="text-[#888] font-bebas text-sm">爆破策略</span>
                        <div className="flex gap-2 bg-[rgba(0,0,0,0.4)] p-1 rounded-full border border-[rgba(255,255,255,0.05)] shadow-inner">
                            <ModeChip current={mode} val="eco" label="极限经济" img="/rust-icon/resources/scrap.png" onSelect={setMode} />
                            <ModeChip current={mode} val="c4" label="纯 C4" img="/rust-icon/tools/explosive.timed.png" onSelect={setMode} />
                            <ModeChip current={mode} val="rocket" label="纯火箭弹" img="/rust-icon/ammmo/ammo.rocket.basic.png" onSelect={setMode} />
                            <ModeChip current={mode} val="satchel" label="纯豆子罐" img="/rust-icon/tools/explosive.satchel.png" onSelect={setMode} />
                            <ModeChip current={mode} val="expAmmo" label="纯爆炸弹" img="/rust-icon/ammmo/ammo.rifle.explosive.png" onSelect={setMode} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 pb-12">
                    {Categories.map(cat => (
                        <div key={cat}>
                            <h3 className="mb-2 text-[#ddd] font-bebas text-lg tracking-widest border-b border-[rgba(255,255,255,0.05)] pb-1 uppercase drop-shadow">{cat}</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                                {RaidTargets.filter(t => t.category === cat).map(target => (
                                    <TargetCard 
                                        key={target.id} 
                                        target={target} 
                                        count={counts[target.id] || 0} 
                                        onUpdate={(d) => handleUpdate(target.id, d)} 
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex relative h-auto w-[350px] shrink-0 bg-[rgba(0,0,0,0.4)] border-l border-[rgba(255,255,255,0.1)] p-6 overflow-y-auto custom-scrollbar flex-col gap-6">
                <TotalsContent totals={totals} fullMaterials={fullMaterials} />
                
                <button 
                    onClick={handleClear} 
                    className="mt-auto flex items-center justify-center gap-2 bg-[rgba(255,68,68,0.1)] hover:bg-[rgba(255,68,68,0.2)] active:bg-[rgba(255,68,68,0.3)] text-[#ff4444] hover:text-[#ff6666] border border-[rgba(255,68,68,0.3)] hover:border-[rgba(255,68,68,0.5)] rounded py-3 transition-all font-bebas text-lg cursor-pointer"
                >
                    <Trash2 size={18} /> 清空模拟器 (CLEAR ALL)
                </button>
            </div>
        </div>
    );
};
