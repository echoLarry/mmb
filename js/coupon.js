
$(function(){
	
	getcoupon();
	//=========================================================
	
	function getcoupon(){
		
		$.ajax({
			type:"get",
			url:"http://139.199.157.195:9090/api/getcoupon",
			async:true,
			success : function(result){
				var html = template("couponTpl",result);
				$("#prd_list ul").html(html);
			}
		});
		
	}
	
	
})
