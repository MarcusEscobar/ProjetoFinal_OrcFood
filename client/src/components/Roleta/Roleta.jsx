import React, { useState, useRef } from "react";
import "./Roleta.css";

import PedacoRoleta from "./PedacoRoleta";

const Roleta = ({ p1, p2, p3, p4, p5, p6 }) => {
  const [comprimento, setComprimento] = useState(1);
  const [premio, setPremio] = useState("Clique em 'GIRAR'")
  const [rotation, setRotation] = useState(0);

  const barraRef = useRef(null);

  const startRotation = () => {
    barraRef.current.classList.toggle("parar");
    const width2 = barraRef.current.getBoundingClientRect().width;
    setComprimento(width2);
    girar();
  };

  const girar = () => {
    const novaRotacao = Math.floor(Math.random() * 210)+340;
    setPremio("Boa sorte!")
    setRotation(rotation + comprimento + novaRotacao);
  };

  const final = () => {
    // barraRef.current.classList.toggle("parar");
    const graus = (rotation % 360 + 360) % 360;
    if (graus >= 0 && graus <= 59) {
        setPremio(p6); 
    } else if (graus >= 60 && graus <= 119) {
        setPremio(p5);
    } else if (graus >= 120 && graus <= 179) {
        setPremio(p4);
    } else if (graus >= 180 && graus <= 239) {
        setPremio(p3);
    } else if (graus >= 240 && graus <= 299) {
        setPremio(p2);
    } else if (graus >= 300 && graus <= 359) {
        setPremio(p1);
    } 
  }

  return (
    <div className="roleta_container">
      {/* <div className="arrow"></div> */}
      <ul className="circle"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 6s cubic-bezier(0.2,0.8,0.7,0.99)"
      }}
      onTransitionEnd={final}>
        <PedacoRoleta roletaValue="1" />
        <PedacoRoleta roletaValue="2" />
        <PedacoRoleta roletaValue="3" />
        <PedacoRoleta roletaValue="4" />
        <PedacoRoleta roletaValue="5" />
        <PedacoRoleta roletaValue="6" />
      </ul>
      <div className="premio">{premio}</div>
      <div className="barra1">
        <div className="barra_dentro" ref={barraRef}></div>
      </div>
      <div className="barraInferior">
        <button className="spin_btn" onClick={startRotation}>
          GIRAR
        </button>
      </div>
      <div className="central">^</div>
    </div>
  );
};

export default Roleta;
