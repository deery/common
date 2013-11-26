function quickSort(arr){
  if(arr.length <= 1){
    return arr
  }

  var left = []
  var right = []
  var index = Math.floor(arr.length / 2)
  var num = arr.splice(index, 1)

  for(var i = 0, len = arr.length; i < len; i ++){
    if(arr[i] < num){
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(num, quickSort(right))
}

if(typeof module !== 'undefined' && module.exports !== 'undefined'){
  module.exports = quickSort
}