import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './sceneScroll.css';
import Scene from './Scene'; // Import the Scene component
import SceneTv from './SceneTv'; // Import the SceneTv component

import background1 from './textures/133518 (Original).mp4';
import background2 from './textures/stars_-_39523 (Original).mp4';
// import background3 from './textures/planet_-_100834 (Original).mp4';

const SceneScroll = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
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

      // Set playbackRate on the DOM element
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.5; // Set your desired playbackRate here
      }
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

    // Set playbackRate on the DOM element
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Set your desired playbackRate here
    }
  };

  const handleEnterScene = (sceneName) => {
    let newIndex = 0;

    if (sceneName === 'Scene') {
      newIndex = 0;
    } else if (sceneName === 'SceneTv') {
      newIndex = 1;
    }
    // Add more conditions for other scenes if needed

    gsap.to(containerRef.current, {
      x: -newIndex * window.innerWidth,
      duration: 0.8,
      ease: 'power3.out',
    });

    setActiveSectionIndex(newIndex);
  };

  return (
    <div className="scene-scroll-container" ref={containerRef}>
      <section className="section">
        <video autoPlay muted loop className="video-background" ref={videoRef}>
          <source src={background1} type="video/mp4" />
        </video>
        <div className="content">
          <h1>Galaxy</h1>
         {/*  <button className="start-button1" onClick={() => handleEnterScene('Scene')}>Start</button> */}
        </div>
      </section>
      <section className="section">
        <video autoPlay muted loop className="video-background">
          <source src={background2} type="video/mp4" />
        </video>
        <div className="content">
    <h1>Tv Relax</h1>
    {/* <button className="start-button1" onClick={() => handleEnterScene('SceneTv')}>
      Start
    </button> */}
  </div>
      </section>
      {/* ... (other sections) */}
    </div>
  );
};

export default SceneScroll;
