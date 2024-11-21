import './App.css';
import P5Sketch from './components/p5-sketch';

function App() {
  return (
    <div className="App">
      <div className='container'>
      <P5Sketch />
        <p>lines</p>
        <input type="range" min="1" max="40" defaultValue="5" step="1" className="slider" id="lineSlider" />
      </div>
      {/* <header className="App-header">
        <h1>Taburet Patrick</h1>
        <h2>Web developpement</h2>
      </header> */}
      <main>
       
      </main>

    </div>
  );
}

export default App;
