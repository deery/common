define('scale', function(){

  var diffX = 0
  var diffY = 0

  return function(archor, bin){

    var originWidth = bin.offsetWidth
    var originHeight = bin.offsetHeight

    archor.onmousedown = function(e){
      e.stopPropagation()
      e = e || window.event
      diffX = e.offsetX
      diffY = e.offsetY

      document.onmousemove = function(e){
        e = e || window.event
        require(['range'], function(range){

          var width = range(e.clientX - bin.offsetLeft, document.documentElement.clientWidth, originWidth)
          var height = range(e.clientY - bin.offsetTop, document.documentElement.clientHeight, originHeight)

          bin.style.width = width + 'px'
          bin.style.height = height + 'px'
        })

      }

      document.onmouseup = function(){

        document.onmousemove = document.onmouseup = null

      }

    }

    document.onmousemove = null

  }

})