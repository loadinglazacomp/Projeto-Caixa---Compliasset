let var_subtotal = 0
let var_desconto = 0
let var_total = 0
let var_pago = 0
let var_troco = 0


let produtos_cadastrados = [
  { nome: 'Maçã', valor: 80, imagem: "maca.png", quantidade: 1 },
  { nome: 'Banana', valor: 70, imagem: "banana.webp", quantidade: 1 },
  { nome: 'Goiaba', valor: 100, imagem: "goiaba.webp", quantidade: 1 }
]
let produtos_comprados = []



$(document).ready(function () {
  modalprods()
  resetatudo()


})
function reset() {
  produtos_comprados = []
  var_pago = 0
  preenchetabela()
  $("#formvarsubtotal")[0].innerHTML = 0
  $("#formvartotal")[0].innerHTML = 0
  $("#formvartroco")[0].innerHTML = 0
  $("#formvarpago")[0].innerHTML = 0
  $("#formvardesconto")[0].innerHTML = 0



}






function botaoeditarpago() {
  var_pago = prompt("Insira o novo valor pago")
  $("#formvarpago").text(var_pago)

  calcula()

}

function calcula() {

  var_subtotal = 0
  var_total = 0
  var_troco = 0


  for (i = 0; i < produtos_comprados.length; i++) {
    var_subtotal += produtos_comprados[i].valor * produtos_comprados[i].quantidade
  }

  var_total = var_subtotal - var_desconto
  var_troco = var_pago - var_total

  $("#formvarsubtotal")[0].innerHTML = var_subtotal
  $("#formvartotal")[0].innerHTML = var_total
  $("#formvartroco")[0].innerHTML = var_troco


}


let botaoeditardesc = () => {
  let novovalordesc = prompt("Insira o novo valor de desconto")
  var_desconto = novovalordesc

  $("#formvardesconto").text(novovalordesc)

  calcula()
}
let preenchetabela = () => {
  $('#corpotable')[0].innerHTML = ''

  for (i = 0; i < produtos_comprados.length; i++) {
    $('#corpotable')[0].innerHTML += `
    <tr id="linhatabela">
      <td scope="row">
        <img src="${produtos_comprados[i].imagem}" width="40px">
      </td>
      <td>
        <input type="number" value="${produtos_comprados[i].quantidade}" placeholder='Quantos?' min=1 max=50 class="campoquant" onchange="mudavalor(${i})" id="quant${i}">
      </td>
      <td>${produtos_comprados[i].nome}</td>
      <td> R$ ${produtos_comprados[i].valor}</td>
      <td> <button type=button class="btn btn-danger" onclick="removeitem(${i})">X</button>
    </tr>
  `

  }

  calcula()
}

function mudavalor(i) {
  let total = 0


  produtos_comprados[i].quantidade = parseInt($(`#quant${i}`).val())

  calcula()
}



let adicionaprod = (i) => {



  let produto = {
    nome: produtos_cadastrados[i].nome,
    valor: produtos_cadastrados[i].valor,
    imagem: produtos_cadastrados[i].imagem,
    quantidade: 1
  }
  produtos_comprados.push(produto)

  preenchetabela()
  calcula()
  console.log(produtos_comprados)
}






function modalprods() {

  console.log('oi')
  for (i = 0; i < produtos_cadastrados.length; i++) {
    $('#apareceprods')[0].innerHTML += `
        
            <div class="card  col" >
            <div class="card-tamanho-imagem">
            <img  src="${produtos_cadastrados[i].imagem}" class="card-img-top " alt="...">
          </div>
            <div class="card-body">
              <div style="height: 50px;">
                <div class="row">
                
                <h5 class="card-title">${produtos_cadastrados[i].nome}</h5>
              </div>
              </div>
              <p class="card-text">R$${produtos_cadastrados[i].valor}</p>
            </div>
            <button onclick="adicionaprod(${i})" class="btn btn-primary" >+</a>
          </div>
              
       `
  }


  return

}

let removeitem = (i) => {


  if (window.confirm('Você clicou para excluir o item. Deseja confirmar a exclusão?') == true) {
    console.log('Marcos espetinhos', i)
    produtos_comprados.splice(i, 1)
    preenchetabela()

  }

}

function faz_historico() {

  if (var_troco >= 0) {
    for (i = 0; i < produtos_comprados.length; i++) {


      $('#id_hist')[0].innerHTML += `

    <ul class="list-group">
  <li class="list-group-item">Produto: ----- <img src=${produtos_comprados[i].imagem} width="40px"> 
  ${produtos_comprados[i].nome}, Valor: ----- ${produtos_comprados[i].valor},  </li>
</ul>
    
   
    `


      $('#id_total_hist')[0].innerHTML = `
    TOTAL: ----- 
${var_total}, TOTAL PAGO: ----- ${var_pago}, TROCO:  ----- ${var_troco}
`


    }


    reset()

  } else {
    alert('Valor do pagamento insuficiente para compra')
  }

}




function resetatudo() {
  reset()
}

