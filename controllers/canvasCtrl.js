function loadChart() {
    let datas = [];

    weather.forEach(adat => {
        datas.push({
            label: adat.datum,
            y: [adat.min, adat.max],
            name: adat.tipus
        })
    })

    var chart = new CanvasJS.Chart("chartContainer", {
        axisY: {
            suffix: " °C",
            maximum: 40,
            gridThickness: 0
        },
        toolTip: {
            shared: true,
            content: "{name} </br> <strong>Temperature: </strong> </br> Min: {y[0]} °C, Max: {y[1]} °C"
        },
        data: [{
            type: "rangeSplineArea",
            fillOpacity: 0.1,
            color: "#91AAB1",
            indexLabelFormatter: formatter,
            dataPoints: datas
        }]
    });
    
    chart.render();

    function formatter(e) {
        if (e.index === 0 && e.dataPoint.x === 0) {
            return " Min " + e.dataPoint.y[e.index] + "°";
        } else if (e.index == 1 && e.dataPoint.x === 0) {
            return " Max " + e.dataPoint.y[e.index] + "°";
        } else {
            return e.dataPoint.y[e.index] + "°";
        }
    }
}