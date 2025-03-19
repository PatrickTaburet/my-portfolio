/**
 * @module Slider
 * @description A customizable image and video carousel component for React applications.
 */

import React, { useState, useEffect, useCallback, FC, ReactElement } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./slider.module.css";
import ReactPlayer from "react-player";
import { Slide } from '../../../types/ProjectMapping';

type VideoSlideType = {
    url: string;
    isSelected: boolean;
}

type SliderProps = {
    images: Slide[];
}
/**
 * @component VideoSlide
 * @description Renders a video slide using ReactPlayer.
 */
const VideoSlide: FC<VideoSlideType> = ({ url, isSelected }) => (
    <ReactPlayer
        url={url}
        playing={isSelected}
        controls
        width="100%"
        height="100%"
        className={styles.videoContainer}
    />
);

interface SlideDivProps extends React.HTMLAttributes<HTMLDivElement> {
    slide: Slide;
}
  
const SlideDiv: FC<SlideDivProps> = ({ slide, ...rest }) => <div {...rest} />;


/**
 * @component Slider
 * @description A carousel component that supports both images and videos.
 */
const Slider: FC<SliderProps> = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const handleMouseEnter = useCallback(() => setIsPaused(true), []);
    const handleMouseLeave = useCallback(() => setIsPaused(false), []);

    useEffect(() => {
        if (!isPaused) {
            const currentSlide = images[selectedIndex];
            const isVideo = currentSlide.type === "video";
            const delay = isVideo ? 8000 : 3000;
    
            const timer = setTimeout(() => {
                setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, delay);
    
            return () => clearTimeout(timer);
        }
    }, [selectedIndex, images, isPaused]);

    const RenderSlide = (
        item: React.ReactNode, 
        options?: { isSelected: boolean; isPrevious: boolean }
    ): ReactElement | null => {
        const opts = options ?? { isSelected: false, isPrevious: false };
        const element = item as ReactElement<{ slide: Slide }>;
        const slide = element.props.slide;
        if (slide.type === "image") {
            return (
              <img
                src={slide.source}
                alt={slide.title}
                className={styles.sliderImage}
              />
            );
          } else {
            return <VideoSlide url={slide.source} isSelected={opts.isSelected} />;
          }
    };

    return (
        <div 
            className={styles.sliderWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Carousel
                selectedItem={selectedIndex}
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                onChange={setSelectedIndex}
                autoPlay={false}
                stopOnHover={false}
                renderItem={RenderSlide}
            >
                {images.map((slide) => (
                     <SlideDiv key={slide.id} slide={slide} />
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
