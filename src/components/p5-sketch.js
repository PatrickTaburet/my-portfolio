import React from 'react';
import Sketch from 'react-p5';

let prevX, prevY;
let mainColor;
let colors = [];
let lines = [];
let lineSlider;
let noiseOffsets = [];

const P5Sketch = (props) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB, 360, 100, 100, 1);
    p5.frameRate(50);
    p5.background(0, 0, 0);
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

  const draw = (p5) => {
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

    p5.fill(0, 0, 0, 0.03);
    p5.noStroke();
    p5.rect(0, 0, p5.width, p5.height);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0, 0, 0);
    prevX = p5.mouseX;
    prevY = p5.mouseY;
  };

  const mouseMoved = (p5) => {
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

  const mouseClicked = (p5) => {
    mainColor = p5.random(colors);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      mouseMoved={mouseMoved}
      mouseClicked={mouseClicked}
    />
  );
};

export default P5Sketch;