import React, { useState, useRef } from 'react';
import './home.css';
import { Suspense } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
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
  const [isInScene, setIsInScene] = useState(false); // Nuevo estado para la escena
  const [isInSceneSpace, setIsInSceneSpace] = useState(false);
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

  const handleEnterSceneSpace = () => {
    setIsInSceneSpace(true);
  };

  const handleEnterScene = () => {
    setIsInScene(true);
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
          
          <button onClick={handleStartClick} className="start-button">
            Start
          </button>
          <button onClick={handleChangeBackground} className="change-background-button">
            Cambiar fondo
          </button>
        </div>
      </div>
      <Suspense fallback={<div>Loading Scene...</div>}>
        {showScenes && (
          <>
            {isInSceneSpace && <Scene2 />}
            {isInScene && <Scene />}
            {isInScene && <SceneTv />}
            {!isInSceneSpace && !isInScene && <SceneScroll onEnterScene={handleEnterScene} />}
            <SceneSpace onEnter={handleEnterSceneSpace} />
          </>
        )}
      </Suspense>
      
    </div>
  );
};

export default Home;
