import React, { useState, useRef } from 'react'; // Importa useRef
import './home.css';
import { Suspense } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Scene from '../scene/Scene';
import Scene2 from '../scene/Scene2';
import SceneSpace from '../scene/SceneSpace';
import backgroundVideo1 from '../scene/textures/130703 (Original).mp4';
import backgroundVideo2 from '../scene/textures/moon_-_121799 (1080p).mp4';
import backgroundVideo3 from '../scene/textures/nebula_-_23906 (Original).mp4'; // Ruta del tercer video
import backgroundVideo4 from '../scene/textures/giant_star_-_26328 (Original).mp4'; // Ruta del cuarto video
import backgroundVideo5 from '../scene/textures/stars_-_39523 (Original).mp4'; // Ruta del quinto video


const Home = () => {
  const [showScenes, setShowScenes] = useState(false);
  const [isAbducted, setIsAbducted] = useState(false);
  const [isInSceneSpace, setIsInSceneSpace] = useState(false);
  const [currentBackgroundVideo, setCurrentBackgroundVideo] = useState(backgroundVideo1); // Estado para el video de fondo

  const videoRef = useRef(null); // Referencia al elemento de video

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

  const handleChangeBackground = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pausa el video actual
    }

    // Cambia el video de fondo en función del estado actual
    const videos = [backgroundVideo1, backgroundVideo2, backgroundVideo3, backgroundVideo4, backgroundVideo5];
    const currentIndex = videos.indexOf(currentBackgroundVideo);
    const nextIndex = (currentIndex + 1) % videos.length;
    const nextVideo = videos[nextIndex];

    setCurrentBackgroundVideo(nextVideo);

    if (videoRef.current) {
      videoRef.current.load(); // Carga el nuevo video
      videoRef.current.play(); // Reproduce el nuevo video
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
            Change Background
          </button>
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
        <Link to="/scenespace"></Link>
      </div>
    </div>
  );
};

export default Home;
