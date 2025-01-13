import React, { Suspense, lazy, useEffect, useState } from 'react';
import AnimatedTitle from './components/animated-title/AnimatedTitle';
import './css/App.css';
import './css/global.css';
import Header from './components/header/Header';

const Section1 = lazy(() => import('./components/section1/Section1'));
const Section2 = lazy(() => import('./components/section2/Section2'));
const Section3 = lazy(() => import('./components/section3/Section3'));

const SCROLL_ADJUSTMENT = -240;

function App() {
  const [scrollY, setScrollY] = useState(0);
  const windowHeight = window.innerHeight - 300;
  const [sectionOffsets, setSectionOffsets] = useState({ section1Offset: 0, section2Offset: 0, section3Offset: 0 });
  const [isProjectInfoVisible, setIsProjectInfoVisible] = useState(false);
  const [isClosedFromHeader, setIsClosedFromHeader] = useState(false);

 useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    const calculateOffsets = () => {
      const section1Offset = document.querySelector('.section1')?.offsetTop || 0;
      const section2Offset = document.querySelector('.section2')?.offsetTop || 0;
      const section3Offset = document.querySelector('.section3')?.offsetTop || 0;

      setSectionOffsets({ section1Offset, section2Offset, section3Offset });
    };

    setTimeout(() => {
      calculateOffsets();
    }, 500); 

    window.addEventListener('resize', calculateOffsets);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateOffsets);
    };
  }, []);
  
  const scrollToSection = (offset) => {
    window.scrollTo({ top: offset + SCROLL_ADJUSTMENT, behavior: 'smooth' });
  };
  
  const handleProjectInfoChange = (visibility) => {
    setIsProjectInfoVisible(visibility);
  };

  const handleCloseFromHeader = () => {
    setIsClosedFromHeader (isProjectInfoVisible ? true : false); 
    setTimeout(() => {
      setIsClosedFromHeader (false); 
    }, 200);
  };

  return (
    <div className="App">
     <Header 
        scrollY={scrollY}
        windowHeight={windowHeight}
        isProjectInfoVisible={isProjectInfoVisible}
        sectionOffsets={sectionOffsets}
        scrollToSection={scrollToSection}
        handleCloseFromHeader={handleCloseFromHeader}
      />
      <main className='container'>
        <Suspense fallback={<div className='loading'><span className="loader"></span></div>}>
          <Section1 
            className="section1"
            scrollValue = {scrollY}
          />
          <Section2 
            className="section2" 
            scrollValue = {scrollY} 
          />
          <Section3 
            className="section3" 
            scrollValue = {scrollY} 
            onProjectInfoChange={handleProjectInfoChange}
            isClosedFromHeader = {isClosedFromHeader}
          />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
