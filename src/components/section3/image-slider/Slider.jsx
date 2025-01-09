import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./slider.module.css";
import ReactPlayer from "react-player";

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

const Slider = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const currentSlide = images[selectedIndex];
        const isVideo = currentSlide.type === "video";
        const delay = isVideo ? 8000 : 3000; // 6 seconds for videos, 3 seconds for images

        const timer = setTimeout(() => {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, delay);

        return () => clearTimeout(timer); // Cleanup the timer on unmount or slide change
    }, [selectedIndex, images]);

    return (
        <div className={styles.sliderWrapper}>
            <Carousel
                selectedItem={selectedIndex}
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                onChange={setSelectedIndex}
                autoPlay={false} // Disable autoPlay as we control the timing manually
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
