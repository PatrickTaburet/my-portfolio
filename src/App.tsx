import React, { FC, Suspense, lazy, useEffect, useRef, useState } from 'react';
import './css/App.css';
import './css/global.css';
import Header from './components/header/Header';
import useResetScroll from './hooks/useResetScroll';
import { MobileProvider } from './context/MobileContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Section1 = lazy(() => import('./components/section1/Section1'));
const Section2 = lazy(() => import('./components/section2/Section2'));
const Section3 = lazy(() => import('./components/section3/Section3'));

const App: FC = () => {
  const [isProjectInfoVisible, setIsProjectInfoVisible] = useState<boolean>(false);
  const [isClosedFromHeader, setIsClosedFromHeader] = useState<boolean>(false);
  const containerTweenRef = useRef<gsap.core.Tween | null>(null);
  const section2and3Ref = useRef<HTMLDivElement>(null);
  useResetScroll();

  useEffect(() => {
    if (!section2and3Ref.current) return;
    containerTweenRef.current = gsap.to(section2and3Ref.current, {
      y: -window.innerHeight / 5,
      scrollTrigger: {
        trigger: section2and3Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        // markers: true,
      }
    });

    return () => {
      containerTweenRef.current?.kill();
    };
  }, []);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    // position réelle de l'élément (transform inclu)
    const top = el.getBoundingClientRect().top + window.scrollY;
    gsap.to(window, {
      scrollTo: {
        y: top
      },
      duration: 0.2,
      ease: 'power1.out'
    });
  };


  const handleProjectInfoChange = (visibility: boolean) => {
    setIsProjectInfoVisible(visibility);
  };

  const handleCloseFromHeader = () => {
    setIsClosedFromHeader(isProjectInfoVisible);
    setTimeout(() => setIsClosedFromHeader(false), 200);
  };


  return (
    <MobileProvider>
      <div className="App">
        <Header
          scrollToSection={scrollToSection}
          handleCloseFromHeader={handleCloseFromHeader}
        />
        <main className='container'>
          <Suspense fallback={<div className='loading'><span className="loader"></span></div>}>
            <Section1
              sessionClassName="section1"
            />
            <div className='section2and3' ref={section2and3Ref}>
              <Section2
                sessionClassName="section2"
                parentRef={containerTweenRef}
              />
              <Section3
                sessionClassName="section3"
                parentRef={containerTweenRef}
                onProjectInfoChange={handleProjectInfoChange}
                isClosedFromHeader={isClosedFromHeader}
                scrollToSection={scrollToSection}
              />
            </div>

          </Suspense>
        </main>
      </div>
    </MobileProvider>
  );
}

export default App;
