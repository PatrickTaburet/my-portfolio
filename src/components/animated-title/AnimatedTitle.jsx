import React, { useState, useEffect } from 'react';
import './animatedTitle.css';

/**
 * AnimatedTitle Component
 * 
 * This component displays a title with an appearance animation.
 * The animation can be configured to occur in different directions.
 * 
 * @param {Object} props - The properties of the component.
 * @param {ReactNode} props.children - The content to display in the title.
 * @param {number} props.timeout - The delay in milliseconds before the title becomes visible.
 * @param {'up' | 'down' | 'left' | 'right'} props.direction - The direction of the animation.
 *      - 'up' : The animation occurs upwards.
 *      - 'down' : The animation occurs downwards.
 *      - 'left' : The animation occurs to the left.
 *      - 'right' : The animation occurs to the right.
 * 
 * @returns {JSX.Element} The AnimatedTitle component.
 */
function AnimatedTitle({ children, timeout, direction }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(true);
        }, timeout);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`titleAnime ${direction} ${isVisible ? 'visible' : ''}`}>
        {children}
        </div>
    );
}

export default AnimatedTitle;
