
class Dragdrop
  constructor: (selector) ->
    @div = document.getElementById selector
    @diffX = @diffY = 0
    that = @
    @div.onmousedown = (e) ->
      e = that.getEvent e
      that.diffX = e.offsetX
      that.diffY = e.offsetY
      document.onmousemove = (e) ->
        e = that.getEvent e
        that.div.style.left = e.clientX - that.diffX + 'px'
        that.div.style.top = e.clientY - that.diffY + 'px'
        # false

      document.onmouseup = (e) ->
        document.onmousemove = document.onmouseup = null
      false

  # mouseDown: (event) =>
  #   event = @getEvent event
  #   @diffX = event.clientX - @div.offsetLeft
  #   @diffY = event.clientY - @div.offsetTop

  #   @addEvent document, 'mousemove', @mouseMove
  #   @addEvent document, 'mouseup', @mouseUp
  #   false

  # mouseMove: (event) =>
  #   event = @getEvent event

  #   @div.style.left = event.clientX - @diffX + 'px'
  #   @div.style.top = event.clientY - @diffY + 'px'
  #   false

  # mouseUp: =>
  #   @removeEvent document, 'mousemove', @mouseMove
  #   @removeEvent document, 'mouseup', @mouseUp

  getEvent: (event) ->
    event || window.event

  # addEvent: (ele, type, handler) ->
  #   if document.addEventListener
  #     ele.addEventListener type, handler, false
  #   else if document.attachEvent
  #     ele.attachEvent 'on' + type, handler

  # removeEvent: (ele, type, handler) ->
  #   if document.removeEventListener
  #     ele.removeEventListener type, handler, false
  #   else if document.detachEvent
  #     ele.detachEvent 'on' + type, handler

new Dragdrop 'drag'