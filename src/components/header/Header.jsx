import React from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';

function Header({ scrollY, windowHeight, isProjectInfoVisible, sectionOffsets, scrollToSection, handleCloseFromHeader }) {
  return (
    <header 
      className="header"
      style={{color:`${scrollY > windowHeight && scrollY <=  window.innerHeight * 1.6 ? "#2BF7BC" : ''}`}}
    >
      <AnimatedTitle timeout={"900"} direction="down" initiallyVisible={true}>
        <button 
          className={`link ${
            isProjectInfoVisible && scrollY >= window.innerHeight * 1.6 
            ? 'modeC' 
            : ((scrollY > windowHeight && scrollY <= window.innerHeight * 1.6) 
              || (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6) 
              ? 'modeB' : 'modeA')
          }`}
          onClick={() => {
            scrollToSection(sectionOffsets.section3Offset);
            handleCloseFromHeader();              
          }}
        >
          Projects 
        </button> 
          / 
        <button 
          className={`link ${
            isProjectInfoVisible && scrollY >= window.innerHeight * 1.6 
            ? 'modeC' 
            : ((scrollY > windowHeight && scrollY <= window.innerHeight * 1.6) 
              || (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6) 
              ? 'modeB' : 'modeA')
          }`}
          onClick={() => scrollToSection(sectionOffsets.section2Offset)}
        >
          Contact
        </button>
      </AnimatedTitle>
    </header>
  );
}

export default Header;
