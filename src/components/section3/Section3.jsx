  import React, { useState, useEffect } from 'react';
  import AnimatedTitle from '../animated-title/AnimatedTitle';
  import Sketch3 from '../sketches-p5js/Sketch3';
  import './section3.css';
  import useVisibility from '../hooks/useVisibility';
  import { TbCircleArrowLeftFilled } from "react-icons/tb";
  import Slider from "./image-slider/Slider"
  import ProjectsMapping from './ProjectsMapping';
  import { TbBrandGithub } from "react-icons/tb";

  const Section3 = ({scrollValue, onProjectInfoChange, isClosedFromHeader }) => {
    const [sectionRef, isVisible] = useVisibility();
    const [activeProject, setActiveProject] = useState(null);
    const [launchMode, setLaunchMode] = useState(true); 
    const [closedCircle, setClosedCircle] = useState(null); // Store the last active circle
    const [isProjectInfoVisible, setIsProjectInfoVisible] = useState(false);
    const [showSketch, setShowSketch] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
      isClosedFromHeader && handleCloseProject();
    }, [isClosedFromHeader]);

    useEffect(() => {
      onProjectInfoChange(isProjectInfoVisible);
    }, [isProjectInfoVisible, onProjectInfoChange]);

    const handleProjectClick = (projectName) => {    
      window.history.pushState({ project: projectName }, '', `#${projectName}`);
      setActiveProject(projectName);
      setIsProjectInfoVisible(true);
      setShowSketch(false);
    };
    
    const handleCloseProject = () => {
      setClosedCircle(activeProject); // Track the last opened circle
      setLaunchMode(false);
      setIsProjectInfoVisible(false);
      setActiveProject(null);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setTimeout(() => {
        setShowSketch(true);
      }, 200);
    };

    useEffect(() => {
      const handlePopState = (event) => {
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
    }, [isVisible, isProjectInfoVisible]);
    
    return (
      <section 
        id="section3" 
        className='section3' 
        style={{ transform: `translateY(${(Math.max(-scrollValue, -window.innerHeight) / 2.8)}px)` }}
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
          <AnimatedTitle timeout={"200"} direction="up">
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
            <div className="projectInfos">
            <AnimatedTitle timeout={"0"} direction="up">
             <span className='projectTitle'>{ProjectsMapping[activeProject].title}</span>
            </AnimatedTitle>
            <div className='projectContent'>
              <AnimatedTitle timeout={"200"} direction="up">
                <Slider images={ProjectsMapping[activeProject].images}/>
              </AnimatedTitle>

              <div className='projectDescription'>
              <AnimatedTitle timeout={"400"} direction="up">

                {ProjectsMapping[activeProject].description}
                </AnimatedTitle>
                <AnimatedTitle timeout={"600"} direction="up">
                <div className='linksContainer'>
                {ProjectsMapping[activeProject].element && ProjectsMapping[activeProject].element.props.children && (
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
                        <TbBrandGithub size={25}/>
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
                </AnimatedTitle>
              </div>
             
           </div>
           <AnimatedTitle timeout={"800"} direction="up">
         
           <div className='bottomBack'>
             <TbCircleArrowLeftFilled 
               className="backButton" 
               onClick={handleCloseProject} 
               color='white' 
               size={55}
               style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s' }} 
             />
             <span 
               onMouseEnter={() => setIsHovered(true)} 
               onMouseLeave={() => setIsHovered(false)}
               onClick={handleCloseProject} 
             >
               Back
             </span>
           </div>
           </AnimatedTitle>

          </div>
          ) : (
            <div className="projectInfos">
             
            </div>
          )} 
       </div>
  
      </section>
    );
  }

  export default Section3;