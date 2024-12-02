import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import NexusLabMedia from './../../assets/images/avatar.png';
import CreativeCodingMedia from './../../assets/images/cyber.png';

const Sketch3 = ({ onCircleClick, launchMode, closedCircle }) => {
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    p5InstanceRef.current = new p5(sketch, document.getElementById('sketch-container3'));
    
    const handleResize = () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.resizeCanvas(window.innerWidth, window.innerHeight);
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
    let storedCircles = [];
    let mediaProject1, mediaProject2;
    let fade;

    p.preload = () => {
      mediaProject1 = p.loadImage(NexusLabMedia);
      mediaProject2 = p.loadImage(CreativeCodingMedia);
    };

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('sketch-container3');
      p.setAttributes({ alpha: true });
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);
      fade = 0

      circles.push(new Circle(0, "NexusLab", mediaProject1));
      circles.push(new Circle(p.PI, "Creative\nCoding", mediaProject2)); // Start the second circle at the opposite
      // circles.push(new Circle(p.PI/2, "test"));
      // ---> Add new circles for new projects
      if (!launchMode && closedCircle) {
        const targetCircle = circles.find(circle => circle.text === closedCircle);
        if (targetCircle) {
          targetCircle.isClosing = true; 
          targetCircle.size = Math.max(p.width, p.height) * 2; // Initialement en plein écran
          targetCircle.x = p.width / 2;
          targetCircle.y = p.height / 2;
        }
      }
    };

    p.draw = () => {
      // p.background(196, 58, 5);
      p.clear(); 
      console.log(launchMode, closedCircle );
      const isClosingCircle = circles.some(circle => circle.isClosing);
      // Calculate the distance of the mouse from the center of the screen
      const centerX = p.width / 2;
      const mouseXDistance = p.mouseX - centerX;
      const speedFactor = p.map(Math.abs(mouseXDistance), 0, centerX, 0.005, 0.1);
      const adjustedSpeed = mouseXDistance < 0 ? -speedFactor : speedFactor; circles.forEach(circle => {
        circle.speed = adjustedSpeed; 
        circle.update(isClosingCircle);
        circle.display();
      });
    };

    p.mouseMoved = () => {
      if (!p._renderer || !p._renderer.elt) {
        return; 
      }
      let isHovering = false;
    
      circles.forEach(circle => {
        const isHovered = circle.checkHover(p.mouseX, p.mouseY);
        if (circle.hovered !== isHovered) {
          circle.hovered = isHovered; 
        }
        if (isHovered) {
          isHovering = true;
        }
      });
    
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
      constructor(initialAngle, text, media) {
        this.size = Math.min(p.width, p.height) * 0.2; 
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
      }

      update(isClosingCircle) {        
        if (this.isExpanded) {
          // If the circle is enlarged, set its position progressively to the center of the canvas
          this.opacity = p.lerp(this.opacity, -0.5, 0.05); 

          this.x = p.lerp(this.x, p.width / 2, 0.1);
          this.y = p.lerp(this.y, p.height / 2, 0.1);
          this.size = p.lerp(this.size, Math.max(p.width, p.height) * 2, 0.03); // Progressive enlargement to fullscreen
        } else if (this.isClosing ){
          console.log("iciiii");
           // Calculer la position cible en fonction de l'angle initial
          const maxDistanceX = p.map(p.width, 300, 1800, p.width * 0.3, p.width * 0.2, true);
          const maxDistanceY = p.map(p.width, 300, 1800, p.height * 0.1, p.height * 0.15, true);
          
          // Position cible en utilisant l'angle initial
          this.x = p.lerp(this.x, p.width / 2 + p.cos(this.initialAngle) * maxDistanceX, 0.1);
          this.y = p.lerp(this.y, p.height / 2 + p.sin(this.initialAngle) * maxDistanceY, 0.1);

          this.size = p.lerp(this.size, Math.min(p.width, p.height) * 0.2, 0.05);

          if (Math.abs(this.size - Math.min(p.width, p.height) * 0.2) < 1) {
            this.isClosing = false; // Terminé
            console.log("OVERRRR");
          }
          
          
        } else if (isClosingCircle) {
          // Immobilisation des cercles non sélectionnés pendant la fermeture d'un autre cercle
          const maxDistanceX = p.map(p.width, 300, 1800, p.width * 0.3, p.width * 0.2, true);
          const maxDistanceY = p.map(p.width, 300, 1800, p.height * 0.1, p.height * 0.15, true);
      
          this.x = p.width / 2 + p.cos(this.initialAngle) * maxDistanceX;
          this.y = p.height / 2 + p.sin(this.initialAngle) * maxDistanceY;
          
        } else {

           // Proportional orbital distance
           let maxDistanceX = p.map(p.width, 300, 1800, p.width * 0.3, p.width * 0.2, true);
           let maxDistanceY = p.map(p.width, 300, 1800, p.height * 0.1, p.height * 0.15, true);

          // Orbital movment
          this.angle += this.speed;
          let perspective = p.map(p.sin(this.angle), -1, 1, 0.5, 1.5);
          
          // Calculate the position of the circle
          this.x = p.width / 2 + p.cos(this.angle) * maxDistanceX;
          this.y = p.height / 2 + p.sin(this.angle) * maxDistanceY;

          // Dynamic cicles size
          let maxCircleSize = Math.min(p.width, p.height) * 0.2; 
          let targetSize = this.hovered ? maxCircleSize * 2 : maxCircleSize;
          this.size = p.lerp(this.size, targetSize * perspective, 0.3);
          
          if (this.hovered) {
            this.opacity = p.lerp(this.opacity, 1, 0.1); // Opacity increases smoothly on hover
          } else {
            this.opacity = p.lerp(this.opacity, 0, 0.1); // Opacity decreases smoothly when not hovered
          }
          
          // Constrain to canvas bounds
          // this.x = p.constrain(this.x, this.size/2, p.width - this.size/2);
          // this.y = p.constrain(this.y, this.size/2, p.height - this.size/2);
        }   
      }

      display() {
        // Draw circles
        p.fill(163, 93, 100);
        p.ellipse(this.x, this.y, this.size);
        
        // Display project preview with fade effect
        if (this.media && this.opacity > 0) {
          let maskedImage = this.createMaskedImage(this.media, this.size);
          p.push();
          p.tint(255, this.opacity); // Apply fade transition to image opacity
          p.image(maskedImage, this.x - this.size / 2, this.y - this.size / 2);
          p.pop();
  
        }
        
        if(!this.isExpanded){
          // Display project title
          p.textAlign(p.CENTER, p.CENTER);
          p.fill(0);
          p.textSize(this.size / 7);
          p.text(this.text, this.x, this.y);
        }       
      
      }

      createMaskedImage(img, size) {
        // Create a p5.Image for the mask
        const mask = p.createGraphics(size, size);
        mask.ellipseMode(p.CENTER);
        mask.fill(255);
        mask.noStroke();
        mask.ellipse(size / 2, size / 2, size, size);
    
        // Create a new p5.Image with the media and apply the mask
        const maskedImage = img.get(); // Clone the image to avoid mutating the original
        maskedImage.resize(size, size); // Resize to match the circle size
        maskedImage.mask(mask); // Apply the mask
    
        return maskedImage;
      }

      checkHover(mx, my) {
        let d = p.dist(mx, my, this.x, this.y);
        return d < this.size / 2;
      }
    }
  };

  return <div id="sketch-container3"></div>;
};

export default Sketch3;