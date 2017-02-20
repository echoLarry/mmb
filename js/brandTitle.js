/*
* @Author: Marte
* @Date:   2017-02-14 16:56:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-15 15:33:35
*/

'use strict';

$(function () {
    /*==========方法的调用==========*/
    init();
    /*==========方法的定义==========*/

    function init () {
        getBrandTitle();
        closFix();
    }

    // 获取数据
    function getBrandTitle () {
        $.get("http://139.199.157.195:9090/api/getbrandtitle",function(info){
            var html = template('tpl',info);
            $('#list>.hot').html(html);
        });
    }

    // 关闭fix
    function closFix() {
        $('#closFix').on('mousedown', function(){
            $('.fix').fadeOut('slow');
            $('#footer').animate({paddingBottom:0},400);
        })
    }
})