import React, { useState, useEffect } from 'react';
import Sketch2 from '../sketches-p5js/Sketch2';
import './section2.css';
import AnimatedTitle from './../animated-title/AnimatedTitle';
import SkillsCards from './SkillsCards';
import useVisibility from '../hooks/useVisibility';
import DynamicColorText from './DynamicColorText';
import { TbMail } from "react-icons/tb";
import { TbPhone } from "react-icons/tb";
import { TbBrandGithub } from "react-icons/tb";
import { TbBrandLinkedin } from "react-icons/tb";

import Avatar from '../../assets/images/avatar.jpg'; 

const Section2 = ({scrollValue}) => {
  const [sectionRef, isVisible] = useVisibility();
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sectionTranslateY, setSectionTranslateY] = useState(0);
  const [circleData, setCircleData] = useState({x: 0, y: 0, size: 0});

  useEffect(() => {    
    const updateTranslateY = () => {
      setSectionTranslateY( Math.max(-scrollValue, -window.innerHeight) / 2.8);
    };

    updateTranslateY();
    window.addEventListener('resize', updateTranslateY);

    return () => {
      window.removeEventListener('resize', updateTranslateY);
    };
  }, [scrollValue]);

  // useEffect(() => {
  //   setSectionTranslateY(-scrollValue / 2.8);
  //   const handleResize = () => {
  //     setSectionTranslateY(-scrollValue / 2.8);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // useEffect(() => {
  // console.log("scrollValue", scrollValue);
  
  // }, [scrollValue])
  

  useEffect(() => {    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCopy = (message) => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Réinitialise après 2 secondes
  };

  const handleMouseMove = (event) => {
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top 
    });
  };

  const handleCircleUpdate = (x, y, size) => {
    setCircleData({x: x, y: y, size: size});
  };
  return (
    <section 
      id="section2" 
      ref={sectionRef}
      className='section2' 
      style={{ transform: `translateY(${sectionTranslateY}px)` }}
    >
      <div className='section2Content'>
        <div className='topSection2'>
          <div>
            <AnimatedTitle timeout={"100"} direction="up">
              <h3>About me</h3>
            </AnimatedTitle>
            <AnimatedTitle timeout={"200"} direction="up">
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
          <AnimatedTitle timeout={"300"} direction="up">
            <div className='contactContainer'>
              <div className='contactCard'>
                <span>Don't hesitate to contact me</span>
                <div className='contactContent'>
                  <div>
                    <div className='contactLine'>
                      <TbMail className='logoContact' color='white' size={45}/>
                      <p 
                        onClick={() => handleCopy("taburet.patrick@gmail.com")}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        taburet.patrick@gmail.com
                      </p> 
                    </div>
                    <div className='contactLine'>
                      <TbPhone className='logoContact' color='white' size={45}/>
                      <p 
                        onClick={() => handleCopy("06 11 01 23 70")}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        06 11 01 23 70
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='contactLine'>
                      <TbBrandGithub className='logoContact' color='white' size={45}/>
                      <a       
                        className="githubLink"
                        href='https://github.com/PatrickTaburet/' 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        https://github.com/PatrickTaburet/
                      </a>
                    </div>
                    <div className='contactLine'>
                      <TbBrandLinkedin className='logoContact' color='white' size={45}/>
                      <a className="linkedinLink" href='https://www.linkedin.com/in/patrick-taburet/' target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/patrick-taburet/</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <img src={Avatar} alt="Profile_picture" className="profilePicture"/> */}
            </div>            
          </AnimatedTitle>
        </div>
        <SkillsCards/>
      </div>

      {hovered && !copied && (
        <span 
          className="copyMessage" 
          style={{
            position: 'absolute',
            left: `${mousePosition.x + 15}px`,
            top: `${mousePosition.y + 15}px`,
          }}
        >
          Copy?
        </span>
      )}
      {copied && (
        <span 
          className="copyMessage" 
          style={{
            position: 'absolute',
            left: `${mousePosition.x + 15}px`,
            top: `${mousePosition.y + 15}px`,
          }}
        >
          Copied!
        </span>
      )}

      <Sketch2 
        className="sketch" 
        isRunning={isVisible}
        onCircleUpdate={handleCircleUpdate}
      />
     
    </section>
  );
}

export default Section2;