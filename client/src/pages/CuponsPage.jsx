import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CupomComprar from "../components/CupomComprar";
import { AuthContext } from "../contexts/auth";

import { updateUser } from "../services/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import "../App.css";
import "../styles/CuponsPage.css";

const CuponsPage = () => {
  const { user } = useContext(AuthContext);
  
  const [moedas, setMoedas] = useState(JSON.parse(localStorage.getItem('moedas')) || user.moedas);

  useEffect(() =>  {
    localStorage.setItem('moedas', moedas.toString());
    localStorage.setItem('c10', user.cupons.c10);
    localStorage.setItem('c20', user.cupons.c20);
    localStorage.setItem('c30', user.cupons.c30);
  }, [moedas, user.cupons.c10, user.cupons.c20, user.cupons.c30]);

  console.log(user);

  const handleSale = async (desconto) => {
    if (user.moedas - desconto >= 0) {
        try {
            console.log(desconto);
            if (desconto === 10) {
              await updateUser( user.id, user.name, user.endereco, user.email, user.password, (user.moedas -= 10), user.tickets, (user.cupons.c10 += 1), user.cupons.c20, user.cupons.c30);
              setMoedas(moedas - 10);
            } 
            else if (desconto === 20) {
              await updateUser( user.id, user.name, user.endereco, user.email, user.password, (user.moedas -= 20), user.tickets, user.cupons.c10, (user.cupons.c20 += 1), user.cupons.c30);
              setMoedas(moedas - 20);
            }
            else if (desconto === 30) {
              await updateUser( user.id, user.name, user.endereco, user.email, user.password, (user.moedas -= 30), user.tickets, user.cupons.c10, user.cupons.c20, (user.cupons.c30 += 1));
              setMoedas(moedas - 30);
            }
            toast.success('Cupom comprado com sucesso!');
            console.log(user);
          } catch (err) {
            console.error(err);
          }
    }
    else {
        toast.warning('Não há moedas o suficiente!')
    }
  };

  return (
    <div className="main_container"> 
      <Navbar />
      <div className="moedas_cupom">Moedas: {moedas}</div>
      <CupomComprar desconto={10} onSale={handleSale} preco={10} qtd={user.cupons.c10} color={"aquamarine"} border={"blue"} />
      <CupomComprar desconto={20} onSale={handleSale} preco={20} qtd={user.cupons.c20} color={"greenyellow"} border={"green"} />
      <CupomComprar desconto={30} onSale={handleSale} preco={30} qtd={user.cupons.c30} color={"violet"} border={"purple"} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CuponsPage;
