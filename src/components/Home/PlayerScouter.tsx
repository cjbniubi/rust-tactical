"use client";

import { useState } from 'react';
import { Search, ShieldAlert, Crosshair, ExternalLink, Loader2, Target } from 'lucide-react';
import { audio } from '../../utils/audio';

interface PlayerProfile {
    steamID64: string;
    username: string;
    avatar: string;
    vacBanned: boolean;
    tradeBanState: string;
    isLimitedAccount: boolean;
    memberSince: string;
    location: string;
    privacyState: string;
}

export const PlayerScouter = () => {
    const [steamId, setSteamId] = useState('');
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<PlayerProfile | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!steamId.trim()) return;
        audio.playClick();
        setLoading(true);
        setError('');
        setProfile(null);
        
        try {
            const res = await fetch(`/api/scout?steamid=${encodeURIComponent(steamId.trim())}`);
            const data = await res.json();
            
            if (res.ok && data.steamID64) {
                setProfile(data);
            } else {
                setError(data.error || '未找到该玩家 (Player not found)');
            }
        } catch (err) {
            setError('查询失败，请检查 SteamID (Query failed)');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    const openLink = (url: string) => {
        audio.playClick();
        window.open(url, '_blank');
    };

    return (
        <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-5 h-full flex flex-col relative overflow-hidden group hover:border-[#cd4916] transition-colors">
            {/* Background design element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                <Target size={200} />
            </div>

            <div className="flex items-center gap-2 text-white mb-4 relative z-10">
                <ShieldAlert size={18} className="text-[#cd4916]" />
                <h3 className="font-bebas tracking-wide text-lg uppercase">玩家侦测枢纽 (Player Scouter)</h3>
            </div>
            
            <div className="relative z-10 flex gap-2 mb-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Search size={14} />
                    </div>
                    <input
                        type="text"
                        value={steamId}
                        onChange={(e) => setSteamId(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="输入 SteamID64..."
                        className="w-full bg-[#141417] border border-[#222] text-sm text-white rounded py-2 pl-9 pr-3 focus:outline-none focus:border-[#cd4916] transition-colors font-mono"
                    />
                </div>
                <button 
                    onClick={handleSearch}
                    disabled={loading || !steamId.trim()}
                    className="bg-[#cd4916] hover:bg-[#a63910] text-white px-4 py-2 rounded text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <span>侦测</span>}
                </button>
            </div>

            {error && (
                <div className="text-[#cd4916] text-xs font-mono bg-[rgba(205,73,22,0.1)] p-2 rounded border border-[rgba(205,73,22,0.2)] mb-4 text-center">
                    {error}
                </div>
            )}

            {!profile && !error && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-600 opacity-50 mb-2">
                    <Crosshair size={32} className="mb-2" />
                    <span className="text-xs font-mono">等待侦测目标...</span>
                </div>
            )}

            {profile && (
                <div className="flex-1 flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-4 bg-[#141417] border border-[#222] p-3 rounded mb-4 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
                        <img 
                            src={profile.avatar} 
                            alt={profile.username}
                            className="w-12 h-12 rounded border border-[#333]"
                        />
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-lg truncate max-w-[180px]">{profile.username}</span>
                            <span className="text-[10px] text-gray-500 font-mono">{profile.steamID64}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                        <div className={`flex-1 p-2 rounded border flex flex-col items-center justify-center ${profile.vacBanned ? 'bg-[rgba(205,73,22,0.1)] border-[#cd4916]' : 'bg-[rgba(255,255,255,0.02)] border-[#333]'}`}>
                            <span className={`text-[10px] font-mono mb-1 ${profile.vacBanned ? 'text-[#cd4916]' : 'text-gray-500'}`}>VAC 封禁状态</span>
                            <span className={`font-bebas text-lg ${profile.vacBanned ? 'text-[#cd4916] animate-pulse' : 'text-[#6d8e48]'}`}>
                                {profile.vacBanned ? 'BANNED (外挂)' : 'CLEAN (干净)'}
                            </span>
                        </div>
                        <div className={`flex-1 p-2 rounded border flex flex-col items-center justify-center ${profile.isLimitedAccount ? 'bg-[rgba(255,255,100,0.05)] border-[#a89032]' : 'bg-[rgba(255,255,255,0.02)] border-[#333]'}`}>
                            <span className={`text-[10px] font-mono mb-1 ${profile.isLimitedAccount ? 'text-[#a89032]' : 'text-gray-500'}`}>受限账户 (黑号风险)</span>
                            <span className={`font-bebas text-lg ${profile.isLimitedAccount ? 'text-[#a89032]' : 'text-gray-300'}`}>
                                {profile.isLimitedAccount ? 'YES (高风险)' : 'NO'}
                            </span>
                        </div>
                        <div className="flex-1 p-2 rounded border border-[#333] bg-[rgba(255,255,255,0.02)] flex flex-col items-center justify-center">
                            <span className="text-[10px] font-mono text-gray-500 mb-1">注册时间 (信誉参考)</span>
                            <span className="font-bebas text-lg text-gray-300 truncate w-full text-center">
                                {profile.memberSince || '未知/隐私'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="text-[10px] text-gray-500 mb-2 font-mono flex items-center justify-between mt-auto">
                        <span>权威追踪器深层链路 (Deep Links):</span>
                        <span className="text-[#cd4916] animate-pulse">■ RECORDING</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <button 
                            onClick={() => openLink(`https://www.battlemetrics.com/players?filter[search]=${profile.steamID64}`)}
                            className="flex items-center justify-between bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[#222] hover:border-[#cd4916] p-2 rounded transition-all group"
                        >
                            <span className="text-xs font-bold text-gray-300 group-hover:text-white">BattleMetrics 游戏时间</span>
                            <ExternalLink size={12} className="text-gray-600 group-hover:text-[#cd4916]" />
                        </button>
                        <button 
                            onClick={() => openLink(`https://ruststats.gg/profile/${profile.steamID64}`)}
                            className="flex items-center justify-between bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[#222] hover:border-[#cd4916] p-2 rounded transition-all group"
                        >
                            <span className="text-xs font-bold text-gray-300 group-hover:text-white">RustStats 评分详情</span>
                            <ExternalLink size={12} className="text-gray-600 group-hover:text-[#cd4916]" />
                        </button>
                        <button 
                            onClick={() => openLink(`https://steamrep.com/search?q=${profile.steamID64}`)}
                            className="flex items-center justify-between bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[#222] hover:border-[#cd4916] p-2 rounded transition-all group"
                        >
                            <span className="text-xs font-bold text-gray-300 group-hover:text-white">SteamRep 封禁查询</span>
                            <ExternalLink size={12} className="text-gray-600 group-hover:text-[#cd4916]" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
