import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { ToastContainer, toast } from "react-toastify";
import { updateUserEconomy } from "../services/api";

import CupomComprar from "../components/CupomComprar";
import Navbar from "../components/Navbar/Navbar";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CuponsPage.css";

const CuponsPage = () => {
  const { user } = useContext(AuthContext);

  const [moedas, setMoedas] = useState(parseInt(localStorage.getItem("moedas")));
  const [cupom10, setCupom10] = useState(parseInt(localStorage.getItem("c10"))  );
  const [cupom20, setCupom20] = useState(parseInt(localStorage.getItem("c20")) );
  const [cupom30, setCupom30] = useState(  parseInt(localStorage.getItem("c30")) );

  const handleSale = async (desconto) => {
    if (moedas - desconto >= 0) {
      try {
        if (desconto === 10) {
          const qtdc10 = cupom10 +1
          const qtdMoedas = moedas - 10
          setMoedas(qtdMoedas);
          setCupom10(qtdc10);
          const response= await updateUserEconomy(
            user.id,
            qtdMoedas,
            user.tickets,
            qtdc10,
            cupom20,
            cupom30
          );
          localStorage.setItem("moedas", qtdMoedas);
          localStorage.setItem("c10", qtdc10);

        } else if (desconto === 20) {
          const qtdc20 = cupom20 +1
          const qtdMoedas = moedas - 20
          setMoedas(qtdMoedas);
          setCupom20(qtdc20);
          const response= await updateUserEconomy(
            user.id,
            qtdMoedas,
            user.tickets,
            cupom10,
            qtdc20,
            cupom30
          );
          localStorage.setItem("moedas", qtdMoedas);
          localStorage.setItem("c20", qtdc20);

        } else if (desconto === 30) {
          const qtdc30 = cupom30 +1
          const qtdMoedas = moedas - 30
          setMoedas(qtdMoedas);
          setCupom30(qtdc30);
          const response= await updateUserEconomy(
            user.id,
            qtdMoedas,
            user.tickets,
            cupom10,
            cupom20,
            qtdc30
          );
          localStorage.setItem("moedas", qtdMoedas);
          localStorage.setItem("c30", qtdc30);

        }
        toast.success("Cupom comprado com sucesso!");
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.warning("Não há moedas o suficiente!");
      await updateUserEconomy(
        user.id,
        (user.moedas = moedas),
        user.tickets,
        (user.cupons.c10 = cupom10),
        (user.cupons.c20 = cupom20),
        (user.cupons.c30 = cupom30)
      );
    };
  };

  return (
    <div className="main_container">
      <Navbar />
      <div className="moedas_cupom">Moedas: {moedas}</div>

      <div className="cupons_container">
        <CupomComprar
          desconto={10}
          onSale={handleSale}
          preco={10}
          qtd={cupom10}
          color={"aquamarine"}
          border={"blue"}
        />
        <CupomComprar
          desconto={20}
          onSale={handleSale}
          preco={20}
          qtd={cupom20}
          color={"greenyellow"}
          border={"green"}
        />
        <CupomComprar
          desconto={30}
          onSale={handleSale}
          preco={30}
          qtd={cupom30}
          color={"violet"}
          border={"purple"}
        />
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CuponsPage;
