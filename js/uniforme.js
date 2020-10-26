function calcularUniforme(){
    const inferior = Number(document.getElementById('b').value)
    const superior = Number(document.getElementById('a').value)
    const resposta = document.getElementById('resultadoUniforme')
    const tipo = document.querySelector('input[name="uniformTipo"]:checked').value
    let valor = 0
    let distancia = 0 
    let resultado = 0

    const media = ((superior + inferior)/2).toFixed(1)
    const varianca = ((inferior - superior)*(inferior - superior))/12
    const desvio = Math.sqrt(varianca).toFixed(2)

    if(tipo == 'maior'){
        valor = document.getElementById('maior').value
        distancia = inferior - valor
    }else if(tipo == 'menor'){
        valor = document.getElementById('menor').value
        distancia = valor - superior
    }else{
        valor = document.getElementById('maior').value
        valor2 = document.getElementById('menor').value
        distancia = valor - valor2
    }

    resultado = (1/(inferior-superior))* distancia

    resultado *= 100

   resposta.innerHTML = `Probabilidade ${resultado.toFixed(1)}% Média ${media} Desvio Padrão ${desvio}` 
}