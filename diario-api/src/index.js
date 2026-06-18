require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//IMPORTAÇÕES
const authRoutes = require('./routes/authRoutes');
const cadernoRoutes = require('./routes/cadernoRoutes');
const humorRoutes = require('./routes/humorRoutes');
const entradaRoutes = require('./routes/entradaRoutes');

//USO DAS ROTAS
app.use('/auth', authRoutes);       
app.use('/cadernos', cadernoRoutes); 
app.use('/humores', humorRoutes);    
app.use('/entradas', entradaRoutes);  

// Rota da Página Inicial
app.get('/', (req, res) => {
  res.send('API Diário Pessoal rodando com Sucesso!');
});

//INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});