/**
 * @module Slider
 * @description A customizable image and video carousel component for React applications.
 */

import React, { useState, useEffect, useCallback } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./slider.module.css";
import ReactPlayer from "react-player";

/**
 * @component VideoSlide
 * @description Renders a video slide using ReactPlayer.
 * @param {Object} props - Component props
 * @param {string} props.url - URL of the video
 * @param {boolean} props.isSelected - Whether the slide is currently selected
 */
const VideoSlide = ({ url, isSelected }) => (
    <ReactPlayer
        url={url}
        playing={isSelected}
        controls
        width="100%"
        height="100%"
        className={styles.videoContainer}
    />
);

/**
 * @component Slider
 * @description A carousel component that supports both images and videos.
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image and video objects to display in the slider
 */
const Slider = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

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
                renderItem={(item, { isSelected }) =>
                    item.props.slide.type === "image" ? (
                        <img
                            src={item.props.slide.source}
                            alt={item.props.slide.title}
                            className={styles.sliderImage}
                        />
                    ) : (
                        <VideoSlide url={item.props.slide.source} isSelected={isSelected} />
                    )
                }
            >
                {images.map((slide) => (
                    <div key={slide.id} slide={slide}></div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
