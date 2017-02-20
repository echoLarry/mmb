$(function (){
    go();

    function go() {
        cenTer();
        foot();
        toTop();
    }

    function cenTer( prId) {
        var prId =3;
        var xhr = new XMLHttpRequest;
        xhr.open('get', 'http://139.199.157.195:9090/api/getproduct?productid='+prId);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                result = JSON.parse(result);
                var html0=template("tempTop", result);
                var html1= template("temp", result);
                //console.log(html1);
                $("#banner").html(html0);
                $("#jd").html(html1);
            }
        }
    }
    function foot() {
        var productid = 0;
        $.ajax({
            url:"http://139.199.157.195:9090/api/getproductcom?productid="+productid,
            success:function(e){
                var html = template("pl",e);
//              console.log(html);
                $("#pinglun").html(html);
            }
        });
    }
    //·µ»Ø¶¥²¿
    function toTop() {
        $("#to_top").on("click", function (e) {
            e.preventDefault();
            $('body,html').animate({scrollTop: 0}, 400);
        })
    }


})



