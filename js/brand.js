$(function () {
    var brandtitleid, brandTitle;
    brandtitleid = GetRequest().brandTitleId;
    brandTitle = GetRequest().brandTitle.substr(0, 4);
    /*==========方法的调用==========*/
    init();
    /*==========方法的定义==========*/
    function init() {
        getBrand();
        closFix();
    }


    // 获取数据
    function getBrand() {
        $.get("http://139.199.157.195:9090/api/getbrand?brandtitleid=" + brandtitleid, function (info) {
            var html = template("tpl1", info);
            $("#title").html(brandTitle + "哪个牌子好");
            $(".model:nth-child(2)>h3").html(brandTitle + "哪个牌子好");
            $('.model:nth-child(2)>div>ul').append(html);
            getBrandProductList();

        });
    }

    function getBrandProductList() {
        $.get("http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=" + brandtitleid + "&pagesize=4", function (info) {
            var html = template('tpl2', info);
            $(".model:nth-child(3)>h3").html(brandTitle + "产品销量排行");
            $('.model:nth-child(3)>div>ul').append(html);
            getProductCom();
        });

    }

    function getProductCom() {
        $.get("http://139.199.157.195:9090/api/getproductcom?productid=" + brandtitleid, function (info) {
            var html = template('tpl3', info);
            $("#newComment").html(brandTitle + "最新评论")
            $('#comment').append(html);
            $('.pic>img').attr('src', $('#productImg>img').attr('src'));
            $('.tit').html($('#productName').html());
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