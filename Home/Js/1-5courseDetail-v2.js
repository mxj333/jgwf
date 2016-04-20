$(function() {
    placehodler($(".searchBox"),"课程名称","#cacaca","input[type=text]");

    //实验课件左边距归零
    marLeft_0($(".in_catalog .in_item:nth-child(4n+1)"));

    //课程介绍 tab
    $(".in_nav li").click(function() {
        var li = $(this);
        tab(li,$(".mainContent > div"),function() {
            if(li.index() == $(".in_nav li").size() - 1 && !li.hasClass("no_one")) {
                li.addClass("no_one");
                $(".bar p").each(function() {
                    $(this).stop().animate({"width":$(this).data("width")},500);
                });
            }
        });
    });

    //评价排序美化
    $(".sort label").click(function() {
        if(!$(this).hasClass("on")) {
            $(this).addClass("on").siblings().removeClass("on").find("input").removeAttr("checked");
        } 
    });

    //预约课程
    $(".ab_stady a").toggle(
        function() {
            $(this).text("取消预约");
            $(".in_item a").hide().parent().siblings(".checkBox").show();
            $(".in_item").bind("click",function() {
                makeCourse($(this));
            });
        },
        function() {
            $(this).text("预约课程");
            $(".in_item").removeClass("on").siblings(".save").hide();
            $(".in_item a").show().parent().siblings(".checkBox").hide();;
            $(".in_item").unbind("click");
    });

    //开始实验收费提示
    $(".in_item a").click(function() {
        var obj = $(this).closest(".in_item");
        if(!$(".payBox")[0]) {
            $("<div class='payBox' />").appendTo($("body")).load("payPrompt.html",function() {
                $(this).find(".lgp_cover").cover({
                    boxWidth : "600px",
                    boxHeight : "470px",
                    boxTitle : "课程支付"
                });
                payPrompt(obj);
            });
        } else {
            $(".payBox .lgp_cover").fadeIn(300);
            payPrompt(obj);
        }
    });

    //课程预约提示
    $(".in_catalog .save").click(function() {
        if(!$(".orderBox")[0]) {
            $("<div class='orderBox' />").appendTo($("body")).load("orderPrompt.html",function() {
                $(this).find(".lgp_cover").cover({
                    boxWidth : "600px",
                    boxHeight : "320px",
                    boxTitle : "预约成功提示"
                });
            });
        } else {
            $(".orderBox .lgp_cover").fadeIn(300);
        }
    });
});
function makeCourse(obj) {
    if(!obj.hasClass("on")) {
        obj.addClass("on");
        //TO DO
    } else {
        obj.removeClass("on");
        //TO DO
    }
    obj.parent().find(".on").length > 0 ? $(".save").css("display","block") : $(".save").hide();
}