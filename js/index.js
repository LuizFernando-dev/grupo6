var objetosOrdinal = [];
let indiceTabelaGlobal = 0;

var ObjetoDado = function(dado, quant, indice){
		this.dado = dado;
		this.quantidade = quant;
		this.indice = indice;
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

	if(tipo.value == "continua"){
		tabelaContinua(arrayObjetos)
	}else{
		var objetos = [];
		objetos = quantidade(arrayObjetos);
		if(tipo.value == "ordinal"){
			objetos = arrumaIndice(objetos)
			objetosOrdinal = objetos
			tabelaOrdinal()
		}else{
			objetos = mudaOrdem(tipo, objetos);
			criaTabela(objetos);
		}

		objetosOrdinal = objetos;

	}
	
}

function criaObjetos(dados){
	var objetos = [];
	for(var i = 0; i <= dados.length; i++){
		objetos.push(new ObjetoDado(dados[i], 1, i));
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

function criaTabela(array){
	var tabela = criaTabelaOriginal();
	let nomeVariavel = mudaNomeVariavel();
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


function tabelaContinua(array){
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

	var amplitude = maior - menor
	amplitude += 1

	let linha1 = Math.sqrt(array.length).toFixed(0)
	let linha2 = linha1 - 1
	let linha3 = linha1 + 1
	let linha = 0
	let intervalo = 0

	while(amplitude%linha1 != 0 && amplitude%linha2 != 0 && amplitude%linha3 != 0){
		amplitude++
	}

	if(amplitude%linha1 == 0){
		intervalo = amplitude/linha1
		linha = linha1
	}else if(amplitude%linha2 == 0){
		intervalo = amplitude/linha2
		linha = linha2
	}else{
		intervalo = amplitude/linha3
		linha = linha3
	}
	
	var tabela = criaTabelaOriginal()
	let nomeVariavel = mudaNomeVariavel();
	tabela.setAttribute("style", "display: ;");

	let intervalo2 = intervalo
	let valor1 = menor
	for(var i = 1; i <= linha; i++){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var tdd = document.createElement("td");

		let valor2 = Number(intervalo) + Number(menor)
		intervalo += intervalo2

		let frequencia = 0;
		for(var j = 0; j < array.length; j++){
			if(array[j].dado >= valor1 && array[j].dado < valor2){
				frequencia++;
			}
		}

		td.innerHTML = valor1 + "-" + valor2
		tdd.innerHTML = frequencia;
		valor1 = valor2

		tr.appendChild(td);
		tr.appendChild(tdd);

		tabela.appendChild(tr);
	}

}

function tabelaOrdinal(){
	var tabela = criaTabelaOriginal()
	tabela.setAttribute("style", "display: ;")
	let nomeVariavel = mudaNomeVariavel();
	var tdPosicao = document.createElement("td")
	tdPosicao.innerHTML = "Posição";
	var tabelaCorpo = document.getElementById("tabelaCorpo"+indiceTabelaGlobal)
	tabelaCorpo.appendChild(tdPosicao)

	for(var i = 0; i < objetosOrdinal.length; i++){
		var tr = document.createElement("tr")
		var td = document.createElement("td")
		var tdd = document.createElement("td")

		var input = document.createElement("input")
		input.setAttribute("type", "number")
		input.setAttribute("style", "width : 30px")
		input.setAttribute("id", "pos"+indiceTabelaGlobal + i)

		td.innerHTML = objetosOrdinal[i].dado
		tdd.innerHTML = objetosOrdinal[i].quantidade
		input.value = objetosOrdinal[i].indice + 1
		
		
		tr.appendChild(td)

		tr.appendChild(tdd)
		tr.appendChild(input)

		tabela.appendChild(tr)
	}

	let button = document.createElement("button")
	button.setAttribute("Onclick", "ordenando()")
	button.innerHTML = "Ordenar"
	tabela.appendChild(button)
}

function ordenando(){
	for(var i = 0; i < objetosOrdinal.length; i++){
		var valor = document.getElementById("pos"+indiceTabelaGlobal+ i)
		objetosOrdinal[i].indice = valor.value
	}

	objetosOrdinal.sort((a, b) => a.indice - b.indice)

	for(var i = 0; i < objetosOrdinal.length; i++){
		objetosOrdinal[i].indice = i 
	} 

	tabelaOrdinal()

} 

/*function ordenando(){
	var array = []
	var pos = -1
	var destino = -1
	for(var i = 0; i < objetosOrdinal.length; i++){
		var valor = document.getElementById("pos"+i)
		array.push(valor.value)
		if(array[i] != i){
			pos = i
			destino = array[i]
		}
	}

	if(pos >= 0){
		objetosOrdinal.splice(destino,0,objetosOrdinal[pos])
		delete objetosOrdinal[pos+1]	
	}
	
	for(var i = 0; i < objetosOrdinal.length; i++){
		if(typeof objetosOrdinal[i] === 'undefined'){
			objetosOrdinal.splice(i,1)
		}
	}

	for(var i = 0; i < objetosOrdinal.length; i++){
		console.log(objetosOrdinal[i])
	}

	console.log("-----------------")

	tabelaOrdinal(objetosOrdinal)

} */

function mudaNomeVariavel(){
	var nomeVariavel = document.getElementById("nomeVariavel"+indiceTabelaGlobal);
	nomeVariavel.innerHTML = variavel.value;
	return nomeVariavel;
}

function criaTabelaOriginal(){
	var indice = document.getElementById("indice")
	var indiceTabela = indice.value
	if(indice.value > 0){
		for(var i = 0; i < indice.value; i++){
			document.getElementById("tabela"+i).setAttribute("style","display:none")
		}
	}

	indice.value = Number(indice.value) + 1
	indiceTabelaGlobal = indiceTabela
	var table = document.createElement("table")
	table.setAttribute("style","display:none")
	table.setAttribute("id","tabela"+indiceTabela)
	var tr = document.createElement("tr")
	var td = document.createElement("td")
	td.setAttribute("id", "nomeVariavel"+indiceTabela)
	var tdd = document.createElement("td")
	td.innerHTML = variavel;
	tdd.innerHTML = "Frequência"
	tr.setAttribute("id", "tabelaCorpo"+indiceTabela)

	tr.appendChild(td)
	tr.appendChild(tdd)

	table.appendChild(tr)

	var corpo = document.getElementById("tabelas")
	corpo.appendChild(table)

	return document.getElementById("tabela"+indiceTabela)
}

function arrumaIndice(array){
	for(var i = 0; i < array.length; i++){
		array[i].indice = i
	}

	return array
}

