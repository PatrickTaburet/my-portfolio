import './App.css';
import P5Sketch from './components/p5-sketch';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Taburet Patrick</h1>
        <h2>Web developpement</h2>
      </header>
      <div className='container'>
        <P5Sketch />
        <div className='sliderContainer'>
          <p>lines</p>
          <input type="range" min="1" max="60" defaultValue="5" step="1" id="lineSlider" />
        </div>
      </div>
      <main>
       
      </main>

    </div>
  );
}

export default App;
