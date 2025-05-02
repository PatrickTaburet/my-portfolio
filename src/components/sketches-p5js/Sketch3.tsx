import React, { useRef, useEffect, FC } from 'react';
import p5 from 'p5';
import NexusLabMedia from './../../assets/images/nexusLab/logo-purple.webp';
import CreativeCodingMedia from './../../assets/images/creativeCoding/circle-flowfield-webm-original.webm';
import LifeSimulatorMedia from './../../assets/images/lifeSimulator/molecule.png';

type Sketch3Props ={
  onCircleClick: (projectName: string) => void;
  launchMode: boolean;
  closedCircle: string | null;
  isRunning: boolean;
}

const Sketch3:FC<Sketch3Props> = ({ onCircleClick, launchMode, closedCircle, isRunning }) => {
  const p5InstanceRef = useRef<p5 | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!p5InstanceRef.current && containerRef.current) {
       p5InstanceRef.current = new p5(sketch, containerRef.current);
    }
    
    const handleResize = () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.resizeCanvas(window.innerWidth, window.innerHeight + 50);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null; 
      }
    };
  }, []);

  useEffect(() => {
    if (p5InstanceRef.current) {      
      isRunning ? p5InstanceRef.current.loop() : p5InstanceRef.current.noLoop();
    }
  }, [isRunning]);

  const sketch = (p: p5) => {
    
    let circles: Circle[] = [];
    let storedCircles: Circle[] = [];
    let mediaProject1: p5.Image, mediaProject2: p5.MediaElement, mediaProject3: p5.Image;
    let maxDistanceX: number, maxDistanceY: number;
    let circleSize: number;
    const LERP_SPEED = 0.1;

    p.setup = async () => {
      mediaProject1 = await p.loadImage(NexusLabMedia);
      mediaProject2 = p.createVideo(CreativeCodingMedia);
      mediaProject2.hide(); 
      mediaProject3 = await p.loadImage(LifeSimulatorMedia);
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight );
      canvas.parent('sketch-container3');
      canvas.elt.getContext('2d', { willReadFrequently: true }); 
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);

      mediaProject2.volume(0);
      mediaProject2.hide();

      // Proportional orbital distance and size
      maxDistanceX = p.map(p.width, 300, 1800, p.width * 0.3, p.width * 0.2, true);
      maxDistanceY = p.map(p.width, 300, 1800, p.height * 0.1, p.height * 0.15, true);
      circleSize = Math.min(p.width, p.height) * 0.2;

      // Add circles projects
      circles.push(new Circle(0, "NexusLab", mediaProject1));
      circles.push(new Circle(p.PI, "Creative_Coding", mediaProject2)); // Start the second circle at the opposite
      circles.push(new Circle(p.PI/2, "Life_Simulator", mediaProject3));
      // ---> Add new circles for new projects
      
      if (!launchMode && closedCircle) {
        const targetCircle = circles.find(circle => circle.text === closedCircle);
        if (targetCircle) {
          targetCircle.isClosing = true; 
          targetCircle.size = Math.max(p.width, p.height) * 2; // Initially in full-screen
          targetCircle.x = p.width / 2;
          targetCircle.y = p.height / 2;
        }
      }
    };

    p.draw = () => {
      // p.background(196, 58, 5);      
      p.clear(); 

      const isClosingCircle = circles.some(circle => circle.isClosing);

     // Sort circles by size to draw larger ones on top
      circles.sort((a, b) => a.size - b.size);

      // Calculate the distance of the mouse from the center of the screen
      const centerX = p.width / 2;
      const mouseXDistance = p.mouseX - centerX;
      const speedFactor = p.map(Math.abs(mouseXDistance), 0, centerX, 0.005, 0.1);
      const adjustedSpeed = mouseXDistance < 0 ? -speedFactor : speedFactor; 
      circles.forEach(circle => {
        circle.speed = adjustedSpeed; 
        circle.update(isClosingCircle);
        circle.display();
      });
    };

    p.windowResized = () => {
      // Dynamix update of circleSize and distance
      circleSize = Math.min(p.width, p.height) * 0.2;
      maxDistanceX = p.map(p.width, 300, 1800, p.width * 0.3, p.width * 0.2, true);
      maxDistanceY = p.map(p.width, 300, 1800, p.height * 0.1, p.height * 0.15, true);
    };

    p.mouseMoved = () => {
      const renderer = (p as any)._renderer;
      if (!renderer || !renderer.elt) return;
    
      let isHovering = false;

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const isHovered = circle.checkHover(p.mouseX, p.mouseY);
    
        if (circle.hovered !== isHovered) {
          circle.hovered = isHovered;
        }
    
        if (isHovered) {
          isHovering = true;
          if (mediaProject2.elt.paused) {
            mediaProject2.play();
            mediaProject2.loop();
          }
          break;
        }
      }
      if (!isHovering && !mediaProject2.elt.paused) {
        mediaProject2.pause();
      }
    
      p.cursor(isHovering ? p.HAND : p.ARROW);
    };

    p.mouseClicked = () => {
      circles.forEach((circle, index) => {
        if (circle.checkHover(p.mouseX, p.mouseY)) {
          circle.isExpanded = !circle.isExpanded;
          // Open project page

          if (circle.isExpanded) {
            // If the circle is expanded, remove the other circles from the array and place them in storedCircles
            storedCircles = circles.filter((_, i) => i !== index); 
            circles = [circle];  // Keep only the expanded circle
            if (onCircleClick) {
              setTimeout(() => {
                onCircleClick(circle.text);
              }, 800);
            }
          } else {
            // If the circle is collapsed, re-add all the circles stored in storedCircles
            circles = [circle, ...storedCircles];
            storedCircles = []; // Empty the temporary list
          }
        }
      });
    };

    class Circle {
      size: number; 
      angle: number;
      speed: number;
      media: p5.MediaElement | p5.Image;
      text: string;
      hovered: boolean;
      opacity: number;
      isExpanded: boolean; 
      isClosing: boolean; 
      initialAngle: number; 
      x: number;
      y: number;
      circleState: "orbiting" | "closing" | "locked" | "expanded";

      constructor(initialAngle: number, text: string, media: p5.MediaElement | p5.Image) {
        this.size = circleSize; 
        this.angle = initialAngle;
        this.speed = 0.01;
        this.media = media;
        this.text = text;
        this.hovered = false;
        this.opacity = 0;
        this.isExpanded = false; 
        this.isClosing = false; 
        this.initialAngle = initialAngle; 
        this.x = 0;
        this.y = 0;
        this.circleState = "orbiting";
        // this.maskedImage = null; 
      }

      update (isClosingCircle: boolean){
        // Determine the current state
        if (this.isExpanded) {
          this.circleState = "expanded";
        } else if (this.isClosing) {
          this.circleState = "closing";
        } else if (isClosingCircle) {
          this.circleState = "locked";
        } else {
          this.circleState = "orbiting";
        }

        switch (this.circleState) {
          case "expanded":
           this.expendCircle();
            break;
          case "closing":
            this.moveToInitialPosition();
            break;
          case "locked":
            this.lockPosition();
            break;
          case "orbiting":
          default:
            this.orbitalMovement();
            break;
        }
      }

      expendCircle() {
        // If the circle is enlarged, set its position progressively to the center of the canvas
        this.opacity = p.lerp(this.opacity, -0.5, 0.05); 
        // Progressive enlargement to fullscreen
        this.x = p.lerp(this.x, p.width / 2, LERP_SPEED);
        this.y = p.lerp(this.y, p.height / 2, LERP_SPEED);
        this.size = p.lerp(this.size, Math.max(p.width, p.height) * 2, 0.03);
      }
      moveToInitialPosition() {
        // Target position using the initial angle
        this.x = p.lerp(this.x, p.width / 2 + p.cos(this.initialAngle) * maxDistanceX, LERP_SPEED);
        this.y = p.lerp(this.y, p.height / 2 + p.sin(this.initialAngle) * maxDistanceY, LERP_SPEED);
        this.size = p.lerp(this.size, circleSize, LERP_SPEED);
        if (Math.abs(this.size - circleSize) < 1) this.isClosing = false;
      }
      lockPosition() {
        // Locking the unselected circles while closing another circle                
        this.x = p.width / 2 + p.cos(this.initialAngle) * maxDistanceX;
        this.y = p.height / 2 + p.sin(this.initialAngle) * maxDistanceY;
      }
      orbitalMovement() {
        this.angle += this.speed;
        let perspective = p.map(p.sin(this.angle), -1, 1, 0.5, 1.5);

        // Calculate the position of the circle
        this.x = p.width / 2 + p.cos(this.angle) * maxDistanceX;
        this.y = p.height / 2 + p.sin(this.angle) * maxDistanceY;
        // Dynamic circles size
        const targetSize = this.hovered ? circleSize * 2 : circleSize;

        this.size = p.lerp(this.size, targetSize * perspective, 0.3);
        this.opacity = p.lerp(this.opacity, this.hovered ? 1 : 0, LERP_SPEED); // Opacity increases or decreases smoothly with hover
      }
 
      display() {
        this.drawCircle();
        this.drawMedia();
        this.drawText();
      }

      drawCircle() {
        p.fill(163, 93, 100);
        p.ellipse(this.x, this.y, this.size);
      }
      drawMedia() {
         // Display project preview with fade effect
        if (this.media && this.opacity > 0) {
          const circleDiameter = this.size;
      
          const aspectRatio = this.media.width / this.media.height;
          let imgWidth, imgHeight;
      
          // Calculate the scaled width and height while maintaining aspect ratio
          if (aspectRatio > 1) {
          // Landscape orientation
            imgWidth = circleDiameter;
            imgHeight = circleDiameter / aspectRatio;
          } else {
            // Portrait or square orientation
            imgWidth = circleDiameter * aspectRatio;
            imgHeight = circleDiameter;
          }
      
          p.push();
          p.imageMode(p.CENTER);
          p.translate(this.x, this.y);
          p.tint(255, this.opacity); // Apply fade transition to image opacity
          p.image(this.media, 0, 0, imgWidth, imgHeight);
          p.pop(); 
        }
      }
     
      drawText() {
        if (!this.isExpanded) {
          // Display project title
          p.textAlign(p.CENTER, p.CENTER);
          this.hovered ?  p.fill(255) : p.fill(0);

          p.textSize(this.size / 7);

          const lines = this.text.split('_');
          const lineHeight = this.size / 7;
          lines.forEach((line, index) => {
            const yOffset = (index - (lines.length - 1) / 2) * lineHeight;
            p.text(line, this.x, this.y + yOffset);
          });
        }
      }

      checkHover(mx: number, my: number) {
        let d = p.dist(mx, my, this.x, this.y);
        return d < this.size / 2;
      }
    }
  };

  return <div ref={containerRef} id="sketch-container3" key="sketch-container3"></div>;
};

export default Sketch3;