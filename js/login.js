import { apiPost } from "./api.js";

document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // ROTA CORRETA
  const resposta = await apiPost("/usuarios/login", { email, senha });

  if (resposta.error) {
    document.getElementById("msg").textContent = resposta.error;
    return;
  }

  // Salvar o usuário logado
  localStorage.setItem("usuarioLogado", JSON.stringify(resposta.usuario));

  // Redirecionar para adm
  window.location.href = "adm.html";
});
