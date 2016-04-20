$(function() {
    //输入框聚焦
    $(".text_item input").focus(function() {
        $(".text_item input").removeClass("on") && $(this).addClass("on");
    });
    $(".accountType button").click(function() {
        $(this).addClass("on").siblings().removeClass("on");
        $(this).siblings("input[type=hidden]").val($(this).val());
    });
    //验证
    $("#registerForm").validate({
        onkeyup: false,
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            },
            confirmpass: {
                required: true,
                equalTo: "#a_password"
            },
            identify: "required",
            agreement: "required"
        },
        messages: {
            email: {
                required: "请输入邮箱",
                email: "请输入正确的邮箱"
            },
            password: {
                required: "请输入密码",
            },
            confirmpass: {
                required: "请输入确认密码",
                equalTo: "两次输入的密码不一致"
            },
            identify: "请输入验证码",
            agreement:"请点击接受注册协议"
        }
    });
});