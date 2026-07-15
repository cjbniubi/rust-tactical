"use client";

import React, { useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlacedBlock } from '../../data/buildingModels';
import { BuildingBlocks } from '../../data/buildingModels';

// Map materials to standard colors
const materialColors: Record<string, string> = {
    'wood': '#8b5a2b',
    'stone': '#808080',
    'metal': '#a9a9a9',
    'hqm': '#e0e0e0',
    'misc': '#cd4916'
};

const GRID_SIZE = 3;

interface BlockManagerProps {
    placedBlocks: PlacedBlock[];
    activeBlockId: string;
    activeShape: string;
    onAddBlock: (blockId: string, blockType: string, position: [number, number, number], rotation: [number, number, number]) => void;
    onRemoveBlock: (uid: string) => void;
}

export const BlockManager: React.FC<BlockManagerProps> = ({
    placedBlocks,
    activeBlockId,
    activeShape,
    onAddBlock,
    onRemoveBlock
}) => {
    const [hoverState, setHoverState] = useState<{ pos: [number, number, number], rot: [number, number, number] } | null>(null);
    const activeBlockDef = BuildingBlocks.find(b => b.id === activeBlockId);

    const getHeight = (heightType?: string) => {
        if (heightType === 'half') return GRID_SIZE / 2;
        if (heightType === 'low') return GRID_SIZE / 3;
        return GRID_SIZE;
    };

    // Edge Snapping Logic
    const getPlacementTransform = (point: THREE.Vector3, normal: THREE.Vector3, isGround: boolean, targetBlock?: PlacedBlock): { pos: [number, number, number], rot: [number, number, number] } => {
        const height = getHeight(activeBlockDef?.heightType);
        const isWallType = activeShape === 'wall' || activeShape === 'half_wall' || activeShape === 'low_wall' || activeShape === 'door';
        const isFoundation = activeShape === 'foundation' || activeShape === 'triangle_foundation';
        const isFloor = activeShape === 'floor' || activeShape === 'triangle_floor';
        
        let x = point.x;
        let y = point.y;
        let z = point.z;
        let rot: [number, number, number] = [0, 0, 0];

        if (isGround && (isFoundation || isFloor)) {
            // Snap foundation to ground grid
            x = Math.round(point.x / GRID_SIZE) * GRID_SIZE;
            z = Math.round(point.z / GRID_SIZE) * GRID_SIZE;
            y = height / 2;
        } else if (isGround && isWallType) {
            // Walls on ground? Typically in Rust you can't, but let's snap to grid edges
            x = Math.round(point.x / (GRID_SIZE/2)) * (GRID_SIZE/2);
            z = Math.round(point.z / (GRID_SIZE/2)) * (GRID_SIZE/2);
            y = height / 2;
            
            // Determine orientation based on whether X or Z is on a whole grid line
            const onXGrid = Math.abs(x % GRID_SIZE) < 0.1;
            const onZGrid = Math.abs(z % GRID_SIZE) < 0.1;
            if (onXGrid && !onZGrid) rot = [0, Math.PI / 2, 0];
        } else if (targetBlock) {
            const targetDef = BuildingBlocks.find(b => b.id === targetBlock.blockId);
            const targetIsWall = (targetBlock.blockType || '').includes('wall') || targetBlock.blockType === 'door';
            const targetIsFoundation = (targetBlock.blockType || '').includes('foundation');
            
            if (isWallType && (targetIsFoundation || targetBlock.blockType === 'floor' || targetBlock.blockType === 'triangle_floor')) {
                // Snap Wall to the nearest EDGE of the target Foundation/Floor
                // We find which local edge of the target block the point is closest to
                const dx = point.x - targetBlock.position[0];
                const dz = point.z - targetBlock.position[2];
                
                if (Math.abs(dx) > Math.abs(dz)) {
                    // Snap to East/West edge
                    x = targetBlock.position[0] + Math.sign(dx) * (GRID_SIZE / 2);
                    z = targetBlock.position[2];
                    y = targetBlock.position[1] + (targetDef?.heightType === 'half' ? GRID_SIZE/4 : GRID_SIZE/2) - (GRID_SIZE/2) + height/2; 
                    if (normal.y > 0.5) y = targetBlock.position[1] + (targetDef?.heightType === 'half' ? GRID_SIZE/4 : GRID_SIZE/2) + height/2; // On top
                    rot = [0, Math.PI / 2, 0];
                } else {
                    // Snap to North/South edge
                    x = targetBlock.position[0];
                    z = targetBlock.position[2] + Math.sign(dz) * (GRID_SIZE / 2);
                    y = targetBlock.position[1] + (targetDef?.heightType === 'half' ? GRID_SIZE/4 : GRID_SIZE/2) - (GRID_SIZE/2) + height/2;
                    if (normal.y > 0.5) y = targetBlock.position[1] + (targetDef?.heightType === 'half' ? GRID_SIZE/4 : GRID_SIZE/2) + height/2; // On top
                    rot = [0, 0, 0];
                }
            } else if (isWallType && targetIsWall) {
                // Stack Wall on top of Wall
                x = targetBlock.position[0];
                z = targetBlock.position[2];
                y = targetBlock.position[1] + (targetDef?.heightType === 'half' ? GRID_SIZE/4 : GRID_SIZE/2) + height/2;
                if (targetDef?.heightType === 'low') y = targetBlock.position[1] + (GRID_SIZE/6) + height/2;
                rot = targetBlock.rotation || [0,0,0];
            } else if ((isFoundation || isFloor) && targetIsFoundation) {
                // Snap Foundation to Foundation side
                if (Math.abs(normal.x) > 0.5) {
                    x = targetBlock.position[0] + Math.sign(normal.x) * GRID_SIZE;
                    z = targetBlock.position[2];
                } else if (Math.abs(normal.z) > 0.5) {
                    x = targetBlock.position[0];
                    z = targetBlock.position[2] + Math.sign(normal.z) * GRID_SIZE;
                } else {
                    x = targetBlock.position[0];
                    z = targetBlock.position[2];
                }
                y = targetBlock.position[1]; // same height
            } else if ((isFoundation || isFloor) && targetIsWall) {
                // Snap Floor to Wall
                const wallRotY = (targetBlock.rotation || [0,0,0])[1];
                const isWallRotated = Math.abs(wallRotY) > 0.1; // Facing X
                
                if (isWallRotated) {
                    x = targetBlock.position[0] + (point.x > targetBlock.position[0] ? GRID_SIZE/2 : -GRID_SIZE/2);
                    z = targetBlock.position[2];
                } else {
                    x = targetBlock.position[0];
                    z = targetBlock.position[2] + (point.z > targetBlock.position[2] ? GRID_SIZE/2 : -GRID_SIZE/2);
                }
                y = targetBlock.position[1] + (targetDef?.heightType === 'half' ? GRID_SIZE/4 : GRID_SIZE/2) + height/2;
                if (targetDef?.heightType === 'low') y = targetBlock.position[1] + (GRID_SIZE/6) + height/2;
            }
        }
        
        return { pos: [x, y, z], rot };
    };

    const handlePointerMove = (e: ThreeEvent<PointerEvent>, isGround: boolean = false, targetBlock?: PlacedBlock) => {
        e.stopPropagation();
        if (e.face && e.intersections.length > 0) {
            const intersect = e.intersections[0];
            if (intersect.face) {
                const transform = getPlacementTransform(intersect.point, intersect.face.normal, isGround, targetBlock);
                setHoverState(transform);
            }
        }
    };

    const handlePointerOut = () => {
        setHoverState(null);
    };

    const handleClick = (e: ThreeEvent<MouseEvent>, uid?: string) => {
        e.stopPropagation();

        if (e.button === 0 && e.shiftKey && uid) {
            // Shift + Left Click to delete
            onRemoveBlock(uid);
            setHoverState(null);
            return;
        }

        if (e.button === 0 && hoverState && activeBlockDef && !uid) {
            // Left click to place
            const exists = placedBlocks.some(b => 
                Math.abs(b.position[0] - hoverState.pos[0]) < 0.1 &&
                Math.abs(b.position[1] - hoverState.pos[1]) < 0.1 &&
                Math.abs(b.position[2] - hoverState.pos[2]) < 0.1
            );
            
            if (!exists) {
                onAddBlock(activeBlockId, activeShape, hoverState.pos, hoverState.rot);
            }
        }
    };

    const getGeometry = (blockType: string, heightType?: string) => {
        const h = getHeight(heightType);
        const safeType = blockType || '';
        
        if (safeType.includes('triangle')) {
            const radius = GRID_SIZE / Math.sqrt(3);
            return <cylinderGeometry args={[radius, radius, h, 3]} />;
        }
        if (safeType === 'door') {
            return <boxGeometry args={[GRID_SIZE, h, 0.4]} />;
        }
        if (safeType.includes('wall')) {
            return <boxGeometry args={[GRID_SIZE, h, 0.4]} />;
        }
        
        return <boxGeometry args={[GRID_SIZE, h, GRID_SIZE]} />;
    };

    const getEdgesGeometry = (blockType: string, heightType?: string) => {
        const h = getHeight(heightType);
        const safeType = blockType || '';
        
        if (safeType.includes('triangle')) {
            const radius = GRID_SIZE / Math.sqrt(3);
            return new THREE.CylinderGeometry(radius, radius, h, 3);
        }
        if (safeType === 'door') {
            return new THREE.BoxGeometry(GRID_SIZE, h, 0.4);
        }
        if (safeType.includes('wall')) {
            return new THREE.BoxGeometry(GRID_SIZE, h, 0.4);
        }
        return new THREE.BoxGeometry(GRID_SIZE, h, GRID_SIZE);
    };

    return (
        <group>
            {/* Ground Plane (invisible catcher) */}
            <mesh 
                rotation={[-Math.PI / 2, 0, 0]} 
                position={[0, 0, 0]} 
                receiveShadow
                onPointerMove={(e) => handlePointerMove(e, true)}
                onPointerOut={handlePointerOut}
                onClick={(e) => handleClick(e)}
                onContextMenu={(e) => e.stopPropagation()}
            >
                <planeGeometry args={[200, 200]} />
                <meshBasicMaterial visible={false} />
            </mesh>

            {/* Render Placed Blocks */}
            {placedBlocks.map(block => {
                const def = BuildingBlocks.find(b => b.id === block.blockId);
                const color = def ? materialColors[def.material] : '#fff';
                const rot = block.rotation || [0,0,0];
                
                return (
                    <mesh 
                        key={block.uid} 
                        position={block.position}
                        rotation={rot}
                        castShadow 
                        receiveShadow
                        onPointerMove={(e) => handlePointerMove(e, false, block)}
                        onPointerOut={handlePointerOut}
                        onClick={(e) => handleClick(e, block.uid)}
                        onContextMenu={(e) => e.stopPropagation()}
                    >
                        {getGeometry(block.blockType, def?.heightType)}
                        <meshStandardMaterial color={color} roughness={0.7} metalness={def?.material === 'metal' || def?.material === 'hqm' ? 0.8 : 0.1} />
                        
                        <lineSegments>
                            <edgesGeometry args={[getEdgesGeometry(block.blockType, def?.heightType)]} />
                            <lineBasicMaterial color="#000000" opacity={0.3} transparent />
                        </lineSegments>
                    </mesh>
                );
            })}

            {/* Ghost Placement Indicator */}
            {hoverState && activeBlockDef && (
                <mesh position={hoverState.pos} rotation={hoverState.rot}>
                    {getGeometry(activeShape, activeBlockDef.heightType)}
                    <meshBasicMaterial color="#00ffcc" opacity={0.5} transparent wireframe />
                </mesh>
            )}
        </group>
    );
};
