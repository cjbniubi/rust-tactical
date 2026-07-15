"use client";

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { usePlayerControls } from './usePlayerControls';

const SPEED = 10.0;
const JUMP_FORCE = 8.0;
const GRAVITY = 30.0;
const PLAYER_HEIGHT = 1.7;

export const Player: React.FC = () => {
    const { camera } = useThree();
    const controls = usePlayerControls();
    
    // Physics state
    const velocity = useRef(new THREE.Vector3());
    const direction = useRef(new THREE.Vector3());
    const onGround = useRef(false);

    useFrame((_, delta) => {
        // Apply gravity
        velocity.current.y -= GRAVITY * delta;

        // Determine movement direction
        direction.current.set(0, 0, 0);
        if (controls.forward) direction.current.z -= 1;
        if (controls.backward) direction.current.z += 1;
        if (controls.left) direction.current.x -= 1;
        if (controls.right) direction.current.x += 1;
        direction.current.normalize();

        // Apply WASD movement to velocity
        velocity.current.x = direction.current.x * SPEED;
        velocity.current.z = direction.current.z * SPEED;

        // Jump
        if (controls.jump && onGround.current) {
            velocity.current.y = JUMP_FORCE;
            onGround.current = false;
        }

        // Apply velocity to camera position (using controls for orientation)
        camera.translateX(velocity.current.x * delta);
        camera.translateZ(velocity.current.z * delta);
        camera.position.y += velocity.current.y * delta;

        // Floor collision
        if (camera.position.y < PLAYER_HEIGHT) {
            velocity.current.y = 0;
            camera.position.y = PLAYER_HEIGHT;
            onGround.current = true;
        }
    });

    return <PointerLockControls selector="#builder-canvas-container" />;
};
