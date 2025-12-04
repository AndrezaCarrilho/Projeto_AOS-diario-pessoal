const prisma = require('../utils/client');

// 1. CRIAR HUMOR
exports.criarHumor = async (req, res) => {
  try {
    const { nome, emoji } = req.body;
    const humor = await prisma.humor.create({
      data: { nome, emoji }
    });
    res.status(201).json(humor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar humor' });
  }
};

// 2. LISTAR HUMORES
exports.listarHumores = async (req, res) => {
  try {
    const humores = await prisma.humor.findMany();
    res.json(humores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar humores' });
  }
};

// 3. ATUALIZAR HUMOR
exports.atualizarHumor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, emoji } = req.body;
    
    const humor = await prisma.humor.update({
      where: { id },
      data: { nome, emoji }
    });
    res.json(humor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar humor' });
  }
};

// 4. DELETAR HUMOR
exports.deletarHumor = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.humor.delete({ where: { id } });
    res.json({ message: 'Humor deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar humor' });
  }
};