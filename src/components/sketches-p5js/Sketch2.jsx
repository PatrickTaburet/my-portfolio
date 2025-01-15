import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import ProfilPicture from './../../assets/images/avatar.webp';

const Sketch2 = ({isRunning, onCircleUpdate }) => {
  const p5InstanceRef = useRef(null);
  const sketchContainerRef = useRef(null);

  useEffect(() => {
    if (sketchContainerRef.current) {
      p5InstanceRef.current = new p5(sketch, sketchContainerRef.current);
          
      const handleResize = () => {
        if (p5InstanceRef.current) {
          const canvasHeight = p5InstanceRef.current.windowWidth < 560 ? 1150 : p5InstanceRef.current.windowHeight + 55;     
          p5InstanceRef.current.resizeCanvas(window.innerWidth - 15, canvasHeight);
          p5InstanceRef.current.background(270, 80, 30);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (p5InstanceRef.current) {
      isRunning ? p5InstanceRef.current.loop() : p5InstanceRef.current.noLoop();
    }
  }, [isRunning]);

  const sketch = (p) => {
    let circle;
    let pictureMedia;

    p.preload = () => {
      pictureMedia = p.loadImage(ProfilPicture);
    };

    p.setup = () => {
      const canvasHeight = p.windowWidth < 560 ? 1150 : p.windowHeight + 55;
      const canvas = p.createCanvas(p.windowWidth - 15, canvasHeight);
      canvas.parent(sketchContainerRef.current);
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);
      p.background(270, 80, 20);
      circle = new Circle();
    };

    p.draw = () => {
      p.clear();
      p.background(270, 80, 20); 
      
      const mouseCircle = drawMouseCircle(circle.size);
      circle.update(mouseCircle);
      circle.display();

      onCircleUpdate(circle.x, circle.y, circle.size);
    };

    function drawMouseCircle(circleSize){
      const mouseCircleRadius =  circleSize * 0.18;
      const mouseCircle = { x: p.mouseX, y: p.mouseY, radius: mouseCircleRadius };

      p.noFill();
      p.stroke(circle.collisionDetected ? '#2BF7BC' : '#FFFFFF'); 
      p.strokeWeight(2);
      p.ellipse(p.mouseX, p.mouseY, mouseCircleRadius  * 2, mouseCircleRadius  * 2); 
      
      return mouseCircle;
    }

    p.windowResized = () => {
      circle.size = circle.calculateSize();    
      // circle.calculatePosition();   
    }

    class Circle {
      constructor() {
        this.calculatePosition(); 
        this.vx = 0;
        this.vy = 0;
        this.size = this.calculateSize();
        this.maskedImage = null; 
        this.media = pictureMedia;
        this.collisionDetected = false;
        this.collisionTimer = 0; 
      }

      calculatePosition(){
        if (p.width > 1400) {
          this.x = p.width / 2;
          this.y = p.height;
        } else if (p.width < 560) {
          this.x = p.width / 2;
          this.y = p.height / 2.9;
        } else if (p.width < 768) {
          this.x = p.width / 3.5;
          this.y = p.height / 1.63;
         } else if (p.width < 1100) {
          this.x = p.width / 1.39;
          this.y = p.height / 1.2;
        } else {
          this.x = p.width / 1.75;
          this.y = p.height / 1.2;
        }
      }
    
      update(mouseCircle) {
        this.size = this.calculateSize();
        // Check collision with the mouse circle
        const dx = this.x - mouseCircle.x;
        const dy = this.y - mouseCircle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Minimum distance to prevent visual penetration
        const minDistance = this.size / 2 + mouseCircle.radius;

        if (distance < (minDistance)) {
          // Calculate repulsion force
          const overlap = (minDistance) - distance;
          const forceX = (dx / distance) * overlap;
          const forceY = (dy / distance) * overlap;
    
          // Apply the force to move the circle away
          this.vx += forceX * 0.3; // Intensity
          this.vy += forceY * 0.3;

           // Position the circle at the edge of the mouse circle
          const angle = Math.atan2(dy, dx);
          this.x = mouseCircle.x + Math.cos(angle) * minDistance;
          this.y = mouseCircle.y + Math.sin(angle) * minDistance;
         // Set collision to true and reset timer
          this.collisionDetected = true;
          this.collisionTimer = 2.3;
        }
        if (this.collisionTimer > 0) {
          this.collisionTimer--;
        } else {
          this.collisionDetected = false;
        }
        // Update position with velocity
        this.x += this.vx;
        this.y += this.vy;

        // Apply some damping to the velocity to make the motion smoother
        this.vx *= 0.9;
        this.vy *= 0.9;
        
        this.constrainToCanvas();
      }

      calculateSize() {
        const minSize = 150; 
        const maxSize = p.width * 0.13; 
      
        // logarithmic function
        const size = minSize + (maxSize - minSize) * Math.log(p.width) / Math.log(1920);
        return Math.max(minSize, size); 
      }

      display() {
        this.drawMedia();
        p.noFill();
        p.stroke('#2BF7BC');
        p.strokeWeight(3);
        p.ellipse(this.x, this.y, this.size);
      }

      drawMedia() {
        if (!this.maskedImage) this.maskedImage = this.createMaskedImage(this.media, this.size);

        const imgX = this.x - this.size / 2;
        const imgY = this.y - this.size / 2;
        const imgSize = this.size;
        
        p.push();
        p.tint(255, this.opacity); 
        p.image(this.maskedImage, imgX, imgY, imgSize, imgSize); 
        p.pop();
      }
      
      createMaskedImage(img, size) {
        // Create a p5.Image for the mask
        const mask = p.createGraphics(size, size);
        mask.ellipseMode(p.CENTER);
        mask.fill(255);
        mask.noStroke();
        mask.ellipse(size / 2, size / 2, size, size);
    
        // Create a new p5.Image with the media and apply the mask
        const maskedImage = img.get(); 
        maskedImage.resize(size, size); 
        maskedImage.mask(mask); 
    
        return maskedImage;
      }

      constrainToCanvas() {
        const halfSize = this.size / 2;
      
        // Check collision with left and right edges
        if (this.x - halfSize < 0) {
          const overlap = halfSize - this.x;
          this.x = halfSize; // Correct position
          this.vx = Math.abs(this.vx) + overlap * 0.1; // Bounce back
        } else if (this.x + halfSize > p.width) {
          const overlap = this.x + halfSize - p.width;
          this.x = p.width - halfSize; // Correct position
          this.vx = -Math.abs(this.vx) - overlap * 0.1; // Bounce back
        }
      
        // Check collision with top and bottom edges
        if (this.y - halfSize < 0) {
          const overlap = halfSize - this.y;
          this.y = halfSize; // Correct position
          this.vy = Math.abs(this.vy) + overlap * 0.1; // Bounce back
        } else if (this.y + halfSize > p.height) {
          const overlap = this.y + halfSize - p.height;
          this.y = p.height - halfSize; // Correct position
          this.vy = -Math.abs(this.vy) - overlap * 0.1; // Bounce back
        }
      }
    }
  };

  return <div id="sketch-container2" ref={sketchContainerRef}></div>;
};

export default Sketch2;