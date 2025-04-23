import React, { useState, useEffect, FC, useRef } from 'react';
import Sketch2 from '../sketches-p5js/Sketch2';
import './section2.css';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import SkillsCards from './SkillsCards';
import useVisibility from '../../hooks/useVisibility';
import DynamicColorText from './DynamicColorText';
import { TbMail } from "react-icons/tb";
import { TbPhone } from "react-icons/tb";
import { TbBrandGithub } from "react-icons/tb";
import { TbBrandLinkedin } from "react-icons/tb";
import { deobfuscText } from "../../utils/obfuscation";
import { useMobile } from '../../context/MobileContext';
import { CircleDataType } from '../../types/CircleData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Section2Props = {
  parentRef: React.RefObject<gsap.core.Tween | null>;
  sessionClassName: string;
}
type mousePositionType = {
  x: number;
  y: number;
}

const Section2: FC<Section2Props> = ({ parentRef, sessionClassName }) => {
  const [sectionRef, isVisible] = useVisibility<HTMLElement>();
  const [hovered, setHovered] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<mousePositionType>({ x: 0, y: 0 });
  const [circleData, setCircleData] = useState<CircleDataType>({ x: 0, y: 0, size: 0 });
  const phone = deobfuscText('-55"8"33"23"45"92');
  const mail = deobfuscText('vcdwtgv0rcvtkemBiockn0eqo');
  const isMobile = useMobile();

  // Manage Header color
  useEffect(() => {
    if (!sectionRef.current) return;
    const headerEl = document.getElementById('main-header');
    if (!headerEl) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      toggleClass: {
        targets: headerEl,
        className: 'inverted'
      },
      // markers: true,
      toggleActions: 'play reverse play reverse',
    });

    return () => trigger.kill();
  }, [sectionRef]);

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sectionRef]);

  const handleCopy = (message: string) => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

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
              <div className='contactCard'>
                <span>Feel free to contact me</span>
                <div className='contactContent'>
                  <div>
                    <div className='contactLine'>
                      <TbMail className='logoContact' color='white' size={45} />
                      <p
                        onClick={() => handleCopy(mail)}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        {mail}
                      </p>
                    </div>
                    <div className='contactLine'>
                      <TbPhone className='logoContact' color='white' size={45} />
                      <p
                        onClick={() => handleCopy(phone)}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        {phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='contactLine'>
                      <TbBrandGithub className='logoContact' color='white' size={45} />
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
                      <TbBrandLinkedin className='logoContact' color='white' size={45} />
                      <a className="linkedinLink" href='https://www.linkedin.com/in/patrick-taburet/' target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/patrick-taburet/</a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedTitle>
          </div>
        </div>
        <SkillsCards />
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
        isRunning={isVisible}
        onCircleUpdate={handleCircleUpdate}
      />
    </section>
  );
}

export default Section2;