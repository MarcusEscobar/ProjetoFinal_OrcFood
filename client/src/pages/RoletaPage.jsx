import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Roleta from "../components/Roleta/Roleta";
import Navbar from "../components/Navbar";
// import Navbar from "../components/Navbar";

const RoletaPage = () => {
  
    const { user } =  useContext(AuthContext);

    console.log(user);

  const [p1, setP1] = useState("1");
  const [p2, setP2] = useState("2");
  const [p3, setP3] = useState("3");
  const [p4, setP4] = useState("4");
  const [p5, setP5] = useState("5");
  const [p6, setP6] = useState("6");

  const [moedas, setMoedas] = useState(1);
  const [tickets, setTickets] = useState(1);

  return (
    <div className="main_container">
        <Navbar />
         {user.scope === "adm" ? 
            <div className="editarPremios">
                <div className="setarPremio">
                    <label htmlFor="p1">Prêmio 1:</label>
                    <input type="text" name="p1" id="p1" value={p1} onChange={(e) => setP1(e.target.value)} />
                </div>
                <div className="setarPremio">
                    <label htmlFor="p2">Prêmio 2:</label>
                    <input type="text" name="p2" id="p2" value={p2} onChange={(e) => setP2(e.target.value)} />
                </div>
                <div className="setarPremio">
                    <label htmlFor="p3">Prêmio 3:</label>
                    <input type="text" name="p3" id="p3" value={p3} onChange={(e) => setP3(e.target.value)} />
                </div>
                <div className="setarPremio">
                    <label htmlFor="p4">Prêmio 4:</label>
                    <input type="text" name="p4" id="p4" value={p4} onChange={(e) => setP4(e.target.value)} />
                </div>
                <div className="setarPremio">
                    <label htmlFor="p5">Prêmio 5:</label>
                    <input type="text" name="p5" id="p5" value={p5} onChange={(e) => setP5(e.target.value)} />
                </div>
                <div className="setarPremio">
                    <label htmlFor="p6">Prêmio 6:</label>
                    <input type="text" name="p6" id="p6" value={p6} onChange={(e) => setP6(e.target.value)} />
                </div>
            </div>
         : <></>}
            <div>
                <div className="moedas">
                    <div className="div_moeda">$</div><p>: {moedas}</p>
                </div>
                <div className="tickets">
                    <div className="div_ticket">Ticket</div><p>: {tickets}</p>
                </div>
            </div>   
        {/*   )}   */}
      <Roleta p1={p1} p2={p2} p3={p3} p4={p4} p5={p5} p6={p6} moedas={moedas} tickets={tickets} />
    </div>
  );
};

export default RoletaPage;
