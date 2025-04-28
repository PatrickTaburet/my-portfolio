import React, { createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren } from 'react';

/**
 * Context for managing the mobile state of the application.
 * The default value is false.
 */
const MobileContext = createContext(false);

export const MobileProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 560);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 560);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <MobileContext.Provider value={isMobile}>
            {children}
        </MobileContext.Provider>
    );
};

/**
 * Custom hook to access the mobile context.
 *
 * @returns {boolean} A value indicating whether the display is in mobile mode.
 */
export const useMobile = (): boolean => useContext(MobileContext);
