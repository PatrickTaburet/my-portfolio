import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function useSection1Animation(
    sectionRef: React.RefObject<HTMLElement | null>,
    topLeftRef: React.RefObject<HTMLDivElement | null>,
    bottomRightRef: React.RefObject<HTMLDivElement | null>,
    RECT_HEIGHTS: number[],
    RECT_WIDTH: number
) {
    useLayoutEffect(() => {
        if (!sectionRef.current) return;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.setProperty('--gutter-offset', `${scrollbarWidth}px`);

        const topRects = topLeftRef.current!.querySelectorAll<HTMLDivElement>('.rect');
        const botRects = bottomRightRef.current!.querySelectorAll<HTMLDivElement>('.rect');
        const reversedHeights = [...RECT_HEIGHTS].reverse();

        // Scoped GSAP animations for section1
        const ctx = gsap.context(() => {

            const revealTl = gsap.timeline({
                onComplete: () => {
                    document.documentElement.style.overflow = '';
                    document.documentElement.style.setProperty('--gutter-offset', '0px');
                }
            });

            // Initial rectangles animation
            revealTl.to(topRects, {
                height: (i) => RECT_HEIGHTS[i],
                width: RECT_WIDTH,
                opacity: 1,
                ease: 'power1.out',
                duration: 0.3,
                stagger: 0.1,
            });

            revealTl.to(botRects, {
                height: (i) => reversedHeights[i],
                width: RECT_WIDTH,
                opacity: 1,
                ease: 'power1.out',
                duration: 0.3,
                stagger: {
                    each: 0.1,
                    from: 'end'
                }
            }, '>');

            // Scroll rectangles animation
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    // markers: true,
                }
            });

            scrollTl.to(topRects, {
                height: 0,
                ease: 'power1.inOut',
                stagger: 0.1
            }, 0);

            scrollTl.to(botRects, {
                height: 0,
                ease: 'power1.inOut',
                stagger: {
                    each: 0.1,
                    from: 'end'
                }
            }, 0);

            // Text content animation: parallax translateY and fade-out
            gsap.to('.section1Content', {
                y: window.innerHeight * 0.65,
                opacity: -0.5,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [sectionRef, RECT_HEIGHTS, RECT_WIDTH]);

}

export default useSection1Animation