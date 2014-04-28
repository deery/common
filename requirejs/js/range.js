define('range', function(){

  return function(num, max, min){

    if(num < min){
      return min
    } else if(num > max){
      return max
    } else{
      return num
    }

  }

})