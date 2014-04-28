require.config({
  paths: {
    drag: './drag'
  }
})

var drag1 = document.getElementById('drag1')
var drag2 = document.getElementById('drag2')
var archor = document.getElementById('archor')

require(['drag'], function(drag){

  [drag1, drag2].forEach(function(ele){

    drag(ele)

  })

})

require(['scale'], function(scale){

  scale(archor, drag1)

})
