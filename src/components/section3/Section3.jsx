import AnimatedTitle from '../animated-title/AnimatedTitle';
import Sketch3 from '../sketches-p5js/Sketch3';
import './section3.css';
import React, { useEffect, useState } from 'react';

const Section3 = ({scrollValue}) => {

  return (
    <section 
      className='section3' 
      style={{ transform: `translateY(${(Math.max(-scrollValue, -window.innerHeight)/3)}px)` }}
    >
      <div className="bg"></div>

      <div className="star-field">
      <div className="layer"></div>
      <div className="layer"></div>
      <div className="layer"></div>
      </div>
      <div className='section3Content'>
        <AnimatedTitle timeout={"200"} direction="up">
          <h3>My projects</h3>
        </AnimatedTitle>
      </div>
      <Sketch3/>
    </section>
  );
}

export default Section3;