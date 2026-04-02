import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { query } from './database/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

// rota inicial
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Backend em TypeScript Rodando');
});

// rota de teste de conexão com o postgres
app.get('/teste-db', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT NOW()');
        res.status(200).json({
            status: "Conectado ao PostgreSQL!",
            horario_banco: result.rows[0].now
        });
    } catch (err) {
        console.error("Erro ao conectar ao banco", err);
        res.status(500).json({ 
            erro: "Falha na conexão com o banco de dados",
            detalhes: err instanceof Error ? err.message : 'Erro desconhecido'
        });
    }
});

// inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`🐘 Teste do Banco: http://localhost:${PORT}/teste-db\n`);
})
