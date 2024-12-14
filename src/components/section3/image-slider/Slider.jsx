import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './slider.module.css';



const Slider = ({images}) => {

    return (
        <div className={styles.sliderWrapper}>
            <Carousel
                autoPlay
                interval={3000}
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                dynamicHeight={false}
            >
                {images.map(slide => (
                    <div key={slide.id} className={styles.slideContainer}>
                        <img src={slide.image} className={styles.sliderImage} alt=""/>
                        {/* <div className={styles.overlay}>
                            <h2 className={styles.overlayTitle}>{slide.title}</h2>
                            <p className={styles.overlayText}>{slide.text}</p>
                        </div> */}
                      
                    </div>  
                ))}
            </Carousel>
        </div>

    )
}

export default Slider;