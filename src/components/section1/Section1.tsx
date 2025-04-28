import React, { FC, useLayoutEffect, useRef } from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import Sketch1 from '../sketches-p5js/Sketch1';
import './section1.css';
import useVisibility from '../../hooks/useVisibility';
import { useMobile } from '../../context/MobileContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useDeviceConfig from '../../hooks/useDeviceConfig';

gsap.registerPlugin(ScrollTrigger);

type Section1Props = {
  sessionClassName: string;
}

const Section1: FC<Section1Props> = ({ sessionClassName }) => {
  const [sectionRef, isVisible] = useVisibility<HTMLElement>();
  const isMobile = useMobile();
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const { rectHeights: RECT_HEIGHTS, rectWidth: RECT_WIDTH } = useDeviceConfig();


  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--gutter-offset', `${scrollbarWidth}px`);

    const topRects = topLeftRef.current!.querySelectorAll<HTMLDivElement>('.rect');
    const botRects = bottomRightRef.current!.querySelectorAll<HTMLDivElement>('.rect');
    const reversedHeights = [...RECT_HEIGHTS].reverse();

    // Scoped GSAP animations for section1
    const ctx = gsap.context(() => {

      // timeline paused
      const revealTl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = '';
          document.documentElement.style.setProperty('--gutter-offset', '0px');
        }
      });

      revealTl.to(topRects, {
        height: (i) => RECT_HEIGHTS[i],
        width: RECT_WIDTH,
        opacity: 1,
        ease: 'power1.out',
        duration: 0.3,
        stagger: 0.1,
      });

      revealTl.to(botRects, {
        height: (i) => reversedHeights[i],
        width: RECT_WIDTH,
        opacity: 1,
        ease: 'power1.out',
        duration: 0.3,
        stagger: {
          each: 0.1,
          from: 'end'
        }
      }, '>');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          // markers: true,
        }
      });

      // scrollTl.to([...topRects, ...botRects], {
      //   height: 0,
      //   // opacity: 0,
      //   ease: 'power1.inOut',
      //   stagger: 0.1,
      // });

      scrollTl.to(topRects, {
        height: 0,
        ease: 'power1.inOut',
        stagger: 0.1
      }, 0);

      scrollTl.to(botRects, {
        height: 0,
        ease: 'power1.inOut',
        stagger: {
          each: 0.1,
          from: 'end'
        }
      }, 0);

      // Text content animation: parallax translateY and fade-out
      gsap.to('.section1Content', {
        y: window.innerHeight * 0.65,
        opacity: -0.5,
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
  }, [sectionRef, RECT_HEIGHTS, RECT_WIDTH]);

  return (
    <section className={sessionClassName} ref={sectionRef}>

      <div className="rect-container top-left" ref={topLeftRef}>
        {RECT_HEIGHTS.map((_, i) => <div className="rect" key={`t${i}`} />)}
      </div>
      <div className="rect-container bottom-right" ref={bottomRightRef}>
        {RECT_HEIGHTS.map((_, i) => <div className="rect" key={`b${i}`} />)}
      </div>

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