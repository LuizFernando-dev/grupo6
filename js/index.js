var ObjetoDado = function(dado, quant){
		this.dado = dado;
		this.quantidade = quant;
	}


function calcular() {
	var variavel = document.getElementById("variavel");
	var tipo = document.getElementById("tipo");

	var dadosArray = [];
	var dados = document.querySelector("#dados");
	var valores = dados.value;

	dadosArray = valores.split(",");

	var arrayObjetos = [];
	arrayObjetos = criaObjetos(dadosArray);
	
	var objetos = [];
	objetos = quantidade(arrayObjetos);

	criaTabela(variavel, objetos);

	mudaOrdem(tipo, objetos);

	for(var i = 0; i <= objetos.length; i++){
		console.log(objetos[i]);
	}
	
}

function criaObjetos(dados){
	var objetos = [];
	for(var i = 0; i <= dados.length; i++){
		objetos.push(new ObjetoDado(dados[i], 1));
	}

	return objetos;

}

function quantidade(objts){
	var excluir = 0;
	var cont = 0;
	for(var i = 0; i < objts.length; i++){
		cont++;
		for(var j = cont; j < objts.length; j++){
			if(objts[i].dado == objts[j].dado){
				objts[i].quantidade = objts[i].quantidade + 1;
				if(objts[i].quantidade <= 2){
					excluir++;
				}
			}
		}
	}

	for(var i = 0; i <= excluir; i++){
		objts.pop();
	}

	return objts;
}

function criaTabela(variavel, array){
	var nomeVariavel = document.getElementById("nomeVariavel");
	nomeVariavel.innerHTML = variavel.value;
	var tabela = document.getElementById("tabela");
	tabela.setAttribute("style", "display: ;");

	for(var i = 0; i < array.length; i++){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var tdd = document.createElement("td");

		td.innerHTML = array[i].dado;
		tdd.innerHTML = array[i].quantidade;

		tr.appendChild(td);
		tr.appendChild(tdd);

		tabela.appendChild(tr);
	}
}

function mudaOrdem(ordem,array){
	
}

