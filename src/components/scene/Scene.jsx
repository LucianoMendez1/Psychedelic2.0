import React, { useEffect, useRef, useState } from 'react';
import '../home/home.css';
import planetTexture from './textures/texture2.jpg';
import planetTexture2 from './textures/texture1.jpg';
import planetTexture3 from './textures/texture3.jpg';
import earthCloud from './textures/earthCloud22.png';
import planetexterior from './textures/de0y6zo-718cb7c7-7c9f-4c8b-ba3d-f6395cb803a8_sbfiiy.jpg'

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
 const handleKeyDown = (event) => {
    const speed = 1; // Velocidad de movimiento
    const key = event.key.toLowerCase();

    switch (key) {
      case 'w':
        camera.position.z -= speed;
        break;
      case 's':
        camera.position.z += speed;
        break;
      case 'a':
        camera.position.x -= speed;
        break;
      case 'd':
        camera.position.x += speed;
        break;
      default:
        break;
    }
  };
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

    const camera = new THREE.PerspectiveCamera(90, size.width / size.height, 0.1, 1000);
    camera.position.set(0, 0, 500);

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


    document.addEventListener('keydown', handleKeyDown);
   

    //TEXTURES

    const textureLoader = new THREE.TextureLoader();
    const planetMap = textureLoader.load(planetTexture);
    const planetMap2 = textureLoader.load(planetTexture2);
    const planetMap3 = textureLoader.load(planetTexture3);
    const planetMap4 = textureLoader.load(planetexterior);
    const earthCloud1 = textureLoader.load(earthCloud)

    planetMap.minFilter = THREE.LinearFilter;
    planetMap.magFilter = THREE.LinearFilter;

    planetMap2.minFilter = THREE.LinearFilter;
    planetMap2.magFilter = THREE.LinearFilter;

    planetMap3.minFilter = THREE.LinearFilter;
    planetMap3.magFilter = THREE.LinearFilter;

    planetMap4.minFilter = THREE.LinearFilter;
    planetMap4.magFilter = THREE.LinearFilter;

    //PLANET
    const groupPlanet = new THREE.Group()
    scene.add(groupPlanet)

    const planetGeometry = new THREE.SphereGeometry(16, 32, 16);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetMap,
      side: THREE.BackSide,
    });

    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    groupPlanet.add(planetMesh);

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

    // clouds 

    const cloudMetarial2 = new THREE.MeshBasicMaterial({
      map:earthCloud1,
      transparent: true,
      opacity: .9
  });
  

  const cloudMesh2 = new THREE.Mesh(planetGeometry, cloudMetarial2);
  cloudMesh2.scale.set(1.09,1.09,1.09)
  cloudMesh2.position.x= .5


  groupPlanet.scale.set(.97, .97 , .97)
  groupPlanet.add(cloudMesh2);

  const cloudMetarial = new THREE.MeshBasicMaterial({
    map:planetMap4,
    
    opacity: .9
});


const cloudMesh = new THREE.Mesh(planetGeometry, cloudMetarial);
cloudMesh.scale.set(1.03, 1.03, 1.03 )
cloudMesh.position.x= .5
groupPlanet.add(cloudMesh);




   // LIGHTS
   const galaxyTexture = new THREE.TextureLoader().load('https://res.cloudinary.com/dvnhn35l4/image/upload/v1692060010/1165253_huhvov.jpg');
   galaxyTexture.wrapS = THREE.ClampToEdgeWrapping; // No se repetirá horizontalmente
   galaxyTexture.wrapT = THREE.ClampToEdgeWrapping; // No se repetirá verticalmente
   
   
   // Crear el material para la esfera que rodea la cámara
   const galaxyMaterial = new THREE.MeshBasicMaterial({
     map: galaxyTexture,
     side: THREE.BackSide, // Mostrar el interior de la esfera
     fog: false, // Deshabilitar el efecto de la niebla
   });
   
   // Crear la esfera que rodea la cámara
   const galaxyGeometry = new THREE.SphereGeometry(500, 64, 64); // Gran radio para abarcar todo el espacio visible
   const galaxySphere = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
   scene.add(galaxySphere);

   const pointLight = new THREE.PointLight(0xffffff, 1, 100);
   pointLight.position.set(50, 50, 50);
   scene.add(pointLight);


    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 1; // Distancia mínima de zoom
    controls.maxDistance = 100; // Distancia máxima de zoom
    

    // ANIMATE

    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const elapsedTime = time;
    
     
    
      groupPlanet.rotation.y = elapsedTime /10;
      galaxyTexture.offset.x += 0.0000010
     
      controls.update();
      composer.render();
   
     
    
      controls.update();
      composer.render();
      window.requestAnimationFrame(animate);
    };
    
    animate();
    

    

    return () => {
      removeEventListeners();
      window.removeEventListener('resize', handleWindowResize);
       document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="home-container">
      <canvas className="webgl opacity-100 !rounded-[70px] " ref={canvas_scene}></canvas>
      
      <div ref={textTitle} className="absolute top-[36.6rem] cursor-none select-none flex justify-center items-center flex-col ">
        <h1 className="text_title text-[17vw] text-[#ffffff] font-extrabold tracking-[-.4rem]"> Cambiar Planeta </h1>
       
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