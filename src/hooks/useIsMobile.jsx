import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is mobile based on screen width.
 * 
 * @returns {boolean} Returns true if the screen width is 768px or less, otherwise false.
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

export default useIsMobile;
