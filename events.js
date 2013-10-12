var Events = function(){
	var ev = function(){
		this.list = {};
	};
	ev.prototype = {
		constructor: ev,
		on : function(type, func) {
			this.list[type] = this.list[type] || [];
			this.list[type].push(func);
			return this;
		},
		trigger : function(type){
			var list = this.list[type] || [],
				args = list.slice.call(arguments, 1);
			if(list.length){
				for(var i = 0, len = list.length; i < len; i ++){
					list[i].apply(null, args);
				}
			}
			return this;
		},
		off : function(type, func){
			if(type){
				var list = this.list[type];
				if(!func){
					delete this.list[type];
				} else if(list) {
					for(var i = 0, len = list.length; i < len; i ++){
						if(func === list[i]) {
							list.splice(i, 1);
							break;
						}
					}
				}
			} else {
				this.list = {};
			}
			return this;
		},
		once : function(type, func){
			var that = this,
				one = function(){
					that.off(type);
					func.apply(null, arguments);
				};
			return this.on(type, one);
		}
	};
	return ev;
}();