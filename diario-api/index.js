// 1. Carrega as variáveis de ambiente (do .env)
require('dotenv').config();

// 2. Importa o Express
const express = require('express');

// 3. Inicializa o aplicativo Express
const app = express();

// 4. Define a porta. O Render vai nos dar uma porta,
// mas para rodar local, usamos a 3000
const PORT = process.env.PORT || 3000;

// 5. (MUITO IMPORTANTE) Habilita o Express para ler JSON no corpo das requisições
app.use(express.json());

// 6. Rota de "teste" para ver se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API do Diário Pessoal está no ar!');
});

// 7. Inicia o servidor e fica "ouvindo" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});