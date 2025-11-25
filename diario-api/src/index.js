require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// --- 1. IMPORTAÇÕES ---
const authRoutes = require('./routes/authRoutes');
const cadernoRoutes = require('./routes/cadernoRoutes');
// const humorRoutes = require('./routes/humorRoutes');
// const entradaRoutes = require('./routes/entradaRoutes');

// --- 2. USO DAS ROTAS ---
app.use('/auth', authRoutes);       
app.use('/cadernos', cadernoRoutes); 
// app.use('/humores', humorRoutes);    
// app.use('/entradas', entradaRoutes);  

// Rota da Página Inicial
app.get('/', (req, res) => {
  res.send('API Diário Pessoal rodando com Sucesso!');
});

// --- 3. INICIAR SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});