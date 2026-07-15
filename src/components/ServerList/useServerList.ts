import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { audio } from '../../utils/audio';

export interface ServerData {
    id: string;
    name: string;
    ip: string;
    port: number;
    players: number;
    maxPlayers: number;
    queued: number;
    rank: number;
    status: string;
    map: string;
    type: string;
    headerImage?: string;
    lastWipe?: string;
    nextWipe?: string;
    seed?: number;
    worldSize?: number;
    description: string;
    ping: number;
}

const IMAGES = [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800"
];

export type SortKey = 'players' | 'ping' | 'name';

const getStoredFavorites = (): string[] => {
    try {
        return JSON.parse(localStorage.getItem('rust_favorites') || '[]');
    } catch {
        return [];
    }
};

const toggleStoredFavorite = (id: string) => {
    let favs = getStoredFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(fid => fid !== id);
    } else {
        favs.push(id);
    }
    localStorage.setItem('rust_favorites', JSON.stringify(favs));
    return favs;
};

export const useServerList = (options: { autoSelectFirst?: boolean, initialServers?: ServerData[] } = {}) => {
    const { autoSelectFirst = true, initialServers = [] } = options;
    const [activeTab, setActiveTab] = useState<string>('community');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    
    const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    
    const [sortKey, setSortKey] = useState<SortKey>('players');
    const [sortDesc, setSortDesc] = useState<boolean>(true);
    
    const [servers, setServers] = useState<ServerData[]>(initialServers);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    useEffect(() => {
        setFavorites(getStoredFavorites());
    }, []);

    const fetchServers = useCallback(async (isLoadMore = false) => {
        if (isLoadMore && !nextUrl) return;
        
        if (isLoadMore) setIsLoadingMore(true);
        else setIsRefreshing(true);
        
        try {
            let currentUrl = (isLoadMore && nextUrl) ? nextUrl : `https://api.battlemetrics.com/servers?filter[game]=rust&sort=-players&page[size]=100`;
            
            if (!isLoadMore && debouncedSearch) {
                currentUrl += `&filter[search]=${encodeURIComponent(debouncedSearch)}`;
            }

            let allParsed: ServerData[] = [];
            let currentNextUrl = null;
            let pagesFetched = 0;
            const maxPages = debouncedSearch ? 1 : 5;

            while (pagesFetched < maxPages) {
                const res = await fetch(currentUrl);
                const json = await res.json();
                
                if (json && json.data) {
                    currentNextUrl = json.links?.next || null;
                    
                    const parsed: ServerData[] = json.data.map((item: any) => {
                        const attrs = item.attributes;
                        const details = attrs.details || {};
                        return {
                            id: attrs.id,
                            name: attrs.name,
                            ip: attrs.ip || attrs.address || '0.0.0.0',
                            port: attrs.port,
                            players: attrs.players,
                            maxPlayers: attrs.maxPlayers,
                            queued: details.rust_queued_players || 0,
                            rank: attrs.rank,
                            status: attrs.status,
                            map: details.map || details.rust_maps?.map || 'Procedural Map',
                            type: details.rust_type || activeTab,
                            headerImage: details.rust_headerimage || IMAGES[Math.floor(Math.random() * IMAGES.length)],
                            lastWipe: details.rust_last_wipe || '',
                            nextWipe: details.rust_next_wipe || '',
                            seed: details.rust_world_seed || 0,
                            worldSize: details.rust_world_size || 0,
                            description: details.rust_description || 'Welcome to this server!',
                            ping: Math.floor(Math.random() * 80) + 10 
                        };
                    });
                    
                    allParsed = [...allParsed, ...parsed];
                    
                    if (!currentNextUrl) break;
                    
                    let matchingCount = allParsed.length;
                    if (activeTab !== 'favorites' && !debouncedSearch) {
                        matchingCount = allParsed.filter(s => {
                            if (activeTab === 'official') return s.type === 'official' || s.name.toLowerCase().includes('official');
                            if (activeTab === 'community') return s.type === 'community' || (!s.name.toLowerCase().includes('x') && s.type !== 'official');
                            if (activeTab === 'modded') return s.type === 'modded' || s.name.toLowerCase().includes('x');
                            return true;
                        }).length;
                    }
                    
                    if (matchingCount >= 40) {
                        break;
                    }
                    currentUrl = currentNextUrl;
                } else {
                    break;
                }
                pagesFetched++;
            }
            
            setNextUrl(currentNextUrl);
            
            if (isLoadMore) {
                setServers(prev => {
                    const existingIds = new Set(prev.map(p => p.id));
                    const uniqueNew = allParsed.filter(p => !existingIds.has(p.id));
                    return [...prev, ...uniqueNew];
                });
            } else {
                setServers(allParsed);
            }
        } catch (err) {
            console.error('Failed to fetch servers', err);
        } finally {
            setIsRefreshing(false);
            setIsLoadingMore(false);
        }
    }, [activeTab, debouncedSearch, nextUrl]);

    // We only trigger automatic fetch when tab or search changes, and ONLY if we don't have initial servers for the active tab (optimization)
    useEffect(() => {
        if (initialServers.length > 0 && activeTab === 'community' && !debouncedSearch && servers.length > 0) {
            return; // Skip initial client fetch because SSR already provided it
        }
        fetchServers(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, debouncedSearch]);

    const filteredServers = useMemo(() => {
        let results = [...servers];
        
        // Final client-side pass to enforce tabs as strictly as possible
        if (activeTab === 'favorites') {
            results = results.filter(s => favorites.includes(s.id));
        } else if (!debouncedSearch) {
            // Only strictly filter if user didn't search. If they search, show whatever API gave us
            // to prevent "no results" empty tabs when API returns something slightly categorized wrong
            results = results.filter(s => {
                if (activeTab === 'official') return s.type === 'official' || s.name.toLowerCase().includes('official');
                if (activeTab === 'community') return s.type === 'community' || (!s.name.toLowerCase().includes('x') && s.type !== 'official');
                if (activeTab === 'modded') return s.type === 'modded' || s.name.toLowerCase().includes('x');
                return true;
            });
        }
        
        return results.sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];
            
            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
            }
            
            if (valA > valB) return sortDesc ? -1 : 1;
            if (valA < valB) return sortDesc ? 1 : -1;
            return 0;
        });
    }, [servers, sortKey, sortDesc, activeTab, favorites, debouncedSearch]);


    useEffect(() => {
        if (autoSelectFirst && filteredServers.length > 0 && !selectedServerId) {
            setSelectedServerId(filteredServers[0].id);
        }
    }, [filteredServers, selectedServerId, autoSelectFirst]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 200) {
            if (nextUrl && !isLoadingMore) {
                // Fetch next page from API when scrolling to bottom
                fetchServers(true);
            }
        }
    };

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDesc(!sortDesc);
        } else {
            setSortKey(key);
            setSortDesc(key !== 'name');
        }
    };

    const selectedServer = useMemo(() => filteredServers.find(s => s.id === selectedServerId), [filteredServers, selectedServerId]);

    const handleJoin = useCallback((ip?: string, port?: number) => {
        const targetIp = ip || selectedServer?.ip;
        const targetPort = port || selectedServer?.port;
        if (targetIp && targetPort) {
            audio.playClick();
            navigator.clipboard.writeText(`client.connect ${targetIp}:${targetPort}`);
            alert(`已复制 "client.connect ${targetIp}:${targetPort}" 到剪贴板！\n在游戏中按 F1 打开控制台并粘贴加入。`);
        }
    }, [selectedServer]);

    const handleRowSelect = useCallback((id: string) => {
        audio.playHover();
        setSelectedServerId(id);
    }, []);
    
    const handleRowFav = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        audio.playClick();
        setFavorites(toggleStoredFavorite(id));
    }, []);

    const handleRefresh = () => {
        audio.playClick();
        fetchServers(false);
    };

    const handleTabClick = (tab: string) => {
        audio.playClick();
        setActiveTab(tab);
        setSelectedServerId(null);
    };

    return {
        activeTab,
        searchQuery,
        setSearchQuery,
        selectedServerId,
        setSelectedServerId,
        favorites,
        sortKey,
        sortDesc,
        isRefreshing,
        isLoadingMore,
        filteredServers,
        selectedServer,
        handleScroll,
        handleSort,
        handleJoin,
        handleRowSelect,
        handleRowFav,
        handleRefresh,
        handleTabClick,
        nextUrl,
        fetchServers
    };
};
