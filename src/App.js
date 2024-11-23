import './css/App.css';
import './css/global.css';
import AnimatedTitle from './components/animated-title/AnimatedTitle';
import Section1 from './components/section1/Section1'
import Section2 from './components/section2/Section2';
function App() {
  return (
    <div className="App">
      <header className="header">
        <AnimatedTitle timeout={"100"} direction="down">
          <a href="">My Projects</a> / <a href="">About me</a> / <a href="">Contact</a>
        </AnimatedTitle>
      </header>
      <main className='container'>
        <Section1/>
        <Section2/>
      </main>

    </div>
  );
}

export default App;
