"use client";

import { useMobile } from '../../hooks/useMobile';
import { useBuilder } from './useBuilder';
import { DesktopBuilder } from './DesktopBuilder';
import { MonitorX } from 'lucide-react';

export const Builder = () => {
    const isMobile = useMobile();
    const builderLogic = useBuilder();

    if (isMobile) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-[#0a0a0c] text-white p-6 text-center">
                <MonitorX size={48} className="text-[#ff4444] mb-4" />
                <h2 className="text-xl font-bold mb-2">仅支持电脑端</h2>
                <p className="text-gray-400 text-sm max-w-xs">
                    造家模拟器包含复杂的3D引擎和第一人称物理系统，目前仅开放PC端体验。请使用电脑浏览器访问。
                </p>
            </div>
        );
    }

    return <DesktopBuilder {...builderLogic} />;
};
