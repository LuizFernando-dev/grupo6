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

	if(tipo.value == "ordinal"){
		tabelaOrdinal(arrayObjetos)
	}else{
		var objetos = [];
		objetos = quantidade(arrayObjetos);

		objetos = mudaOrdem(tipo, objetos);

		criaTabela(variavel, objetos);

		for(var i = 0; i <= objetos.length; i++){
			console.log(objetos[i]);
		}
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
	let excluir = 0;
	var cont = 0;
	var objts2 = [];
	for(var i = 0; i < objts.length; i++){
		cont++;
		let boolean = true;
		for(var j = cont; j < objts.length; j++){
			if(objts[i].dado == objts[j].dado ){
				objts[i].quantidade = objts[i].quantidade + 1;
			}
		}

		if(objts2.length != 0){
			for(var n = 0; n < objts2.length; n++){
				if(objts2[n].dado == objts[i].dado){
					boolean = false;
				}
			}	

		}

		if(boolean){
			objts2.push(objts[i])
		}
	}

	objts2.pop()

	objts = objts2
	
	return objts2;
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

	if(ordem.value == "numero"){
		array.sort((a, b) => a.dado - b.dado)
	}

	return array;
	
}


function tabelaOrdinal(array){
	let maior = 0
	let menor = 99999
	array.pop()
	for(var i = 0; i < array.length; i++){
		if(array[i].dado > maior){
			maior = array[i].dado
		}

		if(array[i].dado <= menor){
			menor = array[i].dado
		}
	}

	let amplitude = maior - menor
	amplitude += 1

	let linha1 = Math.sqrt(array.length)
	let linha2 = linha1 - 1
	let linha3 = linha1 + 1

	let intervalo = 0
	boolean = true
	
	

	console.log(intervalo)


}