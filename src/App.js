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
      console.log(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const transformStyle = { transform: `translateY(${(Math.max(-scrollY, -window.innerHeight)/3)}px)` };

  return (
    <div className="App">
      <header className="header">
        <AnimatedTitle timeout={"100"} direction="down">
          <a href="">My Projects</a> / <a href="">About me</a> / <a href="">Contact</a>
        </AnimatedTitle>
      </header>
      <main className='container'>
        <Section1 className="section1"/>
        <Section2 
          className="section2" 
          styleProps={transformStyle} 
        />
      </main>

    </div>
  );
}

export default App;
