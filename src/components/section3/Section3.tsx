import React, { useState, useEffect, useCallback, FC, useRef } from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import Sketch3 from '../sketches-p5js/Sketch3';
import './section3.css';
import useVisibility from '../../hooks/useVisibility';
import { TbCircleArrowLeftFilled } from "react-icons/tb";
import Slider from "./image-slider/Slider"
import ProjectsMapping from './ProjectsMapping';
import { TbBrandGithub } from "react-icons/tb";
import Rocket from '../../assets/images/rocket.png';
import { useMobile } from '../../context/MobileContext';

type Section3Props = {
  parentRef: React.RefObject<gsap.core.Tween | null>;
  onProjectInfoChange: (visible: boolean) => void;
  isClosedFromHeader: boolean;
  scrollToSection: (selector: string) => void;
  sessionClassName: string;
};

const Section3: FC<Section3Props> = ({ parentRef, onProjectInfoChange, isClosedFromHeader, scrollToSection, sessionClassName }) => {
  const [sectionRef, isVisible] = useVisibility<HTMLElement>();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [launchMode, setLaunchMode] = useState<boolean>(true);
  const [closedCircle, setClosedCircle] = useState<string | null>(null); // Store the last active circle
  const [isProjectInfoVisible, setIsProjectInfoVisible] = useState<boolean>(false);
  const [showSketch, setShowSketch] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [fadeBackground, setFadeBackground] = useState<boolean>(false);
  const isMobile = useMobile();


  const handleCloseProject = useCallback(() => {
    setClosedCircle(activeProject); // Track the last opened circle
    setLaunchMode(false);
    setIsProjectInfoVisible(false);
    setActiveProject(null);
    setFadeBackground(false);
    setIsHovered(false)
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setTimeout(() => {
      setShowSketch(true);
    }, 200);
  }, [activeProject]);

  useEffect(() => {
    isClosedFromHeader && handleCloseProject();
  }, [isClosedFromHeader, handleCloseProject]);

  useEffect(() => {
    onProjectInfoChange(isProjectInfoVisible);
  }, [isProjectInfoVisible, onProjectInfoChange]);

  const handleProjectClick = (projectName: string) => {
    window.history.pushState({ project: projectName }, '', `#${projectName}`);
    setActiveProject(projectName);
    setIsProjectInfoVisible(true);
    setShowSketch(false);
    setTimeout(() => {
      setFadeBackground(true);
    }, 50);
  };

  useEffect(() => {
    const handlePopState = (_event: PopStateEvent) => {
      if (isVisible && isProjectInfoVisible) {
        handleCloseProject();
      }
      if (!isVisible) {
        window.history.back();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isVisible, isProjectInfoVisible, handleCloseProject]);

  return (
    <section
      id="section3"
      className={sessionClassName}
      // style={{ transform: isMobile ? 'none' : `translateY(${(Math.max(-scrollValue, -window.innerHeight) / 2.8)}px)` }}
      ref={sectionRef}
    >
      {/* Galaxy background */}
      <div className="bg"></div>
      <div className="starField">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>

      {/* Section content */}
      <div className='section3Content'>
        {!activeProject &&
          <AnimatedTitle timeout={200} direction="up" containerAnimation={parentRef.current || undefined}>
            <h3>Selected Projects</h3>
          </AnimatedTitle>
        }
      </div>

      <div className={`sketchContainer ${showSketch ? 'visible' : ''}`}>
        {!activeProject && (
          <Sketch3
            onCircleClick={handleProjectClick}
            launchMode={launchMode}
            closedCircle={closedCircle}
            isRunning={isVisible}
          />
        )}
      </div>
      <div
        className={`projectInfosContainer ${isProjectInfoVisible ? '' : 'hidden'}`}
        style={isProjectInfoVisible ? { transition: 'none' } : {}}
      >
        {activeProject && ProjectsMapping[activeProject] ? (
          <div className={`projectInfos ${fadeBackground ? 'fade-background' : ''}`}>
            <AnimatedTitle timeout={0} direction="up">
              <span className='projectTitle'>{ProjectsMapping[activeProject].title}</span>
            </AnimatedTitle>
            <div className='projectContent'>
              <AnimatedTitle timeout={200} direction="up">
                <Slider images={ProjectsMapping[activeProject].slides} />
              </AnimatedTitle>
              <div className='projectDescription'>
                <AnimatedTitle timeout={400} direction="up">
                  {ProjectsMapping[activeProject].description}
                </AnimatedTitle>
                <AnimatedTitle timeout={600} direction="up">
                  <div className='linksContainer'>
                    {ProjectsMapping[activeProject].element &&
                      (ProjectsMapping[activeProject].element as React.ReactElement<{ children?: React.ReactNode }>).props.children && (
                        <div className='elementWrapper'>
                          {ProjectsMapping[activeProject].element}
                        </div>
                      )}
                    <div className='linksWrapper'>
                      <p>Source code :</p>
                      {ProjectsMapping[activeProject].links.map((link, index) => (
                        <a
                          key={index}
                          className='link'
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TbBrandGithub size={25} />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </AnimatedTitle>
              </div>
            </div>
            <div
              className='bottomBack'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <TbCircleArrowLeftFilled
                className="backArrow"
                onClick={handleCloseProject}
                // color='white' 
                size={55}
                style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s', color: isHovered ? "#FFFFFF" : "#2BF7BC" }}
              />
              <span

                onClick={handleCloseProject}
              >
                Back
              </span>
            </div>
          </div>
        ) : (
          <div className="projectInfos"></div>
        )}
      </div>
      <img
        onClick={() => {
          scrollToSection(".section3");
        }}
        src={Rocket} alt="rocket_icon"
        className="rocketIcon"
        style={{ display: isMobile ? 'block' : 'none' }}
      />
      <span className='copyright'>© 2025 Taburet Patrick</span>
    </section>
  );
}

export default Section3;