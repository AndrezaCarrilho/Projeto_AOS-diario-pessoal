const prisma = require('../utils/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await prisma.usuario.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashSenha,
      },
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
    if (!user) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d', 
    });

    res.json({
      user: { id: user.id, nome: user.nome, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login', details: error.message });
  }
exports.listarEntradasDoCaderno = async (req, res) => {
  try {
    const { id } = req.params; 

    const caderno = await prisma.caderno.findUnique({
      where: { id },
      include: { entradas: true } 
    });

    if (!caderno) {
        return res.status(404).json({ error: 'Caderno não encontrado' });
    }

    if (caderno.usuarioId !== req.usuarioId) {
        return res.status(403).json({ error: 'Acesso negado a este caderno' });
    }

    res.json(caderno.entradas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar entradas do caderno' });
  }
};
};