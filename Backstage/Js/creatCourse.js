var uploadPic = (function() {
    function getFileUrl(source) {
        var url;
        if(navigator.userAgent.indexOf("MSIE")>=1){  //IE
            url = document.getElementsByClassName(source)[0].value;
        }else if(navigator.userAgent.indexOf("Firefox")>0){  //Firefox
            url = window.URL.createObjectURL(document.getElementsByClassName(source)[0].files.item(0));
        }else if(navigator.userAgent.indexOf("Chrome")>0) {  //Chrome
            url = window.URL.createObjectURL(document.getElementsByClassName(source)[0].files.item(0)); 
        }
        return url;
    }
    return {
        showPic: function(oImg, source) {
            oImg.prop("src",getFileUrl(source)); 
        }
    }
})();

$(function() {
    $(".frontCover").change(function() {
        uploadPic.showPic($(".showPic img"),"frontCover");
    });
});