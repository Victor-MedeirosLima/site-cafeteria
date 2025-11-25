import { apiPost, apiGet } from "./api.js";

// -------------------------
// Carregar carrinho
// -------------------------
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;

    lista.innerHTML += `
      <div class="card">
        <h3>${item.nome}</h3>
        <p>Preço: R$ ${item.preco}</p>
        <p>Quantidade: 
          <button onclick="alterarQtd(${item.id}, -1)">-</button>
          ${item.quantidade}
          <button onclick="alterarQtd(${item.id}, 1)">+</button>
        </p>
        <button onclick="removerItem(${item.id})" style="background:red">Remover</button>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
}

carregarCarrinho();


// -------------------------
// Buscar usuário pelo email
// -------------------------
document.getElementById("buscar-usuario").addEventListener("click", async () => {
  const email = document.getElementById("email-usuario").value.trim();
  const divDados = document.getElementById("dados-usuario");
  const nomeInput = document.getElementById("nome-usuario");
  const btnFinalizar = document.getElementById("finalizar");

  if (!email) {
    alert("Digite um email.");
    return;
  }

  let usuario = null;

  try {
    usuario = await apiGet(`/usuarios/buscar/${email}`);
  } catch {}

  divDados.style.display = "block";

  if (usuario && usuario.id) {
    // Usuário existe → apenas mostra o nome
    nomeInput.value = usuario.nome;
    nomeInput.readOnly = true;

    btnFinalizar.disabled = false;

    divDados.setAttribute("data-usuario-id", usuario.id);
  } else {
    // Usuário novo → permite digitar nome
    nomeInput.value = "";
    nomeInput.readOnly = false;

    btnFinalizar.disabled = false;

    divDados.removeAttribute("data-usuario-id");
  }
});


// -------------------------
// Finalizar pedido
// -------------------------
document.getElementById("finalizar").addEventListener("click", async () => {

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    alert("O carrinho está vazio.");
    return;
  }

  const divDados = document.getElementById("dados-usuario");
  const usuarioExistenteId = divDados.getAttribute("data-usuario-id");

  const nome = document.getElementById("nome-usuario").value.trim();
  const email = document.getElementById("email-usuario").value.trim();

  let usuario_id = null;

  if (usuarioExistenteId) {
    usuario_id = parseInt(usuarioExistenteId);
  } else {
    if (!nome || !email) {
      alert("Preencha um nome válido.");
      return;
    }

    const novoUsuario = await apiPost("/usuarios", {
      nome,
      email,
      senha: "123"  // senha padrão só para preencher a coluna
    });

    if (!novoUsuario || !novoUsuario.id) {
      alert("Erro ao criar usuário.");
      return;
    }

    usuario_id = novoUsuario.id;
  }

  // Criar pedido para cada item do carrinho
  for (const item of carrinho) {
    const totalItem = item.preco * item.quantidade;

    await apiPost("/pedidos", {
      usuario_id,
      produto: item.id,
      quantidade: item.quantidade,
      total: totalItem
    });
  }

  alert("Pedido enviado com sucesso!");
  localStorage.removeItem("carrinho");
  window.location.href = "index.html";
});


// -------------------------
// Funções globais do carrinho
// -------------------------
window.alterarQtd = function(id, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const item = carrinho.find(i => i.id === id);
  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(i => i.id !== id);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
};

window.removerItem = function(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho = carrinho.filter(i => i.id !== id);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
};
