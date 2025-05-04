import p5 from "p5";

export function loadP5Image(p: p5, src: string): Promise<p5.Image> {
    return new Promise(resolve => {
      p.loadImage(src, img => resolve(img));
    });
  }
  
  export function loadP5Video(p: p5, src: string): Promise<p5.MediaElement> {
    return new Promise(resolve => {
      const vid = p.createVideo(src, () => resolve(vid));
      vid.hide();
    });
  }
  