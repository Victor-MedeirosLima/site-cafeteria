import { apiPost } from "./api.js";

document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();


  const resposta = await apiPost("/usuarios/login", { email, senha });

  if (resposta.error) {
    document.getElementById("msg").textContent = resposta.error;
    return;
  }


  localStorage.setItem("usuarioLogado", JSON.stringify(resposta.usuario));


  window.location.href = "adm.html";
});
