//设置时间范围选择
function chooseRangeDate() {
    var startDate,
    endDate,
    updateStartDate = function() {
        startPicker.setStartRange(startDate);
        endPicker.setStartRange(startDate);
        endPicker.setMinDate(startDate);
    },
    updateEndDate = function() {
        startPicker.setEndRange(endDate);
        startPicker.setMaxDate(endDate);
        endPicker.setEndRange(endDate);
    },
    startPicker = new Pikaday({
        field: document.getElementById('start'),
        minDate: new Date('1990-01-01'),
        maxDate: new Date(),
        onSelect: function() {
            startDate = this.getDate();
            updateStartDate();
        }
    }),
    endPicker = new Pikaday({
        field: document.getElementById('end'),
        minDate: new Date('1990-01-01'),
        maxDate: new Date(),
        onSelect: function() {
            endDate = this.getDate();
            updateEndDate();
        }
    }),
    _startDate = startPicker.getDate(),
    _endDate = endPicker.getDate();
    if (_startDate) {
        startDate = _startDate;
        updateStartDate();
    }
    if (_endDate) {
        endDate = _endDate;
        updateEndDate();
    }
}
//上传图片预览
var uploadPic = (function() {
    function getFileUrl(className) {
        var url;
        if(navigator.userAgent.indexOf("MSIE") >= 1){  //IE
            url = document.getElementsByClassName(className)[0].value;
        } else if(navigator.userAgent.indexOf("Firefox") >0){  //Firefox
            url = window.URL.createObjectURL(document.getElementsByClassName(className)[0].files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome") >0) {  //Chrome
            url = window.URL.createObjectURL(document.getElementsByClassName(className)[0].files.item(0)); 
        }
        return url;
    }
    return {
        showPic: function(oImg, className) {
            oImg.prop("src", getFileUrl(className)); 
        }
    }
})();

$(function() {
    //下拉菜单设置
    ul_select($(".ul_select"), 34);
    //性别美化
    $(".sexBox label").click(function() {
        if(!$(this).hasClass("on")) {
            $(this).addClass("on").siblings().removeClass("on").find("input").removeAttr("checked");
        }
    });

    $(".addBtn").click(function() {
        $(".addBtn").show() && $(".addInfor").hide().css("height","0px") && $(this).hide().prev().show().animate({"height":"264px"}, 300);

        //时间监听对象设置
        $("#start, #end").removeAttr("id");
        $(this).prev().find(".date:first").attr("id","start") && $(this).prev().find(".date:last").attr("id","end");
        //设置时间范围插件初始化
        if(!parseInt($(this).prev().data("init"))) {
            $(this).prev().data("init","1");
            chooseRangeDate();
        }
    });
    //生日时间日期插件
    var $birthday = new Pikaday({
        field: document.getElementById("birthday"),
        firstDay: 1,
        minDate: new Date("1950-01-1"),
        maxDate: new Date(),
    });

    $(".uploadHead input").change(function() {
        uploadPic.showPic($(".showImg img"), "uploadImg");
    });

    //验证
    $("#resumeForm").validate({
        onkeyup: false,
        onfocusout: false,
        rules: {
            userName: "required",
            birthday: "required"
        },
        messages: {
            userName: "请输入姓名!",
            birthday: "请选择生日日期!"
        },
        errorPlacement: function (error, element) {
            error.appendTo($(".errors"));
            showMessage($(".errors label:first").text(), 2500, "300px", "100px", "#333", "#f2f8ff","#cee3ff", "16px",function() {
                $(".errors").empty();
            });
        }
    });
});
