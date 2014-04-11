(function() {
  var Game, obj;

  obj = {
    '38': 'up',
    '40': 'down',
    '37': 'left',
    '39': 'right'
  };

  Game = (function() {
    function Game() {
      this.bin = document.getElementById('container');
      this.init();
    }

    Game.prototype.init = function() {
      this.getIndex();
      return this.addEvent();
    };

    Game.prototype.addEvent = function() {
      return document.addEventListener('keydown', function(e) {
        var which;
        which = e.which;
        return console.log(which);
      });
    };

    Game.prototype.getIndex = function() {
      var a, b;
      a = b = 0;
      while (a === b) {
        a = this.getRandom(1, 16);
        b = this.getRandom(1, 16);
      }
      return this.insertChild('block' + a, 'block' + b);
    };

    Game.prototype.insertChild = function(a, b) {
      var first, second;
      first = document.createElement('div');
      second = document.createElement('div');
      first.className = a + ' ' + 'level1';
      second.className = b + ' ' + 'level1';
      first.appendChild(document.createTextNode('2'));
      second.appendChild(document.createTextNode('2'));
      this.bin.appendChild(first);
      return this.bin.appendChild(second);
    };

    Game.prototype.getRandom = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return Game;

  })();

  document.addEventListener('DOMContentLoaded', function() {
    return new Game;
  }, false);

}).call(this);
