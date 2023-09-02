import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import SceneTv from './components/scene/SceneTv';



const App = () => {
  return (
    <BrowserRouter>
    
      
        <Suspense fallback={<div>Loading...</div>}>
       
          <Routes >
          <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Suspense>
    
    </BrowserRouter>
  );
};

export default App;
