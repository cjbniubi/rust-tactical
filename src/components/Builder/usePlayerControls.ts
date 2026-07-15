import { useState, useEffect } from 'react';

export function usePlayerControls() {
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
            
            switch (e.code) {
                case 'KeyW':
                    setMovement(m => ({ ...m, forward: true }));
                    break;
                case 'KeyS':
                    setMovement(m => ({ ...m, backward: true }));
                    break;
                case 'KeyA':
                    setMovement(m => ({ ...m, left: true }));
                    break;
                case 'KeyD':
                    setMovement(m => ({ ...m, right: true }));
                    break;
                case 'Space':
                    setMovement(m => ({ ...m, jump: true }));
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                    setMovement(m => ({ ...m, forward: false }));
                    break;
                case 'KeyS':
                    setMovement(m => ({ ...m, backward: false }));
                    break;
                case 'KeyA':
                    setMovement(m => ({ ...m, left: false }));
                    break;
                case 'KeyD':
                    setMovement(m => ({ ...m, right: false }));
                    break;
                case 'Space':
                    setMovement(m => ({ ...m, jump: false }));
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
}
