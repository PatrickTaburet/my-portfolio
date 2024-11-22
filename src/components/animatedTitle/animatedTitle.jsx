import React, { useState, useEffect } from 'react';
import './animatedTitle.css';

function AnimatedTitle({ children, timeout }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(true);
        }, timeout);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`titleAnime ${isVisible ? 'visible' : ''}`}>
        {children}
        </div>
    );
}

export default AnimatedTitle;
