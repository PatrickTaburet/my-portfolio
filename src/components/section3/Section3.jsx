  import React, { useState } from 'react';
  import AnimatedTitle from '../animated-title/AnimatedTitle';
  import Sketch3 from '../sketches-p5js/Sketch3';
  import './section3.css';
  import useVisibility from '../hooks/useVisibility';

  const Section3 = ({scrollValue}) => {
    const [sectionRef, isVisible] = useVisibility();
    const [activeProject, setActiveProject] = useState(null);
    const [launchMode, setLaunchMode] = useState(true); 
    const [closedCircle, setClosedCircle] = useState(null); // Store the last active circle


    const handleProjectClick = (projectName) => {
      setActiveProject(projectName);
    };
    
    const handleCloseProject = () => {
      setClosedCircle(activeProject); // Track the last opened circle
      setLaunchMode(false);
      setTimeout(() => {
        setActiveProject(null);
        // setLaunchMode("default"); // Reset launch mode after animation
      }, 800); // Match the animation duration
    };

    return (
      <section 
        className='section3' 
        style={{ transform: `translateY(${(Math.max(-scrollValue, -window.innerHeight)/3)}px)` }}
        ref={sectionRef}
      >
        {/* Galaxy background */}
        <div className="bg"></div>
        <div className="star-field">
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
        </div>

        {/* Section content */}
        <div className='section3Content'>
        {!activeProject &&
          <AnimatedTitle timeout={"200"} direction="up">
            <h3>My projects</h3>
          </AnimatedTitle>
        }
        </div>
          {!activeProject && (
            <Sketch3
              onCircleClick={handleProjectClick}
              launchMode={launchMode}
              closedCircle={closedCircle}
              isRunning={isVisible}
            />
          )}
        
        {activeProject && 
        <>
          <div className="projectInfos">{activeProject} is active</div>
          <span className="cross" onClick={handleCloseProject}>X</span>
        </>
        }
      </section>
    );
  }

  export default Section3;