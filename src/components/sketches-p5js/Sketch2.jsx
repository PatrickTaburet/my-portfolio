import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Sketch2 = ({isRunning}) => {
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    p5InstanceRef.current = new p5(sketch, document.getElementById('sketch-container2'));
    
    isRunning ? p5InstanceRef.current.loop() : p5InstanceRef.current.noLoop();
    
    const handleResize = () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.resizeCanvas(window.innerWidth, window.innerHeight + 20);
        p5InstanceRef.current.background(197, 15, 72);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [isRunning]);

  const sketch = (p) => {
  
    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight + 20);
      canvas.parent('sketch-container2');
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);
      p.background(197, 15, 72);
    };

    p.draw = () => {
      p.clear();
      p.background(197, 15, 72); 
      const radius = 50;
      p.noFill();
      p.stroke(255); 
      p.strokeWeight(2);
      p.ellipse(p.mouseX, p.mouseY, radius * 2, radius * 2); 
    };
  };

  return <div id="sketch-container2"></div>;
};

export default Sketch2;