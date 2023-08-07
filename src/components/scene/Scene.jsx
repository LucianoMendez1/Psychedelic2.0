import React, { useEffect, useRef, useState } from 'react';
import '../home/home.css';
import planetTexture from './textures/texture1.jpg';
import planetTexture2 from './textures/texture2.jpg';
import planetTexture3 from './textures/texture3.jpg';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Scene = () => {
  const canvas_scene = useRef(null);
  const textTitle = useRef(null);
  const glitchPass = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvas_scene.current;

    // SCENE

    const scene = new THREE.Scene();

    // RESIZE

    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const handleWindowResize = () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;

      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();

      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleWindowResize);

    //CAMERA

    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
    camera.position.z = 1;
    camera.position.x = -7;

    scene.add(camera);

    //RENDER

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false,
      /* alpha:true */
    });

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //LIGHTS

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    //TEXTURES

    const textureLoader = new THREE.TextureLoader();
    const planetMap = textureLoader.load(planetTexture);
    const planetMap2 = textureLoader.load(planetTexture2);
    const planetMap3 = textureLoader.load(planetTexture3);

    planetMap.minFilter = THREE.LinearFilter;
    planetMap.magFilter = THREE.LinearFilter;

    planetMap2.minFilter = THREE.LinearFilter;
    planetMap2.magFilter = THREE.LinearFilter;

    planetMap3.minFilter = THREE.LinearFilter;
    planetMap3.magFilter = THREE.LinearFilter;

    //PLANET

    const planetGeometry = new THREE.SphereGeometry(16, 32, 16);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetMap,
      side: THREE.BackSide,
    });

    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planetMesh);

    //POST-PROCESSING

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const adaptiveToneMappingPass = new AdaptiveToneMappingPass(true, 0.2);
    composer.addPass(adaptiveToneMappingPass);

    const shaderVignette = VignetteShader;

    const effectVignette = new ShaderPass(shaderVignette);
    effectVignette.uniforms['offset'].value = 0.3;
    effectVignette.uniforms['darkness'].value = 7;

    composer.addPass(effectVignette);

    //HOVER GLITCH PASS POST-PROCESSING

    const textTitleElement = textTitle.current;

    glitchPass.current = new GlitchPass();
    composer.addPass(glitchPass.current);
    glitchPass.current.enabled = false;

    let cursor = document.getElementById('circle_mouse');

    const handleHover = () => {
      glitchPass.current.enabled = true;

      document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.left = x + 'px';
        cursor.style.opacity = 1;
        cursor.style.top = y + 'px';
      });
    };

    const handleExitHover = () => {
      glitchPass.current.enabled = false;
      document.addEventListener('mousemove', function (e) {
        cursor.style.opacity = 0;
      });
    };

    const element = textTitleElement;
    element.addEventListener('mouseenter', handleHover);
    element.addEventListener('mouseleave', handleExitHover);

    //EFECTO CLICK SOSTENIDO
    let isMouseDown = false;
    let timeoutId;
    let textureIndex = 1; // Variable para mantener el índice de la textura actual

    const imgTextures = [planetMap, planetMap2, planetMap3];

    let isTextureChangeInProgress = false;

    const handleMouseDown = () => {
      if (isMouseDown) {
        return;
      }

      isMouseDown = true;
      glitchPass.current.enabled = true;
      glitchPass.current.goWild = true;

      setProgress(0);

      const intervalId = setInterval(() => {
        if (isMouseDown) {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + 1;
            if (newProgress >= 100 && !isTextureChangeInProgress) {
              isTextureChangeInProgress = true;
              clearInterval(intervalId);
              clearTimeout(timeoutId);

              const updatedMaterial = planetMaterial.clone();
              updatedMaterial.map = imgTextures[textureIndex];
              planetMesh.material = updatedMaterial;

              glitchPass.current.goWild = false;

              textureIndex++;

              if (textureIndex >= imgTextures.length) {
                textureIndex = 0;
              }

              console.log(textureIndex);

              setTimeout(() => {
                isTextureChangeInProgress = false;
              }, 1000);
            }
            return newProgress;
          });
        }
      }, 13);
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      clearTimeout(timeoutId);
      setProgress(0);
      glitchPass.current.enabled = false;
      glitchPass.current.goWild = false;
      cursor.style.borderColor = 'white';
    };

    const removeEventListeners = () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('touchstart', handleMouseDown);
      element.removeEventListener('touchend', handleMouseUp);
    };

    const addEventListeners = () => {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('touchstart', handleMouseDown);
      element.addEventListener('touchend', handleMouseUp);
    };

    addEventListeners();

    // ORBIT CONTROLS

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    // ANIMATE

    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const elapsedTime = time;

      planetMesh.rotation.y = elapsedTime / 30;

      controls.update();
      composer.render();
      window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      removeEventListeners();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="home-container">
      <canvas className="webgl opacity-100 !rounded-[70px] " ref={canvas_scene}></canvas>

      <div ref={textTitle} className="absolute top-[36.6rem] cursor-none select-none flex justify-center items-center flex-col ">
        <h1 className="text_title text-[17vw] text-[#ffffff] font-extrabold tracking-[-.4rem]"> Cambiar fondo </h1>
      </div>
      <div id="circle_mouse">
        <CircularProgressbar
          value={progress}
          styles={buildStyles({
            rotation: 0.25,
            // Colors
            pathColor: `rgba(255, 255, 255, ${progress / 100})`,
          })}
        />
      </div>

     
    </div>
  );
};

export default Scene;
