const width_threshold = 480;

function drawPieChart() {
  let int = document.getElementById('interT').innerHTML,
      red = document.getElementById('redFlagsT').innerHTML
  if ($("#pieChart").length) {
    ctxPie = document.getElementById("pieChart").getContext("2d");
    optionsPie = {
      responsive: true,
      maintainAspectRatio: false
    };
    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            fill: true,
            backgroundColor: [
              'blue',
              'white'],
              data: [int, red],
              borderColor: ['blue', 'blue'],
              borderWidth: [4,4]
          }
        ],
        labels: ["Intervention", "Red Flags"],
        
      },
      options: {optionsPie,
          title: {
            display: true,
            text: 'iReport Visuals',
            fontSize: 32,
            position: 'top'
          }
        }
    };

    pieChart = new Chart(ctxPie, configPie);
  }
}

function reloadPage() {
  setTimeout(function() {
    window.location.reload();
  }); // Reload the page so that charts will display correctly
}

