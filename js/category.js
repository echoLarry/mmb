


$(function(){
	//比价
	toggleCategory ();
		
	getcategorytitle();
	//返回顶部
	toTop();

	//fix
	closFix();
	//====================================================================
	//请求比价页面数据
	function  getcategorytitle(){
		$.ajax({
			type:"get",
			async:true,
			url:"http://139.199.157.195:9090/api/getcategorytitle",
			success : function(result){
				
				var html = template("priceTpl",result);
				
				$("#price .item").html(html);
				
			}
			
		});
	}
	//category隐藏和打开
	function  toggleCategory (){
	
		
		$("#price .item").on("click",">.title>a",function(e){
				var that = $(this);
				var titleId = $(this).attr("date-titleId");
				$.ajax({
					type:"get",
					url:"http://139.199.157.195:9090/api/getcategory?titleid="+titleId,
					async:true,
					beforeSend : function(e){
						//如果以加载数据，不在请求
						if(that.parent().next().children().length!=0){
							that.parent().next().slideToggle();
							that.toggleClass("back");
							return false;
						}
						
					},
					success : function(result){
						var html = template("mTitleTpl",result);
						that.parent().next().html(html);
						that.parent().next().slideToggle();
						that.toggleClass("back");
					}
				});
		})



	}
	//返回顶部
	function toTop(){
		$("#to_top").on("click",function(e){
			e.preventDefault();
			$('body,html').animate({scrollTop: 0}, 400);
		})
	}

	// 关闭fix
	function closFix() {
		$('#closFix').on('mousedown', function(){
			$('.fix').fadeOut('slow');
			$('#footer').animate({paddingBottom:0},400);
		})
	}
})
