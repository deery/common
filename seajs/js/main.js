// A

define(function(require, exports, module){


  var input = document.getElementById('input1')
  var oDiv1 = document.getElementById('div1')
  var oDiv2 = document.getElementById('div2')
  var oDiv3 = document.getElementById('div3')

  require('./drag.js').drag(oDiv3)


  input.onclick = function(){
    oDiv1.style.display = 'block'

    // require('./scale.js').scale(oDiv1, oDiv2)
    require.async('./scale.js', function(ex){ // 按需加载
      ex.scale(oDiv1, oDiv2)
    })
  }
})