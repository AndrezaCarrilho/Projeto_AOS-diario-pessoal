const prisma = require('../utils/client');

exports.criarCaderno = async (req, res) => {
  try {
    const { titulo } = req.body;
    const caderno = await prisma.caderno.create({
      data: {
        titulo,
        usuarioId: req.usuarioId 
      }
    });
    res.status(201).json(caderno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar caderno', details: error.message });
  }
};

exports.listarCadernos = async (req, res) => {
  try {
    const cadernos = await prisma.caderno.findMany({
      where: { usuarioId: req.usuarioId }
    });
    res.json(cadernos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cadernos' });
  }
};

exports.listarEntradasDoCaderno = async (req, res) => {
  try {
    const { id } = req.params;
    const caderno = await prisma.caderno.findUnique({
      where: { id },
      include: { entradas: true }
    });

    if (!caderno) return res.status(404).json({ error: 'Caderno não encontrado' });
    
    if (caderno.usuarioId !== req.usuarioId) {
        return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(caderno.entradas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar entradas' });
  }
};