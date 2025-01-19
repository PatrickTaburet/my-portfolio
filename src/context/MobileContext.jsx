import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Context for managing the mobile state of the application.
 * The default value is false.
 */
const MobileContext = createContext(false);

/**
 * Provider for the mobile context.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactElement} The mobile context provider.
 */
export const MobileProvider = ({ children }) => {
    // Initialize the mobile state based on window width
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        // Set up resize listener to update the mobile state when the window is resized
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup the event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <MobileContext.Provider value={isMobile}>
            {children}
        </MobileContext.Provider>
    );
};

export const useMobile = () => useContext(MobileContext);
