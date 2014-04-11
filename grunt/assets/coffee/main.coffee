
obj = 
  '38' : 'up'
  '40' : 'down'
  '37' : 'left'
  '39' : 'right'


class Game
  constructor: ->
    @.bin = document.getElementById 'container'

    @.init()

  init: ->
    @.getIndex()
    @.addEvent()
  addEvent: ->
    document.addEventListener 'keydown', (e) ->
      which = e.which
      console.log which

  getIndex: ->
    a = b = 0
    while a is b
      a = @.getRandom 1, 16
      b = @.getRandom 1, 16
    @.insertChild('block' + a, 'block' + b)
  insertChild: (a, b) ->
    first = document.createElement('div')
    second = document.createElement('div')
    first.className = a + ' ' + 'level1'
    second.className = b + ' ' + 'level1'
    first.appendChild document.createTextNode '2'
    second.appendChild document.createTextNode '2'
    @.bin.appendChild first
    @.bin.appendChild second


  getRandom: (min, max) ->
    Math.floor(Math.random() * (max - min + 1) + min)


document.addEventListener 'DOMContentLoaded', ->
  new Game
, false

