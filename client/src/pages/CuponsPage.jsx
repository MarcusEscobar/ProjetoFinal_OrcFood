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

  const [moedas, setMoedas] = useState(
    JSON.parse(localStorage.getItem("moedas")) || user.moedas
  );
  const [cupom10, setCupom10] = useState(
    JSON.parse(localStorage.getItem("c10")) || user.cupons.c10
  );
  const [cupom20, setCupom20] = useState(
    JSON.parse(localStorage.getItem("c20")) || user.cupons.c20
  );
  const [cupom30, setCupom30] = useState(
    JSON.parse(localStorage.getItem("c30")) || user.cupons.c30
  );


  useEffect(() => {
    localStorage.setItem("moedas", moedas.toString());
    localStorage.setItem("c10", cupom10);
    localStorage.setItem("c20", cupom20);
    localStorage.setItem("c30", cupom30);

    if (moedas < 0 || user.moedas < 0) {
      setMoedas(0);

      (async () =>
        await updateUserEconomy(
          user.id,
          (user.moedas = 0),
          user.tickets,
          user.cupons.c10,
          user.cupons.c20,
          user.cupons.c30
        ))();
    }
  }, [moedas, cupom10, cupom20, cupom30]);


  const handleSale = async (desconto) => {
    if (moedas - desconto >= 0) {
      try {
        if (desconto === 10) {
          setMoedas(moedas - 10);
          setCupom10(cupom10 + 1);

        } else if (desconto === 20) {
          setMoedas(moedas - 20);
          setCupom20(cupom20 + 1);

        } else if (desconto === 30) {
          setMoedas(moedas - 30);
          setCupom30(cupom30 + 1);

        }
        await updateUserEconomy(
          user.id,
          (user.moedas = moedas),
          user.tickets,
          (user.cupons.c10 = cupom10),
          (user.cupons.c20 = cupom20),
          (user.cupons.c30 = cupom30)
        );

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
