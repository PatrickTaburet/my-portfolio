import './css/App.css';
import './css/global.css';
import AnimatedTitle from './components/animated-title/AnimatedTitle';
import React, { Suspense, lazy, useEffect, useState } from 'react';

const Section1 = React.lazy(() => import('./components/section1/Section1'));
const Section2 = React.lazy(() => import('./components/section2/Section2'));
const Section3 = React.lazy(() => import('./components/section3/Section3'));

function App() {
  const [scrollY, setScrollY] = useState(0);
  const windowHeight = window.innerHeight - 300;
  const [sectionOffsets, setSectionOffsets] = useState({ section1Offset: 0, section2Offset: 0, section3Offset: 0 });
  
 useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    const calculateOffsets = () => {
      const section1Offset = document.querySelector('.section1')?.offsetTop || 0;
      const section2Offset = document.querySelector('.section2')?.offsetTop || 0;
      const section3Offset = document.querySelector('.section3')?.offsetTop || 0;
      // console.log("offstet 2 : " + section2Offset);
      // console.log("offstet 3 : " + section3Offset);
      
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
    const adjustment = -240; // Ajustez cette valeur en fonction de vos besoins
    window.scrollTo({ top: offset + adjustment, behavior: 'smooth' });
  };
  

  return (
    <div className="App">
      <header 
        className="header"
        style={{color:`${scrollY > windowHeight && scrollY <=  window.innerHeight * 1.6 ? "#2BF7BC" : ''}`}}

      >
        <AnimatedTitle timeout={"900"} direction="down" initiallyVisible={true}>
          <a 
            onClick={() => scrollToSection(sectionOffsets.section3Offset)}
            style={{color:`${scrollY > windowHeight && scrollY <=  window.innerHeight * 1.6 ? "white" : ""}`}}
          >
            Projects
          </a> 
            / 
          <a 
            onClick={() => scrollToSection(sectionOffsets.section2Offset)}
            style={{color:`${scrollY > windowHeight && scrollY <=  window.innerHeight * 1.6 ? "white" : ""}`}}
          >
            Contact
          </a>
        </AnimatedTitle>
      </header>
      <main className='container'>
        <Suspense>
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
          />
        </Suspense>
      </main>

    </div>
  );
}

export default App;
