"use client";

import React from 'react';
import { Search, RefreshCw, Star, Map as MapIcon, Users, Globe, ArrowUpDown } from 'lucide-react';
import { ServerDetailsContent } from './Shared';
import type { ServerData, SortKey } from './useServerList';
import { audio } from '../../utils/audio';

const ServerRow = React.memo(({ 
    server, index, isSelected, isFav, onToggleFav, onSelect, onDoubleClick 
}: { 
    server: ServerData, index: number, isSelected: boolean, isFav: boolean, 
    onToggleFav: (id: string, e: React.MouseEvent) => void, 
    onSelect: (id: string) => void, onDoubleClick: (ip: string, port: number) => void 
}) => {
    const isFull = server.players >= server.maxPlayers;
    const isEven = index % 2 === 0;
    
    return (
        <tr 
            className={`
                cursor-pointer transition-all font-mono text-sm border-l-2 active:scale-[0.99] active:bg-[rgba(255,255,255,0.08)]
                ${isSelected 
                    ? 'bg-[rgba(255,255,255,0.1)] border-white' 
                    : `border-transparent ${isEven ? 'bg-[rgba(255,255,255,0.02)]' : 'bg-transparent'} hover:bg-[rgba(255,255,255,0.05)]`}
            `}
            onClick={() => { audio.playClick(); onSelect(server.id); }} 
            onDoubleClick={() => { audio.playClick(); onDoubleClick(server.ip, server.port); }}
        >
            <td className="p-3 text-center" onClick={(e) => onToggleFav(server.id, e)}>
                <Star size={14} className={`mx-auto transition-colors ${isFav ? 'text-[#cd4916] fill-current' : 'text-[#444] hover:text-[#888]'}`} />
            </td>
            <td className="p-3">
                <span className={`block max-w-[350px] truncate ${isSelected ? 'text-white font-bold' : 'text-[#ddd]'}`}>
                    {server.name}
                </span>
            </td>
            <td className="p-3">
                <span className={isFull ? 'text-[#cd4916]' : (isSelected ? 'text-white' : 'text-[#aaa]')}>
                    {server.players} <span className="text-[#666]">/ {server.maxPlayers}</span>
                    {server.queued > 0 && <span className="text-[#cd4916] ml-2 font-bold">(+{server.queued})</span>}
                </span>
            </td>
            <td className="p-3">
                <span className={`block truncate ${isSelected ? 'text-[#ddd]' : 'text-[#888]'}`}>
                    {server.map}
                </span>
            </td>
            <td className="p-3 text-center font-mono font-bold text-[#6d8e48]">
                {server.ping}
            </td>
        </tr>
    );
});
ServerRow.displayName = 'ServerRow';

export const DesktopServerList = (props: any) => {
    const {
        activeTab, searchQuery, setSearchQuery, selectedServerId, setSelectedServerId,
        favorites, sortKey, sortDesc, isRefreshing, isLoadingMore, filteredServers,
        selectedServer, handleScroll, handleSort, handleJoin, handleRowSelect,
        handleRowFav, handleRefresh, handleTabClick, nextUrl, fetchServers
    } = props;

    const tabClass = (tab: string) => 
        `px-6 py-2 text-center cursor-pointer font-bebas text-2xl transition-all tracking-widest rounded-t-md border-b-2 ` +
        (activeTab === tab 
            ? 'text-white border-white bg-[rgba(255,255,255,0.1)]' 
            : 'text-[#888] border-transparent hover:text-[#ccc] hover:bg-[rgba(255,255,255,0.02)]');
            
    const SortIcon = ({ colKey }: { colKey: SortKey }) => {
        if (sortKey !== colKey) return <ArrowUpDown size={12} className="inline ml-1 opacity-20" />;
        return <ArrowUpDown size={12} className={`inline ml-1 text-white ${sortDesc ? 'rotate-180' : ''} transition-transform`} />;
    };

    return (
        <div className="flex flex-col h-full overflow-hidden relative">
            <div className="flex flex-col w-full bg-[rgba(10,10,12,0.95)] border-b border-[rgba(255,255,255,0.1)] pt-4 px-6 gap-4">
                <div className="flex gap-2">
                    <div className={tabClass('official')} onClick={() => handleTabClick('official')}>官服</div>
                    <div className={tabClass('community')} onClick={() => handleTabClick('community')}>社区服</div>
                    <div className={tabClass('modded')} onClick={() => handleTabClick('modded')}>模组服</div>
                    <div className={tabClass('favorites')} onClick={() => handleTabClick('favorites')}>收藏</div>
                </div>

                <div className="flex gap-4 items-center pb-4">
                    <div className="flex-1 relative max-w-md">
                        <input 
                            type="text" 
                            className="rust-input w-full px-4 py-2 pl-10 font-mono text-sm rounded shadow-inner" 
                            placeholder="搜索服务器..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search size={16} className="text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>

                    <select className="rust-input px-4 py-2 font-mono text-sm rounded w-[150px] appearance-none cursor-pointer">
                        <option>所有地图</option>
                        <option>程序化生成</option>
                        <option>荒芜地图</option>
                    </select>

                    <button 
                        className="rust-input px-4 py-2 font-mono text-sm rounded hover:bg-[rgba(255,255,255,0.1)] flex items-center gap-2 transition-colors ml-auto cursor-pointer"
                        onClick={handleRefresh}
                    >
                        <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                        刷新列表
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col bg-[rgba(15,15,18,0.6)]">
                    <div className="overflow-y-auto flex-1 custom-scrollbar" onScroll={handleScroll}>
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 z-10 bg-[rgba(20,20,25,0.98)] shadow-md select-none border-b border-[rgba(255,255,255,0.05)]">
                                <tr className="text-[#888] font-mono text-xs uppercase tracking-wider">
                                    <th className="p-3 w-12 text-center">★</th>
                                    <th className="p-3 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                                        服务器名称 <SortIcon colKey="name" />
                                    </th>
                                    <th className="p-3 w-[150px] cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('players')}>
                                        <Users size={14} className="inline mr-2"/>玩家数 <SortIcon colKey="players" />
                                    </th>
                                    <th className="p-3 w-[180px]">
                                        <MapIcon size={14} className="inline mr-2"/>地图
                                    </th>
                                    <th className="p-3 w-[100px] text-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('ping')}>
                                        <Globe size={14} className="inline mr-2"/>延迟 <SortIcon colKey="ping" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredServers.map((s: any, index: number) => (
                                    <ServerRow 
                                        key={s.id} 
                                        server={s} 
                                        index={index}
                                        isSelected={s.id === selectedServerId}
                                        isFav={favorites.includes(s.id)}
                                        onToggleFav={handleRowFav}
                                        onSelect={handleRowSelect}
                                        onDoubleClick={handleJoin}
                                    />
                                ))}
                                {filteredServers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center p-12 text-[#555] font-mono text-lg">
                                            未找到匹配的服务器
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        {isLoadingMore ? (
                            <div className="text-center p-4 text-[#cd4916] font-mono text-xs animate-pulse">
                                正在向 BattleMetrics API 获取更多服务器...
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

                <div className={`relative h-auto w-[350px] bg-[rgba(25,25,30,0.8)] border-l border-[rgba(255,255,255,0.1)] flex flex-col transition-transform duration-300 ${!selectedServer ? 'translate-x-full absolute right-0' : 'translate-x-0'}`}>
                    <div className="flex flex-col h-full w-full">
                        {selectedServer && <ServerDetailsContent selectedServer={selectedServer} handleJoin={handleJoin} handleRowFav={handleRowFav} favorites={favorites} setSelectedServerId={setSelectedServerId} />}
                    </div>
                </div>
            </div>
        </div>
    );
};
