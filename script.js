const nomeProduto = document.getElementById('nome-produto');
const valorProduto = document.getElementById('valor-produto');
const descricaoProduto = document.getElementById('descricao-produto');
const btnEnviar = document.getElementById('btn-enviar');
const feedbackUsuario = document.getElementById('feedback-usuario')
const produtosCadastrados = document.getElementById('produtos-cadastrados')

btnEnviar.addEventListener('click', () => {
  // Capturar os valores dos inputs
  const produto = nomeProduto.value;
  const valor = valorProduto.value;
  const descricao = descricaoProduto.value;

  // Verificar se todos os campos estão preenchidos
  if (!produto || !valor || !descricao) {
    feedbackUsuario.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  // Construir objeto JSON
  const produtoData = {
    produto: produto,
    valor: valor,
    descricao: descricao,
  };

  // Enviar requisição POST usando a Fetch API
  fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produtoData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Limpar os inputs se a requisição for bem-sucedida
      nomeProduto.value = '';
      valorProduto.value = '';
      descricaoProduto.value = '';

      // Exibir feedback de sucesso
      feedbackUsuario.textContent = 'Produto cadastrado com sucesso!';

      // Adicionar o produto à seção 'Produtos Cadastrados'
      const novoProduto = document.createElement('p');
      novoProduto.textContent = `Produto: ${data.json.produto}, Valor: ${data.json.valor}, Descrição: ${data.json.descricao}`;
      produtosCadastrados.appendChild(novoProduto);
    })
    .catch((error) => {
      // Exibir feedback de erro
      feedbackUsuario.textContent = 'Erro ao cadastrar o produto. Tente novamente.';
      console.error('Erro na requisição:', error);
    });
});
