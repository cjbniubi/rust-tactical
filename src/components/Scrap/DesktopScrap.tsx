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
        <div className="hidden lg:flex flex-col h-full bg-[#0f0f12] overflow-hidden">
            <div className="flex-none p-6 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(15,15,18,0.95)] z-10">
                <div className="flex items-center gap-3">
                    <Recycle className="text-[#cd4916]" size={28} />
                    <div>
                        <h1 className="text-2xl font-bold font-sans text-white tracking-wider">战术废料分解仪表盘</h1>
                        <p className="text-[#888] text-sm mt-1">Tactical Scrap Dashboard</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-hidden">
                <div className="h-full grid grid-cols-3 gap-6 max-w-[1600px] mx-auto">
                    
                    {/* Left Column: Input & Purchase */}
                    <section className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-8">
                        <div className="flex items-center gap-2 mb-2 sticky top-0 bg-[#0f0f12] py-2 z-10">
                            <div className="w-8 h-8 rounded-full bg-[#cd4916] flex items-center justify-center text-white font-bold">1</div>
                            <h2 className="text-xl font-bold text-white tracking-wider">资源调配 (INPUT)</h2>
                        </div>
                        
                        <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded-lg p-6 shadow-inner">
                            <label className="text-[#888] text-sm font-bold mb-4 block flex items-center gap-2">
                                <Image src="/rust-icon/resources/scrap.png" alt="Scrap" width={24} height={24} />
                                目标废料总量
                            </label>
                            <input 
                                type="number"
                                value={scrap || ''}
                                onChange={(e) => handleScrapInput(e.target.value)}
                                placeholder="0"
                                className="w-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded p-4 text-white font-mono text-4xl outline-none focus:border-[#cd4916] transition-colors shadow-inner"
                            />
                        </div>

                        <div className="bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] rounded-lg p-6 flex flex-col gap-4">
                            <h3 className="text-[#888] text-xs font-bold uppercase tracking-widest border-b border-[#333] pb-2">前哨站兑换凭证</h3>
                            <div className="bg-[rgba(0,0,0,0.4)] border border-[#222] rounded p-4 flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#111] rounded flex items-center justify-center border border-[#333]">
                                    <Image src="/rust-icon/weapons/grenade.f1.png" alt="F1" width={32} height={32} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[#888] text-xs">F1 手雷</div>
                                    <div className="font-bebas text-3xl text-white">{f1Count}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#cd4916] text-[10px] font-mono">{grenadeCost} Scrap/ea</div>
                                </div>
                            </div>
                            
                            <div className="bg-[rgba(0,0,0,0.4)] border border-[#222] rounded p-4 flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#111] rounded flex items-center justify-center border border-[#333]">
                                    <Image src="/rust-icon/weapons/weapon.mod.8x.scope.png" alt="16x" width={32} height={32} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[#888] text-xs">16倍瞄准镜</div>
                                    <div className="font-bebas text-3xl text-white">{scopeCount}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#cd4916] text-[10px] font-mono">{scopeCost} Scrap/ea</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Middle Column: Recycler */}
                    <section className="flex flex-col gap-6 overflow-y-auto custom-scrollbar px-4 pb-8 border-x border-[rgba(255,255,255,0.05)]">
                        <div className="flex items-center gap-2 mb-2 sticky top-0 bg-[#0f0f12] py-2 z-10">
                            <div className="w-8 h-8 rounded-full bg-[#ffaa00] flex items-center justify-center text-white font-bold text-black">2</div>
                            <h2 className="text-xl font-bold text-white tracking-wider">分解核心 (RECYCLER)</h2>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <div className="bg-[#1a1610] border border-[#442c00] rounded-xl p-8 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,170,0,0.05)] relative overflow-hidden">
                                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffaa00] to-transparent opacity-50"></div>
                                <Image src="/rust-icon/resources/gunpowder.png" alt="Gunpowder" width={80} height={80} className="mb-6 drop-shadow-[0_0_15px_rgba(255,170,0,0.4)]" />
                                <span className="text-[#888] text-sm mb-2 tracking-widest">提炼火药 (GP)</span>
                                <span className="font-bebas text-6xl text-[#ffaa00]">{gunpowder}</span>
                                <div className="mt-4 text-[#ffaa00] text-xs font-mono opacity-60 bg-[rgba(255,170,0,0.1)] px-3 py-1 rounded-full">
                                    + {f1Metal} 金属碎片
                                </div>
                            </div>

                            <div className="bg-[#101a16] border border-[#004422] rounded-xl p-8 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,255,150,0.05)] relative overflow-hidden mt-4">
                                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent opacity-50"></div>
                                <Image src="/rust-icon/resources/metal.refined.png" alt="HQM" width={80} height={80} className="mb-6 drop-shadow-[0_0_15px_rgba(0,255,200,0.4)]" />
                                <span className="text-[#888] text-sm mb-2 tracking-widest">提炼高金 (HQM)</span>
                                <span className="font-bebas text-6xl text-[#00ffcc]">{scopeHqm}</span>
                                <div className="mt-4 text-[#00ffcc] text-xs font-mono opacity-60 bg-[rgba(0,255,200,0.1)] px-3 py-1 rounded-full">
                                    来自 16倍镜 分解
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Right Column: Explosives Armory */}
                    <section className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pl-2 pb-8">
                        <div className="flex items-center gap-2 mb-2 sticky top-0 bg-[#0f0f12] py-2 z-10">
                            <div className="w-8 h-8 rounded-full bg-[#ff4444] flex items-center justify-center text-white font-bold">3</div>
                            <h2 className="text-xl font-bold text-white tracking-wider">武器库 (ARMORY)</h2>
                        </div>
                        
                        <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded-lg p-6">
                            <label className="text-[#888] text-sm font-bold mb-4 block flex items-center gap-2">
                                <Image src="/rust-icon/resources/gunpowder.png" alt="GP" width={24} height={24} />
                                制造投入 (GP)
                            </label>
                            <div className="flex items-center gap-3">
                                <input 
                                    type="number"
                                    value={gpInput}
                                    onChange={(e) => handleGpInput(e.target.value)}
                                    placeholder={`默认使用: ${gunpowder}`}
                                    className="w-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded p-4 text-[#ffaa00] font-mono text-3xl outline-none focus:border-[#ff4444] transition-colors"
                                />
                                <button 
                                    onClick={() => handleGpInput(gunpowder.toString())}
                                    className="h-[64px] px-4 bg-[#222] border border-[#444] text-[#888] hover:text-white hover:border-[#888] rounded transition-colors text-xs font-bold"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <GpCraftCard name="C4 定时炸药包" count={c4Count} cost="1000 GP" color="#ff4444" iconSrc="/rust-icon/tools/explosive.timed.png" />
                            <GpCraftCard name="火箭弹 (Rocket)" count={rocketCount} cost="650 GP" color="#ff8800" iconSrc="/rust-icon/ammmo/ammo.rocket.basic.png" />
                            <GpCraftCard name="豆罐炸药包 (Satchel)" count={satchelCount} cost="240 GP" color="#ffcc00" iconSrc="/rust-icon/tools/explosive.satchel.png" />
                            <GpCraftCard name="爆炸子弹 (Exp Ammo)" count={expAmmoCount} cost="2.5 GP" color="#00ffcc" iconSrc="/rust-icon/ammmo/ammo.rifle.explosive.png" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
