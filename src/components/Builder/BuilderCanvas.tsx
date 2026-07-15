"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Grid, OrbitControls } from '@react-three/drei';
import { BlockManager } from './BlockManager';
import { Player } from './Player';
import type { PlacedBlock } from '../../data/buildingModels';

interface BuilderCanvasProps {
    placedBlocks: PlacedBlock[];
    activeBlockId: string;
    activeShape: string;
    fpsMode?: boolean;
    onAddBlock: (blockId: string, blockType: string, position: [number, number, number], rotation: [number, number, number]) => void;
    onRemoveBlock: (uid: string) => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
    placedBlocks,
    activeBlockId,
    activeShape,
    fpsMode = false,
    onAddBlock,
    onRemoveBlock
}) => {
    return (
        <div id="builder-canvas-container" className="w-full h-full relative bg-[#87CEEB]">
            <Canvas shadows camera={{ position: [10, 1.7, 10], fov: 75 }}>
                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight 
                    castShadow 
                    position={[10, 20, 10]} 
                    intensity={2.0} 
                    shadow-mapSize={[2048, 2048]}
                />

                
                {/* Environment */}
                <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
                
                {/* Grid Floor */}
                <Grid 
                    position={[0, -0.01, 0]} 
                    args={[100, 100]} 
                    cellSize={1} 
                    cellThickness={1} 
                    cellColor="#6f6f6f" 
                    sectionSize={3} 
                    sectionThickness={1.5} 
                    sectionColor="#9d4b4b" 
                    fadeDistance={30} 
                    fadeStrength={1} 
                    infiniteGrid 
                />

                {/* Blocks */}
                <BlockManager 
                    placedBlocks={placedBlocks}
                    activeBlockId={activeBlockId}
                    activeShape={activeShape}
                    onAddBlock={onAddBlock}
                    onRemoveBlock={onRemoveBlock}
                />

                {/* Controls */}
                {fpsMode ? <Player /> : <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} />}
            </Canvas>
            
            {/* Crosshair UI - Real FPS Crosshair */}
            {fpsMode && <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference pointer-events-none z-10"></div>}
        </div>
    );
};
