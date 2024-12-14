  import React, { useState, useEffect } from 'react';
  import AnimatedTitle from '../animated-title/AnimatedTitle';
  import Sketch3 from '../sketches-p5js/Sketch3';
  import './section3.css';
  import useVisibility from '../hooks/useVisibility';
  import { TbCircleArrowLeftFilled } from "react-icons/tb";
  import Slider from "./image-slider/Slider"
  import ProjectsMapping from './ProjectsMapping';

  const Section3 = ({scrollValue, onProjectInfoChange }) => {
    const [sectionRef, isVisible] = useVisibility();
    const [activeProject, setActiveProject] = useState(null);
    const [launchMode, setLaunchMode] = useState(true); 
    const [closedCircle, setClosedCircle] = useState(null); // Store the last active circle
    const [isProjectInfoVisible, setIsProjectInfoVisible] = useState(false);
    const [showSketch, setShowSketch] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      onProjectInfoChange(isProjectInfoVisible);
    }, [isProjectInfoVisible, onProjectInfoChange]);

    const handleProjectClick = (projectName) => {    
      const cleanedProjectName = projectName.replace(/\n/g, '');  
      setActiveProject(cleanedProjectName);
      setIsProjectInfoVisible(true);
      setShowSketch(false);
    };
    
    const handleCloseProject = () => {
      setClosedCircle(activeProject); // Track the last opened circle
      setLaunchMode(false);
      setIsProjectInfoVisible(false);
      setActiveProject(null);
      setTimeout(() => {
        setShowSketch(true);
      }, 200);
    };

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
           <span className='projectTitle'>{ProjectsMapping[activeProject].title}</span>
           <div className='projectContent'>
             <Slider images={ProjectsMapping[activeProject].images}/>
             <div className='projectDescription'>
               {ProjectsMapping[activeProject].description}
             </div>
           </div>

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