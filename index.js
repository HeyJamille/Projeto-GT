const express = require('express');
const bodyParser = require('body-parser');
const supabase = require('./supabaseClient');

const app = express();
const port = 3001;

// Middleware para lidar com JSON
app.use(bodyParser.json());

// Testa a conexão com o Supabase
app.get('/', (req, res) => {
  res.send('API Node.js com Supabase funcionando!');
});

// CRUD para a tabela "usuarios"

// 1. Criar um usuário
app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ usuario: data });
});

// 2. Listar todos os usuários
app.get('/usuarios', async (req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ usuarios: data });
});

// 3. Atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  const { data, error } = await supabase
    .from('usuarios')
    .update({ nome, email })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ usuarioAtualizado: data });
});

// 4. Deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('usuarios')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ usuarioRemovido: data });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
