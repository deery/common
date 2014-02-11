/*
 * jQuery placeholder plugin
 * Author : luck Chang
 * Email : chunhang@networking.io
 * Date : 2013.8.9 10:22
 */
;(function($, document){
    $.fn.placeholder = function(){
        return 'placeholder' in document.createElement('input') ? this : this.each(function(){
            var value = this.getAttribute('placeholder');
            if(value == null) return;
            var that = this,
                focusFunc = function(){
                    if(that.value == that.defaultValue)
                        that.value = '';
                },
                blurFunc = function(){
                    if(that.value == '')
                        that.value = that.defaultValue;
                };
            that.defaultValue = that.value = value;
            if(that.attachEvent){
                that.attachEvent('onfocus', focusFunc);
                that.attachEvent('onblur', blurFunc);
            } else {
                that.addEventListener('focus', focusFunc, false);
                that.addEventListener('blur', blurFunc, false);
            }
        });
    };
    $(function(){$('input,textarea').placeholder();});
})(jQuery, document);