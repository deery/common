
class Dragdrop
  constructor: (selector) ->
    @div = document.getElementById selector
    @diffX = @diffY = 0
    that = @
    @div.onmousedown = (e) ->
      e = that.getEvent e
      if e.which isnt 1 then return
      that.diffX = e.offsetX
      that.diffY = e.offsetY
      console.log e.which
      document.onmousemove = (e) ->
        e = that.getEvent e
        that.div.style.left = e.clientX - that.diffX + 'px'
        that.div.style.top = e.clientY - that.diffY + 'px'

      document.onmouseup = (e) ->
        document.onmousemove = document.onmouseup = null
      false

  getEvent: (event) ->
    event || window.event

new Dragdrop 'drag'