"use client";

import { useRouter, usePathname } from 'next/navigation';
import { audio } from '../utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ShieldAlert, Cpu, Hammer, Settings, LogOut, Home as HomeIcon } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';


const queryClient = new QueryClient();

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname === '/' ? '/home' : pathname;

  const handleMenuClick = (path: string) => {
    audio.playClick();
    if (path === 'home' && currentPath === '/home') {
        router.push('/');
    } else {
        router.push(`/${path}`);
    }
  };

  const handleHover = () => {
    audio.playHover();
  };

  const NavItem = ({ path, label, icon: Icon }: { path: string, label: string, icon: any }) => (
      <Link 
          href={path === 'home' && currentPath === '/home' ? '/' : `/${path}`}
          onClick={() => audio.playClick()}
          onMouseEnter={handleHover}
          className={`
              flex items-center gap-2 px-6 h-full font-sans text-base font-medium tracking-wide transition-all
              ${currentPath === `/${path}` ? 'text-white border-b-2 border-white bg-[rgba(255,255,255,0.05)]' : 'text-[#aaa] hover:text-white hover:bg-[rgba(255,255,255,0.02)]'}
          `}
      >
          <Icon size={18} className={currentPath === `/${path}` ? "text-white" : "text-[#888]"} />
          <span>{label}</span>
      </Link>
  );

  const MobileTabItem = ({ path, label, icon: Icon }: { path: string, label: string, icon: any }) => (
      <Link 
          href={path === 'home' && currentPath === '/home' ? '/' : `/${path}`}
          onClick={() => audio.playClick()}
          className={`
              flex flex-col items-center justify-center w-full h-full gap-1
              ${currentPath === `/${path}` ? 'text-white' : 'text-[#888]'}
          `}
      >
          <Icon size={20} className={currentPath === `/${path}` ? "text-white" : "text-[#666]"} />
          <span className="text-[10px] font-medium leading-none">{label}</span>
      </Link>
  );

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
      <motion.div 
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="w-full h-full flex flex-col relative"
      >
          {children}
      </motion.div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen relative overflow-hidden flex flex-col">
      {/* 1. Environment Layers */}
      <div className="bg-rust-theme"></div>

      {/* 2. Top Navigation & Content Container (Fused) */}
      <div className="flex-1 flex flex-col w-full h-full z-10 bg-[rgba(15,15,18,0.7)] backdrop-blur-md">
          {/* Top Navigation Bar */}
          <nav className="h-[64px] w-full flex items-center justify-between px-2 md:px-6 shrink-0 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.3)] gap-2">
              {/* Left: Branding */}
              <div className="flex items-center gap-2 cursor-pointer shrink-0 flex-1 md:flex-none" onClick={() => handleMenuClick('home')}>
                  <h1 className="flex font-bebas text-white text-2xl md:text-3xl tracking-widest m-0 items-center">
                      RUST <span className="text-[#888] ml-2">CALC</span>
                  </h1>
              </div>

              {/* Center: Main Tabs (Desktop Only) */}
              <div className="hidden md:flex h-full items-center flex-1 justify-start">
                  <NavItem path="home" label="首页" icon={HomeIcon} />
                  <NavItem path="servers" label="服务器" icon={Globe} />
                  <NavItem path="simulator" label="抄家模拟" icon={Hammer} />
                  <NavItem path="builder" label="造家计算" icon={HomeIcon} />
                  <NavItem path="budget" label="军备资产" icon={ShieldAlert} />
                  <NavItem path="scrap" label="废料回收" icon={Cpu} />
              </div>

              {/* Right: Quick Actions */}
              <div className="flex h-full items-center gap-1 shrink-0">
                  <a 
                      href="tencent://message/?uin=641336450&Site=RustTactical&Menu=yes"
                      onClick={() => {
                          audio.playClick();
                          navigator.clipboard.writeText("641336450");
                          alert("已复制作者 QQ 号: 641336450。");
                      }}
                      className="p-2 text-[#888] hover:text-[#cd4916] transition-colors"
                      title="联系作者"
                  >
                      <svg viewBox="0 0 1024 1024" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"/></svg>
                  </a>
                  <button className="h-10 w-10 flex items-center justify-center text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors" title="Options" onMouseEnter={handleHover} onClick={() => { audio.playClick(); alert('Options menu coming soon'); }}>
                      <Settings size={20} />
                  </button>
                  <button className="h-10 w-10 hidden sm:flex items-center justify-center text-[#888] hover:text-[#cd4916] hover:bg-[rgba(205,73,22,0.1)] rounded transition-colors" title="Quit" onMouseEnter={handleHover} onClick={() => { audio.playClick(); window.close(); }}>
                      <LogOut size={20} />
                  </button>
              </div>
          </nav>

          {/* 3. Content Area */}
          <div className="flex-1 relative overflow-hidden flex flex-col pb-[64px] md:pb-0">
              <AnimatePresence mode="wait">
                  <PageWrapper>{children}</PageWrapper>
              </AnimatePresence>
          </div>

          {/* 4. Mobile Bottom TabBar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[rgba(15,15,18,0.75)] backdrop-blur-xl border-t border-[rgba(255,255,255,0.1)] shadow-[0_-5px_20px_rgba(0,0,0,0.5)] z-50 flex items-center justify-around pb-safe">
              <MobileTabItem path="home" label="首页" icon={HomeIcon} />
              <MobileTabItem path="servers" label="服务器" icon={Globe} />
              <MobileTabItem path="simulator" label="抄家" icon={Hammer} />
              <MobileTabItem path="builder" label="造家" icon={HomeIcon} />
              <MobileTabItem path="budget" label="资产" icon={ShieldAlert} />
              <MobileTabItem path="scrap" label="废料" icon={Cpu} />
          </div>
      </div>
      </div>
    </QueryClientProvider>
  );
};
