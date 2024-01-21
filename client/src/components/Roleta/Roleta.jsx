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

  const [moedas, setMoedas] = useState(
    JSON.parse(localStorage.getItem("moedas")) || user.moedas
  );
  const [tickets, setTickets] = useState(
    JSON.parse(localStorage.getItem("tickets")) 
  );

  const [situacao, setSituacao] = useState(0);

  useEffect(() => {
    localStorage.setItem("moedas", moedas.toString());
    localStorage.setItem("tickets", tickets.toString());
  }, [moedas, tickets]);

  const barraRef = useRef(null);

  const startRotation = () => {
    if (barraRef.current) {
      setTickets(tickets - 1);
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
    try {
      await updateUserEconomy(
        user.id,
        (user.moedas = moedas),
        (user.tickets = tickets),
        user.cupons.c10,
        user.cupons.c20,
        user.cupons.c30,
      );
      localStorage.setItem("moedas", moedas.toString());
      localStorage.setItem("tickets", tickets.toString());
      console.log("UpdateNow");
      console.log(user);

    } catch (err) {
      console.error(err);
    }
  };

  const final = () => {
    setSituacao(0);
    const graus = ((rotation % 360) + 360) % 360;
    if (graus >= 0 && graus <= 59) {
      setPremio(`Último prêmio: ${p6} moedas.`);
      setMoedas(moedas + 6);
    } else if (graus >= 60 && graus <= 119) {
      setPremio(`Último prêmio: ${p5} moedas.`);
      setMoedas(moedas + 5);
    } else if (graus >= 120 && graus <= 179) {
      setPremio(`Último prêmio: ${p4} moedas.`);
      setMoedas(moedas + 4);
    } else if (graus >= 180 && graus <= 239) {
      setPremio(`Último prêmio: ${p3} moedas.`);
      setMoedas(moedas + 3);
    } else if (graus >= 240 && graus <= 299) {
      setPremio(`Último prêmio: ${p2} moedas.`);
      setMoedas(moedas + 2);
    } else if (graus >= 300 && graus <= 359) {
      setPremio(`Último prêmio: ${p1} moedas.`);
      setMoedas(moedas + 1);
    }
    console.log(user.id, moedas, tickets);
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
              <div className="div_moeda">$</div>: <p>{moedas}</p>
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
            <p>Você possui {moedas} moedas.</p>
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

        {situacao === 0 && tickets !== 0 && (
          <div className="barra1">
            <div className="barra_dentro" ref={barraRef}></div>
          </div>
        )}
        {tickets > 0 && situacao === 0 && (
            <button className='spin_btn' onClick={startRotation}>
              GIRAR
            </button>
        )}
        
        <div className='central'></div>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Roleta;
