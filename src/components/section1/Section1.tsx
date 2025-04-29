import React, { FC, useLayoutEffect, useRef } from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import Sketch1 from '../sketches-p5js/Sketch1';
import './section1.css';
import useVisibility from '../../hooks/useVisibility';
import { useMobile } from '../../context/MobileContext';
import useDeviceConfig from '../../hooks/useDeviceConfig';
import useSection1Animation from '../../hooks/useSection1Animation';
import AnimatedRectangles from './AnimatedRectangles';

type Section1Props = {
  sessionClassName: string;
}

const Section1: FC<Section1Props> = ({ sessionClassName }) => {
  const [sectionRef, isVisible] = useVisibility<HTMLElement>();
  const isMobile = useMobile();
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const { rectHeights: RECT_HEIGHTS, rectWidth: RECT_WIDTH } = useDeviceConfig();

  useSection1Animation(
    sectionRef,
    topLeftRef,
    bottomRightRef,
    RECT_HEIGHTS,
    RECT_WIDTH
  );

  return (
    <section className={sessionClassName} ref={sectionRef}>
      <AnimatedRectangles rectHeight={RECT_HEIGHTS} containerRef={topLeftRef} />
      <AnimatedRectangles rectHeight={RECT_HEIGHTS} containerRef={bottomRightRef} isBottom={true} />

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