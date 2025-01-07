import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './slider.module.css';
import ReactPlayer from 'react-player';

const VideoSlide = ({ url, isSelected }) => (
    <div className={styles.videoContainer}>
        <ReactPlayer
            url={url}
            playing={isSelected}  
            controls
            width="100%"
            height="100%"
        />
    </div>
);

// Slider component
const Slider = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);  // State to track the index of the selected slide

    // Function to render the slide content
    const renderSlide = (slide, isSelected) => {
        if (slide.type === "image") {
            return (
                <div key={slide.id} className={styles.slideContainer}>
                    <img
                        src={slide.source}
                        className={styles.sliderImage}
                        alt={slide.title}
                    />
                </div>
            );
        } else if (slide.type === "video") {
            return (
                <div key={slide.id} className={styles.slideContainer}>
                    <VideoSlide url={slide.source} isSelected={isSelected} />
                </div>
            );
        }
        return null;
    };

    // Handle the change of the selected slide index
    const handleChange = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={styles.sliderWrapper}>
            <Carousel
                autoPlay
                interval={3000}
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                dynamicHeight={false}
                selectedItem={selectedIndex}
                onChange={handleChange} // Update the selected index when the slide changes
                renderItem={(item, { isSelected }) =>
                    renderSlide(item.props.slide, isSelected) // Update the selected index when the slide changes
                }
            >
                {images.map((slide, index) => (
                    <div key={slide.id} slide={slide}></div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
