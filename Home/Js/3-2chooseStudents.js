//删除学生
function delStudents(objs, callFunc) {
    objs.each(function() {
        $(this).stop().animate({"width":"0px"},200, function() {
            $(this).remove();
            if(typeof callFunc == "function") callFunc();
        });
    });
}
//更新选择学生的数量
function uploadStudentCount() {
    $(".sureChoose label").text($(".chooseStudent .s_item").not(".addStudent").length);
}
$(function() {
    //删除个人
    $(".del").click(function() {
        delStudents($(this).closest(".s_item"), uploadStudentCount);
    });
    //批量删除
    $(".dels").click(function() {
        delStudents($(".chooseStudent .on"), uploadStudentCount);
    });
    //选择学生弹窗
    $(".chooseBox .lgp_box").css({"top": -$(window).height()/2,"left": ($(window).width() - 850)/2});
    $(".addStudent,.choose").click(function() {
        $(".chooseBox").find(".lgp_cover").cover({
            boxWidth : "840px",
            boxHeight : "500px",
            type : 0,
            boxTitle : "选择学生"
        });
        //搜索框提示
        placehodler($(".searchStudent"),"学生名字/账号","#666",$(".searchStudent input[type=text]"));
    });
    //复制学生弹窗
    $(".copyBox .lgp_box").css({"top": -$(window).height()/2,"left": ($(window).width() - 610)/2});
    $(".copy").click(function() {
        $(".copyBox").find(".lgp_cover").cover({
            boxWidth : "600px",
            boxHeight : "390px",
            type : 0,
            boxTitle : "复制学生"
        });
    });
});