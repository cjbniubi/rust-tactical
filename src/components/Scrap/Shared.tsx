"use client";



import Image from 'next/image';

export const GpCraftCard = ({ name, count, cost, color, iconSrc }: { name: string, count: number, cost: string, color: string, iconSrc?: string }) => {
    const isActive = count > 0;
    return (
        <div className={`
            p-4 rounded border flex flex-col gap-2 transition-all
            ${isActive ? 'bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)] shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-[rgba(0,0,0,0.3)] border-transparent opacity-50'}
        `}>
            <div className="flex justify-between items-center">
                <div className="w-10 h-10 bg-[rgba(0,0,0,0.4)] flex items-center justify-center rounded overflow-hidden">
                    {iconSrc ? (
                        <Image src={iconSrc} alt={name} width={40} height={40} className="object-contain" />
                    ) : (
                        <div className="w-8 h-8"></div>
                    )}
                </div>
                <span className="font-bebas text-3xl" style={{ color: isActive ? color : '#666' }}>
                    {count}
                </span>
            </div>
            <div className="flex flex-col mt-1">
                <span className="text-white font-bold font-mono text-xs">{name}</span>
                <span className="text-[#888] font-mono text-[10px] mt-1">单耗: {cost}</span>
            </div>
        </div>
    );
};
