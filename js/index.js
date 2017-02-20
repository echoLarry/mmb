$(function () {

    init();

    function init() {
        getIndexMenu();
        getmoneyctrl();
        togleMenu();
        //关闭fix
        closFix();
    }

    var getNum = function (info) {
        var reg = /(?!0+(\.0+)?$)\d+(\.\d+)?/gi;
        return reg.exec(info)[0];
    }

    //menu隐藏和打开
    function togleMenu() {
        $("#menu>.row").on("click", ">div:nth-child(8)", function () {
            $("#menu>.row>div:nth-last-child(-n+4)").slideToggle();
        })

    }

    //请求menu数据
    function getIndexMenu() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getindexmenu",
            success: function (rest) {
                var html = template("menuTpl", rest);
                $("#menu>.row").html(html);
                $("#menu>.row>div:nth-last-child(-n+4)").hide();
            }
        })
    }

    //请求超值折扣区域
    function getmoneyctrl() {
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            success: function (result) {
                template.helper("getNum", getNum);
                var html = template("discountTpl", result);
                $("#discount .zhekou>ul").html(html);
            }
        });
    }

    // 关闭fix
    function closFix() {
        $('#closFix').on('mousedown', function () {
            $('.fix').fadeOut('slow');
            $('#footer').animate({paddingBottom: 0}, 400);
        })
    }
})
