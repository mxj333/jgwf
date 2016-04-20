//初始化时间
;!function() {
    var date = new Date(),
    day = ["一", "二", "三", "四", "五", "六", "日"]; 
    $("<p/>").appendTo($(".weather")).text(date.getFullYear() + "年" + (date.getMonth() + 1 ) + "月" + date.getDate() + "日" + "  " + "周" + day[date.getDay() - 1]);
}(window);
//滚动
var scrollPartner = {
    scrollLeft: function(obj,w){
        obj.stop().animate({"margin-left": -parseInt(obj.children().width() + w)},500,function() {
            obj.css({"margin-left":-w + "px"}).children().eq(0).appendTo(obj);
        });
    },
    scrollRight: function(obj,w){
        obj.stop().animate({"margin-left": "0px"},500,function() {
            obj.css({"margin-left":-w + "px"}).children().last().insertBefore(obj.children().eq(0));
        });
    }
};
//加入收藏
;!function() {
    var url = window.location,
    title = document.title;
    $(".collect").click(function(){
        try {
            window.external.addFavorite(url, title);
        } catch(e) {
            try {
                window.sidebar.addPanel(title, url, "");
            } catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    });
}(window);
//左边距归零
function marLeft_0(obj) {
    obj.css("margin-left","0px");
}
//返回上一页
function back(obj) {
    obj.on("click",function() {
        history.go(-1);
    });
}
//Tab
function tab(o_target,o_tab,callback) {
    o_target.addClass("on").siblings().removeClass("on");
    o_tab.eq(o_target.index()).removeClass("hide").siblings().addClass("hide");
    if(typeof callback == "function") callback();
}
//搜素框提示语
function placehodler(obj,content,h_color,type){
    obj.css({"position":"relative"}).append("<label class='p_tip'>"+ content +"</label>");
    var label = obj.children(".p_tip"), inputBox = obj.children(type);
    label.css({"position":"absolute","color":h_color}).click(function(){
        inputBox.focus();
    });
    if(inputBox.val() != ""){
        label.hide();
    }
    inputBox.focus(function(){
        label.hide();
    }).blur(function(){
        if(inputBox.val() == ""){
            label.show();
        }
    });
}
//返回顶部
var backgoTop = (function() {
    return {
        backTop: function(speed,marT) {
            var marT = marT || $(window).height();
            $(window).scroll(function() {
                $(window).scrollTop() > marT? $(".backTop").fadeIn():$(".backTop").fadeOut();
            });
            $(".backTop a").click(function() {
                $("body,html").stop().animate({scrollTop:0},speed);
            });
        }
    }
})();
$.fn.extend({
    cover: function(opt) {
        var $this = $(this);
        //配置信息
        var settings = {
            boxWidth : "500px",
            boxHeight : "300px",
            boxTitle : "名称",
            type : 1
        };
        $.extend(settings, opt);
        $this.fadeIn(300).find(".lgp_box").css({"width": settings.boxWidth,"height": settings.boxHeight}).find(".lgp_title").text(settings.boxTitle);

        var middleHeight = ($(window).height() - parseInt(settings.boxHeight))/ 2;
        var middleWidth = ($(window).width() - parseInt(settings.boxWidth))/ 2;

        if(settings.type != 1) {
            $this.find(".lgp_box").stop().animate({"top":middleHeight},300);
        } else {
            $this.find(".lgp_box").css({"position":"absolute" ,"top":middleHeight,"left":middleWidth});
        }
        $this.find(".lgp_closed").click(function(){
            if(settings.type != 1) {
                $this.fadeOut(300).find(".lgp_box").stop().animate({"top": -$(window).height() + "px"},200);
            } else {
                $this.fadeOut(300);
            }
        });
    }
});
//模拟下拉菜单
function ul_select(objs,option_h, callback) {
    objs.each(function(e) {
        var obj = $(this);
        $(this).click(function(e) {
            obj.stop().animate({"height":(obj.find("li").size() + 1) * option_h},150);
        }).mouseleave(function(e) {
            obj.stop().animate({"height":option_h + "px"},200);
        }).find("li").live("click", function(e){
            obj.stop().animate({"height":option_h + "px"},200).children("p").text($(this).text());
            obj.find("input[type=hidden]").val($(this).attr("attr"));
            if(typeof callback == "function") callback();
            e.stopPropagation();
        });
    });
}
//输入字数限制
function wordLimit(obj, count, showMessage, callback) {
    obj.each(function() {
        $(this).keyup(function() {
            if ($(this).val().length > count) {
                obj.val(obj.val().substring(0,count));
                if(typeof showMessage == "function") showMessage();
            }
            if(typeof callback == "function") callback();
        });
    });
}
//时间格式化
function currenTimeFormat(symbol) {
    var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    s = date.getMinutes(),
    symbol = symbol || "-";
    return (y + symbol + m + symbol + d + " " + h + ":" + s);
}
//提示框
function showMessage(message, time, width,height,color,bgColor,boxColor,fontSize, callback){
    var width = width || "300px",
    time = time || 2500,
    height = height || "100px",
    color = color || "#333",
    bgColor = bgColor || "#f2f8ff",
    boxColor = boxColor || "#cee3ff",
    fontSize = fontSize || "16px",
    middleHeight = ($(window).height() - parseInt(height))/ 2,
    middleWidth = ($(window).width() - parseInt(width))/ 2;
    if(!$("body").children().hasClass("l_showMessage")){
        $("body").append("<div class='l_showMessage'>" + message + "</div>");
        $(".l_showMessage").css({"width":width,"height":height,"color":color,"background":bgColor,"border":"1px solid","border-color":boxColor,"font-size":fontSize,"position":"fixed","top":middleHeight,"left":middleWidth,"line-height":height,"text-align":"center","overflow":"hidden", "z-index":"10000"}).stop().animate({"opacity":"0","z-index":"-999"},time);

    } else {
        $(".l_showMessage").text(message).css({"top":middleHeight}).animate({"opacity":"1","z-index":"10000"},0).stop().animate({"opacity":"0","z-index":"-999"},time, function() {
            if(typeof callback == "function") callback();
        });
    }
    
}
$(function() {
    $(".signIn").click(function() {
        if(!$(".loginBox")[0]) {
            $("<div class='loginBox' />").appendTo($("body")).load("login.html",function() {
                $(this).find(".lgp_cover").cover({
                    boxWidth : "450px",
                    boxHeight : "300px",
                    boxTitle : "实创实践登录窗口",
                });
            });
        } else {
            $(".loginBox .lgp_cover").fadeIn(300);
        }
    });
});
