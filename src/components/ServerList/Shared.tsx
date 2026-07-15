"use client";


import { Star, Clock, Play, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { audio } from '../../utils/audio';

export const ServerDetailsContent = ({ selectedServer, handleJoin, handleRowFav, favorites, setSelectedServerId }: any) => (
    <>
        <div className="h-[200px] relative overflow-hidden bg-black flex-shrink-0 rounded-t-3xl md:rounded-none">
            <div className="absolute top-4 right-4 z-10 md:hidden pt-4">
                <button onClick={() => { audio.playClick(); setSelectedServerId(null); }} className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white cursor-pointer hover:bg-black/60 shadow-lg active:scale-90 transition-transform">
                    <X size={20} />
                </button>
            </div>
            <div className="absolute inset-0 opacity-50 bg-[linear-gradient(45deg,rgba(0,0,0,0.8),rgba(0,0,0,0.2)),radial-gradient(circle_at_top_right,rgba(210,80,26,0.2)_0%,transparent_60%)] bg-[#1a1a1f]"></div>
            {selectedServer.headerImage && (
                <img 
                    src={selectedServer.headerImage} 
                    alt="Banner" 
                    className="absolute inset-0 w-full h-full object-cover opacity-70" 
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(25,25,30,1)] md:from-[rgba(25,25,30,1)] to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="font-bebas text-white text-3xl drop-shadow-md tracking-wide">
                    {selectedServer.map}
                </div>
                <button 
                    onClick={(e) => handleRowFav(selectedServer.id, e)}
                    className="hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                >
                    <Star size={24} className={favorites.includes(selectedServer.id) ? "text-[#cd4916] fill-current drop-shadow" : "text-white opacity-50"} />
                </button>
            </div>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            <div>
                <h2 className="font-bebas text-2xl text-white leading-tight mb-2 break-words">{selectedServer.name}</h2>
                <p className="text-[#888] text-xs font-mono">IP: {selectedServer.ip}:{selectedServer.port}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
                    <div className="text-[#888] text-xs uppercase mb-1 flex justify-between">
                        <span>玩家数</span>
                        {selectedServer.queued > 0 && <span className="text-[#cd4916]">排队 {selectedServer.queued}</span>}
                    </div>
                    <div className="font-mono text-lg text-white">
                        {selectedServer.players} <span className="text-[#555]">/ {selectedServer.maxPlayers}</span>
                    </div>
                </div>
                <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
                    <div className="text-[#888] text-xs uppercase mb-1">上次清档</div>
                    <div className="font-mono text-sm text-[#eee] flex items-center gap-1 mt-1">
                        <Clock size={12}/> 
                        {selectedServer.lastWipe ? formatDistanceToNow(new Date(selectedServer.lastWipe), { addSuffix: true }) : '未知'}
                    </div>
                </div>
                <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
                    <div className="text-[#888] text-xs uppercase mb-1">下次清档</div>
                    <div className="font-mono text-sm text-[#eee] flex items-center gap-1 mt-1">
                        <Clock size={12}/> 
                        {selectedServer.nextWipe ? formatDistanceToNow(new Date(selectedServer.nextWipe), { addSuffix: true }) : '未知'}
                    </div>
                </div>
                <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
                    <div className="text-[#888] text-xs uppercase mb-1">世界大小 / 种子</div>
                    <div className="font-mono text-sm text-white mt-1">
                        {selectedServer.worldSize || '?'} / {selectedServer.seed || '?'}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-[120px]">
                <div className="text-[#aaa] text-sm font-mono mb-2">服务器简介</div>
                <div className="text-[#bbb] text-xs font-mono leading-relaxed bg-[rgba(0,0,0,0.2)] p-3 rounded flex-1 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                    {selectedServer.description}
                </div>
            </div>

            <button 
                className="w-full bg-[#6d8e48] hover:bg-[#7b9f52] active:scale-95 text-white font-bebas text-3xl py-4 rounded shadow-lg transition-colors flex items-center justify-center gap-2 mt-auto flex-shrink-0 cursor-pointer"
                onClick={() => handleJoin()}
            >
                <Play size={20} fill="currentColor" />
                加入服务器
            </button>
        </div>
    </>
);
