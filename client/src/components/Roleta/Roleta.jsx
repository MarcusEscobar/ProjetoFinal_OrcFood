import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { updateUserEconomy } from "../../services/api";
import "./Roleta.css";

import PedacoRoleta from "./PedacoRoleta";
import { BiSolidDownArrow } from "react-icons/bi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Roleta = ({ p1, p2, p3, p4, p5, p6, user }) => {

  const navigate = useNavigate

  const [comprimento, setComprimento] = useState(1);
  const [premio, setPremio] = useState("Clique em 'GIRAR'");
  const [rotation, setRotation] = useState(0);

  const [coin, setCoin] = useState(parseInt(localStorage.getItem("moedas")));
  const [tickets, setTickets] = useState(parseInt(localStorage.getItem("tickets")));

  const [situacao, setSituacao] = useState(0);


  const barraRef = useRef(null);

  const startRotation = () => {
    if (barraRef.current) {
      setTickets(tickets - 1);
      localStorage.setItem("tickets", tickets - 1);
      barraRef.current.classList.toggle("parar");
      const width2 = barraRef.current.getBoundingClientRect().width;
      setComprimento(width2);
      girar();
      setSituacao(1);
    }
  };

  const girar = () => {
    const novaRotacao = Math.floor(Math.random() * 210) + 340;
    setPremio("Boa sorte!");
    setRotation(rotation + comprimento + novaRotacao);
  };

  const handleUpdateEconomy = async () => {
    const m = parseInt(localStorage.getItem("moedas"))
    try {
      await updateUserEconomy(
        user.id,
        m,
        tickets,
        user.cupons.c10,
        user.cupons.c20,
        user.cupons.c30,
      );

    } catch (err) {
      console.error(err);
    }
  };

  const final = async () => {
    setSituacao(0);
    const graus = ((rotation % 360) + 360) % 360;

    if (graus >= 0 && graus <= 59) {
      setPremio(`Último prêmio: ${p6} moedas.`);
      const m = coin +6
      setCoin(m);
      localStorage.setItem("moedas", m);


    } else if (graus >= 60 && graus <= 119) {
      setPremio(`Último prêmio: ${p5} moedas.`);
      const m = coin +5
      setCoin(m);
      localStorage.setItem("moedas", m);


    } else if (graus >= 120 && graus <= 179) {
      setPremio(`Último prêmio: ${p4} moedas.`);
      const m = coin +4
      setCoin(m);
      localStorage.setItem("moedas", m);
   

    } else if (graus >= 180 && graus <= 239) {
      setPremio(`Último prêmio: ${p3} moedas.`);
      const m = coin +3
      setCoin(m);
      localStorage.setItem("moedas", m);


    } else if (graus >= 240 && graus <= 299) {
      setPremio(`Último prêmio: ${p2} moedas.`);
      const m = coin +2
      setCoin(m);
      localStorage.setItem("moedas", m);
   

    } else if (graus >= 300 && graus <= 359) {
      setPremio(`Último prêmio: ${p1} moedas.`);
      const m = coin +1
      setCoin(m);
      localStorage.setItem("moedas", m);
 
    }
    handleUpdateEconomy();
  };

  const recompensaColetada = () => {
    toast.success('Recompensa coletada!');
    handleUpdateEconomy();
    setSituacao(2);
  }

  return (
    <div className="roleta_container">
      
      <div className="roleta_info">
        {user.moedas ? (
          <div>
            <div className="moedas">
              <div className="div_moeda">$</div>: <p>{coin}</p>
            </div>
            <div className="tickets">
              <div className="div_ticket">Ticket</div>: <p>{tickets}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="fimTickets">
          {tickets === 0 && (
            <>
            <p>Não há mais tickets disponíveis.</p> 
            <p>Você possui {coin} moedas.</p>
            </>
          )}
        </div>
        {tickets === 0 && situacao === 0 && <button className="gift_btn" onClick={recompensaColetada}>Coletar recompensa!</button>}
      </div>

      <div className="roleta_principal">
        <BiSolidDownArrow />
        <ul
          className="circle"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 6s cubic-bezier(0.2,0.8,0.7,0.99)",
          }}
          onTransitionEnd={final}
        >
          <PedacoRoleta roletaValue="1" />
          <PedacoRoleta roletaValue="2" />
          <PedacoRoleta roletaValue="3" />
          <PedacoRoleta roletaValue="4" />
          <PedacoRoleta roletaValue="5" />
          <PedacoRoleta roletaValue="6" />
        </ul>
        <p className="premio">{premio}</p>

        
          <div className="girar_roleta">
          {tickets > 0 && situacao === 0 && (
            <button className='spin_btn' onClick={startRotation}>
              GIRAR
            </button> )}
          {situacao === 0 && tickets !== 0 && ( 
            <div className="barra1">
              <div className="barra_dentro" ref={barraRef}></div> 
            </div> )}
          </div>
        
        {/* <div className='central'></div> */}
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Roleta;
