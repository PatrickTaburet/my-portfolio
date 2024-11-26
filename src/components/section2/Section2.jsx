import React from 'react';
import AnimatedTitle from './../animated-title/AnimatedTitle';
import Sketch2 from '../sketches-p5js/Sketch2';
import './section2.css';
import Avatar from '../../assets/images/avatar.png';
import LogoSymfo from '../../assets/images/logos/symfony_black_03.svg';
import LogoReact from '../../assets/images/logos/react.svg'
const Section2 = ({styleProps}) => {
  return (
    <section className='section2' style={styleProps}>
      <div className='section2Content'>
        <div className='topSection2'>
          <div>
            <h3>About me</h3>
            <div className='bio'>
              <span>Hi, i'm Patrick, I am an Application Designer and Developer with a deep passion for web technologies, algorithmic problem-solving, and creative coding.</span>
              <span>I enjoy building digital products and crafting unique experiences that combine logic and creativity. My goal is to turn ideas into impactful and efficient solutions.</span> 
              <span>Driven by curiosity and a love for learning, I constantly seek to improve my skills and explore new ways to bring ideas to life through code.</span>
            </div>
          </div>
          <img src={Avatar} alt="Profile_picture" className="profilePicture"/>
        </div>
        <div className='bottomSection2'>
          <img src={LogoSymfo} alt="Logo_Symfony" className="logoSymfo"/>
          <img src={LogoReact} alt="Logo_React" className="logoReact"/>
        </div>

      </div>
   
      <Sketch2 className="sketch"/>
    </section>
  );
}

export default Section2;