import React, { useState } from 'react';
import './home.css';
import { Suspense } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Scene from '../scene/Scene';
import Scene2 from '../scene/Scene2';
import SceneSpace from '../scene/SceneSpace';

const Home = () => {
  const [showScenes, setShowScenes] = useState(false);
  const [isAbducted, setIsAbducted] = useState(false);
  const [isInSceneSpace, setIsInSceneSpace] = useState(false);

  const handleStartClick = () => {
    setIsAbducted(true);
    gsap.to('.start-screen', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShowScenes(true);
      },
    });
  };

  const handleEnterSceneSpace = () => {
    setIsInSceneSpace(true);
  };

  return (
    <div className={`home-container ${isAbducted ? 'abduction' : ''}`}>
      <div className="start-screen">
        <div className="start-content">
          <h1>Psychedelic 2.0</h1>
          <button onClick={handleStartClick}>Start</button>
        </div>
      </div>
      <Suspense fallback={<div>Loading Scene...</div>}>
        {showScenes && (
          <>
            {!isInSceneSpace && <Scene />}
            {isInSceneSpace && <Scene2 />}
            <SceneSpace onEnter={handleEnterSceneSpace} />
          </>
        )}
      </Suspense>
      <div className="presentation">
        {/* Enlace a SceneSpace */}
        <Link to="/scenespace">
          <div className="arrow-right">Cambiar capítulo</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
