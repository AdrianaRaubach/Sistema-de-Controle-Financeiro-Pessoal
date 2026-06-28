# **Controle Financeiro Pessoal — API**

> Este projeto foi desenvolvido como Atividade avaliada da disciplina Web-2, do Instituto Federal do Rio Grande do Sul.

---

## 📄 **Requisitos**

- [x] **Autenticação:**
    Cadastro com nome, e-mail e senha, com validação de e-mail único e senha armazenada com hash via bcrypt. Login com geração de token JWT utilizado para autenticar todas as demais rotas.

- [x] **Categorias:**
    Criação e listagem de categorias do tipo `income` (receita) ou `expense` (despesa), vinculadas ao usuário autenticado. Cada usuário gerencia apenas suas próprias categorias.

- [x] **Transações:**
    Criação e listagem de transações financeiras com filtros por mês, ano, categoria e tipo. Transações do tipo `expense` iniciam com status `pending` e podem ser marcadas como pagas.

- [x] **Marcar despesa como paga:**
    Endpoint dedicado para registrar o pagamento de uma despesa, com data de pagamento opcional (usa a data atual se omitida). Impede marcar a mesma despesa duas vezes.

- [x] **Relatório de saldo mensal:**
    Retorna o total de receitas, total de despesas e saldo líquido do mês/ano informados.

- [x] **Relatório por categoria:**
    Retorna o total gasto por categoria no mês/ano informados, incluindo apenas categorias com ao menos uma transação no período.

---

## 💻 **Tecnologias utilizadas**

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- ### <img align="center" alt="Node" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"> Node.js

- ### <img align="center" alt="Express" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"> Express v5

- ### <img align="center" alt="Prisma" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg"> Prisma v7

- ### <img align="center" alt="SQLite" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg"> SQLite (via better-sqlite3)

- ### <img align="center" alt="TypeScript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"> TypeScript

- ### <img align="center" alt="Zod" height="30" width="40" src="https://zod.dev/logo/logo-glow.png"> Zod

- ### <img align="center" alt="JWT" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"> JSON Web Token

- ### <img align="center" alt="Bcrypt" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"> BcryptJS

- ### <img align="center" alt="Vitest" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg"> Vitest

---

## 🛠️ Instalação e Configuração

1. Clone este repositório

```bash
git clone https://github.com/AdrianaRaubach/trabalho-iii.git
```

2. Instale os pacotes e dependências

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`

```env
DATABASE_URL=file:./dev.db
JWT_SECRET=sua_chave_secreta
PORT=3000
```

4. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

5. Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```

6. Acesse a documentação interativa (Swagger)

```
http://localhost:3000/docs
```

---

## 🧪 Testes

```bash
# Todos os testes
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de integração
npm run test:integration
```

---

## ✏️ Autora

- [Adriana Raubach](https://github.com/AdrianaRaubach)
