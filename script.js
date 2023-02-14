const hamburger = document.querySelector(".cabecalho__hamburger");
const navMenu = document.querySelector(".nav__menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const iconeCarrinho = document.querySelector(".cabecalho__carrinho");
const cestinhaProdutos = document.querySelector(".cartao__carrinho");
const botaoFecharCarrinho = document.querySelector(".botao__fechar-carrinho");

iconeCarrinho.addEventListener("click", abreCarrinho);
botaoFecharCarrinho.addEventListener("click", abreCarrinho);

function abreCarrinho() {
  cestinhaProdutos.classList.toggle("active");
}

let comprar = [...document.getElementsByClassName("produto__comprar")];

function addItemCarrinho(event) {
  event.preventDefault();

  let produto = document.createElement("li");
  produto.className = "cartao__carrinho-items";
  produto.innerHTML = gerarProduto();

  let carrinho = document.querySelector(".cartao__carrinho-lista");

  carrinho.appendChild(produto);

  const valorAtualizado = geraPrecoAtualizado("add");
  atualizaValores("#subtotal", valorAtualizado);
  atualizaValores("#total", valorAtualizado);
}

function gerarProduto() {
  return `
    <img
      class="carrinho__imagem-produto"
      src="./assets/img/produto-02.png"
      alt="product picture"
    />
    <div>
      <h2 class="carrinho__levels carrinho__texto-destaque">
        Cordyline fruticosa
        <button onclick="excluiItemCarrinho()" class="botao__carrinho--excluir">
          <img src="./assets/img/icones/x.svg" alt="" />
        </button>
      </h2>
      <p class="carrinho__levels">
        € 20,00
        <select name="quantity" class="carrinho__quantity">
          <option value="1qnt">1 qnt</option>
        </select>
      </p>
    </div>
`;
}

function atualizaValores(selector, valor) {
  document.querySelector(selector).textContent = valor;
}

let valor = 0;

function geraPrecoAtualizado(action) {
  let valorAtual = 0;

  if (action === "add") {
    valorAtual = valor + 20;
    valor = valorAtual;
  } else if (action === "remove") {
    valor -= 20;
  } else {
    console.log("Action not implemented: ", action);
  }

  return `€ ${valor},00`;
}

comprar.forEach((item) => item.addEventListener("click", addItemCarrinho));

comprar.forEach((item) =>
  item.addEventListener("click", () => {
    cestinhaProdutos.classList.toggle("active", true);
  })
);

function excluiItemCarrinho() {
  let carrinho = document.querySelector(".cartao__carrinho-lista");

  let produto = [...document.getElementsByClassName("cartao__carrinho-items")];

  if (carrinho.children.length) {
    carrinho.removeChild(produto[0]);
  }
  const valorAtualizado = geraPrecoAtualizado("remove");
  atualizaValores("#subtotal", valorAtualizado);
  atualizaValores("#total", valorAtualizado);
}
