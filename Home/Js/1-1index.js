$(function() {
    /*$(".ad").carouselAd({
        "width": "1200px",
        "height": "400px",
        "carouselType": "2",
        "data" : [{"adv_url":"javascript:void(0);","adv_image":"../../Tmp/ad1.png","alt":"活动"},{"adv_url":"javascript:void(0);","adv_image":"../../Tmp/ad2.png","alt":"活动"},{"adv_url":"javascript:void(0);","adv_image":"../../Tmp/ad3.png","alt":"活动"}]
    });*/

    $(".newsPics").carouselAd({
        "width": "380px",
        "height": "285px",
        "isAdAbstract" : true,
        "adAbstractH":"40px",
        "adAbstractW" : "360px",
        "data" : [{"adv_url":"javascript:void(0);","adv_image":"../../Tmp/news1.png","adv_title":"同分/同位次考生去向查询","alt":"新闻"},{"adv_url":"javascript:void(0);","adv_image":"../../Tmp/new2.png","adv_title":"北京林业大学","alt":"新闻"},{"adv_url":"javascript:void(0);","adv_image":"../../Tmp/new3.png","adv_title":"师生合影","alt":"新闻"}]
    });

    //实验平台左边距和实习兼职左边距
    marLeft_0($(".ex_items > div:nth-child(3n+1), .j_category > a:nth-child(4n+1)"));

    (function() {
        var timer = setInterval(function() {
            scrollPartner.scrollLeft($(".d_list"),275);
        },3500);
    })();
});
