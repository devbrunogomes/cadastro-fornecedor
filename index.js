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
const iptProduto = document.querySelector("#produto");
const iptUndMedida = document.querySelector("#undMedida");
const iptQntdEstoque = document.querySelector("#qntdEstoque");
const iptValorUnitario = document.querySelector("#valorUnitario");
const iptValorTotal = document.querySelector("#valorTotal");
const cardProduto = document.querySelector("#cardProduto");
const produtosArray = []
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
function calcularValorTotal() {
  const qntdEstoque = parseInt(iptQntdEstoque.value) || 0;
  const valorUnitario = parseFloat(iptValorUnitario.value) || 0;
  let valorTotal = qntdEstoque * valorUnitario || 0;

  iptValorTotal.disabled = false;
  iptValorTotal.value = `R$${valorTotal.toFixed(2)}`;
  iptValorTotal.disabled = true;
}

iptQntdEstoque.addEventListener("input", calcularValorTotal);
iptValorUnitario.addEventListener("input", calcularValorTotal);

//Adicionando novo Produto


//==== FORMULÁRIO =====
//Submit do formulário
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  validarDadosFornecedor();
});
