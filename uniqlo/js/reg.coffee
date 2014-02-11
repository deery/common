jQuery ($) ->

  # global object Register

  Register = 
    mask        : $('div.mini-mask')
    pops        : $('.mini-pop')
    changePWBtn : $('a.mini-changepw-btn')
    changePW    : $('form.mini-change-password')
    changeSucc  : $('div.mini-change-succ')
    register    : $('form.mini-register')
    tip         : $('p.mini-control-tips')
    regBtn      : $('a.mini-reg-btn'),
    loginBtn    : $('a.mini-login-btn')
    login       : $('form.mini-login')
    logout      : $('a.mini-logout')
    fetch       : $('form.mini-fetch')
    fetchSucc   : $('div.mini-fetch-succ')
    checkPhone  : $('#checkbox-phone')
    regPhone    : $('#reg-phone')
    checkNone   : $('#checkbox-none')
    clauseBtn   : $('a.mini-clause-btn')
    clause      : $('div.mini-clause')
    closeMask   : ->
      @.mask.hide()
      return @
    showMask    : ->
      @.mask.show()
      return @
    closeAll    : ->
      Register.closeMask().pops.hide()
      clearInterval $.uniqlo.timerFind1
      clearInterval $.uniqlo.timerFind2
      Register.hideTip()
    hideTip     : ->
      Register.tip.html ''

  # 曝露Register变量

  $.Register = Register

  # 关联手机

  Register.checkPhone.on 'click', ->
    if @.checked
      Register.regPhone.removeClass 'hide'
    else
      Register.regPhone.addClass 'hide'

  # 不做关联

  Register.checkNone.on 'click', ->
    if @.checked
      Register.regPhone.addClass 'hide'
    else
      Register.regPhone.removeClass 'hide'

  # 打开注册框

  Register.regBtn.on 'click', ->
    Register.showMask().register.show()

  # 打开登录框

  Register.loginBtn.on 'click', ->
    Register.showMask().login.show()

  # 打开隐私条款

  Register.clauseBtn.on 'click', ->
    Register.clause.show()

  # 关闭隐私条款

  Register.clause.on 'click', 'button', ->
    Register.clause.hide()

  # 修改密码

  Register.changePWBtn.on 'click', ->
    that = $ @
    offset = that.position()
    left = offset.left
    top = offset.top
    Register.changePW.css(
      'left': left + 61
      'top' : top + 67
      ).show()

  # 修改密码框关闭

  Register.changePW.on 'click', 'a.mini-change-close', ->
    Register.changePW.hide()
    Register.hideTip()

  # 修改密码框提交

  # .submit ->
  #   Register.changeSucc.show()
  #   return false
  
  # changeSucc点击隐藏

  Register.changeSucc.on 'click', 'button', ->
    Register.changePW.hide()
    Register.changeSucc.hide()
    Register.hideTip()

  # 注册框切换登录框

  Register.register.on 'click', 'a.mini-reg-login', ->
    Register.register.hide()
    Register.login.show()
    Register.hideTip()

  # 登录框切换注册框

  Register.login.on 'click', 'a.mini-login-reg', ->
    Register.login.hide()
    Register.register.show()
    Register.hideTip()

  # 登录框切换忘记密码框

  .on 'click', 'a.mini-login-fetch', ->
    Register.login.hide()
    Register.fetch.show()
    Register.hideTip()

  # 忘记密码框切换登录框

  Register.fetch.on 'click', 'a.mini-fetch-back', ->
    Register.fetch.hide()
    Register.login.show()
    Register.fetchSucc.hide()
    Register.hideTip()

  # 忘记密码框提交

  # .submit ->
  #   Register.fetchSucc.show()
  #   return false

  # fetchSucc点击隐藏

  Register.fetchSucc.on 'click', 'button', ->
    Register.fetchSucc.hide()
    Register.closeMask().fetch.hide()
    Register.hideTip()

  # logout

  # Register.logout.on 'click', ->
  #   Register.showMask().register.show()

  # 点击浮层关闭弹窗

  Register.mask.on 'click', Register.closeAll

  # 按下ESC关闭弹窗

  $(document).keydown (e) ->
    e.which is 27 and Register.closeAll()
    return

  return