function initNavbar(){
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  // Pega o container da direita
  const navRight = document.getElementById("nav-right");
  if (!navRight) return;

  if (usuario) {
    // Remove link de login
    const linkLogin = navRight.querySelector('a[href="login.html"]');
    if (linkLogin) linkLogin.remove();

    // Remove botão carrinho
    const linkCarrinho = navRight.querySelector('a[href="carrinho.html"]');
    if (linkCarrinho) linkCarrinho.remove();

    // Cria botão logout
    const btnLogout = document.createElement("button");
    btnLogout.textContent = "Logout";
    btnLogout.id = "btn-logout";
    btnLogout.style.cursor = "pointer";

    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.href = "index.html";
    });

    navRight.appendChild(btnLogout);
  }
}
initNavbar();