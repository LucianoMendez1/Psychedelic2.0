import React, { useRef, useEffect, lazy, Suspense, useState } from 'react';
import './home.css';
import { gsap } from 'gsap';

const Scene = lazy(() => import('../scene/Scene'));

const Home = () => {
  const [showDescription, setShowDescription] = useState(false);
  const descriptionRef = useRef(null);
  const btnProductosRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    if (showDescription) {
      timeline.fromTo(
        descriptionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );

      timeline.fromTo(
        btnProductosRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.9'
      );

      timeline.fromTo(
        btnProductosRef.current,
        { scale: 1 },
        { scale: 1.1, repeat: -1, yoyo: true, duration: 1.5 },
        '-=0.8'
      );
    } else {
      timeline.to(descriptionRef.current, { opacity: 0, duration: 0.3 });
      timeline.to(btnProductosRef.current, { opacity: 0, duration: 0.3 }, '-=0.3');
    }

    return () => {
      timeline.kill();
    };
  }, [showDescription]);

  const handleMiClick = () => {
    setShowDescription(true);
  };

  const handleCerrarClick = () => {
    setShowDescription(false);
  };

  return (
    <div className="home-container">
      <Suspense fallback={<div>Loading Scene...</div>}>
        <Scene />
      </Suspense>
      <div className="presentation">
        <h1 className="title">
          Psychedelic
        </h1>
        {!showDescription && (
          <button className="mi" onClick={handleMiClick}>
            2.0
          </button>
        )}
        {showDescription && (
          <div className="description-container show" ref={descriptionRef}>
            <span className="artist-description">
             
            </span>
            <div className="description-buttons">
              
              <button className="cerrar-button" onClick={handleCerrarClick}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
