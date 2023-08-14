import React from 'react';
import './home.css';
import { Suspense } from 'react';
import Scene from '../scene/Scene';
import SceneSpace from '../scene/SceneSpace';

const Home = () => {
  return (
    <div className="home-container">
      <Suspense fallback={<div>Loading Scene...</div>}>
        <Scene />
        <SceneSpace />
      </Suspense>
      <div className="presentation">
      
      </div>
    </div>
  );
};

export default Home;
