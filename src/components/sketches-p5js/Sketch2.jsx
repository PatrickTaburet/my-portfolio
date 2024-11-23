import React, { useRef, useEffect } from 'react';
import p5 from 'p5';


const Sketch2 = (props) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    if (!sketchRef.current) {
      sketchRef.current = new p5(sketch);
    }
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  const sketch = (p5) => {
  
    p5.setup = () => {
      const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvas.parent('sketch-container');
      p5.colorMode(p5.HSB, 360, 100, 100, 1);
      p5.frameRate(50);
      p5.background(273, 92, 33);
    };

    p5.draw = () => {
      p5.clear();
      p5.background(273, 92, 33); 
      const radius = 50;
      p5.noFill();
      p5.stroke(255); 
      p5.strokeWeight(2);
      p5.ellipse(p5.mouseX, p5.mouseY, radius * 2, radius * 2); 
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(273, 92, 33);
    };
  };

  return <div id="sketch-container"></div>;
};

export default Sketch2;