import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './sceneScroll.css';

import background1 from './textures/Sci-Fi Experimental Short Film_ _Until There Was Nothing_ _ DUST (1080p).mp4';
import background2 from './textures/Sci-Fi Experimental Short Film_ _Until There Was Nothing_ _ DUST (1080p).mp4';

const SceneScroll = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const sectionsRef = useRef([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    sectionsRef.current = [...containerRef.current.children];

    // You can add your other initialization logic here

    return () => {
      // You can clean up any event listeners or resources here if needed
    };
  }, []);

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
        <video autoPlay muted loop className="video-background">
          <source src={background2} type="video/mp4" />
        </video>
        <div className="content">
          <h1>Tv Relax</h1>
          {/* ... */}
        </div>
      </section>
      {/* <section className="section">
        <video autoPlay muted loop className="video-background" ref={videoRef}>
          <source src={background1} type="video/mp4" />
        </video>
        <div className="content">
          <h1>Galaxy</h1>
        
        </div>
      </section> */}
     
      {/* ... (other sections) */}
    </div>
  );
};

export default SceneScroll;
