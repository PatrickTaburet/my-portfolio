  import React, { useState, useEffect } from 'react';
  import AnimatedTitle from '../animated-title/AnimatedTitle';
  import Sketch3 from '../sketches-p5js/Sketch3';
  import './section3.css';
  import useVisibility from '../hooks/useVisibility';
  import { TbCircleArrowLeftFilled } from "react-icons/tb";
  import Slider from "./image-slider/Slider"

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
      setActiveProject(projectName);
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

          {activeProject == "NexusLab" ? (
           <div className="projectInfos">
           <span className='projectTitle'>{activeProject}</span>
           <div className='projectContent'>
             <Slider/>
             <div className='projectDescription'>
               <p>NexusLab is a collaborative platform focused on the fusion of art and technology. It enables users to manipulate, create, and share digital artworks generated through creative coding algorithms.</p>
               <p>By integrating artistic practices that blend programming with visual art, NexusLab aims to make these forms of expression more accessible and to build a community around these disciplines, fostering co-creation and knowledge sharing.</p>
               <p>The project, available on both web and mobile platforms, leverages modern technologies such as React, Symfony, and React Native.
               Its structure and technical choices ensure a seamless and secure user experience across all devices.</p>
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

          ) : 

         <div className="projectInfos">
         <span className='projectTitle'>{activeProject}</span>
         <div className='projectContent'>
           <Slider/>
           <div className='projectDescription'>
             <p>BLABLABLABLABLA</p>
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
          
          } 
         

   
         
        </div>
  
      </section>
    );
  }

  export default Section3;