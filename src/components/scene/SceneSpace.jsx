import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SceneSpace = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Configuración de la escena
    const SceneSpace = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Creación de la galaxia
    const galaxyGeometry = new THREE.SphereGeometry(100, 50, 50);
    const galaxyMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
    SceneSpace.add(galaxy);

    // Creación de estrellas
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];

    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;

      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starGeometry, starMaterial);
    galaxy.add(stars);

    // Posicionamiento de la cámara
    camera.position.z = 300;

    // Animación de la escena
    const animate = () => {
      requestAnimationFrame(animate);
      galaxy.rotation.x += 0.001;
      galaxy.rotation.y += 0.001;
      renderer.render(SceneSpace, camera);
    };
    animate();
  }, []);

  return (
    <div ref={sceneRef} />
  );
};

export default SceneSpace;
