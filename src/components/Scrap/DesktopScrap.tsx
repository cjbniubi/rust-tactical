"use client";


import { Recycle, ArrowRight } from 'lucide-react';
import { useScrap } from './useScrap';
import { GpCraftCard } from './Shared';
import Image from 'next/image';

export const DesktopScrap = (props: any) => {
    const {
        scrap, gpInput, f1Count, gunpowder, f1Metal, scopeCount, scopeHqm,
        c4Count, rocketCount, satchelCount, expAmmoCount, grenadeCost, scopeCost,
        handleScrapInput, handleGpInput
    } = props;

    return (
        <div className="hidden lg:flex flex-col h-full bg-[#0f0f12]">
            <div className="flex-none p-6 border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-3">
                    <Recycle className="text-[#cd4916]" size={28} />
                    <div>
                        <h1 className="text-2xl font-bold font-sans text-white tracking-wider">废料分解</h1>
                        <p className="text-[#888] text-sm mt-1">黑市经济引擎 / Scrap Breakdown</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-12">
                    
                    {/* Step 1: Input & Purchase */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-[#cd4916] flex items-center justify-center text-white font-bold">1</div>
                            <h2 className="text-xl font-bold text-white">废料输入与购买 (Purchase)</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Input */}
                            <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded p-6">
                                <label className="text-[#888] text-xs font-bold mb-4 block flex items-center gap-2">
                                    <Image src="/rust-icon/resources/scrap.png" alt="Scrap" width={20} height={20} />
                                    总废料投入 (SCRAP)
                                </label>
                                <input 
                                    type="number"
                                    value={scrap || ''}
                                    onChange={(e) => handleScrapInput(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded p-3 text-white font-mono text-2xl outline-none focus:border-[#cd4916] transition-colors"
                                />
                                <p className="text-[#666] text-xs mt-2">输入您当前拥有的废料总数</p>
                            </div>
                            
                            {/* Arrow Indicator */}
                            <div className="hidden md:flex items-center justify-center">
                                <ArrowRight className="text-[#444]" size={48} />
                            </div>

                            {/* Purchase Output */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded p-4 flex flex-col justify-center items-center relative overflow-hidden">
                                    <div className="absolute top-2 left-2 text-[#888] text-[10px]">购买 F1 手雷</div>
                                    <Image src="/rust-icon/weapons/grenade.f1.png" alt="F1" width={48} height={48} className="mb-2" />
                                    <span className="font-bebas text-3xl text-white">{f1Count}</span>
                                    <span className="text-[#cd4916] text-[10px] mt-1">{grenadeCost} 废料/个</span>
                                </div>
                                <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded p-4 flex flex-col justify-center items-center relative overflow-hidden">
                                    <div className="absolute top-2 left-2 text-[#888] text-[10px]">购买 16倍镜</div>
                                    <Image src="/rust-icon/weapons/weapon.mod.8x.scope.png" alt="16x" width={48} height={48} className="mb-2" />
                                    <span className="font-bebas text-3xl text-white">{scopeCount}</span>
                                    <span className="text-[#cd4916] text-[10px] mt-1">{scopeCost} 废料/个</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-[rgba(255,255,255,0.05)]"></div>

                    {/* Step 2: Recycle Output */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-[#cd4916] flex items-center justify-center text-white font-bold">2</div>
                            <h2 className="text-xl font-bold text-white">分解机产出 (Recycle Yield)</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-[#1a1a1a] border border-[#333] rounded p-6 flex flex-col items-center">
                                <Image src="/rust-icon/resources/gunpowder.png" alt="Gunpowder" width={64} height={64} className="mb-4" />
                                <span className="text-[#888] text-xs mb-1">获得火药 (GP)</span>
                                <span className="font-bebas text-4xl text-[#ffaa00]">{gunpowder}</span>
                                <span className="text-[#666] text-[10px] mt-2">1 F1手雷 = 15 火药</span>
                            </div>
                            <div className="bg-[#1a1a1a] border border-[#333] rounded p-6 flex flex-col items-center">
                                <Image src="/rust-icon/resources/metal.fragments.png" alt="Metal" width={64} height={64} className="mb-4" />
                                <span className="text-[#888] text-xs mb-1">获得金属碎片</span>
                                <span className="font-bebas text-4xl text-[#aaa]">{f1Metal}</span>
                                <span className="text-[#666] text-[10px] mt-2">1 F1手雷 = 15 金属碎片</span>
                            </div>
                            <div className="bg-[#1a1a1a] border border-[#333] rounded p-6 flex flex-col items-center">
                                <Image src="/rust-icon/resources/metal.refined.png" alt="HQM" width={64} height={64} className="mb-4" />
                                <span className="text-[#888] text-xs mb-1">获得高面金 (HQM)</span>
                                <span className="font-bebas text-4xl text-[#00ffcc]">{scopeHqm}</span>
                                <span className="text-[#666] text-[10px] mt-2">1 16倍镜 = 40 高面金</span>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-[rgba(255,255,255,0.05)]"></div>

                    {/* Step 3: Explosives Crafting */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-[#cd4916] flex items-center justify-center text-white font-bold">3</div>
                            <h2 className="text-xl font-bold text-white">火药转化库 (Explosives Crafting)</h2>
                        </div>
                        <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded p-6">
                            <div className="flex items-center gap-4 mb-8">
                                <Image src="/rust-icon/resources/gunpowder.png" alt="GP" width={32} height={32} />
                                <div className="flex-1 max-w-xs">
                                    <input 
                                        type="number"
                                        value={gpInput}
                                        onChange={(e) => handleGpInput(e.target.value)}
                                        placeholder={`使用上面的火药量: ${gunpowder}`}
                                        className="w-full bg-[rgba(0,0,0,0.5)] border border-[#ffaa00] border-opacity-30 rounded p-3 text-[#ffaa00] font-mono text-xl outline-none focus:border-opacity-100 transition-colors"
                                    />
                                    <p className="text-[#666] text-xs mt-2">输入用于制造炸药的火药总量</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <GpCraftCard name="C4 炸药包" count={c4Count} cost="1000 GP" color="#ff4444" iconSrc="/rust-icon/tools/explosive.timed.png" />
                                <GpCraftCard name="火箭弹 (Rocket)" count={rocketCount} cost="650 GP" color="#ff8800" iconSrc="/rust-icon/ammmo/ammo.rocket.basic.png" />
                                <GpCraftCard name="豆罐炸药包 (Satchel)" count={satchelCount} cost="240 GP" color="#ffcc00" iconSrc="/rust-icon/tools/explosive.satchel.png" />
                                <GpCraftCard name="爆炸子弹 (Exp Ammo)" count={expAmmoCount} cost="2.5 GP" color="#00ffcc" iconSrc="/rust-icon/ammmo/ammo.rifle.explosive.png" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
