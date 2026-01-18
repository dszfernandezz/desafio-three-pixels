const BASE_URL = 'https://apiinterview.threepixels.com.br/api/v1'

/* Singup */

export const checkEmailRequest = async (email) => {
    const response  = await fetch(`${BASE_URL}/authenticate/check/email`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email} ),
    });

    if(!response.ok) throw new Error('o email já está em uso');

    return response.json();
}

export const checkPhoneRequest = async (phone) => {
    const response  = await fetch(`${BASE_URL}/authenticate/check/phone`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phone }),
    });

    if(!response.ok) throw new Error('o celular já está em uso');

    return response.json();
}   

export const signupRequest = async (userData) => {
    const response = await fetch(`${BASE_URL}/authenticate/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
    });

    if(!response.ok){
        const err = await response.json();
        throw new Error(err.error?.message ||'O cadastro não pode ser realizado');
    }
    return response.json();
}

/* Login */

export const preSigninRequest = async (username) => {
    const response = await fetch(`${BASE_URL}/authenticate/pre/signin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username }),
    });

    if(!response.ok) throw new Error('O usuário não foi encontrado!');

    return response.json();
}

export const signinRequest = async (username, password) => {
    const response = await fetch(`${BASE_URL}/authenticate/signin`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });

    if(!response.ok) throw new Error('Erro ao tentar realizar o login')

    return response.json();
}