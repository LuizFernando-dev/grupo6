var objetosOrdinal = []
var indiceTabelaGlobal = 0

var ObjetoDado = function(dado, quant, indice){
		this.dado = dado
		this.quantidade = quant
		this.indice = indice
		this.frequenciaPorcentagem = 0
		this.freqAcumulada = 0
		this.acumuladaP = 0
	}

function calcular() {
	const variavel = document.getElementById("variavel")
	let tipo = document.getElementById("tipo")

	const dados = document.querySelector("#dados")
	const valores = dados.value

	const dadosArray = valores.split(",")

	let arrayObjetos = criaObjetos(dadosArray)

	if(tipo.value == "continua"){
		tabelaContinua(arrayObjetos)
	}else{
		let objetos = quantidade(arrayObjetos)
		objetos = Frequencias(objetos)
		if(tipo.value == "ordinal"){
			objetos = arrumaIndice(objetos)
			objetosOrdinal = objetos
			tabelaOrdinal()
			google.charts.setOnLoadCallback(desenharGrafico(objetos))
		}else{
			objetos = mudaOrdem(tipo, objetos)
			arrayGrafico = objetos
			criaTabela(objetos)
			google.charts.setOnLoadCallback(desenharGrafico(objetos))
		}

		objetosOrdinal = objetos
	}
	
}

function criaObjetos(dados){
	let objetos = []
	for(let i = 0; i <= dados.length; i++){
		objetos.push(new ObjetoDado(dados[i], 1, i))
	}

	return objetos

}

function quantidade(objts){
	let cont = 0
	let objts2 = []

	for(let i = 0; i < objts.length; i++){
		cont++
		let boolean = true
		for(let j = cont; j < objts.length; j++){
			if(objts[i].dado == objts[j].dado ){
				objts[i].quantidade = objts[i].quantidade + 1
			}
		}

		if(objts2.length != 0){
			for(let n = 0; n < objts2.length; n++){
				if(objts2[n].dado == objts[i].dado){
					boolean = false
				}
			}	

		}

		if(boolean){
			objts2.push(objts[i])
		}
	}

	objts2.pop()

	objts = objts2
	
	return objts2
}

function criaTabela(array){
	//testando gráficos
	
	//testando gráficos
	let tabela = criaTabelaOriginal()
	let nomeVariavel = mudaNomeVariavel()
	tabela.setAttribute("style", "display: ;")

	for(let i = 0; i < array.length; i++){
		let tr = document.createElement("tr")
		let td = document.createElement("td")
		let tdd = document.createElement("td")
		let tdFP = document.createElement("td")
		let freqAcumulada = document.createElement("td")
		let acumuladaP = document.createElement("td")

		td.innerHTML = array[i].dado
		tdd.innerHTML = array[i].quantidade
		tdFP.innerHTML = array[i].frequenciaPorcentagem.toFixed(1)
		freqAcumulada.innerHTML = array[i].freqAcumulada
		acumuladaP.innerHTML = array[i].acumuladaP.toFixed(1)
		
	
		tr.appendChild(td)
		tr.appendChild(tdd)
		tr.appendChild(tdFP)
		tr.appendChild(freqAcumulada)
		tr.appendChild(acumuladaP)

		tabela.appendChild(tr)
	}
}

function mudaOrdem(ordem,array){

	if(ordem.value == "numero"){
		array.sort((a, b) => a.dado - b.dado)
	}

	return array
	
}


function tabelaContinua(array){
	let maior = 0
	let menor = 99999
	let frequenciaAcumulada = 0
	array.pop()
	for(let i = 0; i < array.length; i++){
		if(array[i].dado > maior){
			maior = array[i].dado
		}

		if(array[i].dado <= menor){
			menor = array[i].dado
		}
	}

	let amplitude = maior - menor
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
	
	let tabela = criaTabelaOriginal()
	let nomeVariavel = mudaNomeVariavel()
	tabela.setAttribute("style", "display: ;")

	let intervalo2 = intervalo
	let valor1 = menor
	for(let i = 1; i <= linha; i++){
		let tr = document.createElement("tr")
		let td = document.createElement("td")
		let tdd = document.createElement("td")
		let tdFP = document.createElement("td")
		let freqAcumulada = document.createElement("td")
		let acumuladaP = document.createElement("td")

		let valor2 = Number(intervalo) + Number(menor)
		intervalo += intervalo2

		let frequencia = 0
		for(let j = 0; j < array.length; j++){
			if(array[j].dado >= valor1 && array[j].dado < valor2){
				frequencia++
			}
		}

		let total = 0
		for(let i = 0; i < array.length; i++){
			total += array[i].quantidade
		}

		frequenciaAcumulada += frequencia

		td.innerHTML = valor1 + "|--" + valor2
		tdd.innerHTML = frequencia
		valor1 = valor2
		tdFP.innerHTML = ((frequencia * 100)/total).toFixed(1)
		freqAcumulada.innerHTML = frequenciaAcumulada
		acumuladaP.innerHTML = (frequenciaAcumulada*100)/total

		tr.appendChild(td)
		tr.appendChild(tdd)
		tr.appendChild(tdFP)
		tr.appendChild(freqAcumulada)
		tr.appendChild(acumuladaP)

		tabela.appendChild(tr)
	}

}

function tabelaOrdinal(){
	let tabela = criaTabelaOriginal()
	tabela.setAttribute("style", "display: ;")
	let nomeVariavel = mudaNomeVariavel();
	let tdPosicao = document.createElement("td")
	tdPosicao.innerHTML = "Posição"
	let tabelaCorpo = document.getElementById("tabelaCorpo"+indiceTabelaGlobal)
	tabelaCorpo.appendChild(tdPosicao)

	for(let i = 0; i < objetosOrdinal.length; i++){
		let tr = document.createElement("tr")
		let td = document.createElement("td")
		let tdd = document.createElement("td")
		let tdFP = document.createElement("td")
		let freqAcumulada = document.createElement("td")
		let acumuladaP = document.createElement("td")

		let input = document.createElement("input")
		input.setAttribute("type", "number")
		input.setAttribute("style", "width : 30px")
		input.setAttribute("id", "pos"+indiceTabelaGlobal + i)

		td.innerHTML = objetosOrdinal[i].dado
		tdd.innerHTML = objetosOrdinal[i].quantidade
		input.value = objetosOrdinal[i].indice + 1
		tdFP.innerHTML = objetosOrdinal[i].frequenciaPorcentagem.toFixed(1)
		freqAcumulada.innerHTML = objetosOrdinal[i].freqAcumulada
		acumuladaP.innerHTML = objetosOrdinal[i].acumuladaP
		
		tr.appendChild(td)
		tr.appendChild(tdd)
		tr.appendChild(tdFP)
		tr.appendChild(freqAcumulada)
		tr.appendChild(acumuladaP)
		tr.appendChild(input)

		tabela.appendChild(tr)
	}

	let button = document.createElement("button")
	button.setAttribute("Onclick", "ordenando()")
	button.innerHTML = "Ordenar"
	tabela.appendChild(button)
}

function ordenando(){
	for(let i = 0; i < objetosOrdinal.length; i++){
		let valor = document.getElementById("pos"+indiceTabelaGlobal+ i)
		objetosOrdinal[i].indice = valor.value
	}

	objetosOrdinal.sort((a, b) => a.indice - b.indice)

	for(let i = 0; i < objetosOrdinal.length; i++){
		objetosOrdinal[i].indice = i 
	} 

	Frequencias(objetosOrdinal)
	tabelaOrdinal()
	google.charts.setOnLoadCallback(desenharGrafico(objetosOrdinal))

} 


function mudaNomeVariavel(){
	let nomeVariavel = document.getElementById("nomeVariavel"+indiceTabelaGlobal)
	nomeVariavel.innerHTML = variavel.value
	return nomeVariavel
}

function criaTabelaOriginal(){
	let indice = document.getElementById("indice")
	let indiceTabela = indice.value
	if(indice.value > 0){
		for(let i = 0; i < indice.value; i++){
			document.getElementById("tabela"+i).setAttribute("style","display:none")
		}
	}

	indice.value = Number(indice.value) + 1
	indiceTabelaGlobal = indiceTabela
	let table = document.createElement("table")
	table.setAttribute("style","display:none")
	table.setAttribute("id","tabela"+indiceTabela)
	let tr = document.createElement("tr")
	let td = document.createElement("td")
	td.setAttribute("id", "nomeVariavel"+indiceTabela)
	let tdd = document.createElement("td")
	let tdFP = document.createElement("td")
	let tdAcumulada = document.createElement("td")
	let tdAcumuladaP = document.createElement("td")
	td.innerHTML = variavel;
	tdFP.innerHTML = "Frequência %"
	tdd.innerHTML = "Frequência"
	tdAcumulada.innerHTML = "F. Acumulada"
	tdAcumuladaP.innerHTML = "Acumulada %"
	tr.setAttribute("id", "tabelaCorpo"+indiceTabela)

	tr.appendChild(td)
	tr.appendChild(tdd)
	tr.appendChild(tdFP)
	tr.appendChild(tdAcumulada)
	tr.appendChild(tdAcumuladaP)

	table.appendChild(tr)

	let corpo = document.getElementById("tabelas")
	corpo.appendChild(table)

	return document.getElementById("tabela"+indiceTabela)
}

function arrumaIndice(array){
	for(let i = 0; i < array.length; i++){
		array[i].indice = i
	}

	return array
}


function Frequencias(array){
	let quantidade = 0

	for(let i = 0; i < array.length; i++){
		quantidade += array[i].quantidade
	}

	for(let i = 0; i < array.length; i++){
		array[i].frequenciaPorcentagem = (array[i].quantidade * 100)/quantidade
		if(i > 0){
			array[i].freqAcumulada = array[i-1].freqAcumulada + array[i].quantidade
		}else{
			array[i].freqAcumulada = array[i].quantidade
		}

		array[i].acumuladaP = (array[i].freqAcumulada*100)/quantidade
	}

	return array
}

google.charts.load('current', {'packages':['corechart']});
		
function desenharGrafico(array){
	let tipo = document.getElementById('tipo')
	let arrayGrafico = []
	let visualizarGrafico = document.getElementById('graficos')
	visualizarGrafico.innerHTML = ""
	let grafico = new google.visualization.DataTable();
	grafico.addColumn('string', 'Nome Dado')
	grafico.addColumn('number', 'Valor')

	for(let i = 0; i < array.length; i++){
		arrayGrafico[i] = [array[i].dado,array[i].frequenciaPorcentagem]
	}

	grafico.addRows(arrayGrafico)
	console.log(tipo.value)
	if(tipo.value == "discreta"){
		let pizza = new google.visualization.ColumnChart(document.getElementById('graficos'))
		pizza.draw(grafico)
	}else{
		let pizza = new google.visualization.PieChart(document.getElementById('graficos'))
		pizza.draw(grafico)
	}
	
}
