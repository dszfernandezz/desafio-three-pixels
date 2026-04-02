import { useState } from "react";
import { Link } from "react-router-dom";
import useCheckEmail from "../hooks/useCheckEmail";
import useCheckPhone from "../hooks/useCheckPhone";
import { signupRequest } from "../services/api";
import HeaderBackLink from "../components/HeaderBackLink";
import "../index.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    birthday: "",
    complement: "",
    zipCode: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    identifier: "",
  });

  const {
    validarEmail,
    success: emailSuccess,
    loading: emailLoading,
  } = useCheckEmail();

  const {
    validarCelular,
    success: phoneSuccess,
    loading: phoneLoading,
  } = useCheckPhone();

  const verificaSignUp = async () => {
    try {
      await signupRequest(formData);
      alert("Cadastro realizado com sucesso!");
    } catch (err: any) {
      alert(err.message || "Erro ao realizar cadastro");
    }
  };

  const senhaoSaoIguais = formData.password === formData.passwordConfirm;

  return (
    <div className="body bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl ">
        <div className="bg-white rounded-4xl shadow-xl p-10">
          
          <HeaderBackLink />

          <div className="header-forms mb-8 flex items-center justify-center border-b border-gray-400 ">
            <h2 className="text-2xl font-bold mb-1">Registre-se</h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div className="forms-name">
              <label className="block text-sm font-medium mb-1">Nome:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="Nome Completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-medium mb-1">CPF:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="000.000.000-00"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
              />
            </div>

            {/* Data de Nascimento */}
            <div className="forms-birthday">
              <label className="block text-sm font-medium mb-1">
                Data de Nascimento:
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="date"
                placeholder="dd/mm/aaaa"
                value={formData.birthday}
                onChange={(e) =>
                  setFormData({ ...formData, birthday: e.target.value })
                }
              />
            </div>

            {/* Telefone */}
            <div className="forms-telefone">
              <label className="block text-sm font-medium mb-1">
                Telefone:
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="Seu telefone"
                value={formData.phone}
                onBlur={() => validarCelular(formData.phone)}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              {formData.phone && !phoneSuccess && !phoneLoading && (
                <span className="text-red-500 text-xs">Telefone inválido</span>
              )}
            </div>

            {/* Email */}
            <div className="forms-email md:col-span-2">
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150"
                type="email"
                placeholder="Seu e-mail"
                value={formData.email}
                onBlur={() => validarEmail(formData.email)}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {formData.email && !emailSuccess && !emailLoading && (
                <span className="text-red-500 text-xs">Email inválido</span>
              )}
            </div>

            {/* Endereco */}
            <div className="forms-endereco md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Endereço:
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 "
                type="text"
                placeholder="insira seu endereço"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            {/* Complemento */}
            <div className="forms-complemento ">
              <label className="block text-sm font-medium mb-1">
                Complemento:
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 "
                type="text"
                placeholder="Apto, bloco, conjunto, etc"
                value={formData.complement}
                onChange={(e) =>
                  setFormData({ ...formData, complement: e.target.value })
                }
              />
            </div>

            {/* CEP */}
            <div className="forms-cep">
              <label className="block text-sm font-medium mb-1">CEP:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 "
                type="text"
                placeholder="Informe seu CEP"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
              />
            </div>

            {/* Senha */}
            <div className="forms-senha w-full">
              <label className="block text-sm font-medium mb-1">Senha:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 "
                type="password"
                placeholder="Crie uma senha forte"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Confirmar senha*/}
            <div className="forms-senha w-full">
              <label className="block text-sm font-medium mb-1">
                Confirmar Senha:
              </label>
              <input
                className={`w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ${
                  !senhaoSaoIguais && formData.passwordConfirm.length > 0
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                type="password"
                placeholder="Confirme sua senha"
                value={formData.passwordConfirm}
                onChange={(e) =>
                  setFormData({ ...formData, passwordConfirm: e.target.value })
                }
              />
              {!senhaoSaoIguais && formData.passwordConfirm.length > 0 && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  As senhas não são iguais.
                </p>
              )}
            </div>

            {/* Botão */}
            <div className="forms-botao mt-8 flex items-center justify-center w-full md:col-span-2">
              <button
                className="w-full bg-purple-600 hover:bg-purple-800 disabled:bg-gray-300 text-white 
                font-medium py-3 px-4 rounded-lg transition duration-150  hover:shadow-lg"
                onClick={verificaSignUp}
                disabled={
                  !emailSuccess || !phoneSuccess || emailLoading || phoneLoading
                }
              >
                Finalizar Cadastro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
