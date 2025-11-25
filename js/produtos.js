import { apiGet, apiDelete } from "./api.js";

async function carregarProdutos() {
  const produtos = await apiGet("/produtos");
  const lista = document.getElementById("lista-produtos");

  lista.innerHTML = ""; 

  produtos.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>Preço: R$ ${p.preco}</p>
        <button onclick="editar(${p.id})">Editar</button>
        <button onclick="remover(${p.id})" style="background:red">Excluir</button>
      </div>
    `;
  });
}


async function carregarProdutosExibicao() {
  const produtos = await apiGet("/produtos");
  const lista = document.getElementById("lista-produtos-exibicao");

  lista.innerHTML = "";

  produtos.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>Preço: R$ ${p.preco}</p>
        <button onclick="adicionarCarrinho(${p.id}, '${p.nome}', ${p.preco})">
          Adicionar ao carrinho
        </button>
      </div>
    `;
  });
}


window.adicionarCarrinho = function (id, nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const itemExistente = carrinho.find(item => item.id === id);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      id,
      nome,
      preco,
      quantidade: 1
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
};

window.editar = (id) => {
  window.location.href = `produto-form.html?id=${id}`;
};

window.remover = async (id) => {
  if (!confirm("Excluir produto?")) return;
  await apiDelete(`/produtos/${id}`);
  carregarProdutos();
};

if (document.getElementById("lista-produtos")) {
  carregarProdutos();
}

if (document.getElementById("lista-produtos-exibicao")) {
  carregarProdutosExibicao();
}
