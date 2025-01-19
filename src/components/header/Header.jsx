import React from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import './header.css';
import { useMobile } from '../../context/MobileContext'; 

function Header({ scrollY, windowHeight, isProjectInfoVisible, sectionOffsets, scrollToSection, handleCloseFromHeader }) {
  const isMobile = useMobile(); 
  
  return (
    <header 
      className="header"
      style={{
        color: isMobile
          ? '' 
          : (scrollY > windowHeight && scrollY <= window.innerHeight * 1.6 ? "#2BF7BC" : '')
      }}
      // style={{color:`${scrollY > windowHeight && scrollY <=  window.innerHeight * 1.6 ? "#2BF7BC" : ''}`}}
    >
      <AnimatedTitle timeout={"900"} direction="down" initiallyVisible={true}>
        <button 
           className={`link ${
            isMobile
              ? 'modeA' // Forcer modeA en mode mobile
              : (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6
                ? 'modeC'
                : ((scrollY > windowHeight && scrollY <= window.innerHeight * 1.6)
                  || (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6)
                  ? 'modeB' : 'modeA'))
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
            isMobile
            ? 'modeA'
            : (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6
              ? 'modeC'
              : ((scrollY > windowHeight && scrollY <= window.innerHeight * 1.6)
                || (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6)
                ? 'modeB' : 'modeA'))
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
