$.fn.extend({
    carouselAd: function(opt) {
        var $this = $(this);
        //配置信息
        var settings = {
            width : '600px',
            height : '400px',
            adWidth : '10000px',
            adHeight : '100%',
            speed    : '5000',
            isAdAbstract : false,
            adAbstractH : '0px',
            adAbstractW : '600px',
            isHaveBtn : false,
            isTextNum : true,
            carouselType : '1',
            isCarousel : true,
            data : {},
        };

        $.extend(settings, opt);

        $this.css({'width' : settings.width, 'height' : settings.height,'position':'relative','overflow':'hidden'});
        $this.append('<ul class="adList"></ul><div class="carouselText"></div>');
        $this.find('.adList').css({'width' : parseInt(settings.adWidth),'height' : settings.adHeight,'overflow':'hidden'});
        
        if(settings.isAdAbstract == true){
            $this.find('.carouselText').before('<div class="adAbstract"></div>');
            $this.find('.adAbstract').css({'width' : settings.adAbstractW,'height' : settings.adAbstractH});
        }
        
        if(settings.isHaveBtn == true){
            $this.append('<div class="car_prev car_btns"></div><div class="car_next car_btns"></div>');
        }
        //判断是否有数据
        if (!settings.data) {
            return;
        }
    
        //把数据添加到roundShow Div 中
        setcarouselPicHtml(settings.data, $this);

        function setcarouselPicHtml(data, obj) {
            for (var p in data) {
                obj.find('.adList').append('<li><a href="' + data[p]['adv_url'] + '" title="' + data[p]['title'] + '"><img src="' + data[p]['adv_image'] + '" alt="' + data[p]['adv_title'] + '"/></a></li>');
                obj.find('.adList li a img').css({'float':'left'});
                if(settings.isTextNum){
                    obj.find('.carouselText').append('<span>'+ (parseInt(p)+1) +'</span>');
                }else{
                    obj.find('.carouselText').append('<span></span>');
                }
                obj.find('.carouselText span:first').addClass("on");
            }
            if(settings.isAdAbstract == true){
                $this.find('.adAbstract').append('<a href="'+data[0]['adv_url']+'">' + data[0]['adv_title']+ '</a><p>' + data[0]['adAbstract'] + '</p>');
            }
        }

        //设置时间滚动
        if(settings.isCarousel == true){
            var time = setTimeout(function(){turnRound(0)}, 0);

            //鼠标划上时停止动画
            $(".adList li").hover(
                function(){
                    clearTimeout(time);
                },
                function(){
                    time = setTimeout(function() {turnRound($this.find('.carouselText span.on').index() + 1)}, settings.speed);
            });

            function turnRound(num) {
                clearTimeout(time);
                num = num > $this.find('.carouselText span').size() - 1 ? 0 : num;
                $this.find('.carouselText span').eq(num).click();
                $this.find('.adList li').eq(num).show();
                time = setTimeout(function() {turnRound($this.find('.carouselText span.on').index() + 1)}, settings.speed);
            }
        }

        //设置图片滚动效果
        function setPic(settings,carouselType) {
            switch (carouselType){
                case '1':
                    $this.find('.adList li').eq($this.find('.carouselText span.on').index()).fadeTo(1000,1).siblings().fadeOut('1000');
                    if(settings.isAdAbstract == true){
                        setAdAbstract(settings);
                    }
                    break;
                case '2':
                    $this.find(".adList").stop().animate({"left": -parseInt(settings.width)},1000,function() {
                        $(this).css({"left":"0px"}).children().eq(0).appendTo($(this));
                    });
                    if(settings.isAdAbstract == true){
                        setAdAbstract(settings);
                    }
                    break;
            }
        }

        //摘要
        function setAdAbstract(setting){
            $this.find('.adAbstract').empty();
            $this.find('.adAbstract').append('<a href="'+setting.data[$this.find('.carouselText span.on').index()]['adv_url']+'">' + setting.data[$this.find('.carouselText span.on').index()]['adv_title']+ '</a><p>' + setting.data[$this.find('.carouselText span.on').index()]['adAbstract'] + '</p>');
        }

        //跟随line滚动
        $this.find('.carouselText span').click(function() {
            $(this).addClass('on').siblings().removeClass('on');
            setPic(settings,settings.carouselType);
        })
        
        //翻页按钮
        if(settings.isHaveBtn == true){
            $('.car_prev').click(function(){
                var index = $this.find('.carouselText span.on').index()-1;
                $this.find('.carouselText span').eq(index).addClass('on').siblings().removeClass('on');
                setPic(settings,settings.carouselType);
                if(settings.isCarousel == true){
                    turnRound(index);
                }
            });
            $('.car_next').click(function(){
                var index = $this.find('.carouselText span.on').index() + 1;
                index == $this.find('.adList li').length ? index = 0 : index;
                $this.find('.carouselText span').eq(index).addClass('on').siblings().removeClass('on');
                setPic(settings,settings.carouselType);
                if(settings.isCarousel == true){
                    turnRound(index);
                }
            });
            $('.car_btns').hover(
                function(){
                    $(this).addClass("hover");
                },
                function(){
                    $(this).removeClass("hover");
                }
            );
        }
    }
});