import { westgardRules, consecutiveValuesAboveN } from "./westgard.js";
import { getStandarDeviation, getAverage } from "./mean.js";
const data = [1, 2, 3, 4, 8, 6, 9, 4, 10, 1, 0, -1];
const standarDeviation = {
 avg: 3,
 d1: 0,
 _d1: 0,
 d2:0,
 _d2:0,
 d3:0,
 _d3:0
};
const avg = getAverage(data);
const st = getStandarDeviation(data, avg);
standarDeviation._d1= avg - (st) < 0 ? 0 : avg - (st);
standarDeviation.d2 = avg - (st * 2) < 0 ? 0 : avg - (st * 2);
standarDeviation._d3 = avg - (st * 3) < 0 ? 0 : avg - (st * 3);
standarDeviation.d1 = avg + (st) == 0 ? 0 : avg + (st);
standarDeviation.d2 = avg + (st * 2) == 0 ? 0 : avg + (st * 2);
standarDeviation.d3 = avg + (st * 3) == 0 ? 0 : avg + (st * 3);
console.log(standarDeviation);
const yAxisAnnotations = [];
for(const prop in standarDeviation) {
	yAxisAnnotations.push({
        y: standarDeviation[prop], // El valor en Y donde quieres la línea
        borderColor: '#0000FF', // Color de la línea
        label: {
          text:  prop.toString(),
          style: {
            color: '#000',
            background: '#FF4560',
          }
        }
      })
}

const results = consecutiveValuesAboveN(data, 3, 3);
console.log(results)
var options = {
  chart: {
    height: 350,
    type: "line",
    stacked: false
  },
  series: [{
    name: 'sales',
    data: data 
  }],
  annotations: {
    yaxis: yAxisAnnotations 
  },
  xaxis: {
    categories: [1,2,3,4,5,6,7,8,9]
  }
}
const app = document.getElementById('chart');
const chart = new ApexCharts(app, options);

chart.render();