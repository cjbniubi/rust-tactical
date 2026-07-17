"use client";


import { Recycle } from 'lucide-react';
import { GpCraftCard } from './Shared';
import Image from 'next/image';

export const MobileScrap = (props: any) => {
    const {
        scrap, gpInput, f1Count, gunpowder, f1Metal, scopeCount, scopeHqm,
        c4Count, rocketCount, satchelCount, expAmmoCount, grenadeCost, scopeCost,
        handleScrapInput, handleGpInput
    } = props;

    return (
        <div className="lg:hidden flex flex-col h-full bg-[#0f0f12] pb-[80px] overflow-y-auto w-full relative">
            <div className="flex-none p-4 sticky top-0 bg-[rgba(15,15,18,0.95)] backdrop-blur z-20 border-b border-[rgba(255,255,255,0.05)] shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Recycle className="text-[#cd4916]" size={20} />
                        <div>
                            <h1 className="text-lg font-bold font-sans text-white leading-none">废料分解</h1>
                            <p className="text-[#888] text-[10px] mt-1 uppercase">Scrap Breakdown</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-8">
                {/* Step 1: Input & Purchase */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-[#cd4916] flex items-center justify-center text-white font-bold text-xs">1</div>
                        <h2 className="text-sm font-bold text-white">废料输入与购买</h2>
                    </div>
                    
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded p-4 mb-4">
                        <label className="text-[#888] text-[10px] font-bold mb-3 flex items-center gap-2">
                            <Image src="/rust-icon/resources/scrap.png" alt="Scrap" width={16} height={16} />
                            总废料投入 (SCRAP)
                        </label>
                        <input 
                            type="number"
                            value={scrap || ''}
                            onChange={(e) => handleScrapInput(e.target.value)}
                            placeholder="0"
                            className="w-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded p-3 text-white font-mono text-2xl outline-none focus:border-[#cd4916] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-dashed border-l-2 border-dashed border-[#333] -z-10"></div>
                        
                        <div className="bg-[rgba(0,0,0,0.4)] border border-[#333] rounded p-3 flex items-center gap-3">
                            <Image src="/rust-icon/weapons/grenade.f1.png" alt="F1" width={32} height={32} />
                            <div className="flex-1">
                                <div className="text-[10px] text-[#888]">购买 F1 手雷</div>
                                <div className="font-bebas text-2xl text-white leading-none mt-1">{f1Count}</div>
                            </div>
                            <div className="text-[10px] text-[#cd4916] font-mono">{grenadeCost} scrap/个</div>
                        </div>

                        <div className="bg-[rgba(0,0,0,0.4)] border border-[#333] rounded p-3 flex items-center gap-3">
                            <Image src="/rust-icon/weapons/weapon.mod.8x.scope.png" alt="16x" width={32} height={32} />
                            <div className="flex-1">
                                <div className="text-[10px] text-[#888]">购买 16倍镜</div>
                                <div className="font-bebas text-2xl text-white leading-none mt-1">{scopeCount}</div>
                            </div>
                            <div className="text-[10px] text-[#cd4916] font-mono">{scopeCost} scrap/个</div>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-[rgba(255,255,255,0.05)]"></div>

                {/* Step 2: Recycle Output */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-[#cd4916] flex items-center justify-center text-white font-bold text-xs">2</div>
                        <h2 className="text-sm font-bold text-white">分解机产出</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#1a1a1a] border border-[#333] rounded p-4 flex flex-col items-center">
                            <Image src="/rust-icon/resources/gunpowder.png" alt="GP" width={40} height={40} className="mb-2" />
                            <span className="text-[#888] text-[10px] mb-1">获得火药 (GP)</span>
                            <span className="font-bebas text-2xl text-[#ffaa00]">{gunpowder}</span>
                        </div>
                        <div className="bg-[#1a1a1a] border border-[#333] rounded p-4 flex flex-col items-center">
                            <Image src="/rust-icon/resources/metal.fragments.png" alt="Metal" width={40} height={40} className="mb-2" />
                            <span className="text-[#888] text-[10px] mb-1">获得金属碎片</span>
                            <span className="font-bebas text-2xl text-[#aaa]">{f1Metal}</span>
                        </div>
                        <div className="bg-[#1a1a1a] border border-[#333] rounded p-4 flex flex-col items-center col-span-2">
                            <Image src="/rust-icon/resources/metal.refined.png" alt="HQM" width={40} height={40} className="mb-2" />
                            <span className="text-[#888] text-[10px] mb-1">获得高面金 (HQM)</span>
                            <span className="font-bebas text-2xl text-[#00ffcc]">{scopeHqm}</span>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-[rgba(255,255,255,0.05)]"></div>

                {/* Step 3: Explosives Crafting */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-[#cd4916] flex items-center justify-center text-white font-bold text-xs">3</div>
                        <h2 className="text-sm font-bold text-white">火药转化库</h2>
                    </div>
                    
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded p-4 mb-4">
                        <label className="text-[#888] text-[10px] font-bold mb-3 flex items-center gap-2">
                            <Image src="/rust-icon/resources/gunpowder.png" alt="GP" width={16} height={16} />
                            用于制造炸药的火药总量 (GP)
                        </label>
                        <input 
                            type="number"
                            value={gpInput}
                            onChange={(e) => handleGpInput(e.target.value)}
                            placeholder={`可用火药: ${gunpowder}`}
                            className="w-full bg-[rgba(0,0,0,0.5)] border border-[#ffaa00] border-opacity-30 rounded p-3 text-[#ffaa00] font-mono text-xl outline-none focus:border-opacity-100 transition-colors"
                        />
                    </div>

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
