import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CupomComprar from "../components/CupomComprar";
import { AuthContext } from "../contexts/auth";

import { updateUserEconomy } from "../services/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import "../App.css";
import "../styles/CuponsPage.css";

const CuponsPage = () => {
  const { user } = useContext(AuthContext);
  
  console.log(user);
  
  const [moedas, setMoedas] = useState(JSON.parse(localStorage.getItem('moedas')) || user.moedas);
  const [cupom10, setCupom10] = useState(JSON.parse(localStorage.getItem('c10')) || user.cupons.c10);
  const [cupom20, setCupom20] = useState(JSON.parse(localStorage.getItem('c20')) || user.cupons.c20);
  const [cupom30, setCupom30] = useState(JSON.parse(localStorage.getItem('c30')) || user.cupons.c30);

  // JSON.parse(localStorage.getItem('c10')) || 

  console.log(cupom10, cupom20, cupom30);

  useEffect(() =>  {
    localStorage.setItem('moedas', moedas.toString());
    localStorage.setItem('c10', cupom10);
    localStorage.setItem('c20', cupom20);
    localStorage.setItem('c30', cupom30);

    if (moedas < 0 || user.moedas < 0 ) {
      setMoedas(0);
      (async () => await updateUserEconomy( user.id, (user.moedas = 0), user.tickets, user.cupons.c10, user.cupons.c20, user.cupons.c30 ))();
      // localStorage.setItem('moedas', moedas.toString());
      console.log(user);
    }
  }, [moedas, cupom10, cupom20, cupom30]);

  console.log(user);

  const handleSale = async (desconto) => {
    if (moedas - desconto >= 0) {
        try {
            console.log(desconto);
            if (desconto === 10) {
              setMoedas(moedas - 10);
              setCupom10(cupom10 + 1);
              
              console.log('cupom10', cupom10);
            } 
            else if (desconto === 20) {
              setMoedas(moedas - 20);
              setCupom20(cupom20 + 1);

              console.log('cupom20', cupom20);
            }
            else if (desconto === 30) {
              setMoedas(moedas - 30);
              setCupom30(cupom30 + 1);
              
              console.log('cupom30', cupom30);
            }
            await updateUserEconomy( user.id, (user.moedas = moedas), user.tickets, (user.cupons.c10 = cupom10), (user.cupons.c20 = cupom20), (user.cupons.c30 = cupom30));

            // localStorage.setItem('user', user);
            toast.success('Cupom comprado com sucesso!');
            console.log('Atualizado', user);
          } catch (err) {
            console.error(err);
          }
    }
    else {
        toast.warning('Não há moedas o suficiente!')
        await updateUserEconomy( user.id, (user.moedas = moedas), user.tickets, (user.cupons.c10 = cupom10), (user.cupons.c20 = cupom20), (user.cupons.c30 = cupom30));
        console.log('Atualizado2', user);
    }
  };

  return (
    <div className="main_container"> 
      <Navbar />
      <div className="moedas_cupom">Moedas: {moedas}</div>
      <CupomComprar desconto={10} onSale={handleSale} preco={10} qtd={cupom10} color={"aquamarine"} border={"blue"} />
      <CupomComprar desconto={20} onSale={handleSale} preco={20} qtd={cupom20} color={"greenyellow"} border={"green"} />
      <CupomComprar desconto={30} onSale={handleSale} preco={30} qtd={cupom30} color={"violet"} border={"purple"} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CuponsPage;
