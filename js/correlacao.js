const nomeX = document.getElementById('nomeX')
const nomeY = document.getElementById('nomeY')
const varX = document.getElementById('varX')
const varY = document.getElementById('varY')

function calcularCorrelacao(){
    if(varX.value == ''){
        nomeX.innerHTML = `digite o valor do X`
    }else{
        nomeX.innerHTML = `digite o valor do ${varX.value}`
    }
    
    if(varY.value == ''){
        nomeY.innerHTML = `digite o valor do Y`
    }else{
        nomeY.innerHTML = `digite o valor do ${varY.value}`
    }

    let x = document.getElementById('x').value.split(',')
    let y = document.getElementById('y').value.split(',')
    let calculaProjecao = document.getElementById('calculaProjecao')

    x = x.map((item) => Number(item))
    y = y.map((item) => Number(item))
    xx = x.map((item) => item*item)
    yy = y.map((item) => item * item)

    let xy = []
    for(let i = 0; i < x.length; i++){
        xy.push(x[i] * y[i])
    }

    const arrays = [x,y,xy,xx,yy]
    for(let i = 0; i < 5; i++){
        let soma = 0
        arrays[i] = arrays[i].map((item) => {
            soma += item
        })

        arrays[i] = soma
    }

    let conta = ((x.length * arrays[2]) - (arrays[0] * arrays[1]))
    let parte1 = (x.length*arrays[4]) - (arrays[1] * arrays[1])
    if(parte1 < 0)parte1 = parte1 * -1
    parte1 = Math.sqrt(parte1)
    let parte2 = ((x.length * arrays[3]) - (arrays[0] * arrays[0]))
    if(parte2 < 0)parte2 = parte2 * -1
    parte2 = Math.sqrt(parte2)
    let parte3 = (parte1 * parte2)
    let conta2 = (conta/parte3).toFixed(4)
    let a = (conta/((x.length*arrays[3]) - (arrays[0] ** 2))).toFixed(4)
    let mediaX = arrays[0]/x.length
    let mediaY = arrays[1]/y.length
    let b = (mediaY - (a * mediaX)).toFixed(0)
    calculaProjecao.setAttribute('style','')

    let forcaDaCorrelacao = ''
    if(conta2 > 0){
        conta = conta2 * -1
    }else{
        conta = conta2
    }
    if(conta < 0 && conta > - 0.3){
        forcaDaCorrelacao = 'Desprezivel'
    }else if(conta < 0 && conta > -0.5 && forcaDaCorrelacao == ''){
        forcaDaCorrelacao = 'Fraca'
    }else if(conta < 0 && conta > -0.7 && forcaDaCorrelacao == ''){
        forcaDaCorrelacao = 'Moderado'
    }else{
        forcaDaCorrelacao = 'Forte'
    }
    document.getElementById('resultadoCorrelacao').innerHTML = `Correlação: <strong>
    ${(conta2 * 100).toFixed(2)}%</strong> ${forcaDaCorrelacao}`
    //-----------------------------------//
    const arrayXy = []
    for(let i = 0; i < x.length; i++){
        arrayXy.push([y[i],x[i]])
    }
    
    drawChart(arrayXy)

    const tipo = document.querySelector('input[name="tipoProjecao"]:checked').value
    if(tipo == 'y'){
        projecaoY(a,Number(b))
    }else if(tipo == 'x'){
        projecaoX(a,Number(b))
    }
}

function projecao(a,b){
    let projecaoX = document.getElementById('projecaoX')
    let projecaoY = document.getElementById('projecaoY')
    
    projecaoY.value = Number(a) * Number(projecaoX.value) + Number(b)
    projecaoX.value = (projecaoY.value - Number(b)) / Number(a)

    console.log(projecaoY)
}

function projecaoX(a,b){
    let projecaoX = document.getElementById('projecaoX')
    let projecaoY = document.getElementById('projecaoY')

    projecaoX.value = ((projecaoY.value - Number(b)) / Number(a)).toFixed(4)

}

function projecaoY(a,b){
    let projecaoX = document.getElementById('projecaoX')
    let projecaoY = document.getElementById('projecaoY')

    projecaoY.value = (Number(a) * Number(projecaoX.value) + Number(b)).toFixed(4)

}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(array) {
    const visualizarGrafico = document.getElementById('chart_div')
    visualizarGrafico.innerHTML = ""

    let grafico = new google.visualization.DataTable();
    grafico.addColumn('number', varX.value)
    grafico.addColumn('number', varY.value)

    var options = {
        annotations: {
          boxStyle: {
            // Color of the box outline.
            stroke: '#888',
            // Thickness of the box outline.
            strokeWidth: 1,
            // x-radius of the corner curvature.
            rx: 10,
            // y-radius of the corner curvature.
            ry: 10,
            // Attributes for linear gradient fill.
            gradient: {
              // Start color for gradient.
              color1: '#fbf6a7',
              // Finish color for gradient.
              color2: '#33b679',
              // Where on the boundary to start and
              // end the color1/color2 gradient,
              // relative to the upper left corner
              // of the boundary.
              x1: '0%', y1: '0%',
              x2: '100%', y2: '100%',
              // If true, the boundary for x1,
              // y1, x2, and y2 is the box. If
              // false, it's the entire chart.
              useObjectBoundingBoxUnits: true
            }
          }
        }
      };
          

    grafico.addRows(array)

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(grafico, options);

}

     