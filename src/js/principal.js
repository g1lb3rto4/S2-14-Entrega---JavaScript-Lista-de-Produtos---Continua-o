// LISTAR ITENS
let vitrine = document.querySelector(".containerVitrine");
let itensVitrine = document.querySelector(".listaVitrine");

function listarProdutos(listaProdutos, departamento) {

  departamento.innerHTML = "";

  if (listaProdutos.length >= 1) {
    for (let i in listaProdutos) {
      let produto = listaProdutos[i];

      let cardProduto = criarCardProduto(produto);

      departamento.appendChild(cardProduto);
    }
   }
}
listarProdutos(produtos, vitrine);
 
// CRIANDO CARDS
function criarCardProduto(produto) {
  let lista = document.createElement("li");
  lista.className = "listaProdutos";

  let nomeDoProduto = produto.nome;
  let Nome = document.createElement("h3");
  Nome.innerText = nomeDoProduto;

  let categoriaDoProduto = produto.categoria;
  let Categoria = document.createElement("p");
  Categoria.innerText = categoriaDoProduto;

  let informacoesDoProduto = produto.componentes;
  let informacoes = document.createElement("span");
  informacoes.innerText = `Componentes: ${informacoesDoProduto}`;
  
  let imagem = document.createElement("img");
  let img = produto.img;
  imagem.src = img;
  imagem.alt = nomeDoProduto;

  let Preco = document.createElement("p");
  if(produto.promocao == true){
    let precoDoProduto = produto.precoPromocao;
    Preco.innerText = `Promoção - De R$ ${produto.preco} por ${precoDoProduto}`;
  }else{
    let precoDoProduto = produto.preco;
    Preco.innerText = `R$ ${precoDoProduto}`;
  }

  let botaoComprar = document.createElement("button");
  botaoComprar.innerText = "Adicionar carrinho";
  botaoComprar.className = "adicionar"

  let id = produto.id;

  if (id != undefined) {
    botaoComprar.id = id;
  }

  lista.append(imagem,Nome,Categoria,informacoes,Preco,botaoComprar);
  
  return lista;
}

// MENU CABECALHO
let botaoTodosProdutos = document.querySelector("#todosProdutos");
let botaoHortifruti = document.querySelector("#hortifruti");
let botaoPanificadora = document.querySelector("#panificadora");
let botaoLaticinio = document.querySelector("#laticinio");

botaoTodosProdutos.addEventListener("click", () => {
  listarProdutos(produtos, vitrine);
});
botaoHortifruti.addEventListener("click", () => {
  listarProdutos(listarHortifruti(produtos), vitrine);
});
botaoPanificadora.addEventListener("click", () => {
  listarProdutos(listarPanificadora(produtos), vitrine);
});
botaoLaticinio.addEventListener("click", () => {
  listarProdutos(listarLaticinio(produtos), vitrine);
});

function adicionar(produto) {
  if (produto !== undefined) {
    carrinhoCompras.push(produto);

    listarProdutos(carrinhoCompras, itensVitrine);
  }
}

function listarHortifruti(itens) {
  let arrayHortifruti = [];
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].secao == "Hortifruti") {
      arrayHortifruti.push(itens[i]);
    }
  }
  return arrayHortifruti;
}
listarHortifruti(produtos);

function listarPanificadora(itens) {
  let arrayPanificadora = [];
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].secao == "Panificadora") {
      arrayPanificadora.push(itens[i]);
    }
  }
  return arrayPanificadora;
}
listarPanificadora(produtos);

function listarLaticinio(itens) {
  let arrayLaticinio = [];
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].secao == "Laticínio") {
      arrayLaticinio.push(itens[i]);
    }
  }
  return arrayLaticinio;
}
listarLaticinio(produtos);

// ADICIONAR PRODUTO
let listaCarrinho = document.querySelector(".lista__carrinho")
vitrine.addEventListener("click", interceptandoProduto);

let carrinhoCompras = [];

function interceptandoProduto(event) {
  let compra = event.target;

  if (compra.tagName == "BUTTON") {
    let idProduto = compra.id;
    
    let produto = produtos.find(function (produto) {
      return produto.id == idProduto  
    })
    adicionar(produto);
  }
}

function adicionar(produto) {
    
      carrinhoCompras.push(produto);

    listarProdutos(carrinhoCompras, listaCarrinho);
    soma(carrinhoCompras);
  }

// SOMA
const array = document.querySelector("listaCarrinho li .preco");
const valor = document.querySelector("#total");

function soma(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    if(array[i].promocao == true){
      total += array[i].precoPromocao;
    }else{
      total += array[i].preco
    }  
    }
    valor.innerText = parseFloat(total).toFixed(2);
}

// PESQUISA
let inputBusca = document.querySelector(".campoBuscaPorNome");
let botaoBusca = document.querySelector(
  ".estiloGeralBotoes estiloGeralBotoes--botaoBuscaPorNome"
);

inputBusca.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    let Nomes = inputBusca.value;

    let resultadoBusca = busca(Nomes);

    listarProdutos(resultadoBusca, vitrine);
  }
});

function busca(Pesquisa) {
  let buscarItens = [];
  for (let i in produtos) {
    let pesquisa = Pesquisa.toLowerCase();
    let nomeDosItens = produtos[i].nome.toLowerCase();
    let categoriaDosItens = produtos[i].categoria.toLowerCase();

    if (
      nomeDosItens.includes(pesquisa) ||
      categoriaDosItens.includes(pesquisa)
    ) {
      buscarItens.push(produtos[i]);
    }
  }
  return buscarItens;
}







