import React from "react";
import './section2.css';
import AnimatedTitle from './../animated-title/AnimatedTitle';

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

const SkillsCards = () =>{
    return (
        <div className='cardsContainer'>
            <AnimatedTitle timeout={"100"} direction="up">
              <h3>My skills</h3>
            </AnimatedTitle>
            <div className='cardsWrapper'>
                <div className='card1Wrapper'>
                    <AnimatedTitle timeout={"100"} direction="up">
                        <h4>Front-end / Back-end</h4>
                    </AnimatedTitle>
                    <AnimatedTitle timeout={"100"} direction="up">
                        <div className='card1'>
                            <div className='logoContainer'>
                                <img src={LogoSymfo} alt="Logo_Symfony" className="logoSymfo"/>
                                <p>Symfony</p>
                            </div>
                            <div className='logoContainer' style={{gap: "0", marginBottom: "5px"}}>
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
                    </AnimatedTitle>
                </div>
                <div className='card2Wrapper'>
                    <AnimatedTitle timeout={"100"} direction="up">
                        <h4>Tools</h4>
                    </AnimatedTitle>
                    <AnimatedTitle timeout={"100"} direction="up">
                        <div className='card2'>
                            <div className='logoContainer'>
                                <img src={LogoGithub} alt="Logo_Github" className="LogoGithub"/>
                                <p>Github</p>
                            </div>
                            <div className='logoContainer' style={{gap: "0"}}>
                                <img src={LogoDocker} alt="Logo_Docker" className="LogoDocker"/>
                                <p>Docker</p>
                            </div>
                            <div className='logoContainer'>
                                <img src={LogoPsd} alt="Logo_Photoshop" className="LogoPsd"/>
                                <p>Photoshop</p>
                            </div>
                            <div className='logoContainer'>
                                <img src={LogoFigma} alt="Logo_Figma" className="LogoFigma"/>
                                <p>Figma</p>
                            </div>
                        </div>
                    </AnimatedTitle>
                </div>
            </div>
        </div>
    );
}

export default SkillsCards;