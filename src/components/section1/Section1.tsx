import React, { FC, useLayoutEffect, useState, } from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import Sketch1 from '../sketches-p5js/Sketch1';
import './section1.css';
import BackgroundCyber from '../../assets/images/blue-background.webp';
import useVisibility from '../../hooks/useVisibility';
import { useMobile } from '../../context/MobileContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Section1Props = {
  sessionClassName: string;
}

const Section1: FC<Section1Props> = ({ sessionClassName }) => {
  const [sectionRef, isVisible] = useVisibility<HTMLElement>();
  const isMobile = useMobile();

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // Scoped GSAP animations for section1
    const ctx = gsap.context(() => {
      // Background animation: blur, opacity, scale
      gsap.to('.backgroundCyber', {
        filter: 'blur(15px)',
        opacity: 0,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text content animation: parallax translateY and fade-out
      gsap.to('.section1Content', {
        y: window.innerHeight * 0.65,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, sectionRef]);

  return (
    <section className={sessionClassName} ref={sectionRef}>
      <img
        src={BackgroundCyber}
        alt="Background_cyber"
        fetchPriority="high"
        className="backgroundCyber"
      />
      <div className='section1Content' >
        <AnimatedTitle timeout={200} direction="up">
          <h1>
            <span>Taburet</span>
            <span style={{ paddingLeft: "7vw" }}>Patrick</span>
          </h1>
        </AnimatedTitle>
        <AnimatedTitle timeout={600} direction="up">
          <h2>Web developpement</h2>
        </AnimatedTitle>
        <div className='bottomLine'>
          <AnimatedTitle timeout={1200} direction="down">
            <p>Welcome to my portfolio, scroll down to learn more about my work</p>
          </AnimatedTitle>
        </div>
      </div>
      <Sketch1 isRunning={isVisible} />

      <div className='sliderContainer' style={{ display: isMobile ? 'none' : 'block' }}>
        <AnimatedTitle timeout={900} direction="down">
          <p>+</p>
          <input type="range" min="1" max="60" defaultValue="13" step="1" className="rangeSlider" id="lineSlider" />
          <p className='negativePole'>-</p>
        </AnimatedTitle>
      </div>

    </section>
  );
}

export default Section1;