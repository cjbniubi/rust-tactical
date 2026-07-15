"use client";

import React from 'react';
import { Search, RefreshCw, Star, Map as MapIcon, Users, Globe, ArrowUpDown, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServerDetailsContent } from './Shared';
import type { ServerData, SortKey } from './useServerList';
import { audio } from '../../utils/audio';

const ServerMobileCard = React.memo(({ 
    server, isSelected, isFav, onToggleFav, onSelect
}: { 
    server: ServerData, isSelected: boolean, isFav: boolean, 
    onToggleFav: (id: string, e: React.MouseEvent) => void, 
    onSelect: (id: string) => void
}) => {
    const isFull = server.players >= server.maxPlayers;
    
    return (
        <div 
            className={`
                flex flex-col p-4 rounded-xl border mb-3 relative overflow-hidden transition-all active:scale-[0.98]
                ${isSelected 
                    ? 'bg-[rgba(255,255,255,0.1)] border-white shadow-lg' 
                    : 'bg-[rgba(0,0,0,0.3)] border-[rgba(255,255,255,0.05)]'}
            `}
            onClick={() => { audio.playClick(); onSelect(server.id); }}
        >
            <div className="flex justify-between items-start mb-3 gap-3">
                <h3 className={`font-bebas text-xl leading-tight line-clamp-2 flex-1 break-all ${isSelected ? 'text-white drop-shadow' : 'text-[#ddd]'}`}>
                    {server.name}
                </h3>
                <button 
                    className="shrink-0 p-2 -mr-2 -mt-2 active:scale-90 transition-transform cursor-pointer"
                    onClick={(e) => onToggleFav(server.id, e)}
                >
                    <Star size={22} className={isFav ? 'text-[#cd4916] fill-current drop-shadow' : 'text-[#555]'} />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#888] mt-auto">
                <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
                    <Users size={12} className={isFull ? 'text-[#cd4916]' : 'text-[#aaa]'} />
                    <span className={isFull ? 'text-[#cd4916] font-bold' : 'text-[#ccc]'}>
                        {server.players}/{server.maxPlayers}
                        {server.queued > 0 && <span className="ml-1">(+{server.queued})</span>}
                    </span>
                </div>
                
                <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded max-w-full">
                    <MapIcon size={12} className="shrink-0" />
                    <span className="text-[#ccc] truncate flex-1">{server.map}</span>
                </div>

                <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
                    <Globe size={12} className="text-[#6d8e48]" />
                    <span className="text-[#6d8e48] font-bold">{server.ping}ms</span>
                </div>
            </div>
        </div>
    );
});
ServerMobileCard.displayName = 'ServerMobileCard';

export const MobileServerList = (props: any) => {
    const {
        activeTab, searchQuery, setSearchQuery, selectedServerId, setSelectedServerId,
        favorites, sortKey, sortDesc, isRefreshing, isLoadingMore, filteredServers,
        selectedServer, handleScroll, handleSort, handleJoin, handleRowSelect,
        handleRowFav, handleRefresh, handleTabClick, nextUrl, fetchServers
    } = props;

    const tabClass = (tab: string) => 
        `px-4 py-2 text-center cursor-pointer font-bebas text-lg transition-all tracking-widest rounded-t-md border-b-2 whitespace-nowrap shrink-0 ` +
        (activeTab === tab 
            ? 'text-white border-white bg-[rgba(255,255,255,0.1)]' 
            : 'text-[#888] border-transparent hover:text-[#ccc] hover:bg-[rgba(255,255,255,0.02)]');
            
    const SortIcon = ({ colKey }: { colKey: SortKey }) => {
        if (sortKey !== colKey) return <ArrowUpDown size={12} className="inline ml-1 opacity-20" />;
        return <ArrowUpDown size={12} className={`inline ml-1 text-white ${sortDesc ? 'rotate-180' : ''} transition-transform`} />;
    };

    return (
        <div className="flex flex-col h-full overflow-hidden relative">
            <div className="flex flex-col w-full bg-[rgba(10,10,12,0.95)] border-b border-[rgba(255,255,255,0.1)] pt-4 px-4 gap-3">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    <div className={tabClass('official')} onClick={() => handleTabClick('official')}>官服</div>
                    <div className={tabClass('community')} onClick={() => handleTabClick('community')}>社区服</div>
                    <div className={tabClass('modded')} onClick={() => handleTabClick('modded')}>模组服</div>
                    <div className={tabClass('favorites')} onClick={() => handleTabClick('favorites')}>收藏</div>
                </div>

                <div className="flex flex-col gap-3 pb-3">
                    <div className="flex-1 relative w-full">
                        <input 
                            type="text" 
                            className="rust-input w-full px-4 py-2 pl-10 font-mono text-sm rounded shadow-inner" 
                            placeholder="搜索服务器..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search size={16} className="text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    
                    <div className="flex gap-2">
                        <select className="rust-input flex-1 px-4 py-2 font-mono text-sm rounded appearance-none cursor-pointer">
                            <option>所有地图</option>
                            <option>程序化生成</option>
                            <option>荒芜地图</option>
                        </select>
                        <button 
                            className="rust-input px-4 py-2 font-mono text-sm rounded hover:bg-[rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
                            onClick={handleRefresh}
                        >
                            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col bg-[rgba(15,15,18,0.6)] relative z-0">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(20,20,25,0.98)] shadow-sm">
                    <span className="text-[#888] font-mono text-xs">排序方式:</span>
                    <div className="flex gap-4">
                        <button className="text-[#aaa] active:text-white font-mono text-xs flex items-center transition-colors cursor-pointer" onClick={() => handleSort('players')}>
                            玩家数 <SortIcon colKey="players" />
                        </button>
                        <button className="text-[#aaa] active:text-white font-mono text-xs flex items-center transition-colors cursor-pointer" onClick={() => handleSort('ping')}>
                            延迟 <SortIcon colKey="ping" />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto flex-1 custom-scrollbar p-4 pb-[80px]" onScroll={handleScroll}>
                    <div className="flex flex-col">
                        {filteredServers.map((s: any) => (
                            <ServerMobileCard 
                                key={s.id} 
                                server={s} 
                                isSelected={s.id === selectedServerId}
                                isFav={favorites.includes(s.id)}
                                onToggleFav={handleRowFav}
                                onSelect={handleRowSelect}
                            />
                        ))}
                    </div>
                    
                    {filteredServers.length === 0 && (
                        <div className="text-center p-12 text-[#555] font-mono text-sm">
                            未找到匹配的服务器
                        </div>
                    )}
                    
                    {isLoadingMore ? (
                        <div className="text-center p-4 text-[#cd4916] font-mono text-[10px] animate-pulse">
                            正在向 BattleMetrics 获取更多数据...
                        </div>
                    ) : nextUrl ? (
                        <div className="text-center p-4">
                            <button 
                                className="px-6 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded font-mono text-sm text-[#aaa] hover:text-white transition-colors cursor-pointer"
                                onClick={() => fetchServers(true)}
                            >
                                获取更多服务器...
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>

            <AnimatePresence>
                {selectedServer && (
                    <motion.div 
                        className="fixed inset-0 z-[100] bg-[rgba(15,15,18,1)] flex flex-col overflow-hidden shadow-2xl"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="h-14 flex items-center px-4 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(20,20,25,0.95)] shrink-0 z-10">
                            <button 
                                onClick={() => { audio.playClick(); setSelectedServerId(null); }} 
                                className="flex items-center text-[#aaa] active:text-white transition-colors cursor-pointer py-2 pl-0 pr-4"
                            >
                                <ChevronLeft size={24} className="mr-1" /> 
                                <span className="font-bebas text-lg tracking-widest mt-1">BACK</span>
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto bg-[rgba(10,10,12,1)]">
                            <ServerDetailsContent selectedServer={selectedServer} handleJoin={handleJoin} handleRowFav={handleRowFav} favorites={favorites} setSelectedServerId={setSelectedServerId} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
