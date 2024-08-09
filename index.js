const formulario = document.getElementById("formulario");

//Variaveis dos elementos do fornecedor
const iptRazaoSocial = document.querySelector("#razaoSocial");
const iptCnpj = document.querySelector("#cnpj");
const iptNomeFantasia = document.querySelector("#nomeFantasia");
const iptInscricaoEstadual = document.querySelector("#inscricaoEstadual");
const iptCep = document.querySelector("#cep");
const iptInscricaoMunicipal = document.querySelector("#inscricaoMunicipal");
const iptEndereco = document.querySelector("#endereco");
const iptNumero = document.querySelector("#numero");
const iptComplemento = document.querySelector("#complemento");
const iptBairro = document.querySelector("#bairro");
const iptMunicipio = document.querySelector("#municipio");
const iptEstado = document.querySelector("#estado");
const iptContatoNome = document.querySelector("#contatoNome");
const iptTelefone = document.querySelector("#telefone");
const iptEmail = document.querySelector("#email");

//Variaveis dos elementos do produto
const sctProdutos = document.querySelector(".sct-produtos");
const btnAddProduto = document.querySelector("#btnAddProduto");
const produtosArray = [];
//==== FORNECEDOR =====

//Fetch data para o CEP
iptCep.addEventListener("input", () => {
  const cep = iptCep.value.replace(/\D/g, "");

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP Inválido");
        } else {
          iptEndereco.value = data.logradouro;
          iptEndereco.disabled = true;

          iptBairro.value = data.bairro;
          iptBairro.disabled = true;

          iptMunicipio.value = data.localidade;
          iptMunicipio.disabled = true; //

          iptEstado.value = data.uf;
          iptEstado.disabled = true; //
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (cep.length < 8) {
    iptEndereco.value = "";
    iptEndereco.disabled = false;

    iptBairro.value = "";
    iptBairro.disabled = false;

    iptMunicipio.value = "";
    iptMunicipio.disabled = false;

    iptEstado.value = "";
    iptEstado.disabled = false;
  }
});

//Validando dados do Fornecedor
function validarDadosFornecedor() {
  const fields = [
    { field: iptRazaoSocial, minLength: 10 },
    { field: iptCnpj, minLength: 10 },
    { field: iptNomeFantasia, minLength: 5 },
    { field: iptInscricaoEstadual, minLength: 11 },
    { field: iptCep, minLength: 8 },
    { field: iptInscricaoMunicipal, minLength: 11 },
    { field: iptEndereco, minLength: 5 },
    { field: iptNumero, minValue: 1 },
    { field: iptComplemento, minLength: 5 },
    { field: iptBairro, minLength: 3 },
    { field: iptMunicipio, minLength: 3 },
    { field: iptEstado, minLength: 2 },
    { field: iptContatoNome, minLength: 5 },
    { field: iptTelefone, minLength: 10 },
    { field: iptEmail, minLength: 10, contains: "." },
  ];

  for (const field of fields) {
    if (
      (field.minLength && field.field.value.length < field.minLength) ||
      (field.minValue && field.field.value <= field.minValue) ||
      (field.contains && !field.field.value.includes(field.contains))
    ) {
      alert("Dado Inválido");
      field.field.focus();
      return;
    }
  }
}

//==== PRODUTOS =====
//Calculo de valor total do produto
function calcularValorTotal(card) {
  const iptValorTotal = card.querySelector("#valorTotal");

  const qntdEstoque = parseInt(card.querySelector("#qntdEstoque").value) || 0;
  const valorUnitario =
    parseFloat(card.querySelector("#valorUnitario").value) || 0;
  let valorTotal = qntdEstoque * valorUnitario || 0;

  iptValorTotal.disabled = false;
  iptValorTotal.value = `R$${valorTotal.toFixed(2)}`;
  iptValorTotal.disabled = true;
}
//Adicionando novo Produto
btnAddProduto.addEventListener("click", (event) => {
  event.preventDefault();

  //Criando novo elemento node html para ser renderizado
  const cardProduto = document.createElement("div");
  cardProduto.className = "wrp-product";
  cardProduto.innerHTML = `<button class="btnRemoverProduto">
              <img src="/assets/trash-xmark-svgrepo-com.png" alt="lixeira" />
            </button>

            <div class="wrp-product-img-title">
              <div class="wrp-product-data-img">
                <img src="/assets/package-alt-svgrepo-com.png" alt="pacote" />

                <div class="wrp-product-data">
                  <div class="form-group full-width">
                    <div class="field">
                      <label for="produto">Produto</label>
                      <input type="text" name="produto" id="produto" />
                    </div>
                  </div>

                  <div class="form-group quatro">
                    <div class="field">
                      <label for="undMedida">UND. Medida</label>
                      <select name="" id="undMedida">
                        <option value="kg">Kg</option>
                        <option value="metros">Metro</option>
                        <option value="litros">Litros</option>
                        <option value="und">Unidade</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="qntdEstoque">QNTDE. em Estoque</label>
                      <input
                        type="number"
                        name="qntdEstoque"
                        id="qntdEstoque"
                      />
                    </div>
                    <div class="field">
                      <label for="valorUnitario">Valor Unitário</label>
                      <input
                        type="number"
                        name="valorUnitario"
                        id="valorUnitario"
                      />
                    </div>
                    <div class="field">
                      <label for="valorTotal">Valor Total</label>
                      <input
                        type="valorTotal"
                        name="valorTotal"
                        id="valorTotal"
                        disabled
                      />                      
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
  sctProdutos.appendChild(cardProduto);

  //Variaveis desse novo elemento
  const iptQntdEstoque = cardProduto.querySelector("#qntdEstoque");
  const iptValorUnitario = cardProduto.querySelector("#valorUnitario");
  const btnRemoverProduto = cardProduto.querySelector(".btnRemoverProduto");

  //Adicionando os listeners dos novos inputs
  iptQntdEstoque.addEventListener("input", () => {
    calcularValorTotal(cardProduto);
  });
  iptValorUnitario.addEventListener("input", () => {
    calcularValorTotal(cardProduto);
  });

  //Listener para o botão remove
  btnRemoverProduto.addEventListener("click", () => {
    removerElemento(cardProduto);
  });
});

//Função para remover um produto
function removerElemento(elementToRemove) {
  elementToRemove.remove();
}

function validarProdutos() {
  const todosOsProdutos = document.querySelectorAll(".wrp-product");

  todosOsProdutos.forEach((produto) => {
    // //Processo de Validação antes de montar o array
    const iptProductName = produto.querySelector("#produto");
    const iptUndMedida = produto.querySelector("#undMedida");
    const iptQntdEstoque = produto.querySelector("#qntdEstoque");
    const iptValorUnitario = produto.querySelector("#valorUnitario");
    const iptValorTotal = produto.querySelector("#valorTotal");

    if (
      iptProductName.value.length > 3 ||
      iptQntdEstoque.value.length != 0 ||
      iptValorUnitario.value.length != 0 ||
      iptValorTotal.value.length != 0
    ) {
      console.log(`Caiu`);
      //se validado, inserir no array de produtos
      const produtoASerAdcionado = {
        id: Date.now(),
        descricaoProduto: iptProductName.value,
        unidadeMedida: iptUndMedida.value,
        qtdeEstoque: iptQntdEstoque.value,
        valorUnitario: iptValorUnitario.value,
        valorTotal: iptValorTotal.value,
      };

      produtosArray.push(produtoASerAdcionado);
    } else {
      alert("Produto(s) não validados");
    }
  });
}

//==== FORMULÁRIO =====
//Submit do formulário
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  validarDadosFornecedor();
  validarProdutos();

  //Para salvar os dados do fornecedor
  const jsonData = {
    razaoSocial: iptRazaoSocial.value,
    nomeFantasia: iptNomeFantasia.value,
    cnpj: iptCnpj.value,
    inscricaoEstadual: iptInscricaoEstadual.value,
    inscricaoMunicipal: iptInscricaoMunicipal.value,
    nomeContato: iptContatoNome.value,
    telefoneContato: iptTelefone.value,
    emailContato: iptEmail.value,
    produtos: produtosArray,
  };

  console.log(JSON.stringify(jsonData));
});
