# 📓 API de Diário Pessoal - Projeto Back-end

Este projeto é um back-end completo para um sistema de diário pessoal, desenvolvido em **Express** com banco de dados **PostgreSQL**. Ele foi criado como parte da disciplina de Aplicações Orientadas a Serviço da UNICAP.

O sistema permite que usuários se cadastrem e façam login para criar e gerenciar seus cadernos e entradas de diário. O foco principal do projeto é a **privacidade e segurança**, garantindo que um usuário **jamais** possa acessar, ver, editar ou deletar dados que pertençam a outro usuário.

-----

## 👥 Equipe

| Nome | RA |
| :--- | :--- |
| `Andreza Luíze Carrilho Silva` | `[00000850319]` |
| `[Natan Soares]` | `[00000851787]` |


-----

## 🚀 Links do Projeto

  * **API Publicada (Vercel):** `[https://projeto-aos-diario-pessoal.vercel.app/]`
  * **Vídeo de Demonstração (YouTube):** `[https://youtu.be/bSKtVYOPPI8?si=yYlp3BKNpnWfW9Mo]`


-----

## ✨ Funcionalidades Implementadas

  * **Autenticação JWT:** Sistema completo de `Sign Up` (cadastro), `Login` (com token JWT) e `Logout`.
  * **Hashing de Senhas:** As senhas dos usuários são armazenadas de forma segura usando `bcrypt`.
  * **Proteção Total de Rotas:** Todas as rotas (exceto `/login` e `/signup`) são protegidas e exigem um token de autenticação válido.
  * **Autorização de Acesso (Dono do Dado):** O pilar do projeto. Um usuário logado só pode interagir (criar, ler, editar, deletar) com os *seus próprios* cadernos e entradas. Tentativas de acessar dados de outros usuários são bloqueadas com um erro `403 Forbidden` ou `404 Not Found`.
  * **CRUD de 4 Entidades:**
    1.  `Usuario` (Quem escreve)
    2.  `Caderno` (Para agrupar entradas, ex: "Diário de Gratidão", "Ideias")
    3.  `Entrada` (A página do diário em si)
    4.  `Humor` (Tabela de consulta para associar um humor à entrada, ex: "Feliz", "Triste")
  * **2 Relacionamentos com URLs Compostas:**
    1.  Busca de todas as **Entradas** de um **Caderno** (`GET /cadernos/:id/entradas`).
    2.  Busca de todas as **Entradas** associadas a um **Humor** (`GET /humores/:id/entradas`).

-----

## 📦 Estrutura do Banco de Dados

O projeto utiliza as seguintes entidades e relacionamentos principais:

  * **`Usuario`**: Armazena os dados de login.
  * **`Caderno`**: Pertence a um `Usuario` (1:N). Usado para organizar as entradas.
  * **`Entrada`**: A entrada do diário. Pertence a um `Usuario` (1:N) e a um `Caderno` (1:N).
  * **`Humor`**: Uma tabela de consulta (lookup table) com humores pré-definidos (Ex: "Feliz", "Neutro", "Produtivo").
      * *Relacionamento 1 (1:N):* Um `Caderno` pode ter várias `Entradas`.
      * *Relacionamento 2 (1:N):* Um `Humor` pode estar associado a várias `Entradas`.

-----

## 💻 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento:

1.  **Clone o repositório:**

    ```bash
    git clone 
    cd
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto, copiando o `.env.example` (se houver) ou adicionando as seguintes variáveis:

    ```env
    # URL de conexão do seu banco PostgreSQL (Ex: do Neon, Supabase ou local)
    DATABASE_URL="postgresql://user:password@host:port/database"

    # Chave secreta para gerar os tokens JWT
    JWT_SECRET="sua_chave_secreta_super_forte_aqui"
    ```

4.  **Execute as Migrations (se estiver usando Prisma/TypeORM):**
    *Se estiver usando Prisma (recomendado):*

    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

6.  O servidor estará rodando em `http://localhost:3000` (ou a porta que você configurou).

-----

## 🗺️ Principais Rotas da API (Endpoints)

> **Nota:** Todas as rotas abaixo (exceto Autenticação) são protegidas e exigem um `Token Bearer` no cabeçalho `Authorization`. O sistema **sempre** filtrará os resultados para mostrar apenas os dados pertencentes ao usuário autenticado.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **Autenticação** | | |
| `POST` | `/signup` | Cadastra um novo usuário. |
| `POST` | `/login` | Realiza o login e retorna um token JWT. |
| **Cadernos** | | |
| `POST` | `/cadernos` | Cria um novo caderno (associado ao usuário logado). |
| `GET` | `/cadernos` | Lista TODOS os cadernos do usuário logado. |
| `GET` | `/cadernos/:id` | Busca um caderno específico (só se for do usuário). |
| `PUT` | `/cadernos/:id` | Edita um caderno (só se for do usuário). |
| `DELETE`| `/cadernos/:id` | Deleta um caderno (só se for do usuário). |
| **Entradas do Diário** | | |
| `POST` | `/entradas` | Cria uma nova entrada (associada a um caderno do usuário). |
| `GET` | `/entradas` | Lista TODAS as entradas do usuário logado. |
| `GET` | `/entradas/:id` | Busca uma entrada específica (só se for do usuário). |
| `PUT` | `/entradas/:id` | Edita uma entrada (só se for do usuário). |
| `DELETE`| `/entradas/:id` | Deleta uma entrada (só se for do usuário). |
| **Humores** | | |
| `GET` | `/humores` | Lista todos os humores disponíveis (Ex: "Feliz", "Triste"). |
| **Relacionamentos (URLs Compostas)** | | |
| `GET` | `/cadernos/:id/entradas` | Lista todas as entradas de um caderno específico (só se o caderno pertencer ao usuário). |
| `GET` | `/humores/:id/entradas` | Lista todas as entradas do usuário logado que estão associadas a um humor específico. |
