"use client";


import { Recycle } from 'lucide-react';
import { GpCraftCard } from './Shared';

export const DesktopScrap = (props: any) => {
    const {
        scrap, gpInput, f1Count, gunpowder, f1Metal, scopeCount, scopeHqm,
        c4Count, rocketCount, satchelCount, expAmmoCount, grenadeCost, scopeCost,
        handleScrapInput, handleGpInput
    } = props;

    return (
        <div className="flex flex-col h-full overflow-hidden p-8 overflow-y-auto custom-scrollbar w-full">
            <h2 className="text-white text-3xl font-bebas mb-6 tracking-widest border-b border-[rgba(255,255,255,0.1)] pb-4 drop-shadow-md">
                废料回收引擎
            </h2>
            
            <div className="flex flex-row items-center gap-8 mb-8 bg-[rgba(0,0,0,0.3)] p-6 rounded border border-[rgba(255,255,255,0.05)] shadow-inner">
                <div className="flex flex-col gap-1 w-auto">
                    <span className="text-[#aaa] font-bebas text-lg">废料总数</span>
                    <input 
                        type="number" 
                        className="rust-input text-white text-3xl font-bebas px-4 py-2 w-[220px] rounded" 
                        value={scrap || ''} 
                        onChange={e => handleScrapInput(e.target.value)}
                        placeholder="0"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[#888] font-mono text-xs max-w-[400px] leading-relaxed">
                        输入你持有的废料总量。引擎将计算通过前哨站贩卖机将其转化为火药或高级金属的最优解。
                    </span>
                </div>
            </div>

            <h3 className="text-[#ddd] text-xl font-bebas mb-3 drop-shadow tracking-widest uppercase">火药提炼路线 (F1手雷)</h3>
            <div className="flex flex-row items-center gap-4 mb-8 relative pl-0">
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded p-4 flex items-center gap-4 w-[220px] shadow-md relative z-10">
                    <div className="w-10 h-10 bg-[rgba(0,0,0,0.4)] flex items-center justify-center rounded shrink-0 border border-[#333]">
                        <img src="/rust-icon/weapons/grenade.f1.png" className="w-6 h-6 opacity-70" alt="F1" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#888] text-xs font-mono">购入目标</span>
                        <span className="text-white font-bold text-lg leading-tight">{f1Count} 个 F1 手雷</span>
                        <span className="text-[#666] text-[10px] font-mono">{grenadeCost} 废料/个</span>
                    </div>
                </div>
                
                <div className="text-[#555] font-bold text-center block">➔</div>
                
                <div className="bg-[rgba(210,80,26,0.15)] border border-[rgba(210,80,26,0.4)] rounded p-4 flex items-center gap-4 w-[220px] shadow-[0_0_15px_rgba(210,80,26,0.15)] relative z-10">
                    <div className="flex flex-col">
                        <span className="text-[#d2501a] text-xs font-mono flex items-center gap-2 uppercase">
                            提炼火药 (GP)
                        </span>
                        <span className="text-white font-bebas text-4xl leading-none">{gunpowder}</span>
                        <span className="text-[#aaa] text-[10px] font-mono mt-1">+ {f1Metal} 金属碎片</span>
                    </div>
                </div>
            </div>

            <h3 className="text-[#ddd] text-xl font-bebas mb-3 drop-shadow tracking-widest uppercase">高级金属路线 (8倍镜/太阳能板)</h3>
            <div className="flex flex-row items-center gap-4 mb-8 relative pl-0">
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded p-4 flex items-center gap-4 w-[220px] shadow-md relative z-10">
                    <div className="w-10 h-10 bg-[rgba(0,0,0,0.4)] flex items-center justify-center rounded shrink-0 border border-[#333]">
                        <img src="/rust-icon/weapons/weapon.mod.8x.scope.png" className="w-6 h-6 opacity-70" alt="Scope" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#888] text-xs font-mono">购入目标</span>
                        <span className="text-white font-bold text-lg leading-tight">{scopeCount} 个 8倍瞄准镜</span>
                        <span className="text-[#666] text-[10px] font-mono">{scopeCost} 废料/个</span>
                    </div>
                </div>
                
                <div className="text-[#555] font-bold text-center block">➔</div>
                
                <div className="bg-[rgba(109,142,72,0.15)] border border-[rgba(109,142,72,0.4)] rounded p-4 flex items-center gap-4 w-[220px] shadow-[0_0_15px_rgba(109,142,72,0.15)] relative z-10">
                    <div className="flex flex-col">
                        <span className="text-[#6d8e48] text-xs font-mono flex items-center gap-2 uppercase">
                            提炼高金 (HQM)
                        </span>
                        <span className="text-white font-bebas text-4xl leading-none">{scopeHqm}</span>
                    </div>
                </div>
            </div>

            <p className="text-[#888] font-mono text-[11px] flex items-center gap-2 mb-10 bg-[rgba(0,0,0,0.4)] p-3 rounded border-l-2 border-[#555]">
                <Recycle size={14} />
                提示：你也可以通过购买并分解中型电池(75废料)或太阳能板(75废料)来获取高金，收益率十分可观。
            </p>
            
            <h3 className="text-white text-2xl font-bebas mb-6 border-t border-[rgba(255,255,255,0.1)] pt-6 drop-shadow tracking-widest">
                火药军工转换局 (GUNPOWDER TO EXPLOSIVES)
            </h3>
            
            <div className="flex flex-row gap-8 mb-6 items-center bg-[rgba(0,0,0,0.3)] p-6 rounded border border-[rgba(255,255,255,0.05)] shadow-inner">
                <div className="flex flex-col gap-1 w-auto">
                    <span className="text-[#aaa] font-bebas text-lg">持有火药总量</span>
                    <input 
                        type="number" 
                        className="rust-input text-[#d2501a] text-3xl font-bebas px-4 py-2 w-[220px] rounded" 
                        value={gpInput} 
                        onChange={e => handleGpInput(e.target.value)}
                        placeholder="0"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3 pb-12">
                <GpCraftCard name="C4 定时炸药" count={c4Count} cost="1000 GP" color="#d2501a" />
                <GpCraftCard name="火箭弹" count={rocketCount} cost="650 GP" color="#d2501a" />
                <GpCraftCard name="豆子罐炸药" count={satchelCount} cost="240 GP" color="#ddd" />
                <GpCraftCard name="爆炸弹" count={expAmmoCount} cost="2.5 GP" color="#ddd" />
            </div>
        </div>
    );
};
