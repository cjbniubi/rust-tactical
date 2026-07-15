"use client";

import { useEffect } from 'react';
import { BuilderMaterialItem } from './Shared';
import { Trash2, Shield, Hammer, MousePointer2 } from 'lucide-react';
import { getEffectiveTaxRate } from '../../utils/upkeepCalculator';
import { BuilderCanvas } from './BuilderCanvas';
import { RadialMenu } from './RadialMenu';

export const DesktopBuilder = (props: any) => {
    const { 
        placedBlocks, 
        activeBlockId, 
        activeMaterial,
        setActiveMaterial,
        activeShape,
        setActiveShape,
        isRadialOpen,
        setIsRadialOpen,
        radialPosition,
        setRadialPosition,
        handleAddBlock, 
        handleRemoveBlock, 
        handleClear, 
        initial, 
        upkeep, 
        totalBlocks 
    } = props;

    const taxRate = getEffectiveTaxRate(totalBlocks) * 100;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
            switch(e.key) {
                case '1': setActiveMaterial('wood'); break;
                case '2': setActiveMaterial('stone'); break;
                case '3': setActiveMaterial('metal'); break;
                case '4': setActiveMaterial('hqm'); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setActiveMaterial]);

    return (
        <div 
            className="flex flex-row h-full overflow-hidden w-full relative"
            onContextMenu={(e) => {
                e.preventDefault();
                document.exitPointerLock(); // Unlock mouse for radial menu
                setRadialPosition({ x: e.clientX, y: e.clientY });
                setIsRadialOpen(true);
            }}
        >
            <RadialMenu 
                isOpen={isRadialOpen} 
                x={radialPosition.x} 
                y={radialPosition.y} 
                onClose={() => {
                    setIsRadialOpen(false);
                    // Re-lock after selection
                    document.getElementById('builder-canvas-container')?.requestPointerLock();
                }}
                onSelect={(shape) => setActiveShape(shape)}
                activeShape={activeShape}
            />

            {/* 3D Canvas Area */}
            <div className="flex-1 relative bg-black">
                <BuilderCanvas 
                    placedBlocks={placedBlocks}
                    activeBlockId={activeBlockId}
                    activeShape={activeShape}
                    fpsMode={true}
                    onAddBlock={handleAddBlock}
                    onRemoveBlock={handleRemoveBlock}
                />

                {/* Top overlay controls */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
                    <h1 className="text-white text-3xl font-bebas tracking-widest m-0 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center gap-3">
                        <Hammer className="text-[#00ffcc]" size={28} /> 造家模拟器 3D
                    </h1>
                </div>

                {/* Bottom Toolbar for Block Selection */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-[rgba(15,15,18,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-2 text-[#aaa] text-xs font-mono">
                            <span className="flex items-center gap-1"><MousePointer2 size={12}/> 左键放置 | Shift+左键拆除 | 右键图纸盘 | ESC释放鼠标 | 数字键1-4切材质</span>
                        </div>
                        <div className="flex gap-2 max-w-[800px] overflow-x-auto custom-scrollbar pb-1 px-1">
                            {['wood', 'stone', 'metal', 'hqm'].map(mat => {
                                const isActive = activeMaterial === mat;
                                const labels: Record<string, string> = { wood: '木头', stone: '石头', metal: '铁', hqm: '高金' };
                                const colors: Record<string, string> = { wood: '#d2b48c', stone: '#a9a9a9', metal: '#ffffff', hqm: '#00ffcc' };
                                
                                return (
                                    <button
                                        key={mat}
                                        onClick={() => setActiveMaterial(mat)}
                                        className={`
                                            flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-lg border transition-all duration-200
                                            ${isActive ? 'bg-[rgba(255,255,255,0.1)] border-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.3)] scale-105' : 'bg-[rgba(0,0,0,0.5)] border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)]'}
                                        `}
                                    >
                                        <span className="font-bebas tracking-widest text-lg" style={{ color: colors[mat] }}>{labels[mat]}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col relative h-auto w-[350px] shrink-0 bg-[rgba(0,0,0,0.85)] backdrop-blur-md border-l border-[rgba(255,255,255,0.1)] p-6 overflow-y-auto custom-scrollbar z-20">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[#888] font-bebas text-lg tracking-widest m-0">建筑规模</h2>
                    <button 
                        onClick={handleClear}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[rgba(255,0,0,0.1)] text-[#ff6b6b] border border-[rgba(255,0,0,0.2)] rounded hover:bg-[rgba(255,0,0,0.2)] hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                    >
                        <Trash2 size={14} /> <span className="font-bebas tracking-widest text-sm mt-0.5">清空图纸</span>
                    </button>
                </div>
                
                <div className="mb-8 p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg shadow-inner">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-white font-bebas text-4xl">{totalBlocks} <span className="text-xl text-[#666]">方块</span></span>
                        <span className="text-[#00ffcc] font-bebas text-2xl">{taxRate.toFixed(1)}% <span className="text-sm text-[#666]">税率</span></span>
                    </div>
                    <div className="w-full h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-[#00ffcc] to-[#ff0055]" style={{ width: `${Math.min(100, (totalBlocks / 200) * 100)}%` }}></div>
                    </div>
                </div>

                <h2 className="text-[#ddd] font-bebas text-2xl tracking-widest mb-4 flex items-center gap-2 pb-2 border-b border-[rgba(255,255,255,0.1)]">
                    <Shield size={20} className="text-[#cd4916]" /> 每日维护 (UPKEEP)
                </h2>
                
                <div className="grid grid-cols-3 gap-y-4 gap-x-2 mb-8">
                    <BuilderMaterialItem name="木头" count={upkeep.wood} img="wood.png" color="text-[#d2b48c]" showZero />
                    <BuilderMaterialItem name="石头" count={upkeep.stone} img="stone.png" color="text-[#a9a9a9]" showZero />
                    <BuilderMaterialItem name="金属碎片" count={upkeep.metalFrags} img="metal_fragments.png" color="text-[#a9a9a9]" showZero />
                    <BuilderMaterialItem name="高质金属" count={upkeep.hqm} img="metal.refined.png" color="text-[#ffffff]" showZero />
                </div>

                <h2 className="text-[#ddd] font-bebas text-2xl tracking-widest mb-4 flex items-center gap-2 pb-2 border-b border-[rgba(255,255,255,0.1)] mt-auto">
                    <Hammer size={20} className="text-[#00ffcc]" /> 初始建造 (COST)
                </h2>
                
                <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                    <BuilderMaterialItem name="木头" count={initial.wood} img="wood.png" color="text-[#d2b48c]" showZero />
                    <BuilderMaterialItem name="石头" count={initial.stone} img="stone.png" color="text-[#a9a9a9]" showZero />
                    <BuilderMaterialItem name="金属碎片" count={initial.metalFrags} img="metal_fragments.png" color="text-[#a9a9a9]" showZero />
                    <BuilderMaterialItem name="高质金属" count={initial.hqm} img="metal.refined.png" color="text-[#ffffff]" showZero />
                    <BuilderMaterialItem name="齿轮" count={initial.gears || 0} img="gears.png" color="text-[#a9a9a9]" />
                </div>

            </div>
        </div>
    );
};
