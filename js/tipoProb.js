const binomial = document.getElementById('binominal')
const uniforme = document.getElementById('uniforme')
const normal = document.getElementById('normal')


function calculaTipo(tipoProb){
    let calculadora = document.getElementById('calculadora')
    if(tipoProb == 'bino'){
        binomial.setAttribute('style', '')
        calculadora.value = 'binomial'
        document.getElementById('bino').classList.add('tipoDaProbabilidade')
        normal.setAttribute('style', 'display:none;')
        document.getElementById('norm').classList.remove('tipoDaProbabilidade')
        uniforme.setAttribute('style', 'display:none;')
        document.getElementById('uni').classList.remove('tipoDaProbabilidade')
    }else if(tipoProb == 'uni'){
        uniforme.setAttribute('style', '')
        calculadora.value = 'uniforme'
        document.getElementById('uni').classList.add('tipoDaProbabilidade')
        normal.setAttribute('style', 'display:none;')
        document.getElementById('norm').classList.remove('tipoDaProbabilidade')
        binomial.setAttribute('style', 'display:none;')
        document.getElementById('bino').classList.remove('tipoDaProbabilidade')
    }else{
        normal.setAttribute('style', '')
        calculadora.value = 'normal'
        document.getElementById('norm').classList.add('tipoDaProbabilidade')
        binomial.setAttribute('style', 'display:none;')
        document.getElementById('bino').classList.remove('tipoDaProbabilidade')
        uniforme.setAttribute('style', 'display:none;')
        document.getElementById('uni').classList.remove('tipoDaProbabilidade')
    }
}

calculaTipo('bino')

function uniformTipo(){
    let tipo 
    let tipoCalculadora = document.getElementById('calculadora')

    let maior
    let menor

    if(tipoCalculadora.value != 'normal'){
        maior = document.getElementById('maior')
        menor = document.getElementById('menor')
        tipo = document.querySelector('input[name="uniformTipo"]:checked').value
    }else{
        maior = document.getElementById('normalMaior')
        menor = document.getElementById('normalMenor')
        tipo = document.querySelector('input[name="normalTipo"]:checked').value
    }

    if(tipo == 'menor'){
        menor.removeAttribute('disabled','')
        maior.setAttribute('disabled','')
        menor.setAttribute('placeholder','menor que')
    }else if(tipo == 'maior'){
        maior.removeAttribute('disabled','')
        menor.setAttribute('disabled','')
        maior.setAttribute('placeholder','maior que')
    }else{
        maior.removeAttribute('disabled','')
        menor.removeAttribute('disabled','')


        maior.setAttribute('placeholder', 'valor final')
        menor.setAttribute('placeholder', 'valor inicial')

    }
}

uniformTipo()