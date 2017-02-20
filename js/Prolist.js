$(function(){
    getXin();
    toTop();
    function getXin(){
        var categoryid= GetRequest().categoryId;
        
        $.ajax({
            url:"http://139.199.157.195:9090/api/getproductlist?categoryid="+categoryid,
            success:function(hx){
                var Hai = template("dx",hx);
                //console.log(Hai);
                $("#dianxin").html(Hai);
            }
        });
    }
    //返回顶部
	function toTop(){
		$("#to_top").on("click",function(e){
			e.preventDefault();
			$('body,html').animate({scrollTop: 0}, 400);
		})
	}
});