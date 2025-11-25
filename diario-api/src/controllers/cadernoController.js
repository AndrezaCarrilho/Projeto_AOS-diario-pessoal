const prisma = require('../utils/client');

// 1. CRIAR
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
    res.status(500).json({ error: 'Erro ao criar caderno' });
  }
};

// 2. LISTAR
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

// 3. ATUALIZAR
exports.atualizarCaderno = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo } = req.body;
    const resultado = await prisma.caderno.updateMany({
      where: { 
        id: id,
        usuarioId: req.usuarioId 
      },
      data: { titulo }
    });

    if (resultado.count === 0) {
      return res.status(403).json({ error: 'Caderno não encontrado ou sem permissão.' });
    }

    res.json({ message: 'Caderno atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar caderno' });
  }
};

// 4. DELETAR
exports.deletarCaderno = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await prisma.caderno.deleteMany({
      where: { 
        id: id,
        usuarioId: req.usuarioId 
      }
    });

    if (resultado.count === 0) {
      return res.status(403).json({ error: 'Caderno não encontrado ou sem permissão.' });
    }

    res.json({ message: 'Caderno deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar caderno' });
  }
};

// 5. RELACIONAMENTO
exports.listarEntradasDoCaderno = async (req, res) => {
  try {
    const { id } = req.params;
    const caderno = await prisma.caderno.findUnique({
      where: { id },
      include: { entradas: true }
    });

    if (!caderno) return res.status(404).json({ error: 'Caderno não encontrado' });
    
    // Segurança extra
    if (caderno.usuarioId !== req.usuarioId) {
        return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(caderno.entradas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar entradas' });
  }
};