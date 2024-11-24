import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
// import "../section1/section1.css"

let mainColor;
let colors = [];
let lines = [];
let lineSlider;
let noiseOffsets = [];

const Sketch1 = (props) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketchInstance = new p5(sketch, document.getElementById('sketch-container'));
    return () => {
      sketchInstance.remove();
    };
  }, []);

  const sketch = (p) => {
    let prevX, prevY;

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('sketch-container');
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);
      p.background(196, 58, 5);
      prevX = p.mouseX;
      prevY = p.mouseY;
      p.strokeWeight(10);

      colors = [
        p.color(180, 100, 50, 1),
        p.color(300, 100, 50, 1),
        p.color(120, 100, 50, 1),
        p.color(60, 100, 50, 1)
      ];
      lines.push({
        prevX: p.mouseX,
        prevY: p.mouseY,
        offsetX: p.random(1000),
        offsetY: p.random(1000),
        baseAngle: p.random(p.TWO_PI)
      });

      lineSlider = p.select('#lineSlider');
    };

    p.draw = () => {
      // console.log(lineSlider.value());

      if (!mainColor) {
        mainColor = p.color(180, 100, 50, 1);
      }
  
      for (let i = 0; i < lines.length; i++) {
        let mainLine = lines[i];
        p.stroke(mainColor);
  
        let noiseScale = 0.01;
        let stepSize = 5;
        let noiseAngle = p.noise(mainLine.offsetX, mainLine.offsetY) * p.TWO_PI;
        let angle = mainLine.baseAngle + noiseAngle;
  
        let newX = mainLine.prevX + p.cos(angle) * stepSize;
        let newY = mainLine.prevY + p.sin(angle) * stepSize;
  
        p.line(mainLine.prevX, mainLine.prevY, newX, newY);
  
        mainLine.prevX = newX;
        mainLine.prevY = newY;
  
        mainLine.offsetX += noiseScale;
        mainLine.offsetY += noiseScale;
  
        if (p.random(1) < 0.05 && lines.length < lineSlider.value()) {
          lines.push({
            prevX: newX,
            prevY: newY,
            offsetX: p.random(1000),
            offsetY: p.random(1000),
            baseAngle: p.random(p.TWO_PI)
          });
        }
        p.strokeWeight(3 + i / 3);
      }
  
      p.fill(196, 58, 5, 0.03);
      p.noStroke();
      p.rect(0, 0, p.width, p.height);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      p.background(196, 58, 10);
      prevX = p.mouseX;
      prevY = p.mouseY;
    };

    p.mouseMoved = () => {
      for (let line of lines) {
        line.prevX = p.mouseX;
        line.prevY = p.mouseY;
      }
      lines = [];
      lines.push({
        prevX: p.mouseX,
        prevY: p.mouseY,
        offsetX: p.random(1000),
        offsetY: p.random(1000),
        baseAngle: p.random(p.TWO_PI)
      });
    };

    p.mouseClicked = () => {
      mainColor = p.random(colors);
    };
  };

  return <div id="sketch-container"></div>;
};

export default Sketch1;