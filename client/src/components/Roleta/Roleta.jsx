import React, { useState, useEffect, useRef } from "react";
import { updateUser } from "../../services/api";
import { BiSolidDownArrow } from "react-icons/bi";

import PedacoRoleta from "./PedacoRoleta";
import "./Roleta.css";

const Roleta = ({ p1, p2, p3, p4, p5, p6, user }) => {

  const [comprimento, setComprimento] = useState(1);
  const [premio, setPremio] = useState("Clique em 'GIRAR'");
  const [rotation, setRotation] = useState(0);

  const [moedas, setMoedas] = useState(
    JSON.parse(localStorage.getItem("moedas")) || user.moedas
  );
  const [tickets, setTickets] = useState(3);

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

  const final = () => {
    setSituacao(0);
    const graus = ((rotation % 360) + 360) % 360;
    if (graus >= 0 && graus <= 59) {
      setPremio(p6);
      setMoedas(moedas + 6);
    } else if (graus >= 60 && graus <= 119) {
      setPremio(p5);
      setMoedas(moedas + 5);
    } else if (graus >= 120 && graus <= 179) {
      setPremio(p4);
      setMoedas(moedas + 4);
    } else if (graus >= 180 && graus <= 239) {
      setPremio(p3);
      setMoedas(moedas + 3);
    } else if (graus >= 240 && graus <= 299) {
      setPremio(p2);
      setMoedas(moedas + 50);
    } else if (graus >= 300 && graus <= 359) {
      setPremio(p1);
      setMoedas(moedas + 1);
    }
  };

  const handleUpdateEconomy = async () => {
    try {
      await updateUser(
        user.id,
        user.name,
        user.endereco,
        user.email,
        user.password,
        (user.moedas = moedas),
        (user.tickets = tickets)
      );
      // localStorage.setItem('moedas', 0);
      // localStorage.setItem('user', user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="roleta_container">
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
      <div className="premio">{premio}</div>

      {situacao === 0 && tickets !== 0 && (
        <div className="barra1">
          <div className="barra_dentro" ref={barraRef}></div>
        </div>
      )}

      <div className="barraInferior">
        {tickets > 0 && situacao === 0 && (
          <button className="spin_btn" onClick={startRotation}>
            GIRAR
          </button>
        )}
        {tickets === 0 && situacao === 0 && (
          <p>Não há mais tickets disponíveis. Você possui {moedas} moedas.</p>
        )}
      </div>
      <div className="central"></div>

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

      {tickets === 0 && situacao === 0 && (
        <button className="gift_btn" onClick={handleUpdateEconomy}>
          Coletar recompensa!
        </button>
      )}
    </div>
  );
};

export default Roleta;
