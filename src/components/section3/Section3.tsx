import React, { useState, useEffect, useCallback, FC, useRef } from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import Sketch3 from '../sketches-p5js/Sketch3';
import './section3.css';
import useVisibility from '../../hooks/useVisibility';
import ProjectsMapping from './ProjectsMapping';
import Rocket from '../../assets/images/rocket.png';
import { useMobile } from '../../context/MobileContext';
import ProjectInfos from './ProjectInfos';

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
          <ProjectInfos
            project={ProjectsMapping[activeProject]}
            fadeBackground={fadeBackground}
            setIsHovered={setIsHovered}
            isHovered={isHovered}
            handleCloseProject={handleCloseProject}
          />
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