import React from 'react';
import Sketch2 from '../sketches-p5js/Sketch2';
import './section2.css';
import AnimatedTitle from './../animated-title/AnimatedTitle';
import SkillsCards from './SkillsCards';
import useVisibility from '../hooks/useVisibility';
import { TbMail } from "react-icons/tb";
import { TbPhone } from "react-icons/tb";
import { TbBrandGithub } from "react-icons/tb";
import { TbBrandLinkedin } from "react-icons/tb";

import Avatar from '../../assets/images/avatar.jpg'; 


const Section2 = ({scrollValue}) => {
  const [sectionRef, isVisible] = useVisibility();

  return (
    <section 
      ref={sectionRef}
      className='section2' 
      style={{ transform: `translateY(${(Math.max(-scrollValue, -window.innerHeight)/3)}px)` }}
    >
      <div className='section2Content'>
        <div className='topSection2'>
          <div>
            <AnimatedTitle timeout={"100"} direction="up">
              <h3>About me</h3>
            </AnimatedTitle>
            <AnimatedTitle timeout={"200"} direction="up">
              <div className='bio'>
                <span>Hello, I'm a french Application Designer and Developer, living in Bordeaux. Passionate about web technologies, algorithmic problem-solving, and creative coding.</span>
                <span>I enjoy building digital products and crafting unique experiences that combine logic and creativity. My goal is to turn ideas into impactful and efficient solutions.</span> 
                <span>Driven by curiosity and a love for learning, I constantly seek to improve my skills and explore new ways to bring ideas to life through code.</span>
              </div>
            </AnimatedTitle>
          </div>
          <AnimatedTitle timeout={"300"} direction="up">
            <div className='contactContainer'>
              <img src={Avatar} alt="Profile_picture" className="profilePicture"/>
              <div className='contactCard'>
                <span>Dont hesitate to contact me</span>
                <div className='contactLine'>
                  <TbMail color='white' size={45}/>
                  <p>taburet.patrick@gmail.com</p> 
                </div>
                <div className='contactLine'>
                  <TbPhone color='white' size={45}/>
                  <p>06 11 01 23 70</p>
                </div>
                <div className='contactLine'>
                  <TbBrandGithub color='white' size={45}/>
                  <p>https://github.com/PatrickTaburet/</p>
                </div>
                <div className='contactLine'>
                  <TbBrandLinkedin color='white' size={45}/>
                  <p>https://www.linkedin.com/in/patrick-taburet/</p>
                </div>
              </div>
            </div>            
          </AnimatedTitle>
        </div>
        <SkillsCards/>
      </div>
      
      <Sketch2 className="sketch" isRunning={isVisible}/>
     
    </section>
  );
}

export default Section2;