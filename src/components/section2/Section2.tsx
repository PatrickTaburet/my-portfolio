import React, { useState, useEffect, FC, useRef } from 'react';
import Sketch2 from '../sketches-p5js/Sketch2';
import './section2.css';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import SkillsCards from './SkillsCards';
import useVisibility from '../../hooks/useVisibility';
import DynamicColorText from './DynamicColorText';

import { CircleDataType } from '../../types/CircleData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactCard } from './ContactCard';
gsap.registerPlugin(ScrollTrigger);

type Section2Props = {
  parentRef: React.RefObject<gsap.core.Tween | null>;
  sessionClassName: string;
}

const Section2: FC<Section2Props> = ({ parentRef, sessionClassName }) => {
  const [sectionRef, isVisible] = useVisibility<HTMLElement>();
  // const [copied, setCopied] = useState<boolean>(false);
  const [circleData, setCircleData] = useState<CircleDataType>({ x: 0, y: 0, size: 0 });


  // Manage Header color
  useEffect(() => {
    if (!sectionRef.current) return;
    const headerEl = document.getElementById('main-header');
    if (!headerEl) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 3%',
      end: 'bottom 3%',
      toggleClass: {
        targets: headerEl,
        className: 'inverted'
      },
      // markers: true,
      toggleActions: 'play reverse play reverse',
    });

    return () => trigger.kill();
  }, [sectionRef]);


  // const handleCopy = (message: string) => {
  //   navigator.clipboard.writeText(message);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  // };

  const handleCircleUpdate = ({ x, y, size }: CircleDataType) => {
    setCircleData({ x: x, y: y, size: size });
  };

  return (
    <section
      id="section2"
      ref={sectionRef}
      className={sessionClassName}
    >
      <div className='section2Content'>
        <div className='topSection2'>
          <div className='bioContainer'>
            <AnimatedTitle timeout={100} direction="up" containerAnimation={parentRef.current || undefined}>
              <h3>About me</h3>
            </AnimatedTitle>
            <AnimatedTitle timeout={200} direction="up" containerAnimation={parentRef.current || undefined}>
              <div className='bio'>
                <DynamicColorText
                  text={"Hello, I'm a french Application Designer and Developer, living in Bordeaux. Passionate about web technologies, algorithmic problem-solving, and creative coding."}
                  circleData={circleData}
                  sectionRef={sectionRef}
                />
                <DynamicColorText
                  text={"I enjoy building digital products and crafting unique experiences that combine logic and creativity. My goal is to turn ideas into impactful and efficient solutions."}
                  circleData={circleData}
                  sectionRef={sectionRef}
                />
                <DynamicColorText
                  text={"Driven by curiosity and a love for learning, I constantly seek to improve my skills and explore new ways to bring ideas to life through code."}
                  circleData={circleData}
                  sectionRef={sectionRef}
                />
              </div>
            </AnimatedTitle>
          </div>

          <div className='contactContainer'>
            <AnimatedTitle timeout={300} direction="up" containerAnimation={parentRef.current || undefined}>
              <ContactCard containerRef={sectionRef}
              />
            </AnimatedTitle>
          </div>
        </div>
        <SkillsCards />
      </div>

      <Sketch2
        isRunning={isVisible}
        onCircleUpdate={handleCircleUpdate}
      />
    </section>
  );
}

export default Section2;