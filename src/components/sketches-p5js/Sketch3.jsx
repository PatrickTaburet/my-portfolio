import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Sketch2 = (props) => {
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    p5InstanceRef.current = new p5(sketch, document.getElementById('sketch-container3'));
    
    const handleResize = () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.resizeCanvas(window.innerWidth, window.innerHeight);
        p5InstanceRef.current.background(196, 58, 5);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  const sketch = (p) => {
    let circles = [];

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('sketch-container3');
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);
      p.background(196, 58, 5);

      circles.push(new Circle(150, 0, "NexusLab"));
      circles.push(new Circle(170, p.PI, "Creative\nCoding")); // Start the second circle at the opposite
      // Add new circles for new projects
    };

    p.draw = () => {
      p.background(196, 58, 5);
      let isHovering = false;

      circles.forEach(circle => {
        circle.update();
        circle.display();
        if (circle.checkHover(p.mouseX, p.mouseY)) {
          isHovering = true;
        }
      });

      if (isHovering) {
        p.cursor(p.HAND);
      } else {
        p.cursor(p.ARROW);
      }
    };

    p.mouseMoved = () => {
      circles.forEach(circle => circle.checkHover(p.mouseX, p.mouseY));
    };

    p.mouseClicked = () => {
      circles.forEach(circle => {
        if (circle.clicked(p.mouseX, p.mouseY)) {
          // Open project page
        }
      });
    };
    
    class Circle {
      constructor(baseSize, initialAngle, text) {
        this.baseSize = baseSize;
        this.size = baseSize;
        this.angle = initialAngle;
        this.speed = 0.01;
        this.hovered = false;
        this.text = text;
      }

      update() {
        this.angle += this.speed;
        let perspective = p.map(p.sin(this.angle), -1, 1, 0.5, 1.5);
        this.x = p.width / 2 + p.cos(this.angle) * 300 * perspective;
        this.y = p.height / 2 + p.sin(this.angle) * 130;
        this.size = this.baseSize * perspective;

        if (this.hovered) {
          this.size *= 1.2;
        }
        
        // Make circles staying in the canvas
        this.x = p.constrain(this.x, this.size/2, p.width - this.size/2);
        this.y = p.constrain(this.y, this.size/2, p.height - this.size/2);
      }

      display() {
        p.fill(163, 93, 100);
        p.ellipse(this.x, this.y, this.size);
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(0);
        p.textSize(this.size / 7);
        p.text(this.text, this.x, this.y);
      }

      checkHover(mx, my) {
        let d = p.dist(mx, my, this.x, this.y);
        this.hovered = d < this.size / 2;
        return this.hovered;
      }

      clicked(mx, my) {
        let d = p.dist(mx, my, this.x, this.y);
        return d < this.size / 2;
      }
    }
  
  };

  return <div id="sketch-container3"></div>;
};

export default Sketch2;