import React, { useState, useRef, Suspense as ReactSuspense } from 'react';
import './home.css';
import { gsap } from 'gsap';

import SceneTv from '../scene/SceneTv';
import SceneScroll from '../scene/SceneScroll';
import backgroundVideo2 from '../scene/textures/130703 (Original).mp4';
import backgroundVideo1 from '../scene/textures/abstract_background_-_107303 (Original).mp4';
import backgroundVideo3 from '../scene/textures/INZO - Spectrum.mp4';
import backgroundVideo4 from '../scene/textures/giant_star_-_26328 (Original).mp4';

const Home = () => {
  const [showScenes, setShowScenes] = useState(false);
  const [isAbducted, setIsAbducted] = useState(false);
  const [isInScene, setIsInScene] = useState(false);
  const [isInSceneTv, setIsInSceneTv] = useState(false);
  const [currentBackgroundVideo, setCurrentBackgroundVideo] = useState(backgroundVideo1);
  const videoRef = useRef(null);

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

  const handleEnterSceneTv = () => {
    setIsInScene(false); // Debes establecer isInScene como false
    setIsInSceneTv(true);
  };

  const handleEnterScene = () => {
    setIsInSceneTv(false); // Debes establecer isInSceneTv como false
    setIsInScene(true);
  };

  const handleBackToHome = () => {
    setIsInScene(false);
    setIsInSceneTv(false);
  };

  const handleChangeBackground = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    const videos = [backgroundVideo1, backgroundVideo2, backgroundVideo3, backgroundVideo4];
    const currentIndex = videos.indexOf(currentBackgroundVideo);
    const nextIndex = (currentIndex + 1) % videos.length;
    const nextVideo = videos[nextIndex];

    setCurrentBackgroundVideo(nextVideo);

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <ReactSuspense fallback={<div>Loading Scene...</div>}>
      <div className={`home-container ${isAbducted ? 'abduction' : ''}`}>
        <div className="start-screen">
          <div className="start-content">
            <h1>Psychedelic 2.0</h1>
            <video ref={videoRef} autoPlay loop muted playsInline className="background-video">
              <source src={currentBackgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!showScenes && ( // Mostrar el botón "Start" solo en la pantalla de inicio
              <button onClick={handleStartClick} className="start-button">
                Start
              </button>
            )}
            <button onClick={handleChangeBackground} className="change-background-button">
              Cambiar fondo
            </button>
          </div>
        </div>
        {showScenes && (
          <>
            {!isInSceneTv && !isInScene && ( // Mostrar botones de navegación solo si no hay escenas activas
              <div className={`scene-navigation ${isAbducted ? 'abduction' : ''}`}>
                <button onClick={handleEnterSceneTv} className="start-button1">
                  Start
                </button>
              </div>
            )}
            {(isInScene || isInSceneTv) && ( // Mostrar botones "Back" solo si hay escenas activas
              <div className="back-button-container">
                <button onClick={handleBackToHome} className="back-button">
                  Volver
                </button>
              </div>
            )}
            {isInSceneTv && <SceneTv />}
            {!isInSceneTv && !isInScene && <SceneScroll onEnterScene={handleEnterScene} />}
          </>
        )}
      </div>
    </ReactSuspense>
  );
};

export default Home;
