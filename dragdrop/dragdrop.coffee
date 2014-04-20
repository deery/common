class Event
  constructor: ->
    @handlers = {}

  on: (type, handler)->
    @handlers[type] = [] unless @handlers[type]
    @handlers[type].push handler

  trigger: (type, context, args...) ->
    handler.apply(context, args) for handler in @handlers[type] if @handlers[type].length

  off: (type, handler) ->
    if @handlers[type].length
      index = @handlers[type].indexOf handler
      @handlers[type].splice index, 1
  addEvent: (ele, type, handler) ->
    if document.addEventListener then ele.addEventListener(type, handler, false) else ele.attachEvent 'on' + type, handler

class Dragdrop extends Event
  constructor: ->
    @handlers = {}
    @target = null
    @diffX = @diffY = 0
    @status = document.getElementById 'status'
    
    @addEvent document.body, 'mousedown', @handleEvent
    @addEvent document.body, 'mousemove', @handleEvent
    @addEvent document.body, 'mouseup', @handleEvent
    
    @.on 'dragstart', ->
      if @target and @target.tagName then @status.innerHTML = @target.tagName + ' is being draged.'
    @.on 'drag', (event) ->
      if @target and @target.tagName then @status.innerHTML = @target.tagName + ' is being draged to ' + event.clientX + ' : ' + event.clientY
    @.on 'dragend', (event) ->
      if @target and @target.tagName then @status.innerHTML = @target.tagName + ' has been draged to ' + event.clientX + ' : ' + event.clientY
  
  handleEvent : (event) =>
    event = event or window.event
    target = event.target or event.srcElement
    switch event.type
      when 'mousedown'
        @target = target if target.getAttribute 'draggable'
        @diffX = event.clientX - target.offsetLeft
        @diffY = event.clientY - target.offsetTop
        @.trigger 'dragstart', @, event

      when 'mousemove'
        if @target
          @target.style.top = event.clientY - @diffY + 'px'
          @target.style.left = event.clientX - @diffX + 'px'
          @.trigger 'drag', @, event
      when 'mouseup'
        if @target
          @.trigger 'dragend', @, event
          @target = null

@dragdrop = new Dragdrop