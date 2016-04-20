function payPrompt(obj){
    $(".payInfo span").text(obj.find("p:first").text()) && $(".payInfo em").text(obj.find(".price").text());
}
$(function() {
    $(".onlinePay a").click(function() {
        $(this).addClass("on").siblings().removeClass("on");
    });
});