import { z } from 'zod';
const BASE_URL = 'http://localhost:3000/api';

export const SignupSchema = z.object({
    nome: z.string().min(3, 'Nome muito curto'),
    email: z.string().email('E-mail inválido'),
    cpf: z.string().length(11, 'O CPF deve ter 11 números'), // Lembre de limpar a máscara antes de validar aqui ou no backend
    data_nascimento: z.string().min(1, 'Data é obrigatória'),
    telefone: z.string().min(10, 'Telefone inválido'),
    endereco: z.string().min(5, 'Endereço muito curto'),
    complemento: z.string().optional(),
    cep: z.string().length(8, 'CEP deve ter 8 números'),
    senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmarSenha: z.string()
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
});

export type SignupData = z.infer<typeof SignupSchema>;

export interface User {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  [key: string]: unknown;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface PreSigninResponse {
    username: string;
    name: string;
}

/* Signup */

export const signupRequest = async (userData: SignupData): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if(!response.ok) throw new Error(data?.error?.message ||'O cadastro não pode ser realizado');
    return data;
}

/* Signin */

export const signinRequest = async (username: string, password: string): Promise<AuthResponse>  => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error?.message || 'Erro ao tentar realizar o login');
    }

    return response.json();
}