const binomial = document.getElementById('binominal')
const uniforme = document.getElementById('uniforme')
const normal = document.getElementById('normal')


function calculaTipo(tipoProb){
    if(tipoProb == 'bino'){
        binomial.setAttribute('style', '')
        document.getElementById('bino').classList.add('tipoDaProbabilidade')
        normal.setAttribute('style', 'display:none;')
        document.getElementById('norm').classList.remove('tipoDaProbabilidade')
        uniforme.setAttribute('style', 'display:none;')
        document.getElementById('uni').classList.remove('tipoDaProbabilidade')
    }else if(tipoProb == 'uni'){
        uniforme.setAttribute('style', '')
        document.getElementById('uni').classList.add('tipoDaProbabilidade')
        normal.setAttribute('style', 'display:none;')
        document.getElementById('norm').classList.remove('tipoDaProbabilidade')
        binomial.setAttribute('style', 'display:none;')
        document.getElementById('bino').classList.remove('tipoDaProbabilidade')
    }else{
        normal.setAttribute('style', '')
        document.getElementById('norm').classList.add('tipoDaProbabilidade')
        binomial.setAttribute('style', 'display:none;')
        document.getElementById('bino').classList.remove('tipoDaProbabilidade')
        uniforme.setAttribute('style', 'display:none;')
        document.getElementById('uni').classList.remove('tipoDaProbabilidade')
    }
}

calculaTipo('bino')

function uniformTipo(){
    let tipo = document.querySelector('input[name="uniformTipo"]:checked').value
    console.log(tipo)
    if(tipo == 'menor'){
        document.getElementById('menor').removeAttribute('disabled','')
        document.getElementById('maior').setAttribute('disabled','')
        document.getElementById('menor').setAttribute('placeholder','menor que')
    }else if(tipo == 'maior'){
        document.getElementById('maior').removeAttribute('disabled','')
        document.getElementById('menor').setAttribute('disabled','')
        document.getElementById('maior').setAttribute('placeholder','maior que')
    }else{
        document.getElementById('maior').removeAttribute('disabled','')
        document.getElementById('menor').removeAttribute('disabled','')


        document.getElementById('maior').setAttribute('placeholder', 'valor final')
        document.getElementById('menor').setAttribute('placeholder', 'valor inicial')

    }
}

uniformTipo()