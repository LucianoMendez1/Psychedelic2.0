import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navegacion from './components/navegacion/Navegacion';
import './App.css';
import Home from './components/home/Home';
import Contacto from './components/contacto/Contacto';





const App = () => {
  return (
    <BrowserRouter>
    
        <Navegacion />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Contacto" element={<Contacto />} />
            
          </Routes>
        </Suspense>
    
    </BrowserRouter>
  );
};

export default App;
