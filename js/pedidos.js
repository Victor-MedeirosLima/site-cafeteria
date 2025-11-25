import { apiGet, apiDelete } from "./api.js";

async function carregarPedidos() {
  const pedidos = await apiGet("/pedidos");
  const lista = document.getElementById("lista-pedidos");

  lista.innerHTML = "";

  for (const p of pedidos) {

    // Buscar nome do usuário se ainda não veio na resposta
    let nomeCliente = "Desconhecido";
    let emailCliente = "";

    if (p.usuarios) {
      nomeCliente = p.usuarios.nome;
      emailCliente = p.usuarios.email;
    }

    //  Buscar dados reais do produto pelo ID
    const produto = await apiGet(`/produtos/${p.produto}`);
    const nomeProduto = produto.nome;

    lista.innerHTML += `
      <div class="card">
        <h3>Pedido #${p.id}</h3>
        <p>Cliente: ${nomeCliente}</p>
        <p>Email: ${emailCliente}</p>
        <p>Data: ${new Date(p.data_criacao).toLocaleString()}</p>

        <h4>Item:</h4>
        <ul>
          <li>Produto: ${nomeProduto}</li>
          <li>Quantidade: ${p.quantidade}</li>
          <li>Total: R$ ${p.total}</li>
        </ul>

        <button onclick="editarPedido(${p.id})">Editar</button>
        <button onclick="removerPedido(${p.id})" style="background:red">Excluir</button>
      </div>
    `;
  }
}

window.editarPedido = (id) => {
  window.location.href = `pedido-form.html?id=${id}`;
};

window.removerPedido = async (id) => {
  if (!confirm("Excluir pedido?")) return;
  await apiDelete(`/pedidos/${id}`);
  carregarPedidos();
};

carregarPedidos();
