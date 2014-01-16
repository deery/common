jQuery(function(){

var thisForm = $(".js-commit")  // 缓存form对象
thisForm.radio1 = thisForm.radio2 = false  // 两组radio必须框默认都没选中
thisForm.checkbox = 0   // checkbox 选中个数默认为0

thisForm.on('click', 'input[name="apartment"]', function(){ // 户型radio

  if( !thisForm.radio1 )  thisForm.radio1 = true

}).on('click', 'input[name="use"]', function(){ // 用途radio

  if( !thisForm.radio2 )  thisForm.radio2 = true

}).on('click', '[name="style[]"]', function(){ // 风格checkbox

  if(this.checked) thisForm.checkbox += 1
  else  thisForm.checkbox -= 1

}).submit(function(e){
  
  if( !thisForm.radio1 ){
    alert( '户型radio 没选择' )
    return false
  }

  if( !thisForm.radio2 ){
    alert( '用途radio 没选择' )
    return false
  }

  if( thisForm.checkbox <= 0 ){
    alert( 'checkbox 没选择' )
    return false
  }

  // 其他验证

  return true

})


})