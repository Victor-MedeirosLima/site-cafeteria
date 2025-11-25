import { apiGet, apiPost, apiPut } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function carregar() {
  if (!id) return;

  const p = await apiGet(`/produtos/${id}`);
  document.getElementById("nome").value = p.nome;
  document.getElementById("preco").value = p.preco;
  document.getElementById("descricao").value = p.descricao;
}

document.getElementById("formProduto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: document.getElementById("nome").value,
    preco: parseFloat(document.getElementById("preco").value),
    descricao: document.getElementById("descricao").value
  };

  if (id) {
    await apiPut(`/produtos/${id}`, data);
  } else {
    await apiPost("/produtos", data);
  }

  alert("Salvo com sucesso!");
  window.location.href = "produtos.html";
});

carregar();
