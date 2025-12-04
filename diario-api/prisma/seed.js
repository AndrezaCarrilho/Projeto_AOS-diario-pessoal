const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  console.log('Iniciando o seed...');

  // 1. Limpar o banco antes de popular
  await prisma.entrada.deleteMany();
  await prisma.caderno.deleteMany();
  await prisma.humor.deleteMany();
  await prisma.usuario.deleteMany();

  console.log(' Banco limpo!');

  // 2. Criar Humores 

  const feliz = await prisma.humor.create({ 
    data: { nome: 'Feliz', emoji: '😊' } 
  });
  
  const triste = await prisma.humor.create({ 
    data: { nome: 'Triste', emoji: '😢' } 
  });
  
  const ansioso = await prisma.humor.create({ 
    data: { nome: 'Ansioso', emoji: '😰' } 
  });
  
  console.log('Humores criados');

  // 3. Criar 2 Usuários
  const senhaHash = await bcrypt.hash('123456', 10);

  const user1 = await prisma.usuario.create({
    data: {
      email: 'alice@email.com',
      nome: 'Alice Silva',
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

  console.log('Usuários criados: Alice e Bruno (Senha: 123456)');

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

  // Criar 2 Cadernos para o Bruno
  await prisma.caderno.create({
    data: {
      titulo: 'Segredos do Bruno',
      usuarioId: user2.id,
    },
  });
  
  await prisma.caderno.create({
    data: {
      titulo: 'Receitas de Família',
      usuarioId: user2.id,
    },
  });

  console.log('Cadernos criados');

  // 5. Criar Entradas (Posts) nos cadernos da Alice
  await prisma.entrada.create({
    data: {
      titulo: 'Chegada em Paris',
      conteudo: 'Hoje cheguei em Paris! A cidade é linda.',
      cadernoId: caderno1.id,
      usuarioId: user1.id,
      humorId: feliz.id,
    },
  });

  await prisma.entrada.create({
    data: {
      titulo: 'Problema no voo',
      conteudo: 'Perdi meu voo de conexão... estou preocupada.',
      cadernoId: caderno1.id,
      usuarioId: user1.id,
      humorId: ansioso.id,
    },
  });
  
  console.log('Entradas criadas');
  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });