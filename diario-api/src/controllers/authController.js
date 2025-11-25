const prisma = require('../utils/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const userExists = await prisma.usuario.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ error: 'Email já cadastrado' });

    const hashSenha = await bcrypt.hash(senha, 10);
    const user = await prisma.usuario.create({
      data: { nome, email, senha: hashSenha },
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Usuário ou senha inválidos' });

    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) return res.status(400).json({ error: 'Usuário ou senha inválidos' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      user: { id: user.id, nome: user.nome, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login' });
  }
};


exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso. Remova o token do cliente.' });
};