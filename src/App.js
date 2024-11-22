import './App.css';
import P5Sketch from './components/p5-sketch';
import './global.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <a href="">My Projects</a> / <a href="">About me</a> / <a href="">Contact</a>
      </header>



      <main className='container'>
        <section>
          <div className='section1Content'>
            <h1>Taburet Patrick</h1>
            <h2>Web developpement</h2>
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
