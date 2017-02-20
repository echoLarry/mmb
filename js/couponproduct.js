


$(function () {
	var page = 1;

	var couponId=0;
	var r;
	
	getcouponproduct(page);
	setImg();

	var title = GetRequest().title+"优惠券";
	$("h1").html(title);
	var getSrc = function (img) {
		var reg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
		return reg.exec(img)[1];
	}
	//===========================================
	function getcouponproduct(page) {
		couponId = GetRequest().couponid;
		$.ajax({
			type: "get",
			url: "http://139.199.157.195:9090/api/getcouponproduct?couponid=" + couponId,
			async: true,
			success: function (info) {
				//页数
				r = Math.ceil(info.result.length / 15);
				var rest = {};
				rest.result = info.result.splice(1 * (page - 1), 1 * page);
				template.helper("getSrc", getSrc);
				var html = template("bannerTpl", rest);
				var imgHtml = template("maskTpl", rest);
				$("#mask>div").html(imgHtml);
				$("#banner ul").html(html);
			}
		});

	}
	//点击加载
	function setImg() {
		$("#banner ul").on("click", ">li>a", function (event) {
			event.preventDefault();
			var index = 0;
			var img = new Image();
			img.src = $(this).attr("href");
			$("#mask>div").children().eq(index).append(img).parent().parent().addClass("visible").show();
			console.log(img);
		})
	}
	$("#next").on("click", function () {
		if (page >= r) return false;
		page++;
		$.ajax({
			type: "get",
			url: "http://139.199.157.195:9090/api/getcouponproduct?couponid=" + conponId,
			async: true,
			success: function (info) {
				//页数
				var rest = {};
				rest.result = info.result.splice(1 * (page - 1), 1 * page);
				template.helper("getSrc", getSrc);
				var html = template("bannerTpl", rest);
				var imgHtml = template("maskTpl", rest);
				$("#mask>div").html(imgHtml);
				$("#banner ul").html(html);
			}
		});
	})
	goBack();
	//============================
	function goBack() {
		$(".back").on("click", function () {
			$(this).children().attr("href", document.referrer);
		})
	}
})
