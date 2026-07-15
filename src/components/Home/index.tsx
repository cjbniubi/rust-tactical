"use client";

import { useState, useEffect } from 'react';
import { Activity, Users, Server, TrendingUp, AlertTriangle, Calendar, ChevronLeft, ChevronRight, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Changelog } from './Changelog';
import { PlayerScouter } from './PlayerScouter';
import { audio } from '../../utils/audio';

const useWipeCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [targetDate, setTargetDate] = useState<Date | null>(null);

    useEffect(() => {
        const getNextWipeDate = () => {
            const now = new Date();
            let wipeDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 19, 0, 0));
            while (wipeDate.getUTCDay() !== 4) {
                wipeDate.setUTCDate(wipeDate.getUTCDate() + 1);
            }
            if (wipeDate < now) {
                wipeDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 19, 0, 0));
                while (wipeDate.getUTCDay() !== 4) {
                    wipeDate.setUTCDate(wipeDate.getUTCDate() + 1);
                }
            }
            return wipeDate;
        };

        const target = getNextWipeDate();
        setTargetDate(target);

        const timer = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();
            
            if (diff <= 0) {
                setTargetDate(getNextWipeDate());
                return;
            }
            
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return { timeLeft, targetDate };
};

const getWipeDateForMonth = (year: number, month: number) => {
    let wipeDate = new Date(Date.UTC(year, month, 1, 19, 0, 0));
    while (wipeDate.getUTCDay() !== 4) {
        wipeDate.setUTCDate(wipeDate.getUTCDate() + 1);
    }
    return wipeDate;
};

const MiniCalendar = ({ targetDate }: { targetDate: Date }) => {
    const [viewDate, setViewDate] = useState(new Date(targetDate));

    useEffect(() => {
        setViewDate(new Date(targetDate));
    }, [targetDate]);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    // Calculate the wipe date for the currently viewed month
    const wipeDateForViewedMonth = getWipeDateForMonth(year, month);
    
    const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));
    
    // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    // Days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Generate grid
    const days = [];
    const prefixDays = firstDay === 0 ? 6 : firstDay - 1; // Assuming Monday is first day of week
    
    for (let i = 0; i < prefixDays; i++) {
        days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const isWipeDay = wipeDateForViewedMonth.getFullYear() === year && 
                          wipeDateForViewedMonth.getMonth() === month && 
                          wipeDateForViewedMonth.getDate() === i;
                          
        const now = new Date();
        const isToday = now.getDate() === i && now.getMonth() === month && now.getFullYear() === year;
        
        let classes = "w-full aspect-square text-center text-[10px] md:text-sm font-mono rounded flex flex-col items-center justify-center transition-all relative ";
        if (isWipeDay) {
            classes += "bg-[#cd4916] text-white font-bold shadow-[0_0_10px_rgba(210,73,22,0.5)] z-10 scale-110 border border-[#ff7a45]";
        } else if (isToday) {
            classes += "bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.3)] text-white font-bold";
        } else {
            classes += "text-gray-500 hover:text-white hover:bg-[rgba(255,255,255,0.05)] cursor-default";
        }
        
        days.push(
            <div key={i} className={classes}>
                <span className={(isWipeDay || isToday) ? "mb-2" : ""}>{i}</span>
                {isWipeDay && <span className="text-[9px] leading-none absolute bottom-1.5 text-[#ffdfd4] scale-90 whitespace-nowrap font-sans">清档</span>}
                {isToday && !isWipeDay && <span className="text-[9px] leading-none absolute bottom-1.5 text-white scale-90 opacity-90 whitespace-nowrap font-sans">今天</span>}
            </div>
        );
    }
    
    const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
    const monthName = viewDate.toLocaleString('zh-CN', { month: 'long', year: 'numeric' });
    
    return (
        <div className="flex-1 w-full flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2 px-1">
                <button onClick={handlePrevMonth} className="text-gray-500 hover:text-white transition-colors p-1 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded"><ChevronLeft size={16}/></button>
                <div className="text-center font-bebas text-gray-300 text-sm tracking-widest">{monthName}</div>
                <button onClick={handleNextMonth} className="text-gray-500 hover:text-white transition-colors p-1 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded"><ChevronRight size={16}/></button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {weekDays.map(d => (
                    <div key={d} className="text-center text-[10px] text-gray-600 mb-1">{d}</div>
                ))}
                {days}
            </div>
        </div>
    );
};

const WipeCountdown = () => {
    const { timeLeft, targetDate } = useWipeCountdown();

    if (!targetDate) return null;

    return (
        <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-5 relative overflow-hidden group hover:border-[#cd4916] transition-colors h-full flex flex-col">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#cd4916] rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity"></div>
            <div className="flex items-center gap-2 text-[#cd4916] mb-4">
                <Calendar size={18} />
                <h3 className="font-bebas tracking-wide text-lg uppercase">强制清档 (FORCE WIPE)</h3>
            </div>
            
            <div className="flex justify-between items-center bg-[#141417] rounded-md p-3 border border-[#222] mb-4 shadow-[inset_0_0_15px_rgba(210,80,26,0.03)]">
                <div className="text-center">
                    <div className="text-2xl font-bebas text-white leading-none">{timeLeft.days}</div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase mt-1">天</div>
                </div>
                <div className="text-gray-600 font-bebas">:</div>
                <div className="text-center">
                    <div className="text-2xl font-bebas text-white leading-none">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase mt-1">时</div>
                </div>
                <div className="text-gray-600 font-bebas">:</div>
                <div className="text-center">
                    <div className="text-2xl font-bebas text-white leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase mt-1">分</div>
                </div>
                <div className="text-gray-600 font-bebas">:</div>
                <div className="text-center">
                    <div className="text-2xl font-bebas text-[#cd4916] leading-none animate-pulse">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] font-mono text-[#cd4916] opacity-70 uppercase mt-1">秒</div>
                </div>
            </div>

            <div className="bg-[#141417] rounded-md p-3 border border-[#222] flex-1 mb-4 flex flex-col">
                <MiniCalendar targetDate={targetDate} />
            </div>
            
            <div className="text-[10px] font-mono text-gray-500 text-center bg-[#141417] p-2 rounded border border-[#222]">
                下一次清档: {targetDate.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export const Home = () => {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('https://api.battlemetrics.com/games/rust');
                const json = await res.json();
                if (json && json.data && json.data.attributes) {
                    setStats(json.data.attributes);
                }
            } catch (e) {
                console.error("Failed to fetch game stats", e);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#141417]">
                <div className="text-[#cd4916] animate-pulse font-mono flex flex-col items-center gap-4">
                    <Activity size={32} className="animate-bounce" />
                    <span>正在连接至全球网络...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-[#141417] text-white p-6 md:p-12 custom-scrollbar relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bebas tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-[#888] mb-4 uppercase">
                        Rust 全球网络监控
                    </h1>
                    <p className="text-gray-400 font-mono text-sm md:text-base border-l-2 border-[#cd4916] pl-4 max-w-2xl leading-relaxed">
                        实时遥测与全球服务器状态概览。<br/>
                        数据直接采自 BattleMetrics 官方接口。
                    </p>
                </div>

                {stats ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* Current Players */}
                        <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-6 relative overflow-hidden group hover:border-[#cd4916] transition-colors">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#cd4916] rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity"></div>
                            <div className="flex items-center gap-3 text-[#cd4916] mb-4">
                                <Users size={20} />
                                <h3 className="font-bebas tracking-wide text-lg">当前在线玩家</h3>
                            </div>
                            <div className="text-4xl font-mono text-white mb-2">
                                {stats.players.toLocaleString()}
                            </div>
                            <div className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                实时在线
                            </div>
                        </div>

                        {/* 24h Peak */}
                        <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-6 relative overflow-hidden group hover:border-[#cd4916] transition-colors">
                            <div className="flex items-center gap-3 text-blue-400 mb-4">
                                <TrendingUp size={20} />
                                <h3 className="font-bebas tracking-wide text-lg">24小时峰值</h3>
                            </div>
                            <div className="text-4xl font-mono text-white mb-2">
                                {stats.maxPlayers24H.toLocaleString()}
                            </div>
                            <div className="text-xs font-mono text-gray-500 uppercase">
                                今日最高在线人数
                            </div>
                        </div>

                        {/* 30D Peak */}
                        <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-6 relative overflow-hidden group hover:border-[#cd4916] transition-colors">
                            <div className="flex items-center gap-3 text-purple-400 mb-4">
                                <Activity size={20} />
                                <h3 className="font-bebas tracking-wide text-lg">30天峰值</h3>
                            </div>
                            <div className="text-4xl font-mono text-white mb-2">
                                {stats.maxPlayers30D.toLocaleString()}
                            </div>
                            <div className="text-xs font-mono text-gray-500 uppercase">
                                本月最高在线人数
                            </div>
                        </div>

                        {/* Active Servers */}
                        <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-6 relative overflow-hidden group hover:border-[#cd4916] transition-colors">
                            <div className="flex items-center gap-3 text-yellow-500 mb-4">
                                <Server size={20} />
                                <h3 className="font-bebas tracking-wide text-lg">活跃服务器</h3>
                            </div>
                            <div className="text-4xl font-mono text-white mb-2">
                                {stats.servers.toLocaleString()}
                            </div>
                            <div className="text-xs font-mono text-gray-500 uppercase">
                                全球 Rust 服务器总数
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 flex items-start gap-4 text-red-200 font-mono text-sm mb-12">
                        <AlertTriangle className="shrink-0 text-red-500" />
                        <p>警告：遥测链路离线。无法从 BattleMetrics 获取全球 Rust 统计数据。</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
                    <div className="lg:col-span-3 h-[280px]">
                        <WipeCountdown />
                    </div>
                    <div className="lg:col-span-4 h-[280px]">
                        <PlayerScouter />
                    </div>
                    <div className="lg:col-span-5 md:col-span-2 h-[280px]">
                        <Changelog />
                    </div>
                </div>

                {/* Monument Loot Entry Banner */}
                <button 
                    onClick={() => { audio.playClick(); router.push('/monuments'); }}
                    className="w-full relative overflow-hidden group bg-[#1a1a1f] border border-[#333] hover:border-[#cd4916] rounded-lg p-6 mb-12 flex items-center justify-between text-left transition-all"
                >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-10 transition-opacity">
                        <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full animate-[ping_6s_ease-out_infinite]" />
                        <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white rounded-full animate-[ping_6s_ease-out_infinite_delay-3s]" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col max-w-2xl">
                        <div className="flex items-center gap-3 mb-2 text-white group-hover:text-[#cd4916] transition-colors">
                            <Map size={24} />
                            <h2 className="text-2xl font-bebas tracking-wide uppercase">资源点物资爆率百科 (Monument Loot Explorer)</h2>
                        </div>
                        <p className="text-gray-400 text-sm font-mono leading-relaxed">
                            洞察火箭基地、大型钻井平台等终极高资源区域的真实物资爆率。精准计算突击步枪 (AK47)、C4 炸药、骇客密码箱等高价值物品的出货概率，助您在搜刮与争夺中占据绝对优势。
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-[#cd4916] opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                        <span className="font-bold text-sm uppercase hidden sm:block">进入战术地图</span>
                        <ChevronRight size={24} />
                    </div>
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-8">
                        <h3 className="font-bebas text-2xl mb-4 text-[#cd4916] uppercase">欢迎来到 Rust Tactical (战术中心)</h3>
                        <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
                            这里是您的 Rust 生存中央指挥部。请使用导航栏在各战术模块间切换。
                        </p>
                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex gap-3">
                                <span className="text-[#cd4916]">{'>'}</span>
                                <div>
                                    <strong className="text-white">服务器情报：</strong> 实时全球服务器检索、分类过滤与直达连接。
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#cd4916]">{'>'}</span>
                                <div>
                                    <strong className="text-white">抄家模拟器：</strong> 精准计算爆炸物消耗、硫磺成本及最优抄家路线。
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="relative rounded-lg overflow-hidden border border-[#333] min-h-[250px] group">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.8),rgba(0,0,0,0.2)),radial-gradient(circle_at_top_right,rgba(210,80,26,0.4)_0%,transparent_60%)] bg-[#1a1a1f] z-10 pointer-events-none group-hover:scale-105 transition-transform duration-700"></div>
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="font-bebas text-3xl tracking-wider text-white mb-2 uppercase">保持警惕。努力生存。</div>
                            <div className="font-mono text-xs text-[#cd4916] uppercase border border-[#cd4916] inline-block px-2 py-1 rounded bg-black/50">
                                战术模块已激活
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
