import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSignin from "../hooks/useSignin";
import "../index.css";
import HeaderBackLink from "../components/HeaderBackLink";
import HeaderRegisterLink from "../components/HeaderRegisterLink";
import CampoCPF from "../components/CampoCPF";

function SigninForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, error, userExist, verificaUsername, realizeSignin } =
    useSignin();

  const verificaUserExist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    verificaUsername(username);
  };

  const realizeLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await realizeSignin(username, password);
    if (data) {
      navigate("/usuario");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between">
        <HeaderBackLink />
        <HeaderRegisterLink />
      </div>

      <div className="border-b border-2-gray-400  mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {userExist ? "Informe sua senha" : "Acesse sua conta"}
        </h2>
      </div>

      <form>
        {/* Campo do CPF */}
        <CampoCPF
          username = {username}
          setUsername = {setUsername}
          userExist={userExist}
          loading={loading}
         />

        {/* Animação para surgir o campo de senha */}
        {userExist && (
          <div className="animate-in duration-300">
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-3"
            />
          </div>
        )}

        {/* Feedback de Erro para o usuario*/}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 font-medium text-center">
              {error}
            </p>
          </div>
        )}

        {/* Botão */}
        {!userExist ? (
          <button
            onClick={verificaUserExist}
            disabled={loading || !username}
            className="w-full py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-800 disabled:bg-gray-300 transition-colors"
          >
            {loading ? "Verificando..." : "Continuar"}
          </button>
        ) : (
          <button
            onClick={realizeLogin}
            disabled={loading || !password}
            className="w-full py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        )}
      </form>
    </div>
  );
}

export default SigninForm;
