// Header, nav e footer em um só arquivo (Custom Elements)

const LINKS = [
  ["index.html", "Consultar"],
  ["adicionar.html", "Adicionar"],
  ["editar.html", "Editar"],
  ["remover.html", "Remover"],
];

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="cabecalho">
        <img src="img/logo.svg" alt="">
        <div><strong>Partiscore</strong><span>Sua biblioteca de partituras</span></div>
      </div>`;
  }
}

class AppNav extends HTMLElement {
  connectedCallback() {
    const atual = location.pathname.split("/").pop() || "index.html";
    const itens = LINKS.map(([href, texto]) =>
      `<li><a href="${href}" ${href === atual ? 'aria-current="page"' : ""}>${texto}</a></li>`
    ).join("");
    this.innerHTML = `<nav aria-label="Principal"><ul>${itens}</ul></nav>`;
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="rodape">
        <span>Partiscore &copy; 2026</span>
        <span>Felipe Satoru Meucci - 2025311470</span>
      </div>`;
  }
}

customElements.define("app-header", AppHeader);
customElements.define("app-nav", AppNav);
customElements.define("app-footer", AppFooter);
