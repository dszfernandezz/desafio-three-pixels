import { z } from 'zod';
const BASE_URL = 'https://apiinterview.threepixels.com.br/api/v1';

export const SignupSchema = z.object ({
    name: z.string().min(1, 'nome muito curto'),
    email: z.string().email('Email invalido!'),
    phone: z.string().regex(/^\d{10,11}$/, 'telefone inválido'),
    password: z.string().min(6, 'a senha tem que ter no minimo 6 caracteres')
});

export type SignupData = z.infer<typeof SignupSchema>;

export interface User {
  name: string;
  email: string;
  phone: string;
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

export const checkEmailRequest = async (email: string): Promise<{ available: boolean }> => {
    const response  = await fetch(`${BASE_URL}/authenticate/check/email`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email} ),
    });

    const data = await response.json();

    if(!response.ok) throw new Error(data?.message || 'o email já está em uso');

    return data;
}

export const checkPhoneRequest = async (phone: string): Promise<{ available: boolean }> => {
    const response  = await fetch(`${BASE_URL}/authenticate/check/phone`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phone }),
    });

    const data = await response.json();

    if(!response.ok) throw new Error(data?.message ||'o celular já está em uso');

    return data;
}   

export const signupRequest = async (userData: SignupData): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/authenticate/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if(!response.ok) throw new Error(data?.error?.message ||'O cadastro não pode ser realizado');
    return data;
}

/* Signin */

export const preSigninRequest = async (username: string): Promise<PreSigninResponse> => {
    const response = await fetch(`${BASE_URL}/authenticate/pre/signin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username }),
    });

    if(!response.ok) throw new Error('O usuário não foi encontrado!');

    return response.json();
}

export const signinRequest = async (username: string, password: string): Promise<AuthResponse>  => {
    const response = await fetch(`${BASE_URL}/authenticate/signin`, {
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