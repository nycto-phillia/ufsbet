const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Permite requisições do site (frontend)
app.use(cors());
// Permite que a API entenda dados em formato JSON
app.use(express.json());

// Criar um novo Usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { cpf, nome, idade, email, telefone, endereco, senha } = req.body;

    const novoUsuario = await prisma.usuario.create({
      data: {
        cpf,
        nome,
        idade,
        email,
        telefone,
        endereco,
        senha
      }
    });
    // Podemos criptografar a senha e os dados do cartão, mas ai vai depender se vai fazer sentido.

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário. Verifique se o CPF já existe.' });
  }
});

// Criar/Salvar um Cartão
app.post('/cartoes', async (req, res) => {
  try {
    const { num_cartao, data_validade, digito_seguranca, nome_titular, cpf } = req.body;

    // Verifica se o usuário (CPF) existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { cpf: cpf }
    });

    if (!usuarioExiste) {
      return res.status(404).json({ erro: 'Usuário não encontrado com este CPF.' });
    }

    const novoCartao = await prisma.cartao.create({
      data: {
        num_cartao,
        data_validade,
        digito_seguranca,
        nome_titular,
        cpf
      }
    });

    res.status(201).json({ mensagem: 'Cartão salvo com sucesso!', cartao: novoCartao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao salvar o cartão.' });
  }
});

// ROTA: Buscar um usuário e seus cartões
app.get('/usuarios/:cpf', async (req, res) => {
  try {
    const { cpf } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: { cpf: cpf },
      include: { cartoes: true }
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados.' });
  }
});

// Iniciando o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});