import { apiGet, apiPut } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("ID do pedido não informado.");
  window.location.href = "pedidos.html";
}

async function carregarPedido() {
  const pedido = await apiGet(`/pedidos/${id}`);

  document.getElementById("produto").value = pedido.produto;
  document.getElementById("quantidade").value = pedido.quantidade;
  document.getElementById("total").value = pedido.total;
}

document.getElementById("form-pedido").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    produto: document.getElementById("produto").value,
    quantidade: parseInt(document.getElementById("quantidade").value),
    total: parseFloat(document.getElementById("total").value)
  };

  await apiPut(`/pedidos/${id}`, dados);

  alert("Pedido atualizado com sucesso!");
  window.location.href = "adm.html";
});

// carregar os dados ao abrir a página
carregarPedido();
