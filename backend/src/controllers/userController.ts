import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../database/db.js';

// registra usuario
export const registerUser = async (req: Request, res: Response) => {
    const {
        nome, cpf, data_nascimento, telefone, email,
        endereco, complemento, cep, senha, confirmarSenha
    } = req.body

    // validação de senha
    if (senha !== confirmarSenha) {
        return res.status(400).json({ erro: "As senhas não são iguais"});
    }

    if (senha.length < 8) {
        return res.status(400).json({ erro: "A senha dev ter no minimo 8 caracteres"})
    }

    // validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({ erro: "email inválido"});
    }

    // validação de CPF
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) {
        return res.status(400).json({ erro: "O CPF deve conter 11 números." });
    }

    try {
        // Verifica se email e cpf já existem
        const userExists = await query(
            'SELECT id FROM usuarios where email = $1 OR cpf = $2',
            [email, cleanCPF]
        );

        if(userExists.rows.length > 0) {
            return res.status(400).json({ erro: "Email ou CPF já cadastrados"})
        }

        // criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Salva os dados no banco de dados
        const sql = `
            INSERT INTO usuarios 
            (nome, email, senha, cpf, data_nascimento, telefone, endereco, complemento, cep)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)    
        `;

        const values = [
            nome, email, hashedPassword, cleanCPF, 
            data_nascimento, telefone, endereco, complemento || null, cep
        ]

        await query(sql, values);

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro no cadastro:", err);
        res.status(500).json({ erro: "Erro interno ao processar o cadastro." });
    }
}
