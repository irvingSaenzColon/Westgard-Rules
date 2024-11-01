function getStandarDeviation (arr, avrg) {
  var s = 0;
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += Math.pow((parseFloat(arr[i]) - avrg), 2);
  }
  var s = Math.sqrt(sum / (arr.length - 1));
  return s;
}

function getAverage(data) {
  const sum = data.reduce(function(acc, value){
    return acc + value;
  }, 0);
  return sum / data.length;
}

export {getStandarDeviation, getAverage};