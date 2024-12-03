import AnimatedTitle from './../animated-title/AnimatedTitle';
import Sketch1 from '../sketches-p5js/Sketch1';
import './section1.css';
import BackgroundCyber from '../../assets/images/blue-background.png';
import React, { useEffect, useState } from 'react';


const Section1 = ({scrollValue}) => {
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [isScrollTriggered, setIsScrollTriggered] = useState(false);
  const textSlowDownFactor = 3;
  // console.log(scrollValue);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollTriggered(true); 
    };

    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => {
      if (!isScrollTriggered) {
        setInitialAnimationComplete(true); // Initial animation complete if no scroll
      }
    }, 2000); // 2 sec for inital animation

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollTriggered]);

  return (
    <section className='section1'>
      <img
        src={BackgroundCyber}
        alt="Background_cyber"
        className={
          !initialAnimationComplete && !isScrollTriggered
            ? 'backgroundInitial'
            : 'backgroundScrolled'
        }
        style={{
          filter: `blur(${Math.min(15, scrollValue / 30)}px)`,
          opacity: Math.max(0, 1 - scrollValue / 500),
          transform: `scale(${1 + scrollValue / 1000})`,
        }}
      />
      <div 
        className='section1Content' 
        style={{ 
          transform: `translateY(${scrollValue / textSlowDownFactor}px)`, // parallax effect
          opacity: `${scrollValue > 200 ? (1- scrollValue/700) : 1}` // Text disapear when scroll down
        }}
      >
        <AnimatedTitle timeout={"200"} direction="up">
          <h1>
            <span>Taburet</span>
            <span style={{ paddingLeft: "7vw" }}>Patrick</span>
          </h1>
        </AnimatedTitle>
        <AnimatedTitle timeout={"600"} direction="up">
          <h2>Web developpement</h2>
        </AnimatedTitle>
        <div className='bottomLine'>
          <AnimatedTitle timeout={"1200"} direction="down">
            <p>Welcome to my portfolio, scroll down to learn more about my work</p>
          </AnimatedTitle>
        </div>
      </div>
      <Sketch1/>
      <div className='sliderContainer'>
        <AnimatedTitle timeout={"900"} direction="down">
          <p>lines</p>
          <input type="range" min="1" max="60" defaultValue="13" step="1" id="lineSlider" />
        </AnimatedTitle>
      </div>
    </section>
  );
}

export default Section1;