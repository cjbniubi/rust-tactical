"use client";


import { useScrap } from './useScrap';
import { DesktopScrap } from './DesktopScrap';
import { MobileScrap } from './MobileScrap';

export const Scrap = () => {
    const scrapLogic = useScrap();

    return (
        <>
            <div className="block lg:hidden h-full">
                <MobileScrap {...scrapLogic} />
            </div>
            <div className="hidden lg:block h-full">
                <DesktopScrap {...scrapLogic} />
            </div>
        </>
    );
};
