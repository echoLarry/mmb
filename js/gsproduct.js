$(function() {

    // 调用方法
    init()

    //定义方法
    function init() {
        popsort();
        ajax();
    }



    // 全局变量
    $ar1 = true;
    $arrow1 = $('#coudan-box > .list > .fliter > ul > li:nth-child(1) > i');
    $ar2 = true;
    $arrow2 = $('#coudan-box > .list > .fliter > ul > li:nth-child(2) > i');
    $ar3 = true;
    $arrow3 = $('#coudan-box > .list > .fliter > ul > li:nth-child(3) > i');
    var Data = {};



    //下拉菜单显示隐藏和切换菜单按钮内容
    function popsort() {
        $('#coudan-box > .list > .fliter > ul > li:nth-child(1)').click(function() {
            $('#coudan-box  > .hideBox > .popsort').slideToggle().siblings().css('display', 'none');
            if ($ar1) {
                $arrow1.removeClass('glyphicon-triangle-bottom');
                $arrow1.addClass('glyphicon-triangle-top');
                $ar1 = false;
            } else {
                $arrow1.removeClass('glyphicon-triangle-top');
                $arrow1.addClass('glyphicon-triangle-bottom');
                $ar1 = true;
            }
        })


        $('#coudan-box > .list > .fliter > ul > li:nth-child(2)').click(function() {
            $('#coudan-box > .hideBox > .popprice').slideToggle()
                .siblings().css('display', 'none');
            if ($ar2) {
                $arrow2.removeClass('glyphicon-triangle-bottom');
                $arrow2.addClass('glyphicon-triangle-top');
                $ar2 = false;
            } else {
                $arrow2.removeClass('glyphicon-triangle-top');
                $arrow2.addClass('glyphicon-triangle-bottom');
                $ar2 = true;
            }
        })


        $('#coudan-box > .list > .fliter > ul > li:nth-child(3)').click(function() {
            $('#coudan-box > .hideBox > .popcat').slideToggle()
                .siblings().css('display', 'none');

            if ($ar3) {
                $arrow3.removeClass('glyphicon-triangle-bottom');
                $arrow3.addClass('glyphicon-triangle-top');
                $ar3 = false;
            } else {
                $arrow3.removeClass('glyphicon-triangle-top');
                $arrow3.addClass('glyphicon-triangle-bottom');
                $ar3 = true;
            }
        })


        $ar4 = true;
        $bgbtn = $('#coudan-box > .list > .menu_btn > i');
        $('#coudan-box > .list > .menu_btn').click(function() {
            $('#coudan-box > .hideBox > .hamberMenu').slideToggle()
                .siblings().css('display', 'none');
            if ($ar4) {
                $bgbtn.removeClass('glyphicon-menu-hamburger');
                $bgbtn.addClass('glyphicon-remove');
                $ar4 = false;
            } else {
                $bgbtn.removeClass('glyphicon-remove');
                $bgbtn.addClass('glyphicon-menu-hamburger');
                $ar4 = true;
            }

        })
    }


    //下拉菜单选择和排他
    function select() {
        $('#coudan-box  .popsort > ul > li').click(function() {
            $that = $('#coudan-box .popsort li').index(this);
            $odd = $('#coudan-box .popsort > ul > li > i').eq($that).parent().siblings().children();
            $('#coudan-box .popsort > ul > li > i').eq($that).addClass("glyphicon glyphicon-ok");
            $odd.removeClass("glyphicon glyphicon-ok");
            $('#coudan-box > .list > .fliter > ul > li:nth-child(1) > span').html(this.firstChild.textContent);
            $postdata1 = { shopid: $that, areaid: '0' };
            getitem($postdata1);
            $('#coudan-box  > .hideBox > .popsort').slideToggle()
            $arrow1.removeClass('glyphicon glyphicon-triangle-top');
            $arrow1.addClass('glyphicon glyphicon-triangle-bottom');
            $ar1 = true;
        })


        $('#coudan-box  .popprice > ul > li').click(function() {
            $that = $('#coudan-box .popprice li').index(this);
            $odd = $('#coudan-box .popprice > ul > li > i').eq($that).parent().siblings().children();
            $('#coudan-box .popprice > ul > li > i').eq($that).addClass("glyphicon glyphicon-ok");
            $odd.removeClass("glyphicon glyphicon-ok");
            $('#coudan-box > .list > .fliter > ul > li:nth-child(2) > span').html(this.firstChild.textContent.substr(0, 2));
            $postdata2 = { shopid: '0', areaid: $that };
            getitem($postdata2);
            $('#coudan-box > .hideBox > .popprice').slideToggle()
            $arrow2.removeClass('glyphicon-triangle-top');
            $arrow2.addClass('glyphicon-triangle-bottom');
            $ar2 = true;
        })

        $('#coudan-box  .popcat > ul > li').click(function() {
            $that = $('#coudan-box .popcat li').index(this);
            $('#coudan-box .popcat > ul > li > i').eq($that).addClass("glyphicon glyphicon-ok")
                .parent().siblings().children().removeClass("glyphicon glyphicon-ok");
            $('#coudan-box > .list > .fliter > ul > li:nth-child(3) > span').html(this.firstChild.textContent);
            $('#coudan-box > .hideBox > .popcat').slideToggle()
            $arrow3.removeClass('glyphicon-triangle-top');
            $arrow3.addClass('glyphicon-triangle-bottom');
            $ar3 = true;
        })


        //商品信息点击加载
        function getitem(post) {
            $.ajax({
                url: 'http://139.199.157.195:9090/api/getgsproduct',
                data: post,
                success: function(fn) {
                    Data = fn;
                    render(true);
                }
            })
        }
    }

    function render(isclick) {
        var newData = { result: [] };
        var leng = 8;
        if (Data.result.length <= 8) {
            leng = Data.result.length;
        }
        for (var i = 0; i < leng; i++) {
            newData.result.push(Data.result.shift());
        }
        var html = template('itemTpl', newData);
        if (isclick) {
            $('#coudan-box > .item > ul').html(html);
        } else {
            $('#coudan-box > .item > ul').append(html);
        }
    }



    window.onscroll = function() {
        if (Data.result.length == 0) {
            return;
        }
        var height = $('#coudan-box > .item > ul').height() + $('#coudan-box > .list').height() + $('.head').height() - $(document.body).height();
        var disbottom = height - $(document.body).scrollTop();
        if (disbottom < 50) {
            render();
        }
    }



    //ajax请求
    function ajax() {
        //商店名
        function getshop() {
            $.ajax({
                url: 'http://139.199.157.195:9090/api/getgsshop',
                success: function(fn) {
                    var html = template('shopTpl', fn);
                    $('#coudan-box > .hideBox > .popsort > ul').html(html);
                }
            });
        }


        //地区
        function getarea() {
            $.ajax({
                url: 'http://139.199.157.195:9090/api/getgsshoparea',
                success: function(fn) {
                    var html = template('areaTpl', fn);
                    $('#coudan-box > .hideBox > .popprice > ul').html(html);
                    select();
                }
            });
        }


        //默认加载商品信息
        $postdata = { shopid: '0', areaid: '0' };

        function getitem() {
            $.ajax({
                url: 'http://139.199.157.195:9090/api/getgsproduct',
                data: $postdata,
                success: function(fn) {
                    Data = fn;
                    render();
                }
            })
        }
        getshop();
        getarea();
        getitem();
    }
});