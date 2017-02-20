$(function () {


    toTop();

    //========================================================
    //返回顶部
    function toTop() {
        $("#to_top").on("click", function (e) {
            e.preventDefault();
            $('body,html').animate({ scrollTop: 0 }, 400);
        })
    }
})
//获取url的参数
function GetRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串  
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}