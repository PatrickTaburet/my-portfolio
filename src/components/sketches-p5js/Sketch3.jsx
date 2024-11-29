import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import NexusLabMedia from './../../assets/images/avatar.png';
import CreativeCodingMedia from './../../assets/images/cyber.png';



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
    let mediaProject1, mediaProject2;
    let maskGraphics; 
    let fade;

    p.preload = () => {
      mediaProject1 = p.loadImage(NexusLabMedia);
      mediaProject2 = p.loadImage(CreativeCodingMedia);
    };

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('sketch-container3');
      p.colorMode(p.HSB, 360, 100, 100, 1);
      p.frameRate(50);
      p.background(196, 58, 5);
      maskGraphics = p.createGraphics(p.windowWidth, p.windowHeight);
      fade = 0

      circles.push(new Circle(150, 0, "NexusLab", mediaProject1));
      circles.push(new Circle(170, p.PI, "Creative\nCoding", mediaProject2)); // Start the second circle at the opposite
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
      // console.log(isHovering );
      
      p.cursor(isHovering ? p.HAND : p.ARROW);
    };

    p.mouseMoved = () => {
      circles.forEach(circle => circle.checkHover(p.mouseX, p.mouseY));
    };

    p.mouseClicked = () => {
      circles.forEach(circle => {
        if (circle.clicked(p.mouseX, p.mouseY)) {
          circle.size = Math.max(p.width, p.height); // Set target size to the larger dimension of the canvas
          // Open project page

        }
      });
    };
    
    class Circle {
      constructor(baseSize, initialAngle, text, media) {
        this.baseSize = baseSize;
        this.size = baseSize;
        this.angle = initialAngle;
        this.speed = 0.01;
        this.media = media;
        this.text = text;
        this.hovered = false;
        this.opacity = 0;
        this.isExpanded = false; 
      }

      update() {
        this.angle += this.speed;
        let perspective = p.map(p.sin(this.angle), -1, 1, 0.5, 1.5);
        
        // Calculate the position of the circle
        this.x = p.width / 2 + p.cos(this.angle) * 300 * perspective;
        this.y = p.height / 2 + p.sin(this.angle) * 130;

        let targetSize;
        if (this.isExpanded) {
          targetSize = Math.max(p.width, p.height) * 2; // Cover the full screen
        } else {
          // Define the target size based on the hover state
          targetSize = this.hovered ? this.baseSize * 2 : this.baseSize;
        }

      
        // let targetSize = this.hovered ? this.baseSize * 2 : this.baseSize;
        // Interpolate the current size towards the target size to increase smoothly
        this.size = p.lerp(this.size, targetSize * perspective, 0.1);
        
        if (this.hovered) {
          this.opacity = p.lerp(this.opacity, 1, 0.1); // Opacity increases smoothly on hover
        } else {
          this.opacity = p.lerp(this.opacity, 0, 0.1); // Opacity decreases smoothly when not hovered
        }
        
        // Constrain to canvas bounds
        this.x = p.constrain(this.x, this.size/2, p.width - this.size/2);
        this.y = p.constrain(this.y, this.size/2, p.height - this.size/2);
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
                
        // Display project title
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(0);
        p.textSize(this.size / 7);
        p.text(this.text, this.x, this.y);
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
        this.hovered = d < this.size / 2;
        return this.hovered;
      }

      clicked(mx, my) {
        let d = p.dist(mx, my, this.x, this.y);
        if (d < this.size / 2) {
          this.isExpanded = !this.isExpanded;
          return true;
        }
        return false;
      }
    }
  };

  return <div id="sketch-container3"></div>;
};

export default Sketch2;