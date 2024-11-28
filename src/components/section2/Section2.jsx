import React from 'react';
import Sketch2 from '../sketches-p5js/Sketch2';
import './section2.css';
import AnimatedTitle from './../animated-title/AnimatedTitle';

import Avatar from '../../assets/images/avatar.png';
import LogoSymfo from '../../assets/images/logos/symfony_black_03.svg';
import LogoReact from '../../assets/images/logos/react.svg'
import LogoCSharp from '../../assets/images/logos/Logo_C_sharp.svg'
import LogoP5js from '../../assets/images/logos/P5js_Logo.svg'
import LogoMySql from '../../assets/images/logos/MySQL.svg'
import LogoPsd from '../../assets/images/logos/photoshop.svg'
import LogoFigma from '../../assets/images/logos/Figma-logo.svg'
import LogoGithub from '../../assets/images/logos/github_logo.svg'
import LogoDocker from '../../assets/images/logos/docker-svg.svg'
import LogoNode from '../../assets/images/logos/nodejs-icon.svg'



const Section2 = ({scrollValue}) => {
  return (
    <section 
      className='section2' 
      style={{ transform: `translateY(${(Math.max(-scrollValue, -window.innerHeight)/3)}px)` }}
    >
      <div className='section2Content'>
        <div className='topSection2'>
          <div>
            <AnimatedTitle timeout={"200"} direction="up">
              <h3>About me</h3>
            </AnimatedTitle>
            <div className='bio'>
              <span>Hello, I'm a french Application Designer and Developer, living in Bordeaux. Passionate about web technologies, algorithmic problem-solving, and creative coding.</span>
              <span>I enjoy building digital products and crafting unique experiences that combine logic and creativity. My goal is to turn ideas into impactful and efficient solutions.</span> 
              <span>Driven by curiosity and a love for learning, I constantly seek to improve my skills and explore new ways to bring ideas to life through code.</span>
            </div>
          </div>
          <img src={Avatar} alt="Profile_picture" className="profilePicture"/>
        </div>
        <div className='bottomSection2'>
          <div className='card1'>
            <div className='logoContainer'>
              <img src={LogoSymfo} alt="Logo_Symfony" className="logoSymfo"/>
              <p>Symfony</p>
            </div>
            <div className='logoContainer' style={{gap: "0"}}>
              <img src={LogoReact} alt="Logo_React" className="logoReact"/>
              <p>React</p>
            </div>
            <div className='logoContainer'>
              <img src={LogoCSharp} alt="Logo_C_Sharp" className="LogoCSharp"/>
              <p>C#</p>
            </div>
            <div className='logoContainer'>
              <img src={LogoNode} alt="Logo_Node_Js" className="LogoNode"/>
              <p>Node.js</p>
            </div>
            <div className='logoContainer'>
              <img src={LogoMySql} alt="Logo_MySql" className="LogoMySql"/>
              <p>SQL</p>
            </div>
            <div className='logoContainer'>
              <img src={LogoP5js} alt="Logo_P5js" className="LogoP5js"/>
              <p>p5.js</p>
            </div>
          </div>
          <div className='card2'>
            <div className='logoContainer'>
              <img src={LogoPsd} alt="Logo_Photoshop" className="LogoPsd"/>
              <p>Photoshop</p>
            </div>
            <div className='logoContainer'>
              <img src={LogoFigma} alt="Logo_Figma" className="LogoFigma"/>
              <p>Figma</p>
            </div>
            <div className='logoContainer'>
              <img src={LogoGithub} alt="Logo_Github" className="LogoGithub"/>
              <p>Github</p>
            </div>
            <div className='logoContainer' style={{gap: "0"}}>
              <img src={LogoDocker} alt="Logo_Docker" className="LogoDocker"/>
              <p>Docker</p>
            </div>
          </div>
         
        </div>

      </div>
   
      <Sketch2 className="sketch"/>
    </section>
  );
}

export default Section2;