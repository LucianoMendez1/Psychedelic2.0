import React, { useState, useRef } from 'react';
import './home.css';
import { Suspense } from 'react';
import { gsap } from 'gsap';
import Scene from '../scene/Scene';
import SceneTv from '../scene/SceneTv';
import Scene2 from '../scene/Scene2';
import SceneSpace from '../scene/SceneSpace';
import SceneScroll from '../scene/SceneScroll';
import backgroundVideo1 from '../scene/textures/130703 (Original).mp4';
import backgroundVideo2 from '../scene/textures/moon_-_121799 (1080p).mp4';
import backgroundVideo3 from '../scene/textures/nebula_-_23906 (Original).mp4';
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
    setIsInScene(false); // You need to set isInScene to false
    setIsInSceneTv(true);
  };

  const handleEnterScene = () => {
    setIsInSceneTv(false); // You need to set isInSceneTv to false
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
    <div className={`home-container ${isAbducted ? 'abduction' : ''}`}>
      <div className="start-screen">
        <div className="start-content">
          <h1>Psychedelic 2.0</h1>
          <video ref={videoRef} autoPlay loop muted className="background-video">
            <source src={currentBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!showScenes && ( // Show Start button only on start screen
            <button onClick={handleStartClick} className="start-button">
              Start
            </button>
          )}
          <button onClick={handleChangeBackground} className="change-background-button">
            Cambiar fondo
          </button>
        </div>
      </div>
      <Suspense fallback={<div>Loading Scene...</div>}>
        {showScenes && (
          <>
            {(!isInSceneTv && !isInScene) && ( // Show navigation buttons only if no scenes are active
              <div className="scene-navigation">
                <button onClick={handleEnterScene} className="start-button1">
                  Start Galaxy
                </button>
                <button onClick={handleEnterSceneTv} className="start-button1">
                  Start SceneTv
                </button>
              </div>
            )}
            {(isInScene || isInSceneTv) && ( // Show Back buttons only if scenes are active
              <div className="back-button-container">
                <button onClick={handleBackToHome} className="back-button">
                  Volver
                </button>
              </div>
            )}
            {isInSceneTv && <SceneTv />}
            {isInScene && <Scene />}
            {!isInSceneTv && !isInScene && (
              <SceneScroll onEnterScene={handleEnterScene} />
            )}
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Home;
