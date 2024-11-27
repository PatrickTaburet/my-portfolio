import './css/App.css';
import './css/global.css';
import AnimatedTitle from './components/animated-title/AnimatedTitle';
import Section1 from './components/section1/Section1'
import Section2 from './components/section2/Section2';
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
        <AnimatedTitle timeout={"100"} direction="down">
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
      </main>

    </div>
  );
}

export default App;
