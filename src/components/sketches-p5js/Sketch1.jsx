import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

let mainColor;
let colors = [];
let lines = [];
let lineSlider;
let noiseOffsets = [];

const Sketch1 = (props) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    // Create a new instance of p5 only if it doesn't already exist
    if (!sketchRef.current) {
      sketchRef.current = new p5(sketch);
    }

    // Clean up the p5 instance when the component unmounts
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  const sketch = (p5) => {
    let prevX, prevY;

    p5.setup = () => {
      const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvas.parent('sketch-container');
      p5.colorMode(p5.HSB, 360, 100, 100, 1);
      p5.frameRate(50);
      p5.background(196, 58, 5);
      prevX = p5.mouseX;
      prevY = p5.mouseY;
      p5.strokeWeight(10);

      colors = [
        p5.color(180, 100, 50, 1),
        p5.color(300, 100, 50, 1),
        p5.color(120, 100, 50, 1),
        p5.color(60, 100, 50, 1)
      ];
      lines.push({
        prevX: p5.mouseX,
        prevY: p5.mouseY,
        offsetX: p5.random(1000),
        offsetY: p5.random(1000),
        baseAngle: p5.random(p5.TWO_PI)
      });

      lineSlider = p5.select('#lineSlider');
    };

    p5.draw = () => {
      console.log(lineSlider.value());

      if (!mainColor) {
        mainColor = p5.color(180, 100, 50, 1);
      }
  
      for (let i = 0; i < lines.length; i++) {
        let mainLine = lines[i];
        p5.stroke(mainColor);
  
        let noiseScale = 0.01;
        let stepSize = 5;
        let noiseAngle = p5.noise(mainLine.offsetX, mainLine.offsetY) * p5.TWO_PI;
        let angle = mainLine.baseAngle + noiseAngle;
  
        let newX = mainLine.prevX + p5.cos(angle) * stepSize;
        let newY = mainLine.prevY + p5.sin(angle) * stepSize;
  
        p5.line(mainLine.prevX, mainLine.prevY, newX, newY);
  
        mainLine.prevX = newX;
        mainLine.prevY = newY;
  
        mainLine.offsetX += noiseScale;
        mainLine.offsetY += noiseScale;
  
        if (p5.random(1) < 0.05 && lines.length < lineSlider.value()) {
          lines.push({
            prevX: newX,
            prevY: newY,
            offsetX: p5.random(1000),
            offsetY: p5.random(1000),
            baseAngle: p5.random(p5.TWO_PI)
          });
        }
        p5.strokeWeight(3 + i / 3);
      }
  
      p5.fill(196, 58, 5, 0.03);
      p5.noStroke();
      p5.rect(0, 0, p5.width, p5.height);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(196, 58, 10);
      prevX = p5.mouseX;
      prevY = p5.mouseY;
    };

    p5.mouseMoved = () => {
      for (let line of lines) {
        line.prevX = p5.mouseX;
        line.prevY = p5.mouseY;
      }
      lines = [];
      lines.push({
        prevX: p5.mouseX,
        prevY: p5.mouseY,
        offsetX: p5.random(1000),
        offsetY: p5.random(1000),
        baseAngle: p5.random(p5.TWO_PI)
      });
    };

    p5.mouseClicked = () => {
      mainColor = p5.random(colors);
    };
  };

  return <div id="sketch-container"></div>;
};

export default Sketch1;