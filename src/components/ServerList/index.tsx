"use client";


import { useServerList } from './useServerList';
import { DesktopServerList } from './DesktopServerList';
import { MobileServerList } from './MobileServerList';

export const ServerList = ({ initialServers = [] }: { initialServers?: any[] }) => {
    const serverListLogic = useServerList({ autoSelectFirst: false, initialServers });

    return (
        <>
            <div className="block lg:hidden h-full">
                <MobileServerList {...serverListLogic} />
            </div>
            <div className="hidden lg:block h-full">
                <DesktopServerList {...serverListLogic} />
            </div>
        </>
    );
};
