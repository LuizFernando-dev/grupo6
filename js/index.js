var objetosOrdinal = []
var indiceTabelaGlobal = 0

class ObjetoDado{
	dado
	quantidade
	indice
	frequenciaPorcentagem
	frequenciaAcumulada
	acumuladaP

	criaObjetoDado(dado, quant, indice){
		this.dado = dado
		this.quantidade = quant
		this.indice = indice
		this.frequenciaPorcentagem = 0
		this.frequenciaAcumulada = 0
		this.acumuladaP = 0
	}

	calculaQuantidade(objts){
		let cont = 0
		const objts2 = []

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
		
		return objts2
	}

	calculaFrequenciaPorcente(array, ordinal){
		let quantidade = 0

		for(let i = 0; i < array.length; i++){
			quantidade += array[i].quantidade
		}

		this.frequenciaPorcentagem = (this.quantidade * 100)/quantidade

		for(let i = 0; i < array.length; i++){
			if(array[i].dado == this.dado && i > 0){
				this.frequenciaAcumulada = array[i - 1].frequenciaAcumulada + this.quantidade
				break
			}
		}

		if(this.frequenciaAcumulada <= 0){
			this.frequenciaAcumulada = this.quantidade
		}

		this.acumuladaP = (this.frequenciaAcumulada*100)/quantidade

		if(ordinal == "ordinal")return array
		
	}
}

function calcular() {
	const variavel = document.getElementById("variavel")
	let tipo = document.getElementById("tipo")

	const dados = document.querySelector("#dados").value.split(',')

	let objetos = criaObjetos(dados, tipo)

		if(tipo.value == "ordinal"){
			objetos = arrumaIndice(objetos)
			objetosOrdinal = objetos
			tabelaOrdinal()
			google.charts.setOnLoadCallback(desenharGrafico(objetos))
		}else if (tipo.value != "continua"){
			objetos = mudaOrdem(tipo, objetos)
			arrayGrafico = objetos
			criaTabela(objetos)
			google.charts.setOnLoadCallback(desenharGrafico(objetos))
		}

		objetosOrdinal = objetos
	
}

function criaObjetos(dados, tipo){
	let objetos = []
	for(let i = 0; i <= dados.length; i++){
		const obj = new ObjetoDado
		obj.criaObjetoDado(dados[i], 1, i)
		objetos.push(obj)
	}

	console.log(tipo.value)
	
	if(tipo.value == "continua"){
		tabelaContinua(objetos)
		return
	}

	objetos = objetos[0].calculaQuantidade(objetos)

	for(let j = 0; j < objetos.length; j++){
		objetos[j].calculaFrequenciaPorcente(objetos)
	}

	return objetos
}

//Criação e Ordenaçao das tabelas e gráficos


function criaTabela(array){
	const tabela = criaTabelaOriginal()
	const nomeVariavel = mudaNomeVariavel()
	tabela.setAttribute("style", "display: ;")

	for(let i = 0; i < array.length; i++){
		const tr = document.createElement("tr")
		const td = document.createElement("td")
		const tdd = document.createElement("td")
		const tdFP = document.createElement("td")
		const freqAcumulada = document.createElement("td")
		const acumuladaP = document.createElement("td")

		td.innerHTML = array[i].dado
		tdd.innerHTML = array[i].quantidade
		array[i].calculaFrequenciaPorcente(array)
		tdFP.innerHTML = array[i].frequenciaPorcentagem
		freqAcumulada.innerHTML = array[i].frequenciaAcumulada
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
	const graficoContinua = []
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
	
	const tabela = criaTabelaOriginal()
	const nomeVariavel = mudaNomeVariavel()
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

		//grafico
		graficoContinua.push([Number(valor1),valor2])

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

	desenharGrafico(graficoContinua)
}

function tabelaOrdinal(){
	const tabela = criaTabelaOriginal()
	tabela.setAttribute("style", "display: ;")
	const nomeVariavel = mudaNomeVariavel();
	const tdPosicao = document.createElement("td")
	tdPosicao.innerHTML = "Posição"
	const tabelaCorpo = document.getElementById("tabelaCorpo"+indiceTabelaGlobal)
	tabelaCorpo.appendChild(tdPosicao)

	for(let i = 0; i < objetosOrdinal.length; i++){
		const tr = document.createElement("tr")
		const td = document.createElement("td")
		const tdd = document.createElement("td")
		const tdFP = document.createElement("td")
		const freqAcumulada = document.createElement("td")
		const acumuladaP = document.createElement("td")

		const input = document.createElement("input")
		input.setAttribute("type", "number")
		input.setAttribute("style", "width : 30px")
		input.setAttribute("id", "pos"+indiceTabelaGlobal + i)

		td.innerHTML = objetosOrdinal[i].dado
		tdd.innerHTML = objetosOrdinal[i].quantidade
		input.value = objetosOrdinal[i].indice + 1
		tdFP.innerHTML = objetosOrdinal[i].frequenciaPorcentagem.toFixed(1)
		freqAcumulada.innerHTML = objetosOrdinal[i].frequenciaAcumulada
		acumuladaP.innerHTML = objetosOrdinal[i].acumuladaP
		
		tr.appendChild(td)
		tr.appendChild(tdd)
		tr.appendChild(tdFP)
		tr.appendChild(freqAcumulada)
		tr.appendChild(acumuladaP)
		tr.appendChild(input)

		tabela.appendChild(tr)
	}

	const button = document.createElement("button")
	button.setAttribute("Onclick", "ordenando()")
	button.setAttribute("class", "botao-ordenar")
	button.innerHTML = "Ordenar"
	tabela.appendChild(button)
}

function ordenando(){
	for(let i = 0; i < objetosOrdinal.length; i++){
		const valor = document.getElementById("pos"+indiceTabelaGlobal+ i)
		objetosOrdinal[i].indice = valor.value
		objetosOrdinal[i].frequenciaAcumulada = objetosOrdinal[i].quantidade
	}

	objetosOrdinal.sort((a, b) => a.indice - b.indice)
	

	for(let i = 0; i < objetosOrdinal.length; i++){
		objetosOrdinal[i].indice = i 
		objetosOrdinal[i].calculaFrequenciaPorcente(objetosOrdinal)
	} 

	tabelaOrdinal()
	google.charts.setOnLoadCallback(desenharGrafico(objetosOrdinal))

} 


function mudaNomeVariavel(){
	const nomeVariavel = document.getElementById("nomeVariavel"+indiceTabelaGlobal)
	nomeVariavel.innerHTML = variavel.value
	return nomeVariavel
}

function criaTabelaOriginal(){
	const indice = document.getElementById("indice")
	const indiceTabela = indice.value
	if(indice.value > 0){
		for(let i = 0; i < indice.value; i++){
			document.getElementById("tabela"+i).setAttribute("style","display:none")
		}
	}

	indice.value = Number(indice.value) + 1
	indiceTabelaGlobal = indiceTabela
	const table = document.createElement("table")
	table.setAttribute("style","display:none")
	table.setAttribute("id","tabela"+indiceTabela)
	const tr = document.createElement("tr")
	const td = document.createElement("td")
	td.setAttribute("id", "nomeVariavel"+indiceTabela)
	const tdd = document.createElement("td")
	const tdFP = document.createElement("td")
	const tdAcumulada = document.createElement("td")
	const tdAcumuladaP = document.createElement("td")
	td.innerHTML = variavel;
	tdFP.innerHTML = "Frequência %"
	tdd.innerHTML = "Frequência"
	tdAcumulada.innerHTML = "F. Acumulada"
	tdAcumuladaP.innerHTML = "Acumulada %"
	tr.setAttribute("id", "tabelaCorpo"+indiceTabela)
	tr.setAttribute("class", "coloreTopoTabela")

	tr.appendChild(td)
	tr.appendChild(tdd)
	tr.appendChild(tdFP)
	tr.appendChild(tdAcumulada)
	tr.appendChild(tdAcumuladaP)

	table.appendChild(tr)

	const corpo = document.getElementById("tabelas")
	corpo.appendChild(table)

	return document.getElementById("tabela"+indiceTabela)
}

function arrumaIndice(array){
	for(let i = 0; i < array.length; i++){
		array[i].indice = i
	}

	return array
}


google.charts.load('current', {'packages':['corechart']});
		
function desenharGrafico(array){
	const tipo = document.getElementById('tipo')
	const arrayGrafico = []
	const visualizarGrafico = document.getElementById('graficos')
	visualizarGrafico.innerHTML = ""
	let grafico = new google.visualization.DataTable();
	grafico.addColumn('string', 'Nome Dado')
	grafico.addColumn('number', 'Valor')

	const opcoes = {
		title : mudaNomeVariavel().innerHTML,
		heigth : 200,
		whidth:300,
		is3D : true,
		legend: 'labeled',
		slices:{2:{offset:0.2}}
	}

	for(let i = 0; i < array.length; i++){
		arrayGrafico[i] = [array[i].dado,array[i].frequenciaPorcentagem]
	}

	grafico.addRows(arrayGrafico)	
	
	if(tipo.value == "discreta"){
		let column = new google.visualization.ColumnChart(document.getElementById('graficos'))
		column.draw(grafico,opcoes)
	}else if(tipo.value != "continua"){
		let pizza = new google.visualization.PieChart(document.getElementById('graficos'))
		pizza.draw(grafico,opcoes)
	}
	
}
