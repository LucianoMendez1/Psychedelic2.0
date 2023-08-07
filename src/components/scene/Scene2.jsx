import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';

import textureImg from './textures/texture1.jpg';

const Scene2 = () => {
  const canvasRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Update composer
      composer.setSize(sizes.width, sizes.height);
    });

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 11
    camera.position.y = 1
    camera.position.x = 1
    scene.add(camera);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true, // Habilitar antialiasing para obtener un renderizado suavizado
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio * 2);

    // Postprocessing
    const composer = new EffectComposer(renderer);
    composer.setSize(sizes.width, sizes.height);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Bloom Pass para el efecto difuminado
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);

    
    const filmPass = new FilmPass(0.5 , 0.025, 648, true);
    composer.addPass(filmPass); 

    // Bokeh Pass para el efecto de desenfoque gaussiano (más difuminado)
    const bokehPass = new BokehPass(scene, camera, {
      focus: 1.0,
      aperture: 0.025,
      maxblur: 0.25,
      width: sizes.width,
      height: sizes.height,
    });
    composer.addPass(bokehPass);

    const copyPass = new ShaderPass(CopyShader);
    copyPass.renderToScreen = true;
    composer.addPass(copyPass);

    // Object
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load(textureImg);
    const geometry = new THREE.SphereGeometry(32, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      map: planetTexture,
      side: THREE.BackSide,
    });
    materialRef.current = material; // Almacenar la referencia al material
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = true;
    controls.minDistance = 50;
    controls.maxDistance = 60;
    controls.update();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.090);
    scene.add(ambientLight);

    // Animation
    const animate = () => {
      mesh.rotation.y += 0.001;

      // Render scene with postprocessing
      composer.render();

      // Call animate again on the next frame
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas className="webgl" ref={canvasRef}></canvas>;
};

export default Scene2;
