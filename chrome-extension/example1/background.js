
(function(document){

  var archors = document.getElementsByTagName('a')

  archors = Array.prototype.slice.call(archors)

  archors.forEach(function(archor){

    archor.addEventListener('click', clicked.bind(archor), false)

  })

  function clicked(e){
    var color = this.style.backgroundColor

    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="' + color + '"'
    });
  }

})(document)