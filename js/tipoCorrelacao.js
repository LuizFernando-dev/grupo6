
function tipoProjecao(){
    const x = document.getElementById('projecaoX')
    const y = document.getElementById('projecaoY')
    const tipo = document.querySelector('input[name="tipoProjecao"]:checked').value

    if(tipo == 'x'){
        console.log('teste')
       y.removeAttribute('disabled','')
       x.setAttribute('disabled','')
 
    }else{
        x.removeAttribute('disabled','')
        y.setAttribute('disabled','')
    }
}

tipoProjecao()
