
class Dragdrop
  constructor: ->
    @div = document.getElementById 'drag'
    @diffX = @diffY = 0
    @addEvent @div, 'mousedown', @mouseDown

  mouseDown: (event) =>
    event = @getEvent event
    @diffX = event.clientX - @div.offsetLeft
    @diffY = event.clientY - @div.offsetTop

    @addEvent document, 'mousemove', @mouseMove
    @addEvent document, 'mouseup', @mouseUp
    false

  mouseMove: (event) =>
    event = @getEvent event

    @div.style.left = event.clientX - @diffX + 'px'
    @div.style.top = event.clientY - @diffY + 'px'
    false

  mouseUp: =>
    @removeEvent document, 'mousemove', @mouseMove
    @removeEvent document, 'mouseup', @mouseUp

  getEvent: (event) ->
    event || window.event

  addEvent: (ele, type, handler) ->
    if document.addEventListener
      ele.addEventListener type, handler, false
    else if document.attachEvent
      ele.attachEvent 'on' + type, handler

  removeEvent: (ele, type, handler) ->
    if document.removeEventListener
      ele.removeEventListener type, handler, false
    else if document.detachEvent
      ele.detachEvent 'on' + type, handler

new Dragdrop