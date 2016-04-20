$(function() {
    placehodler($(".searchBox"),"课程名称","#cacaca","input[type=text]");

    //课程目录开关
    $(".chapter").each(function() {
        $(this).children("li:first").click(function() {
            if($(this).hasClass("c_open")) {
                $(this).removeClass("c_open").addClass("c_off").siblings().stop().animate({"height":"0px","opacity":"0"},300);
            } else {
                $(this).removeClass("c_off").addClass("c_open").siblings().stop().animate({"height":"45px","opacity":"1"},300);
            }
        });
    });

    //实验课件左边距归零
    marLeft_0($(".in_courseware a:nth-child(6n+1)"));

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
});
