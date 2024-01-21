import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/auth";

import Roleta from "../components/Roleta/Roleta";
import Navbar from "../components/Navbar/Navbar";

const RoletaPage = () => {
  const { user } = useContext(AuthContext);

  const [p1, setP1] = useState("1");
  const [p2, setP2] = useState("2");
  const [p3, setP3] = useState("3");
  const [p4, setP4] = useState("4");
  const [p5, setP5] = useState("5");
  const [p6, setP6] = useState("6");

  return (
    <div className="main_container">
      <Navbar />

      <Roleta p1={p1} p2={p2} p3={p3} p4={p4} p5={p5} p6={p6} user={user} />
    </div>
  );
};

export default RoletaPage;
