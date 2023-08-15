import React, { useState } from 'react';
import './home.css';
import { Suspense } from 'react';
import { gsap } from 'gsap';
import Scene from '../scene/Scene';
import SceneSpace from '../scene/SceneSpace';

const Home = () => {
  const [showScenes, setShowScenes] = useState(false);
  const [isAbducted, setIsAbducted] = useState(false); // Nuevo estado

  const handleStartClick = () => {
    setIsAbducted(true); // Activar la abducción
    gsap.to('.start-screen', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShowScenes(true);
      },
    });
  };

  return (
    <div className={`home-container ${isAbducted ? 'abduction' : ''}`}>
      <div className="start-screen">
        <div className="start-content">
          <h1>Psychedelic</h1>
          <button onClick={handleStartClick}>Start</button>
        </div>
      </div>
      <Suspense fallback={<div>Loading Scene...</div>}>
        {showScenes && (
          <>
            <Scene />
            <SceneSpace />
          </>
        )}
      </Suspense>
      <div className="presentation"></div>
    </div>
  );
};

export default Home;
