import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // Tailwind 'md' breakpoint is 768px

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < MOBILE_BREAKPOINT;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        
        // Initial set
        setIsMobile(mediaQuery.matches);
        
        // Setup listener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
        }
        
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return isMobile;
};
