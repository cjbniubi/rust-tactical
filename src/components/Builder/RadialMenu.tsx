"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type BuilderShape = 'foundation' | 'wall' | 'floor' | 'triangle_foundation' | 'triangle_floor' | 'half_wall' | 'low_wall' | 'door';

interface RadialMenuProps {
    isOpen: boolean;
    x: number;
    y: number;
    onClose: () => void;
    onSelect: (shape: BuilderShape) => void;
    activeShape: string;
}

const SHAPES: { id: BuilderShape, label: string }[] = [
    { id: 'foundation', label: '方形地基' },
    { id: 'wall', label: '墙壁' },
    { id: 'floor', label: '方形天花板' },
    { id: 'triangle_foundation', label: '三角地基' },
    { id: 'triangle_floor', label: '三角天花板' },
    { id: 'half_wall', label: '半墙' },
    { id: 'low_wall', label: '矮墙' },
    { id: 'door', label: '门框/门' }
];

export const RadialMenu: React.FC<RadialMenuProps> = ({ isOpen, x, y, onClose, onSelect, activeShape }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Invisible backdrop to capture clicks outside and close */}
                    <div className="fixed inset-0 z-40" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="fixed z-50 pointer-events-none"
                        style={{ left: x, top: y }}
                    >
                        {/* Center Ring */}
                        <div className="absolute w-12 h-12 -left-6 -top-6 rounded-full border-2 border-[rgba(255,255,255,0.3)] bg-[rgba(0,0,0,0.5)] backdrop-blur-md" />
                        
                        {/* Slices */}
                        {SHAPES.map((shape, index) => {
                            const angle = (index / SHAPES.length) * Math.PI * 2 - Math.PI / 2; // Start from top (-90deg)
                            const radius = 100;
                            const itemX = Math.cos(angle) * radius;
                            const itemY = Math.sin(angle) * radius;
                            
                            const isActive = activeShape === shape.id;

                            return (
                                <div
                                    key={shape.id}
                                    className={`absolute flex items-center justify-center w-24 h-12 -ml-12 -mt-6 pointer-events-auto cursor-pointer
                                        ${isActive ? 'text-[#00ffcc] font-bold text-shadow-[0_0_10px_rgba(0,255,204,0.8)]' : 'text-white hover:text-[#00ffcc]'}
                                        transition-colors duration-150 drop-shadow-md text-sm font-mono whitespace-nowrap
                                    `}
                                    style={{ left: itemX, top: itemY }}
                                    onClick={() => {
                                        onSelect(shape.id);
                                        onClose();
                                    }}
                                    onMouseEnter={() => {
                                        // Optional: pre-select on hover
                                    }}
                                >
                                    <div className={`px-3 py-1.5 rounded-lg bg-[rgba(0,0,0,0.6)] backdrop-blur-md border ${isActive ? 'border-[#00ffcc]' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                        {shape.label}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
