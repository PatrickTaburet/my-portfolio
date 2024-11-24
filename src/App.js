import './css/App.css';
import './css/global.css';
import AnimatedTitle from './components/animated-title/AnimatedTitle';
import Section1 from './components/section1/Section1'
import Section2 from './components/section2/Section2';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const handleScroll = () => {
      const appElement = document.querySelector('.App');
      if (window.scrollY > 100) { 
        appElement.classList.add('scrolled');
      } else {
        appElement.classList.remove('scrolled');
      }
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
        <Section1 className="section1"/>
        <Section2 className="section2"/>
      </main>

    </div>
  );
}

export default App;
