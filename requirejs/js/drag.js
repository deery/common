define('drag', function(){

var diffX = 0
var diffY = 0

function drag(ele){

  ele.onmousedown = function(e){
    e = e || window.event
    if(e.which !== 1) return
    diffX = e.offsetX
    diffY = e.offsetY

    document.onmousemove = function(e){
      e = e || window.event

      require(['range'], function(range){

        var left = range(e.clientX - diffX, document.documentElement.clientWidth - ele.offsetWidth, 0)
        var top  = range(e.clientY - diffY, document.documentElement.clientHeight - ele.offsetWidth, 0)
        ele.style.left = left + 'px'
        ele.style.top = top + 'px'

      })

    }
    document.onmouseup = function(){
      document.onmousemove = document.onmouseup = null
    }
  }
  document.onmousemove = null

}

return drag
})