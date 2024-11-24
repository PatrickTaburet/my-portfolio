import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Sketch2 = (props) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketchInstance = new p5(sketch, document.getElementById('sketch-container'));
    return () => {
      sketchInstance.remove();
    };
  }, []);

  const sketch = (p) => {
  
    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('sketch-container2');
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);
      p.background(273, 92, 33);
    };

    p.draw = () => {
      p.clear();
      p.background(273, 92, 33); 
      const radius = 50;
      p.noFill();
      p.stroke(255); 
      p.strokeWeight(2);
      p.ellipse(p.mouseX, p.mouseY, radius * 2, radius * 2); 
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      p.background(273, 92, 33);
    };
  };

  return <div id="sketch-container2" className={props.className}></div>;
};

export default Sketch2;