import { Link } from "react-router-dom";
import "../index.css"

function Home() {
  return (
    <div className="bg-white flex flex-col items-center justify-center
     text-black w-max rounded-4xl shadow-2xl max-w-3xl mx-auto mt-50 p-20">
      <div className="border-b border-gray-400 mb-10">
        <h1 className="text-4xl font-bold border-b-gray-800 mt-2 mb-1">Bem-vindo a Three Pixels Sistemas!</h1>
      </div>

      <div className="flex gap-4 mb-2">
        <Link 
          to="/login" 
          className="bg-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition text-white"
        >
          Entrar (Login)
        </Link>
        
        <Link 
          to="/registrar" 
          className="border border-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition"
        >
          Criar Conta (Registrar-se)
        </Link>
      </div>
    </div>
  );
}

export default Home;