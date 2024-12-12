import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './slider.module.css';
import img1 from './../../../assets/images/avatar.jpg';
import img2 from './../../../assets/images/blue-background.png';
import img3 from './../../../assets/images/cyber.png';


const Slider = () => {
    const data = [
        {
            id: 1,
            image: img1,
            title: "image 1",
            text: "loremipsuuum"
        },
        {
            id: 2,
            image: img2,
            title: "image 2",
            text: "loremipsuufregrereggeegrgeum"
        },
        {
            id: 3,
            image: img3,
            title: "image 3",
            text: "loremisdsdsdpsuuum"
        },

    ]
    return (
        <div>
            <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            >
                {data.map(slide => (
                    <div key={slide.id}>
                        <img src={slide.image} alt=""/>
                        <div className={styles.overlay}>
                            <h2 className={styles.overlayTitle}>{slide.title}</h2>
                            <p className={styles.overlayText}>{slide.text}</p>
                        </div>
                      
                    </div>
                ))}
            </Carousel>
        </div>

    )
}

export default Slider;