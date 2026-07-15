"use client";


import { RaidTargets } from '../../data/models';
import { calculateMaxDestroyable } from '../../utils/calculator';
import { OutputBadge, MatCard, BudgetTargetCard, StrategyChip } from './Shared';

export const DesktopBudget = (props: any) => {
    const { sulfur, setSulfur, strategy, setStrategy, inv, materials } = props;

    return (
        <div className="flex flex-col h-full overflow-hidden p-8 overflow-y-auto custom-scrollbar w-full">
            <div className="flex justify-between items-end mb-8 border-b border-[rgba(255,255,255,0.1)] pb-4">
                <div>
                    <h1 className="text-white text-3xl font-bebas tracking-widest m-0 uppercase drop-shadow-md">军备资产评估</h1>
                    <p className="text-[#aaa] font-mono text-sm mt-1">输入你的硫磺总资产。系统将根据你的策略偏好将其自动分配为各类爆炸物。</p>
                </div>
            </div>

            <div className="flex flex-row gap-8 mb-8 items-center bg-[rgba(0,0,0,0.3)] p-6 rounded border border-[rgba(255,255,255,0.05)] shadow-inner">
                <div className="flex flex-col gap-1 w-auto">
                    <span className="text-[#aaa] font-bebas text-lg">当前硫磺库存</span>
                    <input 
                        type="number" 
                        className="rust-input text-[#d2501a] text-3xl font-bebas px-4 py-2 w-[220px] rounded" 
                        value={sulfur} 
                        onChange={e => setSulfur(e.target.value)}
                        placeholder="0"
                    />
                </div>
                
                <div className="flex flex-col gap-2 w-auto overflow-hidden">
                    <span className="text-[#aaa] font-bebas text-lg">军工生产策略</span>
                    <div className="flex gap-2 bg-[rgba(0,0,0,0.4)] p-1 rounded-full border border-[rgba(255,255,255,0.05)] shadow-inner">
                        <StrategyChip current={strategy} val="balanced" label="均衡生产" onSelect={setStrategy} />
                        <StrategyChip current={strategy} val="maxC4" label="全力 C4" img="/rust-icon/tools/explosive.timed.png" onSelect={setStrategy} />
                        <StrategyChip current={strategy} val="maxRocket" label="全力火箭弹" img="/rust-icon/ammmo/ammo.rocket.basic.png" onSelect={setStrategy} />
                        <StrategyChip current={strategy} val="maxSatchel" label="全力豆子罐" img="/rust-icon/tools/explosive.satchel.png" onSelect={setStrategy} />
                        <StrategyChip current={strategy} val="maxExpAmmo" label="全力爆炸弹" img="/rust-icon/ammmo/ammo.rifle.explosive.png" onSelect={setStrategy} />
                    </div>
                </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded p-6 mb-8">
                <h3 className="text-[#ddd] font-bebas text-xl tracking-widest uppercase mb-4 drop-shadow">爆炸物产出清单</h3>
                
                <div className="flex flex-wrap gap-4">
                    <OutputBadge name="C4" count={inv.c4} img="/rust-icon/tools/explosive.timed.png" color="#d2501a" />
                    <OutputBadge name="火箭弹" count={inv.rocket} img="/rust-icon/ammmo/ammo.rocket.basic.png" color="#d2501a" />
                    <OutputBadge name="豆子罐" count={inv.satchel} img="/rust-icon/tools/explosive.satchel.png" color="#eee" />
                    <OutputBadge name="爆炸弹" count={inv.expAmmo} img="/rust-icon/ammmo/ammo.rifle.explosive.png" color="#eee" />
                    <div className="flex-1 min-w-[50px]"></div>
                    <div className="flex flex-col items-end justify-center bg-[rgba(0,0,0,0.4)] px-6 py-2 rounded border border-[rgba(255,255,255,0.05)]">
                        <span className="text-[#888] font-bebas text-sm">废料沉淀 (剩余硫磺)</span>
                        <span className="text-[#6d8e48] font-bebas text-4xl">{inv.remaining}</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                    <span className="text-[#aaa] font-bebas text-lg block mb-3">基础工业原料消耗评估</span>
                    
                    <div className="h-3 w-full bg-[rgba(0,0,0,0.5)] flex mb-6 rounded-full overflow-hidden shadow-inner">
                        {materials.sulfur > 0 && <div className="h-full bg-[#d2501a]" style={{ width: '40%' }}></div>}
                        {materials.charcoal > 0 && <div className="h-full bg-[#777]" style={{ width: '30%' }}></div>}
                        {materials.metalFrags > 0 && <div className="h-full bg-[#aaa]" style={{ width: '15%' }}></div>}
                        {materials.lgf > 0 && <div className="h-full bg-[#c0392b]" style={{ width: '5%' }}></div>}
                        {materials.cloth > 0 && <div className="h-full bg-[#8d6e63]" style={{ width: '5%' }}></div>}
                        {materials.techTrash > 0 && <div className="h-full bg-[#6d8e48]" style={{ width: '5%' }}></div>}
                    </div>

                    <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                        {materials.sulfur > 0 && <MatCard name="硫磺矿" val={materials.sulfur} img="/rust-icon/resources/sulfur.png" />}
                        {materials.charcoal > 0 && <MatCard name="木炭" val={materials.charcoal} img="/rust-icon/resources/charcoal.png" />}
                        {materials.metalFrags > 0 && <MatCard name="金属碎片" val={materials.metalFrags} img="/rust-icon/resources/metal.fragments.png" />}
                        {materials.lgf > 0 && <MatCard name="低级燃料" val={materials.lgf} img="/rust-icon/resources/lowgradefuel.png" />}
                        {materials.cloth > 0 && <MatCard name="布" val={materials.cloth} img="/rust-icon/resources/cloth.png" />}
                        {materials.techTrash > 0 && <MatCard name="电子零件" val={materials.techTrash} img="/rust-icon/components/techparts.png" />}
                        {materials.pipes > 0 && <MatCard name="金属管" val={materials.pipes} img="/rust-icon/components/metalpipe.png" />}
                        {materials.rope > 0 && <MatCard name="绳索" val={materials.rope} img="/rust-icon/components/rope.png" />}
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-[#ddd] font-bebas text-xl tracking-widest uppercase mb-4 drop-shadow">火力覆盖评估 (单独摧毁所需)</h3>
                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-12">
                    {RaidTargets.map(target => {
                        const count = calculateMaxDestroyable(target, inv);
                        return <BudgetTargetCard key={target.id} target={target} count={count} />;
                    })}
                </div>
            </div>
        </div>
    );
};
