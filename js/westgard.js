function consecutiveValuesAboveN(data, type, n) {
	var result = [];
	var index = [];
  function types(i) {
    if(type === 1 ) {
      if (data[i] > n && i - index[index.length - 1] === 1 && data[index[index.length - 1]] > n) {
				index.push(i);
			} else if (data[i] < n && i - index[index.length - 1] === 1 && data[index[index.length - 1]] < n) {
				index.push(i);
			} else {
				index.push(null, i);
			}
    } else if( type === 2) {
      if (data[i] > n) {
          index.push(i);
      } else if(index[index.length - 1] !== null) {
          index.push(null);
      }
    } else if(type === 3) {
      if (data[i] < n) {
          index.push(i);
      } else if(index[index.length - 1] !== null) {
          index.push(null);
      }
    }
  }
	for (var i = 0; i < data.length; i++) {
		types(i)
	}
  if(index[index.length - 1] === null) {
    index.pop();
  }
  console.log(index)
  console.log(result);
	if(index.length) {
    index.forEach(function (it) {
  		if (data[it] === undefined || data[it] === null || !result.length) {
  			result.push([]);
  		} else {
  			result[result.length - 1].push({value: data[it], index: it});
  		}
  	});
  }
	return result;
}


var westgardRules = {
		oneTwoDeviations: {
			enabled: true,
			action: function (data, standarDeviation) {
				//1-2s, es decir, una medida por encima de dos desviaciones estándar
				var result = [];
				var type = '';
				for(var i = 0; i < data.length; i++) {
					if(data[i] > standarDeviation.d2 || data[i] < standarDeviation._d2) {
						result.push({value: data[i], index: i});
						type = "1-2s";
						break;
					}
				}
				return {result, type};
			}
		},
		oneThreeDeviations : {
			enabled: true,
			action: function (data, standarDeviation) {
				//1-3s, es decir, una medida por encime de tres desviaciones estándar
				var result = [];
				var type = '';
				for(var i = 0; i < data.length; i++) {
					if(data[i] > standarDeviation.d3 || data[i] < standarDeviation._d3) {
						result.push({value: data[i], index: i});
						type = "1-3s";
						break;
					}
				}
				return {result, type};
			}
		},
		twoTwoDeciations: {
			enabled: true,
			action: function (data, standarDeviation) {
				//2-2s, es decir, 2 valores consecutivos por encima de dos desviaciones estándar
				var result = [];
				var type = '';
				var valuesAboveTwoDeviations = consecutiveValuesAboveN(data, standarDeviation.d2);	
				var valuesBelowTwoDeviations = consecutiveValuesAboveN(data, standarDeviation._d2);
				result.concat(valuesAboveTwoDeviations, valuesBelowTwoDeviations);
				if(result.length) {
					result.filter(function(values) {
						return values.length == 2;
					});
					if(result.length) {
						type = '2-2s';
					}
				}
				return {result, type};
			}
		},
		threeOneDeviations: {
			enabled: true,
			action: function (data, standarDeviation) {
				//3-1s, es decir que 3 valores consecutivos por encima de 1 desviación estándar, en el mismo lado de la media
				const result = []
				var valuesWithDeviations = [];
				var type = '';
				const valuesAboveOneDeviation = consecutiveValuesAboveN(data, standarDeviation.d1);
				const valuesBelowOneDeviation = consecutiveValuesAboveN(data, standarDeviation._d1);
				valuesWithDeviations = valuesWithDeviations.concat(valuesAboveOneDeviation, valuesBelowOneDeviation);
				if(valuesWithDeviations.length) {
					valuesWithDeviations = valuesWithDeviations.filter(function(values) {
						return values.length == 3;
					});
					if(valuesWithDeviations.length) {
						valuesWithDeviations.forEach(function(value) {
							result.push(value[value.length - 1]);
						});	
						type = '3-1s';
					}
				}
				return {result, type};
			}
		},
		rFourthDeviations: {
			enabled: true,
			action: function (data, standarDeviation) {
				//R4s, el rango entre dos controles en una corrida excede cuatro desviaciones estándar
				var result = [];
				var type = '';
				for(var i = 0; i < data.length - 1; i++) {
					if((data[i] > standarDeviation.d2 && data[i+1] > standarDeviation._d2 ) || (data[i] < standarDeviation._d2 && data[i+1] < standarDeviation.d2)) {
						result.push(data[i], data[i+1]);
						type = "R4s";
						break;
					}
				}
				return {result, type}
			}
		},
		fourthOneDeviation: {
			enabled: true,
			action: function (data, standarDeviation) {
				//4-1S, es decir,  cuatro valores consecutivos del mismo lado de la media
				const result = [];
				var type = '';
				const valuesWithDeviations = [];
				const aboveOneDeviation = consecutiveValuesAboveN(data, standarDeviation.d1);
				const belowOneDeviation = consecutiveValuesAboveN(data, standarDeviation._d1);
				if(valuesWithDeviations.length) {
					valuesWithDeviations = valuesWithDeviations.filter(function(values) {
						return values.length == 4;
					});
					if(valuesWithDeviations.length) {
						valuesWithDeviations.forEach(function(value) {
							result.push(value[value.length - 1]);
						});	
						type = '3-1s';
					}
				}

				if(results.length) {

				}
				return {result, type};
			}
		},
		nXDeviations: {
			enabled: true,
			action: function (data, standarDeviation) {
				//N-x, se presenta cuando hay 6,7,8,9 a 12 resultados consecutivos de control del mismo lado de la media
				var result = consecutiveValuesAboveN(data, standarDeviation.yAvgData);	
				if (result.length) {
					result = result.filter(function(d) {
						return d.length >= 6;
					});
					if(result.length) {
						type = 'N-x';
					}

				}
				return { result, type };
			}
		},
}

export {westgardRules, consecutiveValuesAboveN};