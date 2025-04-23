import React, { useState, useEffect, useRef, ReactNode, FC } from 'react';
import './animatedTitle.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  initiallyVisible?: boolean;
  containerAnimation?: gsap.core.Tween;
}

const AnimatedTitle: FC<AnimatedTitleProps> = ({ children, timeout = 0, direction, initiallyVisible = false, containerAnimation }) => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!titleRef.current) return;

    let fromVars: gsap.TweenVars = { opacity: 0 };
    if (direction === 'up') {
      fromVars = { opacity: 0, y: 50 };
    } else if (direction === 'down') {
      fromVars = { opacity: 0, y: -50 };
    } else if (direction === 'left') {
      fromVars = { opacity: 0, x: 50 };
    } else if (direction === 'right') {
      fromVars = { opacity: 0, x: -50 };
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.5,
      delay: timeout / 1000,
      ease: "none"
    };

    if (initiallyVisible) {
      gsap.fromTo(titleRef.current, fromVars, toVars);
    } else {
      gsap.fromTo(titleRef.current, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: titleRef.current,
          start: '10% 95%',
          end: '90% 5%',
          toggleActions: 'play reverse play reverse',
          containerAnimation: containerAnimation,

          // markers: true, 
        }
      });
    }
  }, [timeout, direction, initiallyVisible, containerAnimation]);

  return (
    <div ref={titleRef} className="titleAnime">
      {children}
    </div>
  );
}

export default AnimatedTitle;
