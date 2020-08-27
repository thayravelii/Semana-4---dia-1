document.getElementById('btnSalvar').addEventListener('click',() => {
  if (document.querySelectorAll(':invalid').length > 0) {
         alert ("Os campos obrigatórios não foram preenchidos.")
   } else {
     document.querySelectorAll(':valid')
     alert ("Salvo com sucesso")
   }
 })



let reqEstado = new XMLHttpRequest ();

reqEstado.open("GET", "https://servicodados.ibge.gov.br/api/v1/localidades/estados",true);

reqEstado.onreadystatechange = function () {
  
  if  (reqEstado.readyState == 4 && reqEstado.status == 200) {
    var estado = JSON.parse(reqEstado.responseText)
    
    var seletor = document.getElementById ("estado")
    
    for ( let i=0;i < estado.length; i++) {
      seletor.innerHTML += "<option value=" + estado[i].sigla + ">" + estado[i].nome + "</option>"
    }
  }
}
reqEstado.send()



const mudanca = document.getElementById("estado")
mudanca.addEventListener("change",function(){
  
let reqCidade = new XMLHttpRequest ();
var seletorEstado = document.getElementById("estado")
var selectEstado = seletorEstado.value
var selectCidade = document.getElementById ("cidade")

reqCidade.open("GET",`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectEstado}/municipios`, true);

reqCidade.onreadystatechange = function () {
  
  if (reqCidade.readyState == 4 && reqCidade.status == 200) {
    var cidade = JSON.parse(reqCidade.responseText)
    selectCidade.innerHTML = ""
    
    for (let i=0;i <cidade.length; i++) {
      selectCidade.innerHTML += `<option value=" ${cidade[i].id} "> ${cidade[i].nome}</option>`
    }
  }
}

reqCidade.send()
})

function buscaDadosCep(CEP) {
  let url = `https://viacep.com.br/ws/${CEP}/json/`
  let reqCep = new XMLHttpRequest

  reqCep.open("GET", url)

  reqCep.onreadystatechange = function () {

    if(reqCep.readyState == 4 && reqCep.status == 200) {
      var dadosJSONTXT = reqCep.responseText
      var dadosJSONOBJ = JSON.parse(dadosJSONTXT)

      document.getElementById("rua").value= dadosJSONOBJ.logradouro
      document.getElementById("bairro").value= dadosJSONOBJ.bairro

    }
  }
  reqCep.send()
}

const fields = {
  "nome": nome.value,
  "CPF": cpf.value,
  "RG": rg.value,
  "data_nasc": data.value,
  "tipo_cnh": cnh.value,
  "estado_civil": civil.value,
  "CEP": cep.value,
  "rua": rua.value,
  "bairro": bairro.value,
  "cidade": cidade.value,
  "estado": estado.value,
  "numero": numero.value,
  "complemento": complemento.value
}

let fieldsJSON = JSON.stringify(fields)

const xhr = new XMLHttpRequest ()
xhr.open("POST","https://beginner-api.herokuapp.com/save")
xhr.setRequestHeader("Content-Type", "application/json")

xhr.onreadystatechange = function () {
  if(this.readyState == 4 && this.status == 200) {
    var POST = JSON.parse(xhr.responseText)

  }

xhr.send(fieldsJSON)
}

