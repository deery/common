/*
 *	JavaScript Dome library
 *	Title : build your first js lib.
 *
 */
if(typeof Array.prototype.indexOf !== 'function'){
	Array.prototype.indexOf = function(item){
		for(var i = 0, len = this.length; i < len; i ++){
			if(this[i] === item)
				return i;
		}
		return -1;
	};
}
window.dome = (function(){
	function Dome(el){
		for(var i = 0, l = el.length; i < l; i ++){
			this[i] = el[i];
		}
		this.length = el.length;
	}
	Dome.prototype = {
		constructor : Dome,
		each : function(callback){
			for(var i = 0, len = this.length; i < len; i ++){
				callback.call(this, this[i], i);
			}
			return this;
		},
		map : function(callback){
			var ret = [], len = this.length;
			if(len == 0) return ret;
			this.each(function(el, i){
				ret[ret.length] = callback.call(this, el, i);
			});
			return ret;
		},
		mapOne : function(callback){
			var m = this.map(callback);
			return m.length ? m : m[0];
		},
		text : function(text){
			if(typeof text !== 'undefined'){
				return this.each(function(el){
					el.innerText = text;
				});
			} else {
				return this.mapOne(function(el){
					return el.innerText;
				});
			}
		},
		html : function(html){
			if(typeof html !== 'undefined'){
				return this.each(function(el){
					el.innerHTML = html;
				});
			} else {
				return this.mapOne(function(el){
					return el.innerHTML;
				});
			}
		},
		addClass : function(classes){
			var cls = '';
			if(typeof classes !== 'string'){
				for(var i = 0, len = classes.length; i < len; i ++){
					cls += ' ' + classes[i];
				}
			} else {
				cls = ' ' + classes;
			}
			return this.each(function(el){
				el.className += cls;
			});
		},
		removeClass : function(classes){
			return this.each(function(el){
				var cs = el.className.split(' '), i;
				while ( i = cs.indexOf(classes) ){
					cs = cs.slice(0, i).concat(cs.slice(++ i));
				}
				el.className = cs.join(' ');
			});
		},
		attr : function(attr, val){
			if(typeof val !== 'undefined'){
				return this.each(function(el){
					el.setAttribute(attr, val);
				});
			} else {
				return this.mapOne(function(el){
					return el.getAttribute(attr);
				});
			}
		}

	};
	return {
		get : function(selector){
			var els;
			if(typeof selector === 'string'){
				els = document.querySelectorAll(selector);
			} else if (selector.length) {
				els = selector; 
			} else {
				els = [selector];
			}
			return new Dome(els);
		},
		create : function(tagName, attrs){
			var el = new Dome([document.createElement(tagName)]);
			if(attrs){
				if(attrs.className){
					el.addClass(attrs.className);
					delete attrs.className;
				}
				if(attrs.text){
					el.text(attrs.text);
					delete attrs.text;
				}
				for(var key in attrs){
					if(attrs.hasOwnProperty(key)){
						el.attr(key, attrs[key]);
					}
				}
			}
		}
	};
})();