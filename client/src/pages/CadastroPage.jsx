import { useContext, useState } from "react";
import { createUser } from "../services/api";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/CadastroPage.css";

function CadastroPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [endereco, setEndereco] = useState("");

  const notify = () => {
    toast.error("Preencha todos os campos", { position: "top-center" });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    notify();
    if (email && password && name && endereco) {
      const response = await createUser(name, endereco, email, password);
      if (response.status === 201) {
        login(email, password);
      }
    }
  };

  return (
    <div className="cadastro">
      <ToastContainer />
      <img src="src\img\Logo.png" alt="Logo" />
      <form>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="endereco">Endereço</label>
          <input
            name="endereco"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div className="actions">
          <button
            type="submit"
            onClick={(e) => {
              handleCadastro(e);
            }}
          >
            Cadastrar
          </button>

          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroPage;
