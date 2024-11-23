import React from 'react';
import AnimatedTitle from './../animated-title/AnimatedTitle';
import Sketch1 from '../sketches-p5js/Sketch1';
import './section1.css';

function Section1() {
  return (
    <section className='section1'>
      <div className='section1Content'>
        <AnimatedTitle timeout={"700"} direction="up">
          <h1 style={{ paddingLeft: "15vw" }}>
            <span>Taburet</span>
            <span style={{ paddingLeft: "7vw" }}>Patrick</span>
          </h1>
        </AnimatedTitle>
        <AnimatedTitle timeout={"900"} direction="up">
          <h2 style={{ paddingLeft: "35vw" }}>Web developpement</h2>
        </AnimatedTitle>
        <AnimatedTitle timeout={"400"} direction="down">
          <p>Welcome to my portfolio, scroll down to learn more about my work</p>
        </AnimatedTitle>
      </div>
      <Sketch1 />
      <div className='sliderContainer'>
        <AnimatedTitle timeout={"100"} direction="down">
          <p>lines</p>
          <input type="range" min="1" max="60" defaultValue="5" step="1" id="lineSlider" />
        </AnimatedTitle>
      </div>
    </section>
  );
}

export default Section1;