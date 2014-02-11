jQuery(function($){

  $.fn.lazyload = function(){
    return this.each(function(){
      var that = $(this),
          parent = that.parent(),
          index = parent.index(),
          len = parent.parent('ul').find('li').length;

      if(!this.src && (index < 5 || index >= len - 1)){
        this.src = that.data('original')
      }
    })
  }

  // 图片切换插件
  $.fn.nioSlider = function(options){
    return this.each(function(){
      var that = $(this)
      var ul = that.find('ul')
      var prev = that.siblings(options.prev)
      var next = that.siblings(options.next)
      options = $.extend({
        width : 180,
        speed : 600,
        min : 2,
        callback: $.noop
      }, options)

      options.callback.call(that)

      if(ul.find('li').length < options.min){
        return prev.add(next).hide()
      }
      next.show().click(function(){
        if(uniqlo.sliding) return
        uniqlo.sliding = true
        ul.animate({'left' : '-' + options.width}, options.speed, function(){
          ul.children().first().remove().appendTo(ul.css('left', 0))
          uniqlo.sliding = false
          options.callback.call(that)
        })
      })
      prev.show().click(function(){
        if(uniqlo.sliding) return
        uniqlo.sliding = true
        ul.css('left', '-' + options.width + 'px')
          .prepend(ul.children().last().remove())
          .animate({'left' : 0}, options.speed,function(){
            uniqlo.sliding = false
            options.callback.call(that)
        })
      })
    })
  }

  // jQuery easing plugin
  jQuery.easing['jswing'] = jQuery.easing['swing']

  jQuery.extend( jQuery.easing,
  {
      def: 'easeOutExpo',
      swing: function (x, t, b, c, d) {
          return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
      },
      easeOutExpo: function (x, t, b, c, d) {
          return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b
      }
  })


  /* ===================== 内页业务开始 ===================== */

  var uniqlo = {                                           // uniqlo全局对象
    sliding : false,
    cabContainer : $('.mini-cab-container'),
    netContainer : $('.mini-net-container'),
    kvContainer : $('.mini-kv-container'),
    indexContainer: $('.index-slide-container'),
    body : $('html, body'),
    scrollTo : function(top){
      this.body.animate({'scrollTop' : top}, 300)
    },
    cabSlider : function(){
      return this.cabContainer.nioSlider({
        prev: '.mini-cab-prev',
        next: '.mini-cab-next',
        callback: function(){
          this.find("img").lazyload();
        }
      })
    },
    netSlider : function(){
      return this.netContainer.nioSlider({
        prev: '.mini-net-prev',
        next: '.mini-net-next',
        width: 218,
        min : 4
      })
    },
    kvSlider : function(){
      return this.kvContainer.nioSlider({
        prev: '.mini-kv-prev',
        next: '.mini-kv-next',
        width: 200,
        min : 4,
        callback: function(){
          this.find("img").lazyload();
        }
      })
    },
    indexSlider : function(){
      return this.indexContainer.nioSlider({
        prev: '.mini-kv-prev',
        next: '.mini-kv-next',
        width: 210,
        callback: function(){
          this.find("img").lazyload();
        }
      })
    }
  }

  // cab slider
  uniqlo.cabSlider()

  // net slider
  uniqlo.netSlider()

  // bottom kv slider
  uniqlo.kvSlider().find('img').lazyload()

  // index slider
  uniqlo.indexSlider()

  // 导出全局对象供外部使用if need
  $.uniqlo = uniqlo

  /* ============ cabnet交互效果 ============= */

  !(function($){

    var cabnet = {                                         // 集中声明变量
      list      : [],                                      // 保存已添加的图片id
      hoverBox  : $('div.mini-net-hover'),                 // 图片悬浮框
      hoverIsOpen: false,
      netTips   : $('div.mini-net-tips'),
      net       : $('div.mini-net'),                       // 右侧net框
      netConfirm: $('div.mini-net-confirm'),               // 删除确认框
      netSlide  : $('div.mini-net-slide'),                 // 两个图片切换框
      netIsEmpty: true,                                    // net默认为空
      netChoose : $('a.mini-net-choose'),                  // 挑选衣服按钮
      netFail   : $('div.mini-net-fail'),                  // 性别不符
      cab       : $('div.mini-cab'),                       // 左侧的cab框
      cabSlide  : $('div.mini-cab-slide'),                 // cab-slide框
      cabTips   : $('div.mini-cab-tips'),                  // cab提示框
      cabBuy    : $('a.mini-cab-buy'),                     // cab购买按钮
      cabClear  : $('a.mini-cab-clear'),                   // cab清空按钮
      cabPrev   : $('a.mini-cab-prev'),                    // cab-prev按钮
      cabNext   : $('a.mini-cab-next'),                    // cab-next按钮
      cabChoose : $('form.mini-cab-choose'),               // cab-choose框
      cabDetail : $('div.mini-cab-detail'),                // cab-detail框
      buyIsShow : false,                                   // cab-choose默认隐藏
      cabEmpty  : $('a.mini-cab-empty'),                   // cab-empty框
      netLike   : $('a.mini-net-like'),                    // net-like按钮
      netHad    : $('a.mini-net-had'),                     // net-had按钮
      miniAside : $('div.mini-aside'),                     // mini-aside
      miniSucc  : $('div.mini-succ'),                      // alert提示框
      miniFail  : $('div.mini-fail'),                      // fail提示框
      miniMask  : $('div.mini-mask')                       // 半透明浮层
    }
    cabnet.netEmpty = cabnet.net.find('a.mini-net-empty')  // netSlide提示框


    /* == net交互 == */

    cabnet.net.on('add', function(e, id){                  // 注册netSlide的被添加自定义事件
      if(cabnet.netIsEmpty){
        cabnet.netEmpty.addClass('mini-net-scale')         // 隐藏net为空提示框
      }
      cabnet.list.push(id)                                 // 保存图片id
      cabnet.netIsEmpty = false

      uniqlo.netSlider()                                   // 运行net slider
    })

    cabnet.net.on('del', function(e, id){                  // 注册netSlide的被删除自定义事件
      var arr = cabnet.list
      for(var i = arr.length; i --;){
        if(arr[i] === id){
          cabnet.list.splice(i, 1)
        }
      }

      if(!cabnet.list.length){
        cabnet.netEmpty.removeClass('mini-net-scale')
        cabnet.netIsEmpty = true
      }

      uniqlo.netSlider()                                   // 运行net slider
    })

    cabnet.netSlide.on('mousemove', 'img', function(e){    // netSlide图片悬浮效果
      e.stopPropagation()
      if(uniqlo.sliding) return

      var position = $(this).position()
      var thisSlide = $(e.delegateTarget)
      var pos = thisSlide.data('pos')
      var top = pos === '#cab-top' ? 56 : 322
      var restSlide = thisSlide.siblings('div.mini-net-slide')

      netHoverCallback.call(this, pos, restSlide)          // 图片悬浮的callback里处理细节
      
      cabnet.hoverBox.css({                                // 显示图片悬浮框
        left: position.left + 26,
        top: position.top + top
      }).show()
      cabnet.hoverIsOpen = true
    })

    cabnet.hoverBox.on('mouseleave', function(){           // hoverBox鼠标离开后隐藏全部

      cabnet.hoverBox.hide()
      cabnet.hoverIsOpen = false
      cabnet.netConfirm.hide()
      cabnet.netFail.hide()
      clearTimeout(cabnet.netFail.timer)
      cabnet.netLike.add(cabnet.netHad).removeClass('mini-net-checked')
    
    }).on('click', function(){                             // 点击任意位置添加至搭配间

      addCabCallback.call(this)                            // 添加至左侧的callback

    }).on('click', 'a.mini-net-del', function(e){          // 点击删除按钮弹出confirm

      cabnet.netConfirm.show()
      e.stopPropagation()

    }).on('click', 'a.mini-net-detail', function(e){

      e.stopPropagation()

    })

    cabnet.netConfirm.on('click', false)                   // confirm点击任意位置不冒泡
    .on('click', 'a.mini-net-yes', function(e){            // confirm确认删除

      delNetCallback.call(this)                            // netSlide被删除的回调
      e.stopPropagation()
    
    }).on('click', 'a.mini-net-no', function(e){           // confirm取消删除

      cabnet.netConfirm.hide()
      e.stopPropagation()

    })

    // cabnet.netLike.add(cabnet.netHad).on('click', function(e){

    //   $(this).toggleClass('mini-net-checked')              // '喜欢'与'已买入'的类名切换
    //   e.stopPropagation()

    // })
    netLikeHad(cabnet.netLike, 'like')
    netLikeHad(cabnet.netHad, 'had')


    function netLikeHad(ele, data){
      ele.on('click', function(e){
        e.stopPropagation()

        var that = $(this)
        var img = cabnet.netSlide.find('#' + cabnet.hoverBox.data('id'))

        that.addClass('mini-net-checked')

        if(that.hasClass('mini-net-checked')){
          img.data(data, true)
        } else {
          img.removeData(data)
        }

      })
    }

    cabnet.netEmpty.add(cabnet.cabEmpty).add(cabnet.netChoose).on('click', function(){
      uniqlo.scrollTo(694)
    })

    cabnet.netFail.on('click', function(e){
      e.stopPropagation()
      cabnet.netFail.trigger('hidden')
    }).on('shown', function(e, bool){
      cabnet.netFail.find('h5').text(bool ? '这件与您搭配间中的衣物性别不符哦' : '儿童装和婴幼儿装是不能做搭配的哦')
      cabnet.netFail.show()
      cabnet.netFail.timer = setTimeout(function(){
        cabnet.netFail.trigger('hidden')
      }, 3000)
    }).on('hidden', function(){
      cabnet.netFail.hide()
    })

    /* == cab交互 == */

    cabnet.cab.ajax = cabnet.cab.isEmpty = true            // cab默认为空，默认读取后台
    cabnet.cab.pos = null                                  // 记录cab中添加的上衣/下衣
    cabnet.cab.on('add', function(e, pos, id){             // 注册cabSlide的被添加自定义事件
      var tag = cabnet.hoverBox.data('tag')
      var src = cabnet.hoverBox.data('src')

      cabnet.cabChoose.trigger('hidden')

      if(cabnet.cab.isEmpty){                              // 第一次点击net上衣/下衣图片
        cabnet.cab.isEmpty = false

        cabnet.cabTips.show()
        cabnet.cabEmpty.hide()
        cabnet.cabBuy.addClass('show')
        cabnet.cabClear.show()

        cabnet.cab.pos = pos                               // 记录pos
        cabAjaxCallback(tag, id, src, pos)                 // 第一次读取后台ajax

      } else {                                             // 第二次点击net上衣/下衣图片

        if(cabnet.cab.pos == pos && cabnet.cab.ajax){      // 如果点击同样的上衣/下衣

          cabAjaxCallback(tag, id, src, pos)

        } else {

          if(cabnet.cab.ajax){
            cabnet.cabPrev.hide()
            cabnet.cabNext.hide()
          }
          cabnet.cab.ajax = false

        }
      }
    }).on('click', function(){                             // 点击整个cab框关闭tips

      cabnet.cabTips.remove()

    })

    function HoverImg(bin){
      this.bin = bin.find('div.mini-cab-container')
      this.timer = null
      this.detail = bin.find('div.mini-cab-detail')
      this.init()
    }
    HoverImg.prototype.init = function(){
      var that = this
      this.bin.on('mouseenter', function(){
        clearTimeout(that.timer)
        // if(uniqlo.sliding) return false
        var img = $(this).find('img').get(0)
        if(img) cabImgCallback.call(img)                   // cab中的图片
      }).on('mouseleave', function(){
        clearTimeout(that.timer)
        that.timer = setTimeout(function(){
          that.detail.hide()
        },300)
      })

      this.detail.on('mouseenter', function(){
        clearTimeout(that.timer)
      }).on('mouseleave', function(){
        that.detail.hide()
      })
    }
    new HoverImg($('#cab-top'))
    new HoverImg($('#cab-bot'))

    cabnet.cabBuy.on('click', function(){                  // 点击购买弹出form

      if(!cabnet.buyIsShow){

        cabnet.cabChoose.trigger('shown')

      } else{

        var url = cabnet.cabChoose.find('input:checked').val()

        if(url == 'undefined') return alert('您还没有选择这类衣服')
        window.open(url)

      }

    })

    cabnet.cabChoose.on('click', 'a', function(){

      cabnet.cabChoose.trigger('hidden')

    }).on('click','input', function(){

      var pos = this.getAttribute('pos')
      this.value = $(pos).find('img').first().attr('url')

    }).on('hidden', function(){

      cabnet.cabChoose.hide()

      cabnet.cabBuy.text('我要购买')

      cabnet.buyIsShow = false

    }).on('shown', function(){

      cabnet.cabChoose.show().find('input').first().trigger('click')

      cabnet.cabBuy.text('前往优衣库旗舰店')

      cabnet.buyIsShow = true

    })

    cabnet.cabSlide.on('click', function(){

      cabnet.cabChoose.trigger('hidden')

    })

    cabnet.cabClear.on('click', function(){                // 清空cab
      cabnet.cab.ajax = cabnet.cab.sex = cabnet.cab.isEmpty = true          // 重置cab默认状态
      cabnet.cabSlide.find('ul').html('')
      cabnet.cabTips.hide()
      cabnet.cabBuy.removeClass('show')
      cabnet.cabClear.hide()
      cabnet.cabPrev.hide()
      cabnet.cabNext.hide()
      cabnet.cabChoose.hide()
      cabnet.cabEmpty.show()
      cabnet.cabDetail.hide()
    })

    // cabnet.cabDetail.on('click', 'a.mini-detail-close', function(){
    //   this.parentNode.style.display = 'none'
    // })

    /* == 内页kv交互 == */

    cabnet.kvSlide = $('div.mini-kv-slide')                // kv-slide框
    cabnet.kvHover = $('div.mini-kv-hover')                // kv-hover框
    cabnet.kvTimer = 0                                     // kv-hover框延迟
    cabnet.kvIsOpen = false                                // kv-hover状态
    cabnet.kvHover.price = cabnet.kvHover.find('strong')   // kv-hover价格
    cabnet.kvHover.rest = cabnet.kvHover.find('span')      // kv-hover余量
    cabnet.kvHover.title = cabnet.kvHover.find('a.ft14')   // kv-hover产品名

    cabnet.kvSlide.on('mousemove', 'img', function(e){     // kvSlide图片悬浮

      var isIndexPage = cabnet.kvSlide.parents('div.index-bin').data('page')

      if(uniqlo.sliding) return

      var position = $(this).position()
      var thisSlide = $(e.delegateTarget)
      var pos = thisSlide.data('pos')
      var top = 110
      if(pos){
        top = pos == '#net-top' ? 13 : 200
        cabnet.kvHover.find('a.mini-kv-add').text('收入衣柜')
      } else {
        cabnet.kvHover.find('a.mini-kv-add').text('查看详情')
      }

      kvHoverCallback.call(this, pos, isIndexPage)         // 图片悬浮的callback里处理细节

      cabnet.kvTimer = setTimeout(function(){

        cabnet.kvHover.css({                               // 显示图片悬浮框
          left: position.left + 55,
          top: position.top + top
        }).show()
        cabnet.kvIsOpen = true

      }, 100)

    }).on('mouseout', function(){
      clearTimeout(cabnet.kvTimer)
    })

    cabnet.kvHover.on('mouseleave', function(){            // kvHover自动隐藏
      cabnet.kvHover.hide()
      cabnet.kvIsOpen = false
    }).on('click', 'a.mini-kv-add', function(){            // 点击添加衣柜
      var id = cabnet.kvHover.data('id')

      var target = this.getAttribute('target')
      if(target) return

      cabnet.miniMask.show()
      if(-1 != $.inArray(id, cabnet.list)){
        cabnet.miniFail.show()                             // 提示已添加
      } else {
        cabnet.miniSucc.show()
        addNetCallback.call(this, id)                      // netSlide被添加的回调
      }
    })

    cabnet.miniSucc.on('click', 'a', function(){           // miniSucc提示框
      cabnet.miniSucc.hide()
      succNfail.call(this)
    })

    cabnet.miniFail.on('click', 'a', function(){           // miniFail提示框
      cabnet.miniFail.hide()
      succNfail.call(this)
    })
    
    function succNfail(){
      cabnet.miniMask.hide()
      if(this.className === 'mini-succ-enter'){
        uniqlo.scrollTo(0)
      }
    }

    $(document).mousemove(function(e){
      var div = $(e.target).closest('div')
      if(!div.is(cabnet.kvHover) && cabnet.kvIsOpen){
        cabnet.kvHover.hide()
        cabnet.kvIsOpen = false
      }
      if(cabnet.hoverIsOpen && !div.is(cabnet.hoverBox) && !div.is(cabnet.netTips)){
        if(div.is(cabnet.netFail) || div.is(cabnet.netConfirm)) return
        cabnet.hoverBox.hide()
        cabnet.hoverIsOpen = false
      }
    })

    /* == cab、net、kv系列回调函数 == */

    function addCabCallback(){                             // 添加至左侧的callback

      var id = cabnet.hoverBox.data('id')
      var pos = cabnet.hoverBox.data('pos')                // 添加对应cab的图片
      var url = ' url="' + cabnet.hoverBox.data('url') + '"'
      var price = ' price="' + cabnet.hoverBox.data('price') + '"'
      var rest = ' rest="' + cabnet.hoverBox.data('rests') + '"'
      var alt = ' alt="' + cabnet.hoverBox.data('alt') + '"'
      var src = ' src="' + cabnet.hoverBox.data('src') + '"'
      var ids = ' id="' + id + '"'
      var sex = cabnet.hoverBox.data('sex')
      var fg = +cabnet.hoverBox.data('fg')

      if(cabnet.cab.isEmpty){
        cabnet.cab.sex = sex
      } else if(cabnet.cab.sex !== sex && cabnet.cab.pos !== pos){
        return cabnet.netFail.trigger('shown', true)
      }
      if(!cabnet.cab.isEmpty && cabnet.cab.sex == 3 && cabnet.cab.pos !== pos){

        if(cabnet.cab.fg == 75){

          if(fg != 86)  return cabnet.netFail.trigger('shown')
        
        } else if(cabnet.cab.fg == 86) {
        
          if(fg != 75)  return cabnet.netFail.trigger('shown')
        
        } else {

          if(fg == 75 || fg == 86) return cabnet.netFail.trigger('shown')

        }
      }
      cabnet.cab.fg = fg

      $(pos).find('ul').html('<li><img ' + ids + src + url + price + rest + alt + ' /></li>')

      cabnet.cab.trigger('add', [pos, id])                 // 触发cab的被添加自定义事件
    }

    function netHoverCallback(pos, rest){                  // 图片悬浮的callback

      var like = $(this).data('like')
      var had = $(this).data('had')
      var url = this.getAttribute('url')
      var alt = this.getAttribute('alt')
      var rests = this.getAttribute('rest')
      var price = this.getAttribute('price')
      var tag = this.getAttribute('tag')
      var csex = this.getAttribute('csex')
      var fg = this.getAttribute('fg')
      cabnet.hoverBox
      .find('h3').text((csex?(csex+': ') : '') + tag + '风格')
      .end().find('span').text(this.getAttribute('place') + '装')
      .end().find('img').attr('src', this.src)
      .end().find('a.mini-net-detail').attr('href', url)
      .end().find('strong').text(this.getAttribute('price'))

      cabnet.netLike.addClass(like ? 'mini-net-checked' : '')
      cabnet.netHad.addClass(had ? 'mini-net-checked' : '')

      cabnet.hoverBox.data({
        'pos': pos,                                        // 保存thisSlide映射到cab的id
        'rest': rest,                                      // 保存restSlide
        'id' : this.id,                                    // 保存图片id
        'src' : this.src,                                  // 保存图片src
        'tag' : tag,
        'fg' : fg,
        'sex' : this.getAttribute('sex'),
        'price': price,
        'alt': alt,
        'rests': rests,
        'url' : url                                        // 保存图片url
      })
    }

    function cabAjaxCallback(tag, id, src, pos){           // 这里的ajaxCallback只是测试用
      var ul = cabnet.hoverBox.data('rest').find('ul').html() // 待删除
      $(pos).siblings('.mini-cab-slide').find('ul').html(ul)  // 待删除

      console.log(tag)                                     // 图片标签
      console.log(id)                                      // 图片id
      console.log(src)                                     // 图片src

      // !!读取数据后执行slider切换，必要
      uniqlo.cabSlider()
    }

    function kvHoverCallback(pos, isIndexPage){            // 参数pos保存了上衣/下衣类型

      var url = this.getAttribute('url')
      var price = this.getAttribute('price')
      var rest = this.getAttribute('rest')
      var alt = this.getAttribute('alt')

      cabnet.kvHover.price.text(price)
      cabnet.kvHover.rest.text(rest)
      cabnet.kvHover.title.text(alt).attr('href', url)

      cabnet.kvHover.data({                                // 保存图片src与id等信息
        'src' : this.getAttribute('src'),
        'tag' : this.getAttribute('tag'),
        'place' : this.getAttribute('place'),
        'price' : price,
        'url' : url,
        'rest': rest,
        'alt': alt,
        'id' : this.id,
        'fg' : this.getAttribute('fg'),
        'csex': this.getAttribute('csex'),
        'sex' : this.getAttribute('sex'),
        'pos' : pos
      })

      var btn = cabnet.kvHover.find('a.mini-kv-add')

      if(!pos){
        btn.attr({'href': url, 'target': '_blank'})
      } else if(isIndexPage){
        btn.attr('href', this.getAttribute('miniUrl'))
      } else {
        btn.attr({'href': 'javascript:;', 'target': null})
      }
    }

    function addNetCallback(id){
      var pos = cabnet.kvHover.data('pos')
      var src = ' src="' + cabnet.kvHover.data('src') + '"'
      var sex = ' sex="' + cabnet.kvHover.data('sex') + '"'
      var tag = ' tag="' + cabnet.kvHover.data('tag') + '"'
      var csex= ' csex="' + cabnet.kvHover.data('csex') + '"'
      var url = ' url="' + cabnet.kvHover.data('url') + '"'
      var place = ' place="' + cabnet.kvHover.data('place') + '"'
      var price = ' price="' + cabnet.kvHover.data('price') + '"'
      var alt = ' alt="' + cabnet.kvHover.data('alt') + '"'
      var rest = ' rest="' + cabnet.kvHover.data('rest') + '"'
      var ids = ' id="' + id + '"'
      var fg  = ' fg="' + cabnet.kvHover.data('fg') + '"'
      var img = '<img' + src + sex + csex + tag + url + place + price + alt + rest + ids + fg + ' />'
      $(pos).find('ul').prepend('<li>' + img + '</li>')     // netSlide添加图片
      cabnet.net.trigger('add', id)                         // 触发netSlide的被添加自定义事件
    }

    function delNetCallback(){
      var id = cabnet.hoverBox.data('id')
      cabnet.hoverBox.fadeOut('normal', function(){
        cabnet.hoverIsOpen = false
      })
      cabnet.netSlide.find('#' + id).parent('li').fadeOut('normal', function(){
        $(this).remove()
        cabnet.net.trigger('del', id)                       // 触发netSlide的被删除自定义事件
      })
    }

    function cabImgCallback(){
      var that = $(this)
      var detail = that.parents('div.mini-cab-slide').find('div.mini-cab-detail')
      detail.find('h3 a').text(this.getAttribute('alt'))
      detail.find('strong').text(this.getAttribute('price'))
      detail.find('span').text(this.getAttribute('rest'))
      detail.find('a').attr('href', this.getAttribute('url'))
      detail.show()
    }


  }($))

  /* ========= index-bin && mini-cate ========= */
  
  !(function($){

    var index = {                                                // 首页变量
      box: $('div.index-box'),
      bin : $('div.index-bin'),
      btn : $('a.index-btn'),
      binIsOpen: false,
      wea : $('div.index-wea'),
      bar : $('div.index-bar'),
      p0 : $('li.index-p-0'),
      gender: $('ul.mini-gender'),
      suit: $('div.mini-gender'),
      tips: $('div.mini-gender-tips'),
      place: $('ul.index-bar-place'),
      week: $('ul.mini-week'),
      singleSlide: $('div.index-single'),
      suitSlide: $('div.index-suit'),
      suitIsOpen: false,

      closeBin: function(){
        index.bin.add(index.bar).animate({'top': '-507px'}, 600, function(){
          index.binIsOpen = false
        })
        index.box.animate({'height' : 0}, 600)

        index.bin.trigger('binClose')
      },
      openBin: function(){
        index.bin.add(index.bar).animate({'top': 0}, 600, function(){
          index.binIsOpen = true
        })
        index.box.animate({'height': 507}, 600)

        index.bin.trigger('binOpen')
      },
      togClass: function(ele, cls){
        ele.addClass(cls).siblings('.' + cls).removeClass(cls)
      }
    }

    index.genderLi = index.gender.find('li')
    index.all = index.genderLi.eq(0)

    index.bin.on('binOpen', function(){                       // 下拉框展开时一切归位
      index.togClass(index.p0, 'index-p-checked')

      index.togClass(index.all, 'mini-gender-checked')

      index.suit.removeClass('mini-gender-checked')

      if (index.suitIsOpen)
      index.suitSlide.trigger('suitClose')

      index.btn.css({
        'bottom': '18px',
        'background-position': '0 0'
      })

    })
    index.bin.on('binClose', function(){                      // 下拉框收缩

      index.btn.css({
        'bottom': '0',
        'background-position': '0 -18px'
      })

    })

    index.suitSlide.on('suitOpen', function(){                // 显示套装
      index.suitSlide.show().prev().hide()
      index.suitIsOpen = true
    }).on('suitClose', function(){
      index.suitSlide.hide().prev().show()
      index.suitIsOpen = false
    })

    index.place.on('click', 'li', function(){                 // 首页场合切换
      if(index.suitIsOpen) {
        index.suit.removeClass('mini-gender-checked')

        index.suitSlide.trigger('suitClose')
      }

      var that = $(this)
      index.togClass(that, 'index-p-checked')
      that.is('li.index-p-4') && index.tips.trigger('shown')
      getRandPro()
    })

    index.week.on('click', 'li', function(){                  // 首页天气切换
      var that = $(this)
      index.togClass(that, 'mini-checked')
      $.weather.init({
        index : that.index() + 1
      })
      getRandPro()
    })

    $('a.index-btn').on('click', function(){
      if(index.binIsOpen){
        index.closeBin()
      } else {
        index.openBin()
      }
    })

    index.tips.on('click', function(){
      index.tips.fadeOut()
    }).on('shown', function(){
      index.tips.show()
      setTimeout(function(){
        index.tips.trigger('click')
      }, 3000)
    })

    index.wea.on('mouseenter', function(){
      if(!index.binIsOpen){
        index.openBin()
      }
    })

    $.uniqlo.index = index

    var cate = {
      cate : $('div.mini-cate'),
      ps   : $('div.mini-cate-ps'),
      place: $('div.mini-cate-place'),
      placeUl: $('ul.mini-place-ul'),
      placeAll: $('a.mini-p-0'),
      style: $('div.mini-cate-style'),
      styleUl: $('ul.mini-style-ul'),
      styleAll: $('a.mini-s-0'),
      design:$('div.mini-design'),
      designAll: $('a.mini-design-all'),
      designMore:$('a.mini-design-more'),

      placeArr: {
        'All': {
          '商务': 1, '旅游': 2, '运动': 3, '居家': 4
        },
        'WOMEN': {
          '商务': 1, '旅游': 2, '运动': 3, '居家': 4, '逛街': 5, '约会': 6
        },
        'MEN': {
          '商务': 1, '旅游': 2, '运动': 3, '居家': 4, '逛街': 5, '约会': 6
        },
        'KIDS BABY': {
          '上学': 1, '旅游': 2, '运动': 3, '居家': 4, '逛街': 5, '玩乐': 6
        }
      },
      styleArr:{
        'All': {
          '休闲' : 6, '复古' : 7, '英伦' : 8, '学院' : 9
        },
        'WOMEN': {
          '休闲' : 6, '可爱' : 1, '淑女' : 2, '森女' : 3, '酷': 4, '成熟' : 5, '复古' : 7, '英伦' : 8, '学院' : 9, '中性' : 10
        },
        'MEN': {
          '休闲' : 6, '潮' : 11, '斯文' : 12, '自然' : 13, '酷' : 14, '成熟' : 15, '复古' : 17, '英伦' : 18, '学院' : 19, '中性' : 20
        },
        'KIDS BABY': {
          '休闲' : 6, '可爱' : 21, '淑女' : 22, '潮' : 23, '酷' : 24, '复古' : 26, '英伦' : 27, '学院' : 28
        }
      }
    }

    cate.designMore.on('click', function(){                   // 更多款式切换
      $(this).toggleClass('mini-design-less')
      .parent().prev().toggleClass('mini-design-auto')
    })

    cate.designAll.on('click', function(e, str){              // 所有款式
      if(index.suitIsOpen) {
        index.suit.removeClass('mini-gender-checked')

        index.suitSlide.trigger('suitClose')
      }
      cate.design.find('.mini-design-checked').removeClass('mini-design-checked')
      cate.designAll.addClass('mini-design-checked').trigger('checked')
      cate.design.left.length = cate.design.right.length = 0

      if('stop' === str) return false

      getRandPro()
    }).on('checked', function(){
      cate.designAll.parents('div.mini-fm').addClass('mini-checked-all')
    }).on('unchecked', function(){
      cate.designAll.parents('div.mini-fm').removeClass('mini-checked-all')
    })

    cate.design.left = []                                     // 选中的上衣id数组
    cate.design.right = []                                    // 选中的下衣id数组
    cate.design.on('click', 'li a', function(){               // 其他任何款式
      if(index.suitIsOpen) {
        index.suit.removeClass('mini-gender-checked')

        index.suitSlide.trigger('suitClose')
      }
      var that = $(this)
      cate.designAll.removeClass('mini-design-checked').trigger('unchecked')
      that.toggleClass('mini-design-checked')

      var thisArr = cate.design[that.parents('ul').data('pos')]
      if(that.hasClass('mini-design-checked')){
        thisArr.push(this.id)
      } else {
        var i = $.inArray(this.id, thisArr)
        if(i !== -1){
          thisArr.splice(i, 1)
        }
      }

      var leftLen = cate.design.left.length
      var rightLen = cate.design.right.length
      if(leftLen + rightLen == 28 || leftLen + rightLen === 0){
        $.uniqlo.fid = 0
      } else {
        $.uniqlo.fid = ''

        if(leftLen != 0){
          $.uniqlo.fid = cate.design.left.join('_')

          if(rightLen != 0){
            $.uniqlo.fid += '_' + cate.design.right.join('_')
          }
        } else {
          if(rightLen != 0){
            $.uniqlo.fid = cate.design.right.join('_')
          }
        }
      }

      if(leftLen + rightLen === 0){
        return cate.designAll.trigger('click')
      }

      console.log($.uniqlo.fid)

      getRandPro()
    })

    cate.ps.on('click', 'li', function(){                     // 穿衣场合和穿衣风格
      if(index.suitIsOpen) {
        index.suit.removeClass('mini-gender-checked')

        index.suitSlide.trigger('suitClose')
      }

      var that = $(this)
      index.togClass(that, 'mini-cate-checked')
      that.parent().prev().removeClass('mini-cate-checked')
      if(that.is('li.mini-p-4')){
        index.tips.trigger('shown')
      }
      getRandPro()

    }).on('click', 'a.mini-cate-more', function(e){           // 下拉三角显示更多

      $(this).hide().closest('ul').css('height', 'auto').find('a.mini-cate-less').show()
      e.stopPropagation()

    }).on('click', 'a.mini-cate-less', function(e){           // 收起三角

      cate.ps.trigger('cateUlHide', this)
      e.stopPropagation()

    }).on('click', 'a.mini-p-0', function(){                  // 场合全部按钮
      if(index.suitIsOpen) {
        index.suit.removeClass('mini-gender-checked')

        index.suitSlide.trigger('suitClose')
      }

      $(this).addClass('mini-cate-checked')
      cate.place.find('li.mini-cate-checked').removeClass('mini-cate-checked')
      getRandPro()

    }).on('click', 'a.mini-s-0', function(){                  // 风格全部按钮
      if(index.suitIsOpen) {
        index.suit.removeClass('mini-gender-checked')

        index.suitSlide.trigger('suitClose')
      }

      $(this).addClass('mini-cate-checked')
      cate.style.find('li.mini-cate-checked').removeClass('mini-cate-checked')
      getRandPro()

    }).on('cateUlHide', function(e, ele){                     // 收起design的UL

      $(ele).hide().closest('ul').css('height', 77).find('a.mini-cate-more').show()

    })

    var wclist = '[{"id":"3","name":"\u5546\u52a1","c":1},{"id":"4","name":"\u901b\u8857","c":2},{"id":"5","name":"\u65c5\u6e38","c":3},{"id":"6","name":"\u7ea6\u4f1a","c":4},{"id":"7","name":"\u8fd0\u52a8","c":5},{"id":"8","name":"\u5c45\u5bb6","c":6}]';
    var wflist = '[{"id":"21","name":"\u53ef\u7231","c":1},{"id":"22","name":"\u6dd1\u5973","c":2},{"id":"23","name":"\u68ee\u5973","c":3},{"id":"24","name":"\u9177","c":4},{"id":"25","name":"\u6210\u719f","c":5},{"id":"26","name":"\u4f11\u95f2","c":6},{"id":"27","name":"\u590d\u53e4","c":7},{"id":"28","name":"\u82f1\u4f26","c":8},{"id":"29","name":"\u5b66\u9662","c":9},{"id":"30","name":"\u4e2d\u6027","c":10}]';
    var mclist = '[{"id":"9","name":"\u5546\u52a1","c":1},{"id":"10","name":"\u901b\u8857","c":2},{"id":"11","name":"\u65c5\u6e38","c":3},{"id":"12","name":"\u7ea6\u4f1a","c":4},{"id":"13","name":"\u8fd0\u52a8","c":5},{"id":"14","name":"\u5c45\u5bb6","c":6}]';
    var mflist = '[{"id":"31","name":"\u6f6e","c":1},{"id":"32","name":"\u65af\u6587","c":2},{"id":"33","name":"\u81ea\u7136","c":3},{"id":"34","name":"\u9177","c":4},{"id":"35","name":"\u6210\u719f","c":5},{"id":"36","name":"\u4f11\u95f2","c":6},{"id":"37","name":"\u590d\u53e4","c":7},{"id":"38","name":"\u82f1\u4f26","c":8},{"id":"39","name":"\u5b66\u9662","c":9},{"id":"40","name":"\u4e2d\u6027","c":10}]';
    var cclist = '[{"id":"15","name":"\u4e0a\u5b66","c":1},{"id":"16","name":"\u901b\u8857","c":2},{"id":"17","name":"\u65c5\u6e38","c":3},{"id":"18","name":"\u73a9\u4e50","c":4},{"id":"19","name":"\u8fd0\u52a8","c":5},{"id":"20","name":"\u5c45\u5bb6","c":6}]';
    var cflist = '[{"id":"41","name":"\u53ef\u7231","c":1},{"id":"42","name":"\u6dd1\u5973","c":2},{"id":"43","name":"\u6f6e","c":3},{"id":"44","name":"\u9177","c":4},{"id":"45","name":"\u4f11\u95f2","c":5},{"id":"46","name":"\u590d\u53e4","c":6},{"id":"47","name":"\u82f1\u4f26","c":7},{"id":"48","name":"\u5b66\u9662","c":8}]';
    var mcarr = '[{"id":"3_9_","name":"\u5546\u52a1","c":1},{"id":"5_11_17","name":"\u65c5\u6e38","c":2},{"id":"7_13_19","name":"\u8fd0\u52a8","c":3},{"id":"8_14_20","name":"\u5c45\u5bb6","c":4}]';
    var mfarr = '[{"id":"26_36_45","name":"\u4f11\u95f2","c":6},{"id":"27_37_46","name":"\u590d\u53e4","c":7},{"id":"28_38_47","name":"\u82f1\u4f26","c":8},{"id":"29_39_48","name":"\u5b66\u9662","c":9}]';

    mcarr = $.parseJSON(mcarr)
    mfarr = $.parseJSON(mfarr)
    wclist = $.parseJSON(wclist)
    wflist = $.parseJSON(wflist)
    mclist = $.parseJSON(mclist)
    mflist = $.parseJSON(mflist)
    cclist = $.parseJSON(cclist)
    cflist = $.parseJSON(cflist)

    $.each([wclist, mclist, cclist], function(index, arr) {
      for(var i = arr.length; i --;){
        switch(arr[i].name){
          case('逛街'): arr[i].c = 5;break;
          case('旅游'): arr[i].c = 2;break;
          case('约会'): arr[i].c = 6;break;
          case('运动'): arr[i].c = 3;break;
          case('居家'): arr[i].c = 4;break;
          case('玩乐'): arr[i].c = 6;break;
        }
      }
    })
    for(var i = mflist.length; i--;){
      switch(mflist[i].name){
        case('潮'): mflist[i].c = 11;break;
        case('斯文'): mflist[i].c = 12;break;
        case('自然'): mflist[i].c = 13;break;
        case('酷'): mflist[i].c = 14;break;
        case('成熟'): mflist[i].c = 15;break;
        case('休闲'): mflist[i].c = 6;break;
        case('复古'): mflist[i].c = 17;break;
        case('英伦'): mflist[i].c = 18;break;
        case('学院'): mflist[i].c = 19;break;
        case('中性'): mflist[i].c = 20;break;
      }
    }
    for(var i = cflist.length; i--;){
      switch(cflist[i].name){
        case('可爱'): cflist[i].c = 21;break;
        case('淑女'): cflist[i].c = 22;break;
        case('潮"'): cflist[i].c = 23;break;
        case('酷'): cflist[i].c = 24;break;
        case('休闲'): cflist[i].c = 6;break;
        case('复古'): cflist[i].c = 26;break;
        case('英伦'): cflist[i].c = 27;break;
        case('学院'): cflist[i].c = 28;break;
      }
    }

    $.uniqlo.all = [mcarr,mfarr]
    $.uniqlo.women = [wclist,wflist]
    $.uniqlo.men = [mclist,mflist]
    $.uniqlo.kids = [cclist,cflist]

    index.gender.on('click', 'a', function(){                  // 内页性别切换
      var that = $(this)
      var parent = that.parent()
      index.togClass(parent, 'mini-gender-checked')

      index.gender.trigger('genderChange', that.data('key'))
      cate.designAll.trigger('click')

      var kids = that.parents('div.index-bar').find('li.index-p-kids')

      if(that.data('page')){                                   // 首页的kids
        kids.show().prev().hide()
      } else {
        kids.hide().prev().show()
      }

      getRandPro()
    }).on('genderChange', function(e, key){
      //var jujia = $('li.mini-p-4').is('.mini-cate-checked')

      if(key){
        setUl($.uniqlo[key][0], 'place', 'p')
        setUl($.uniqlo[key][1], 'style', 's')
      }

      cate.ps.find('a.mini-cate-less').each(function(){
        cate.ps.trigger('cateUlHide', this)
      })

      // reset index-ps
      if(!index.suitIsOpen){
        cate.place.add(cate.style).find('li.mini-cate-checked').removeClass('mini-cate-checked')
        cate.placeAll.add(cate.styleAll).addClass('mini-cate-checked')

        index.place.find('li').first().trigger('click')
      }
      // if(jujia && index.suitIsOpen){
      //   cate.placeUl.find('li.mini-p-4').click()
      // }
      if(index.suitIsOpen){
        cate.ps.find('a.mini-p-0,a.mini-s-0').addClass('mini-cate-checked')
      }

    })

    index.suit.on('click', 'a', function(){
      cate.designAll.trigger('click', 'stop')

      index.tips.trigger('click')
      index.suit.toggleClass('mini-gender-checked')

      if(index.suitIsOpen){
        index.suitSlide.trigger('suitClose')
        cate.designAll.trigger('checked').addClass('mini-design-checked')
        // resetGender()
      } else {
        index.suitSlide.trigger('suitOpen')
        cate.designAll.trigger('unchecked').removeClass('mini-design-checked')
        // resetGender()
        // onSuitOpen()
      }
    })

    index.netEmpty = index.bin.find('a.mini-net-empty')       // 搜索結果为空红框
    index.netEmpty.on('click', resetGender)

    function resetGender(){
      index.gender.find('a').first().trigger('click')
    }

    // function onSuitOpen(){
    //   index.togClass(cate.placeUl.find('li.mini-p-4'), 'mini-cate-checked')
    //   index.togClass(cate.styleUl.find('li.mini-s-6'), 'mini-cate-checked')
    //   cate.placeAll.add(cate.styleAll).removeClass('mini-cate-checked')

    //   index.togClass(index.place.find('li.index-p-4'), 'index-p-checked')
    // }

    function setUl(arr, str, c){
      var html = '', obj

      for(var i = 0, len = arr.length; i < len; i ++){
        obj = arr[i]
        html += '<li id="' + obj.id + '" class="mini-' + c + '-' + obj.c + '">' + obj.name + '</li>'
      }
      cate[str + 'Ul'].html(html)

      var li = cate[str + 'Ul'].find('li')
      if(li.length > 4){
        li.eq(3).append('<a href="javascript:;" class="mini-cate-more mini-btn">more</a>')
        li.last().append('<a href="javascript:;" class="mini-cate-less mini-btn">less</a>')
      }

    }

    function getRandPro(){                                    // for demo
        if(index.suitIsOpen){
          setImg(index.suitSlide.find('img'))
        } else {
          index.singleSlide.find('div.mini-kv-slide').each(function(){
            setImg($(this).find('img'))
          })
        }
      }

    function setImg(img){                                     // for demo
      var temp
      for(var i = 0, len = img.length; i < len; i ++){
        temp = img.eq(i).attr('src')
        img.eq(i).attr('src', img.eq(i + 1).attr('src'))
        img.eq(i + 1).attr('src', temp)
      }
    }

  }($))

  /* =============== mini-aside =============== */

  !(function($){
    $('.mini-aside').on('click', 'li', function(){
      var target = $(this).data('nav')
      target && uniqlo.scrollTo( target === 'top' ? 0 : $('.' + target).offset().top)
    })

    var aside = {
      msg : $('li.mini-aside-msg'),
      form: $('form.mini-aside-form'),
      formIsOpen: false,
      select: $('div.mini-select'),
      input: $('#mini-select'),
      options: $('ul.mini-options'),
      optionsIsOpen: false,
      succ : $('div.mini-aside-succ')
    }

    aside.msg.on('click', function(){
      aside.form.trigger(aside.formIsOpen? 'hidden' : 'shown')
    })

    aside.form.on('click', 'a.mini-form-close', function(){
      aside.form.trigger('hidden')
    }).on('click', function(e){
      e.stopPropagation()
    }).on('shown', function(){
      aside.form.show()
      aside.formIsOpen = true
    }).on('hidden', function(){
      aside.form.hide()
      aside.formIsOpen = false
    })

    aside.select.on('click', function(){
      aside.options.trigger(aside.optionsIsOpen? 'optionsHide' : 'optionsShow')
    })

    aside.options.on('optionsHide', function(){
      aside.options.hide()
      aside.optionsIsOpen = false
    }).on('optionsShow', function(){
      aside.options.show()
      aside.optionsIsOpen = true
    }).on('click', 'li', function(){
      var txt = $(this).text()
      aside.select.text(txt)
      aside.input.val(txt)
      aside.options.trigger('optionsHide')
    })

    aside.succ.on('click', 'button', function(){
      this.parentNode.style.display = 'none'
    })

  }($))

  /* ============ mini-bot-select ============ */

  !(function($){
    var bot = {
      choose : $('#mini-bot-choose'),
      form1 : $('#mini-bot-form1'),
      form2 : $('#mini-bot-form2'),
      input : $('input.mini-bot-input'),
      inputBin : $('div.mini-bot-sel')
    }

    bot.choose.on('click', function(){
      bot.form1.toggle()
    })

    bot.form1.on('click', 'a.mini-bot-close', function(){
      bot.form1.hide()
    }).submit(false)

    bot.form2.on('click', 'input.mini-bot-input', function(){
      bot.inputBin.toggle()
    }).on('click', 'a', function(){
      bot.inputBin.hide()
      bot.input.val(this.innerText)
    }).on('mouseleave', function(){
      bot.inputBin.hide()
    })
  }($))

  $.uniqlo.loading = $('div.mini-activate')

  $.uniqlo.loading.on('loading', function(e, callback, delay){
    setTimeout(callback, delay || 300000)
  })

  // $.uniqlo.loading.trigger('loading', [function(){
  //   alert(123)
  // }, 5000])

})