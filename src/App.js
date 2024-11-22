import './css/App.css';
import P5Sketch from './components/p5-sketch';
import './css/global.css';
import AnimatedTitle from './components/animatedTitle/animatedTitle';

function App() {
  return (
    <div className="App">
      <header className="header">
        <a href="">My Projects</a> / <a href="">About me</a> / <a href="">Contact</a>
      </header>
      <main className='container'>
        <section>
          <div className='section1Content'>
            <AnimatedTitle timeout={"100"}>
              <h1 style={{ paddingLeft: "15vw" }}>
                <span>Taburet</span>
                <span style={{ paddingLeft: "7vw" }}>Patrick</span>
              </h1>
            </AnimatedTitle>
            <AnimatedTitle timeout={"300"}>
              <h2 style={{ paddingLeft: "35vw" }}>Web developpement</h2>
            </AnimatedTitle>
           
         
          </div>
          <P5Sketch />
          <div className='sliderContainer'>
            <p>lines</p>
            <input type="range" min="1" max="60" defaultValue="5" step="1" id="lineSlider" />
          </div>
        </section>
       
      </main>

    </div>
  );
}

export default App;
