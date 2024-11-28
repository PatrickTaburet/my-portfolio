import './css/App.css';
import './css/global.css';
import AnimatedTitle from './components/animated-title/AnimatedTitle';
import Section1 from './components/section1/Section1'
import Section2 from './components/section2/Section2';
import Section3 from './components/section3/Section3';
import { useEffect, useState } from 'react';

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
      </main>

    </div>
  );
}

export default App;
