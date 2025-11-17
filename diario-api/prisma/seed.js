const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs'); // Certifique-se de ter: npm install bcryptjs

async function main() {
  // 1. Limpar o banco antes de popular (para não duplicar erros)
  await prisma.entrada.deleteMany();
  await prisma.caderno.deleteMany();
  await prisma.humor.deleteMany();
  await prisma.usuario.deleteMany();

  // 2. Criar Humores (Tabela de consulta)
  const feliz = await prisma.humor.create({ data: { descricao: 'Feliz' } });
  const triste = await prisma.humor.create({ data: { descricao: 'Triste' } });
  const ansioso = await prisma.humor.create({ data: { descricao: 'Ansioso' } });
  
  console.log('✅ Humores criados');

  // 3. Criar 2 Usuários (Hash na senha é obrigatório!)
  const senhaHash = await bcrypt.hash('123456', 10);

  const user1 = await prisma.usuario.create({
    data: {
      email: 'alice@email.com',
      nome: 'Alice Silva', // Se tiver esse campo no seu schema
      senha: senhaHash,
    },
  });

  const user2 = await prisma.usuario.create({
    data: {
      email: 'bruno@email.com',
      nome: 'Bruno Souza',
      senha: senhaHash,
    },
  });

  console.log('✅ Usuários criados (Alice e Bruno)');

  // 4. Criar 2 Cadernos para a Alice
  const caderno1 = await prisma.caderno.create({
    data: {
      titulo: 'Diário de Viagem',
      usuarioId: user1.id,
    },
  });

  const caderno2 = await prisma.caderno.create({
    data: {
      titulo: 'Ideias de Projetos',
      usuarioId: user1.id,
    },
  });

  // Criar 1 Caderno para o Bruno (só para teste de segurança)
  await prisma.caderno.create({
    data: {
      titulo: 'Segredos do Bruno',
      usuarioId: user2.id,
    },
  });

  console.log('✅ Cadernos criados');

  // 5. Criar Entradas (Posts) nos cadernos da Alice
  await prisma.entrada.create({
    data: {
      conteudo: 'Hoje cheguei em Paris! A cidade é linda.',
      cadernoId: caderno1.id,
      usuarioId: user1.id,
      humorId: feliz.id,
    },
  });

  await prisma.entrada.create({
    data: {
      conteudo: 'Perdi meu voo... estou preocupada.',
      cadernoId: caderno1.id,
      usuarioId: user1.id,
      humorId: ansioso.id,
    },
  });
  
  console.log('✅ Entradas criadas');
  console.log('🌱 Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });