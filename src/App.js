import './css/App.css';
import './css/global.css';
import AnimatedTitle from './components/animated-title/AnimatedTitle';
import React, { Suspense, lazy, useEffect, useState } from 'react';

const Section1 = React.lazy(() => import('./components/section1/Section1'));
const Section2 = React.lazy(() => import('./components/section2/Section2'));
const Section3 = React.lazy(() => import('./components/section3/Section3'));

function App() {
  const [scrollY, setScrollY] = useState(0);

 useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // console.log(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <AnimatedTitle timeout={"900"} direction="down" initiallyVisible={true}>
          <a href="">My Projects</a> / <a href="">About me</a> / <a href="">Contact</a>
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
