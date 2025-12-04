const prisma = require('../utils/client');

// 1. CRIAR ENTRADA
exports.criarEntrada = async (req, res) => {
  try {
    const { titulo, conteudo, cadernoId, humorId } = req.body;

    // Verificar se o caderno pertence ao usuário logado
    const caderno = await prisma.caderno.findUnique({
      where: { id: cadernoId }
    });

    if (!caderno || caderno.usuarioId !== req.usuarioId) {
      return res.status(403).json({ error: 'Caderno inválido ou sem permissão.' });
    }

    const entrada = await prisma.entrada.create({
      data: {
        titulo,
        conteudo,
        cadernoId,
        humorId,
        usuarioId: req.usuarioId // Pega do Token
      }
    });

    res.status(201).json(entrada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar entrada', details: error.message });
  }
};

// 2. LISTAR
exports.listarEntradas = async (req, res) => {
  try {
    const entradas = await prisma.entrada.findMany({
      where: { usuarioId: req.usuarioId }, // FILTRO DE SEGURANÇA
      include: {
        humor: true,   // Traz o emoji junto
        caderno: true  // Traz o nome do caderno junto
      }
    });
    res.json(entradas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar entradas' });
  }
};

// 3. ATUALIZAR
exports.atualizarEntrada = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, conteudo, humorId } = req.body;

    // updateMany garante que só atualiza se o ID bater E o dono for o usuário logado
    const resultado = await prisma.entrada.updateMany({
      where: { 
        id: id,
        usuarioId: req.usuarioId 
      },
      data: { titulo, conteudo, humorId }
    });

    if (resultado.count === 0) return res.status(403).json({ error: 'Sem permissão.' });

    res.json({ message: 'Entrada atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar entrada' });
  }
};

// 4. DELETAR
exports.deletarEntrada = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await prisma.entrada.deleteMany({
      where: { 
        id: id,
        usuarioId: req.usuarioId 
      }
    });

    if (resultado.count === 0) return res.status(403).json({ error: 'Sem permissão.' });

    res.json({ message: 'Entrada deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar entrada' });
  }
};