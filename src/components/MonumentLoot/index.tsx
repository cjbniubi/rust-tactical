"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, MapPin, Radio, Crosshair, ChevronRight, Search } from 'lucide-react';
import { monumentsData } from '../../data/monumentsData';
import { audio } from '../../utils/audio';

export const MonumentLoot = () => {
    const [selectedId, setSelectedId] = useState<string>(monumentsData[0].id);
    const [search, setSearch] = useState('');

    const filteredMonuments = monumentsData.filter(m => 
        m.name.includes(search) || m.englishName.toLowerCase().includes(search.toLowerCase())
    );

    const activeMonument = monumentsData.find(m => m.id === selectedId) || monumentsData[0];

    const getRadiationColor = (level: string) => {
        switch(level) {
            case 'High': return 'text-red-500 border-red-500/30 bg-red-500/10';
            case 'Medium': return 'text-orange-500 border-orange-500/30 bg-orange-500/10';
            case 'Low': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
            default: return 'text-green-500 border-green-500/30 bg-green-500/10';
        }
    };

    const getCardColor = (card: string) => {
        switch(card) {
            case 'Red': return 'bg-red-500/20 text-red-400 border-red-500/50';
            case 'Blue': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
            case 'Green': return 'bg-green-500/20 text-green-400 border-green-500/50';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        }
    };

    return (
        <div className="w-full h-full flex flex-col md:flex-row bg-[#0f0f11] overflow-hidden">
            {/* Left Sidebar - Monument Selector */}
            <div className="w-full md:w-80 flex flex-col border-r border-[#222] bg-[#141417] shrink-0 h-[35vh] md:h-full">
                <div className="p-4 border-b border-[#222]">
                    <h2 className="text-xl font-bebas text-white flex items-center gap-2 mb-4 tracking-wide">
                        <Map className="text-[#cd4916]" size={20} />
                        资源点索引 (Monuments)
                    </h2>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="搜索资源点..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#1a1a1f] border border-[#333] text-sm text-white rounded py-2 pl-9 pr-3 focus:outline-none focus:border-[#cd4916] transition-colors"
                        />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {filteredMonuments.map(monument => (
                        <button
                            key={monument.id}
                            onClick={() => { audio.playClick(); setSelectedId(monument.id); }}
                            className={`w-full text-left p-3 rounded transition-all flex items-center justify-between group
                                ${selectedId === monument.id 
                                    ? 'bg-[rgba(205,73,22,0.15)] border border-[rgba(205,73,22,0.3)]' 
                                    : 'hover:bg-[rgba(255,255,255,0.03)] border border-transparent'
                                }
                            `}
                        >
                            <div>
                                <div className={`font-bold text-sm ${selectedId === monument.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                    {monument.name}
                                </div>
                                <div className="text-[10px] font-mono text-gray-500">
                                    {monument.englishName}
                                </div>
                            </div>
                            <ChevronRight size={16} className={selectedId === monument.id ? 'text-[#cd4916]' : 'text-[#333]'} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Main Panel - Loot Radar */}
            <div className="flex-1 h-[65vh] md:h-full flex flex-col relative overflow-hidden">
                {/* Background radar animation */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full animate-[ping_4s_ease-out_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white rounded-full animate-[ping_4s_ease-out_infinite_delay-2s]" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-10"
                    >
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-white">{activeMonument.name}</h1>
                                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#333] text-white">
                                        {activeMonument.type}
                                    </span>
                                </div>
                                <div className="text-gray-400 text-sm font-mono flex items-center gap-2">
                                    <MapPin size={14} /> {activeMonument.englishName}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className={`flex flex-col items-center p-2 px-4 rounded border ${getRadiationColor(activeMonument.radiation)}`}>
                                    <Radio size={16} className="mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Rad: {activeMonument.radiation}</span>
                                </div>
                                {activeMonument.cardsRequired.length > 0 ? (
                                    <div className="flex flex-col items-center p-2 px-4 rounded border border-[#333] bg-[#1a1a1f]">
                                        <div className="flex gap-1 mb-1">
                                            {activeMonument.cardsRequired.map(card => (
                                                <div key={card} className={`w-4 h-4 rounded-sm border ${getCardColor(card)}`} title={`${card} Card`} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">Keycards</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-2 px-4 rounded border border-[#333] bg-[#1a1a1f]">
                                        <span className="text-xs font-bold text-gray-500 uppercase">No Cards</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed mb-8 bg-[#1a1a1f] p-4 rounded border border-[#222]">
                            {activeMonument.description}
                        </p>

                        {/* Crates Distribution */}
                        <h3 className="text-xl font-bebas text-white mb-4 flex items-center gap-2">
                            <Crosshair className="text-[#cd4916]" size={18} />
                            物资分布解析 (Loot Distribution)
                        </h3>

                        <div className="space-y-6">
                            {activeMonument.crates.map(crate => (
                                <div key={crate.id} className="bg-[#141417] border border-[#222] rounded-lg overflow-hidden">
                                    {/* Crate Header */}
                                    <div className="bg-[#1a1a1f] p-3 px-4 border-b border-[#222] flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: crate.color, backgroundColor: crate.color }} />
                                            <span className="font-bold text-white text-sm">{crate.name}</span>
                                        </div>
                                        <div className="text-xs font-mono text-gray-500 bg-[#0f0f11] px-2 py-1 rounded">
                                            刷新数量: <strong className="text-white">{crate.count}</strong>
                                        </div>
                                    </div>

                                    {/* Crate Loot Table */}
                                    <div className="p-4">
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {crate.lootTable.map((item, idx) => (
                                                <div key={idx} className="bg-[rgba(255,255,255,0.02)] border border-[#333] rounded p-2 hover:border-[#cd4916] transition-colors group flex flex-col justify-between">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-8 h-8 rounded bg-[#1a1a1f] border border-[#333] flex items-center justify-center shrink-0 p-1">
                                                            <img 
                                                                src={`https://rustlabs.com/img/items180/${item.shortname}.png`} 
                                                                alt={item.name}
                                                                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform"
                                                                loading="lazy"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-xs font-bold text-gray-200 group-hover:text-white mb-0.5 truncate" title={item.name}>
                                                                {item.name}
                                                            </div>
                                                            <div className="text-[9px] text-gray-500 font-mono mb-2 truncate" title={item.englishName}>
                                                                {item.englishName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className="text-[#cd4916] font-mono font-bold text-xs">{item.chance.toFixed(1)}%</span>
                                                        <span className="text-[10px] text-gray-400 bg-[#1a1a1f] px-1 rounded">x{item.quantity}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
