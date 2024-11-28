import React, { useState, useEffect, useRef } from 'react';
import './animatedTitle.css';

/**
 * AnimatedTitle Component
 * 
 * This component displays an element with an appearance animation.
 * The animation is triggered when the element enters the viewport,
 * but can also be configured to start immediately regardless of viewport visibility.
 * It can be configured to occur in different directions and with a customizable delay.
 * 
 * @param {Object} props - The properties of the component.
 * @param {ReactNode} props.children - The content to display in the title.
 * @param {number} [props.timeout = 0] - The delay in milliseconds before the title becomes visible after entering the viewport or component mount.
 * @param {'up' | 'down' | 'left' | 'right'} props.direction - The direction of the animation.
 *      - 'up' : The animation occurs upwards.
 *      - 'down' : The animation occurs downwards.
 *      - 'left' : The animation occurs to the left.
 *      - 'right' : The animation occurs to the right.
 * @param {boolean} [props.initiallyVisible = false] - If true, the animation will start immediately upon component mount, regardless of viewport visibility.
 * 
 * @returns {JSX.Element} The AnimatedTitle component.
 */

function AnimatedTitle({ children, timeout = 0, direction, initiallyVisible = false }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isInView, setIsInView] = useState(initiallyVisible);
    const titleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(titleRef.current);
            }
          },
          { threshold: 0.1 }
        );
    
        if (titleRef.current) {
          observer.observe(titleRef.current);
        }
    
        return () => {
          if (titleRef.current) {
            observer.unobserve(titleRef.current);
          }
        };
    }, []);

    useEffect(() => {
        if (isInView) {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, timeout);
    
          return () => clearTimeout(timer);
        }
      }, [isInView, timeout]);

    return (
        <div
            ref={titleRef}
            className={`titleAnime ${direction} ${isVisible ? 'visible' : ''}`}
        >        
            {children}
        </div>
    );
}

export default AnimatedTitle;
