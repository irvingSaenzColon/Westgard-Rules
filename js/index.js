import { westgardRules, consecutiveValuesAboveN } from "./westgard.js";
import { getStandarDeviation, getAverage } from "./mean.js";
import Graph from "./graph.js";
const data = [1, 2, 3, 4, 8, 6, 9, 4, 10, 1, 0, -1];
/*
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
const results = consecutiveValuesAboveN(data, 3, 3);
console.log(results)
*/
const graphController = new Graph();
