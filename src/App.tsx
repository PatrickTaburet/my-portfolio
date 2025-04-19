import React, { FC, Suspense, lazy, useEffect, useRef, useState } from 'react';
import './css/App.css';
import './css/global.css';
import Header from './components/header/Header';
import useIsMobile from './hooks/useIsMobile';
import { MobileProvider } from './context/MobileContext';
import { SectionOffsets } from './types/sectionOffsets';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Section1 = lazy(() => import('./components/section1/Section1'));
const Section2 = lazy(() => import('./components/section2/Section2'));
const Section3 = lazy(() => import('./components/section3/Section3'));

const App: FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const windowHeight = window.innerHeight - 300;
  const [sectionOffsets, setSectionOffsets] = useState<SectionOffsets>({ section1Offset: 0, section2Offset: 0, section3Offset: 0 });
  const [isProjectInfoVisible, setIsProjectInfoVisible] = useState<boolean>(false);
  const [isClosedFromHeader, setIsClosedFromHeader] = useState<boolean>(false);
  const isMobile = useIsMobile();
  // const SCROLL_ADJUSTMENT = isMobile ? 0 : -240;
  const containerTweenRef = useRef<gsap.core.Tween | null>(null);
  const section2and3Ref = useRef<HTMLDivElement>(null);

  // Global scroll trigger
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => setScrollY(Math.round(self.scroll())),
    });
    return () => st.kill();
  }, []);


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

  useEffect(() => {
    const calculateOffsets = () => {
      const s1 = document.querySelector('.section1');
      const s2 = document.querySelector('.section2');
      const s3 = document.querySelector('.section3');
      setSectionOffsets({
        section1Offset: s1 instanceof HTMLElement ? s1.offsetTop : 0,
        section2Offset: s2 instanceof HTMLElement ? s2.offsetTop : 0,
        section3Offset: s3 instanceof HTMLElement ? s3.offsetTop : 0,
      });
    };
    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);
    return () => window.removeEventListener('resize', calculateOffsets);
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
      duration: 0.8,
      ease: 'power2.out'
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
          scrollY={scrollY}
          windowHeight={windowHeight}
          isProjectInfoVisible={isProjectInfoVisible}
          sectionOffsets={sectionOffsets}
          scrollToSection={scrollToSection}
          handleCloseFromHeader={handleCloseFromHeader}
        />
        <main className='container'>
          <Suspense fallback={<div className='loading'><span className="loader"></span></div>}>
            <Section1
              sessionClassName="section1"
              scrollValue={scrollY}
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
                sectionOffsets={sectionOffsets}
              />
            </div>

          </Suspense>
        </main>
      </div>
    </MobileProvider>
  );
}

export default App;
