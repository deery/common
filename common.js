/*
 * JavaScript Common js for common usage.
 * Author : Luck Chang
 * Email : chunhang@networking.io
 * Data : 2012.10.29
 * Info : more methods are joining...
 */
var Common = {
	_$ : function(){
		
	},
	$ : function(id){
		return document.getElementById(id);
	},
	byClass : function(cls){
		return document.getElementsByClassName ? document.getElementsByClassName(cls) : function(cls){
			var arr = [],
			all = document.getElementsByTagName('*');
			return (typeof cls !== 'string' || (cls = cls.replace(/\s+/, '')) === '') ? arr : function(cls){
				Common.each(all, function(i, m){
					var _arr = i.className.split(' ');
					Common.each(_arr, function(j, n){
						if(cls === j)
							arr[arr.length] = i;
					});
				});
				return arr;
			}(cls);
		}(cls);
	},
    byAttr : function(att, value, parent){
    	var ret = [],
    	walk_the_dom = function walk(node, func){
    	  func(node);
    	    node = node.firstChild;
    	    while(node){
    	        walk(node, func);
    	        node = node.nextSibling;
    	    }
    	};
    	parent = parent || document.body;
    	walk_the_dom(parent, function(node){
    	    var actual = node.nodeType === 1 && node.getAttribute(att);
    	    if(typeof actual === 'string' && (actual === value || typeof value !== 'string')){
    	        ret.push(node);
    	    }
    	});
    	return ret;
    },
	each : function(arr, func){
		for(var i = 0, len = arr.length; i < len; i ++){
			func.call(this, arr[i], i);
		}
		return this;
	},
	makeArray : function(arr){
		return arr ? Array.prototype.slice.call(arr) : [];
	},
	addLoadEvent : function(){
		var oldFunc = window.onload,
		args = this.makeArray(arguments),
		newFunc = function(){
			Common.each(args, function(i, j){
				i();
			});
		};
		window.onload = typeof oldFunc === 'function' ? function(){
			oldFunc();
			newFunc();
		} : newFunc;
		return this;
	},
	addEvent : function(ele, type, func){
		if(ele.addEventListener){
			ele.addEventListener(type, func, false);
		} else if (ele.attachEvent){
			ele.attachEvent('on' + type, func);
		} else
			ele['on' + type] = func;
		return this;
	},
	tog : function(){
		var args = this.makeArray(arguments),
		status = args.shift();
		return this.each(args, function(i, j){
			i.style.display = status;
		});
	},
	getEvent : function(event){
		return event ? event : window.event;
	},
	getTarget : function(event){
		return event.target || event.srcElement;
	},
	preventDefault : function(event){
		if(event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation : function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	getWheelDelta : function(event){
		if(event.wheelDelta){
			return event.wheelDelta;
		} else {
			return -event.detail * 40;
		}
	},
	addClass : function(ele, cls){
		var l = cls.length;
		if(typeof cls !== 'string' || (cls = this.trim(cls)) === '') return this;
		if(l !== cls.length) throw new Error('Invalid className.');

		var oldClass = ele.className;
		if(oldClass == ''){
			ele.className = cls;
			return this;
		}
		oldClass = oldClass.split(' ');
		for(var i = 0, len = oldClass.length; i < len; i ++){
			if(cls === oldClass[i])return this;
		}
		oldClass.push(cls);
		ele.className = oldClass.join(' ');
		return this;
	},
	removeClass : function(ele, cls){
		if(cls === undefined && arguments.length === 1){
			ele.className = '';
			return this;
		}
		var l = cls.length, newClass = [];
		if(typeof cls !== 'string' || (cls = this.trim(cls)) === '') return this;
		if(l !== cls.length) throw new Error('Invalid className.');
	
		var oldClass = ele.className.split(' ');
		this.each(oldClass, function(i, j){
			if(i !== cls) newClass.push(oldClass[j]);
		});
		ele.className = newClass.join(' ');
		return this;
	},
	trim : function(str){
		var str = str.replace(/\s+/, ''),
        	ws = /\s/,
        	i = str.length;
    	while (ws.test(str.charAt(--i)));
    	return str.slice(0, i + 1);
	},
	map : function(obj, func) {
    	var ret = [];
    	if (obj == null) return ret;
		this.each(obj, function(i, j){
			ret[ret.length] = func.call(this, i, j);
		});
    	return ret;
    },
    pluck : function(arr, key){
    	return this.map(arr, function(val){ return val[key]; });
    },
    isArray : function(arr){
    	return Object.prototype.toString.call(arr) === '[object Array]';
    },
    isFunction : function(func){
    	return Object.prototype.toString.call(func) === '[object Function]';
    }
};