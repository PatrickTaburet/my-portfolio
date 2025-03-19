import React, { useState, useEffect, useRef, ReactNode, FC } from 'react';
import './animatedTitle.css';

/**
 * AnimatedTitle Component
 * 
 * This component displays an element with an appearance animation.
 * The animation is triggered when the element enters the viewport,
 * but can also be configured to start immediately regardless of viewport visibility.
 * It can be configured to occur in different directions and with a customizable delay.
 *
 * @returns {JSX.Element} The AnimatedTitle component.
 */

type AnimatedTitleProps = {
  children: ReactNode;
  timeout?: number;
  direction: 'up' | 'down' | 'left' | 'right';
  initiallyVisible: boolean;
}

const AnimatedTitle: FC<AnimatedTitleProps> = ({ children, timeout = 0, direction, initiallyVisible = false }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isInView, setIsInView] = useState<boolean>(initiallyVisible);
    const titleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const node = titleRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            node && observer.unobserve(node);
          }
        },
        { threshold: 0.2 }
      );
  
      node && observer.observe(node);
  
      return () => {
        node && observer.unobserve(node);
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
