"use client";


import { useSimulator } from './useSimulator';
import { DesktopSimulator } from './DesktopSimulator';
import { MobileSimulator } from './MobileSimulator';

export const Simulator = () => {
    const simulatorLogic = useSimulator();

    return (
        <>
            <div className="block lg:hidden h-full">
                <MobileSimulator {...simulatorLogic} />
            </div>
            <div className="hidden lg:block h-full">
                <DesktopSimulator {...simulatorLogic} />
            </div>
        </>
    );
};
