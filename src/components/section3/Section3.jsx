import AnimatedTitle from '../animated-title/AnimatedTitle';
import Sketch3 from '../sketches-p5js/Sketch3';
import './section3.css';
import React, { useEffect, useState } from 'react';


const Section3 = ({scrollValue}) => {
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [isScrollTriggered, setIsScrollTriggered] = useState(false);
  const textSlowDownFactor = 3;
  // console.log(scrollValue);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrollTriggered(true); 
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   const timer = setTimeout(() => {
  //     if (!isScrollTriggered) {
  //       setInitialAnimationComplete(true); // Initial animation complete if no scroll
  //     }
  //   }, 2000); // 2 sec for inital animation

  //   return () => {
  //     clearTimeout(timer);
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [isScrollTriggered]);

  return (
    <section 
      className='section3' 
      style={{ transform: `translateY(${(Math.max(-scrollValue, -window.innerHeight)/3)}px)` }}
    >
      <div 
        className='section3Content' 
        // style={{ 
        //   transform: `translateY(${scrollValue / textSlowDownFactor}px)`, // parallax effect
        //   opacity: `${scrollValue > 200 ? (1- scrollValue/700) : 1}` // Text disapear when scroll down
        // }}
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
      <Sketch3/>
    </section>
  );
}

export default Section3;