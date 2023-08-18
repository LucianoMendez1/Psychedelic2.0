import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './sceneScroll.css';

// Importa los videos de fondo
import background1 from './textures/133518 (Original).mp4';
import background2 from './textures/stars_-_39523 (Original).mp4';
import background3 from './textures/planet_-_100834 (Original).mp4';



const Scene = React.lazy(() => import('./Scene'));
const Scene2 = React.lazy(() => import('./Scene2'));
const SceneSpace = React.lazy(() => import('./SceneSpace'));


const SceneScroll = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    sectionsRef.current = [...containerRef.current.children];

    const handleScroll = (event) => {
      const scrollValue = event.deltaY;

      let newIndex = activeSectionIndex;

      if (scrollValue > 0 && newIndex < sectionsRef.current.length - 1) {
        newIndex++;
      } else if (scrollValue < 0 && newIndex > 0) {
        newIndex--;
      }

      gsap.to(containerRef.current, {
        x: -newIndex * window.innerWidth,
        duration: 0.8,
        ease: 'power3.out',
      });

      setActiveSectionIndex(newIndex);
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeSectionIndex]);

  const handleButtonNavigation = (direction) => {
    let newIndex = activeSectionIndex;

    if (direction === 'prev' && newIndex > 0) {
      newIndex--;
    } else if (direction === 'next' && newIndex < sectionsRef.current.length - 1) {
      newIndex++;
    }

    gsap.to(containerRef.current, {
      x: -newIndex * window.innerWidth,
      duration: 0.8,
      ease: 'power3.out',
    });

    setActiveSectionIndex(newIndex);
  };

  const handleEnterScene = (sceneName) => {
    if (sceneName === 'SceneGalaxy') {
      // Mostrar SceneGalaxy y ocultar otras escenas
    } else if (sceneName === 'Scene2') {
      // Mostrar Scene2 y ocultar otras escenas
    }
    // ... otras condiciones para otras escenas
  };

  return (
    
      <div className="scene-scroll-container" ref={containerRef}>
        <section className="section">
          <video autoPlay muted loop className="video-background"  playbackRate={1.5}>
            <source src={background1} type="video/mp4" />
          </video>
          <div className="content">
            <h1>Galaxy </h1>
            <button  className="start-button1" onClick={() => handleEnterScene('SceneGalaxy')}>Start</button>
          </div>
        </section>
        <section className="section">
          <video autoPlay muted loop className="video-background">
            <source src={background2} type="video/mp4" />
          </video>
          <div className="content">
            <h1>Tv Relax</h1>
            <button  className="start-button1" onClick={() => handleEnterScene('Scene2')}>Start</button>
          </div>
        </section>
        <section className="section">
          <video autoPlay muted loop className="video-background">
            <source src={background3} type="video/mp4" />
          </video>
          <div className="content">
            <h1>....</h1>
            <button  className="start-button1" onClick={() => handleEnterScene('Scene3')}>Start</button>
          </div>
        </section>
      {/* <div className="navigation-buttons">
        <button onClick={() => handleButtonNavigation('prev')} disabled={activeSectionIndex === 0}>
          Anterior
        </button>
        <button
          onClick={() => handleButtonNavigation('next')}
          disabled={activeSectionIndex === sectionsRef.current.length - 1}
        >
          Siguiente
        </button> */}
      </div>
   
  );
}
export default SceneScroll;
