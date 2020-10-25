function calcular(){
    let array = document.getElementById('k').value.split(',')
    array = array.map((num) => Number(num))
    
    const resultado = document.getElementById('resultado')
    const n = Number(document.getElementById('n').value)
    const p = Number(document.getElementById('p').value)
    const f = 1 - p
    const media = (n * p).toFixed(1)
    const desvio = (Math.sqrt(n * p * f)).toFixed(2)

    let res = 0
    for(let i = 0; i < array.length; i++){

        let fatorialN = calculaFatorial(n)
        let fatorialK = calculaFatorial(array[i])
        let fatorialNk = calculaFatorial(n-array[i])

        const fatoriais = fatorialN/(fatorialK*fatorialNk)

        let s = elevacao(p,array[i])
        let eleF = elevacao(f,n-array[i])

        let prob = fatoriais * s * eleF

        res += prob
    
    }

    resultado.innerHTML = `Probabilidade: ${(res * 100).toFixed(2)} % Media: ${media} DP: ${desvio}`

}

function calculaFatorial(num){
    if(num == 0) return 1
    let resultado = num

    for(let i = 1; i < num; i++){
        resultado = resultado * (num - i)
    
    }

    return resultado

}

function elevacao(num,quant){
    let aux = num
    if(quant > 1){
        for(let i = 1; i < quant; i++){
            num *= aux
        }
    }else if(quant == 1){
        return num
    }else{
        return 1
    }
    
    return num
}