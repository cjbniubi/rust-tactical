"use client";

import { useState, useEffect } from 'react';
import { Newspaper, FileText, Loader2, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
    gid: string;
    title: string;
    url: string;
    date: number;
    contents: string;
}

const parseBBCode = (text: string) => {
    if (!text) return '';
    let parsed = text
        .replace(/\[h1\]([\s\S]*?)\[\/h1\]/gi, '<h1 class="text-2xl font-bold font-bebas text-white mt-6 mb-3 border-b border-[#333] pb-2">$1</h1>')
        .replace(/\[h2\]([\s\S]*?)\[\/h2\]/gi, '<h2 class="text-xl font-bold font-bebas text-white mt-5 mb-2">$1</h2>')
        .replace(/\[h3\]([\s\S]*?)\[\/h3\]/gi, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
        .replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong class="font-bold text-white">$1</strong>')
        .replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<em class="italic">$1</em>')
        .replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u class="underline">$1</u>')
        .replace(/\[p\]([\s\S]*?)\[\/p\]/gi, '<p class="mb-4 text-gray-300 leading-relaxed">$1</p>')
        .replace(/\[url=(.*?)\]([\s\S]*?)\[\/url\]/gi, '<a href="$1" target="_blank" class="text-[#cd4916] hover:underline">$2</a>')
        // [img]url[/img]
        .replace(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" class="max-w-full rounded-md border border-[#333] my-4 shadow-lg mx-auto" />')
        // [img src="url" style="..."][/img]
        .replace(/\[img src="?(.*?)"?[^\]]*\]\[\/img\]/gi, '<img src="$1" class="max-w-full rounded-md border border-[#333] my-4 shadow-lg mx-auto" />')
        .replace(/\[list\]([\s\S]*?)\[\/list\]/gi, '<ul class="list-disc pl-6 mb-4 text-gray-300 space-y-1 marker:text-[#cd4916]">$1</ul>')
        .replace(/\[\*\]([^\n\[]*)/gi, '<li>$1</li>') 
        .replace(/\[previewyoutube=(.*?);.*?\].*?\[\/previewyoutube\]/gi, 
            '<div class="relative w-full aspect-video my-6"><iframe src="https://www.youtube.com/embed/$1" class="absolute top-0 left-0 w-full h-full rounded border border-[#333]" allowfullscreen></iframe></div>'
        );

    // Some simple linebreaks handling if people just typed \n without [p]
    parsed = parsed.replace(/\n\n/g, '<br /><br />');

    return parsed;
};

export const Changelog = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const targetUrl = 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=252490&count=20&format=json';
                const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
                if (!res.ok) throw new Error('Network error');
                
                const wrapper = await res.json();
                const data = JSON.parse(wrapper.contents);
                
                if (data?.appnews?.newsitems) {
                    const officialNews = data.appnews.newsitems
                        .filter((item: any) => item.feedname === 'steam_community_announcements')
                        .slice(0, 4);

                    // Translate titles automatically
                    for (let item of officialNews) {
                        try {
                            const translateRes = await fetch(`https://api.popcat.xyz/translate?to=zh-cn&text=${encodeURIComponent(item.title)}`);
                            if (translateRes.ok) {
                                const tData = await translateRes.json();
                                if (tData.translated) {
                                    item.title = tData.translated;
                                }
                            }
                        } catch (e) {
                            console.error("Translate failed for", item.title);
                        }
                    }
                    
                    setNews(officialNews);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-[#1a1a1f] border border-[#333] rounded-lg p-5 h-full flex flex-col relative overflow-hidden group hover:border-[#cd4916] transition-colors">
            
            <AnimatePresence>
                {selectedNews && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedNews(null)}
                    >
                        <motion.div 
                            className="bg-[#141417] border border-[#333] rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#222] bg-[#1a1a1f]">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedNews.title}</h2>
                                    <div className="text-xs font-mono text-gray-500">
                                        发布日期: {new Date(selectedNews.date * 1000).toLocaleString('zh-CN')}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedNews(null)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors shrink-0"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Translation Tip */}
                            <div className="bg-[rgba(205,73,22,0.1)] border-b border-[rgba(205,73,22,0.2)] p-3 px-4 md:px-6 flex items-start gap-3">
                                <Globe size={18} className="text-[#cd4916] shrink-0 mt-0.5" />
                                <div className="text-sm text-[#ffdfd4]">
                                    <strong className="block mb-1 font-bold">看不懂英文？</strong>
                                    正文保留了官方英文排版以保证图片不乱。您可以直接 <strong>右键点击此处下方空白处 -&gt; 选择“翻译成中文”</strong>，即可使用浏览器原生引擎瞬间完成高精度汉化阅读！
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar flex-1 bg-[#0f0f11]">
                                <div 
                                    className="text-gray-300 text-sm md:text-base changelog-content"
                                    dangerouslySetInnerHTML={{ __html: parseBBCode(selectedNews.contents) }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-2 text-white mb-4 relative z-10">
                <Newspaper size={18} className="text-[#cd4916]" />
                <h3 className="font-bebas tracking-wide text-lg uppercase">官方更新日志 (Changelog)</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                {loading && (
                    <div className="flex-1 flex items-center justify-center text-[#cd4916]">
                        <Loader2 className="animate-spin" size={24} />
                    </div>
                )}
                
                {error && !loading && (
                    <div className="text-sm text-gray-500 font-mono text-center mt-4">
                        无法连接到数据源。
                    </div>
                )}
                
                {!loading && !error && news.map((item) => (
                    <button 
                        key={item.gid}
                        onClick={() => setSelectedNews(item)}
                        className="group flex flex-col bg-[#141417] border border-[#222] p-3 rounded hover:border-[#cd4916] transition-colors text-left"
                    >
                        <div className="text-gray-200 text-sm font-bold mb-1 group-hover:text-white transition-colors line-clamp-2">
                            {item.title}
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 w-full mt-2">
                            <span>{new Date(item.date * 1000).toLocaleDateString('zh-CN')}</span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 text-[#cd4916] transition-opacity bg-[rgba(205,73,22,0.1)] px-2 py-1 rounded">
                                <span>在项目内阅读</span>
                                <FileText size={10} />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
