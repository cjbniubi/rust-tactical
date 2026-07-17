"use client";


import { Recycle } from 'lucide-react';
import { GpCraftCard } from './Shared';
import Image from 'next/image';

export const MobileScrap = (props: any) => {
    const {
        scrap, f1Count, gunpowder, f1Metal, scopeCount, scopeHqm,
        c4Count, rocketCount, satchelCount, expAmmoCount, grenadeCost, scopeCost,
        handleScrapInput
    } = props;

    return (
        <div className="lg:hidden flex flex-col h-full bg-[#0f0f12] overflow-hidden w-full relative">
            
            {/* STICKY CONTROL TERMINAL */}
            <div className="flex-none sticky top-0 bg-[rgba(15,15,18,0.98)] backdrop-blur-md z-30 border-b border-[rgba(255,255,255,0.05)] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="flex items-center gap-2 p-4 pb-2">
                    <Recycle className="text-[#cd4916]" size={18} />
                    <h1 className="text-base font-bold font-sans text-white leading-none tracking-widest">战术分解终端</h1>
                </div>

                {/* Compact Inputs */}
                <div className="px-4 pb-4 flex gap-3">
                    <div className="flex-1 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)] rounded p-2">
                        <label className="text-[#888] text-[9px] font-bold mb-1 flex items-center gap-1">
                            <Image src="/rust-icon/resources/scrap.png" alt="Scrap" width={12} height={12} />
                            目标废料 (SCRAP)
                        </label>
                        <input 
                            type="number"
                            value={scrap || ''}
                            onChange={(e) => handleScrapInput(e.target.value)}
                            placeholder="0"
                            className="w-full bg-transparent text-white font-mono text-xl outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 p-4 pb-24 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                
                {/* Compact Yields List */}
                <section>
                    <h2 className="text-[#888] text-[10px] font-bold tracking-widest uppercase mb-3 border-b border-[#333] pb-1">转换提炼核心流水线</h2>
                    
                    <div className="flex flex-col gap-2">
                        {/* F1 Route */}
                        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded p-3 flex items-center gap-3">
                            <Image src="/rust-icon/weapons/grenade.f1.png" alt="F1" width={28} height={28} />
                            <div className="flex-1 flex flex-col">
                                <span className="text-[#888] text-[9px]">前哨站购买凭证</span>
                                <span className="text-white font-bold text-sm leading-tight">{f1Count}x F1手雷</span>
                            </div>
                            <div className="text-[#555]">➔</div>
                            <div className="flex flex-col items-end">
                                <span className="text-[#ffaa00] text-[9px]">提炼火药</span>
                                <span className="font-bebas text-2xl text-[#ffaa00] leading-none">{gunpowder}</span>
                            </div>
                        </div>

                        {/* 16x Route */}
                        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded p-3 flex items-center gap-3">
                            <Image src="/rust-icon/weapons/weapon.mod.8x.scope.png" alt="16x" width={28} height={28} />
                            <div className="flex-1 flex flex-col">
                                <span className="text-[#888] text-[9px]">前哨站购买凭证</span>
                                <span className="text-white font-bold text-sm leading-tight">{scopeCount}x 16倍镜</span>
                            </div>
                            <div className="text-[#555]">➔</div>
                            <div className="flex flex-col items-end">
                                <span className="text-[#00ffcc] text-[9px]">提炼高面金</span>
                                <span className="font-bebas text-2xl text-[#00ffcc] leading-none">{scopeHqm}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Explosives Grid */}
                <section>
                    <h2 className="text-[#ff4444] text-[10px] font-bold tracking-widest uppercase mb-3 border-b border-[#442222] pb-1">武器库炸药成型</h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <GpCraftCard name="C4 炸药包" count={c4Count} cost="1000 GP" color="#ff4444" iconSrc="/rust-icon/tools/explosive.timed.png" />
                        <GpCraftCard name="火箭弹 (Rocket)" count={rocketCount} cost="650 GP" color="#ff8800" iconSrc="/rust-icon/ammmo/ammo.rocket.basic.png" />
                        <GpCraftCard name="豆罐炸药包 (Satchel)" count={satchelCount} cost="240 GP" color="#ffcc00" iconSrc="/rust-icon/tools/explosive.satchel.png" />
                        <GpCraftCard name="爆炸子弹 (Exp Ammo)" count={expAmmoCount} cost="2.5 GP" color="#00ffcc" iconSrc="/rust-icon/ammmo/ammo.rifle.explosive.png" />
                    </div>
                </section>
            </div>
        </div>
    );
};
