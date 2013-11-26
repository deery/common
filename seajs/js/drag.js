// B

define(function(require, exports, module){

  function drag(obj){
    var disX = 0;
    var disY = 0;
    obj.onmousedown = function(ev){
      var ev = ev || window.event
      disX = ev.clientX - obj.offsetLeft
      disY = ev.clientY - obj.offsetTop

      document.onmousemove = function(ev){
        var ev = ev || window.event

        if(document.onmouseup == null) return

        var L = require('./range.js').range(ev.clientX - disX, document.documentElement.clientWidth - obj.offsetWidth, 0)
        var T = require('./range.js').range(ev.clientY - disY, document.documentElement.clientHeight - obj.offsetWidth, 0)
        // var L = ev.clientX - disX
        // var T = ev.clientY - disY
        obj.style.left = L + 'px'
        obj.style.top = T + 'px'
      }
      document.onmouseup = function(){
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    document.onmousemove = null
    
  }

  exports.drag = drag

})