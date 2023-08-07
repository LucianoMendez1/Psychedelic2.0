import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap, CSSPlugin } from "gsap";
import { FaInstagram } from "react-icons/fa";
import "./contacto.css";
import "../navegacion/navegacion.css";
import Scene2 from "../scene/Scene2";

const Contacto = () => {
  const { id } = useParams();


  const C = CSSPlugin;

  useEffect(() => {
   
    gsap.from(".contacto-titulo, p, .fin", { opacity: 0, y: 30, stagger: 0.2, duration: 1 });

   
    return () => {
      gsap.to(".contacto-titulo, p, .fin", { opacity: 0, y: -30, stagger: 0.2, duration: 1 });
    };
  }, []);

  useEffect(() => {
  
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(".contacto-titulo", {
      color: "#10fabc", // Color brillante 1
      duration: 0.5,
    }).to(".contacto-titulo", {
      color: "#548c8e", // Color brillante 2
      duration: 0.5,
    });
  }, []);

  return (
    <div className="contacto-page">
      <Scene2 />
      <div className="contacto-container">
        <h1 className="contacto-titulo">Contacto</h1>
        <p>
          Si deseas solicitar un cuadro a medida, por favor contáctanos a través de Instagram
        </p>
        <p>
          <a href="https://www.instagram.com/lapalmito.art/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />lapalmito.art
          </a>
        </p>
        <div className="fin">Gracias.</div>
      </div>
    </div>
  );
};

export default Contacto;
