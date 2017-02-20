$(function(){
    go();

   function go() {
        var titleid=0;
     //  console.log(titleid,111111);
       getTouBu();
       getBaiCaiJiaProduct(titleid);

   }

   function getTouBu() {
       $.ajax({
           async:true,//true异步  false同步(等待加载完成后才能操作)
           url:"http://139.199.157.195:9090/api/getbaicaijiatitle",
           success:function(ev){
               //console.log(ev.result[0].title);
               var html=template("tmp",ev);
               //console.log(html);
               $("#men").html(html);
               clickLi ();
               leftSwipe();
           }

       });
   }
    function getBaiCaiJiaProduct(titleId) {
        $.get("http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleId, function (res) {
            //console.log(res);
            var html = template("listTmp", res);
            $("#list").html(html);
        });
    }
    //tab切换
    function clickLi (){
        //tab切换变色功能
        $("#men>ul").on("click","li a",function(){
            var titleid=$(this).data("titleid");
            console.log(titleid,000000);
            $('#men>ul li:eq('+titleid+')').addClass("active")
                .siblings("li")
                .removeClass("active");
            getBaiCaiJiaProduct(titleid);
        })
        // 搜索功能
        $("#ope").on("click",function(){
            $("#sea").slideToggle(500);
            if($(this).hasClass("glyphicon-list")){
                $(this).removeClass("glyphicon-list");
                $(this).addClass("glyphicon-remove");
            }else{
                $(this).removeClass("glyphicon-remove");
                $(this).addClass("glyphicon-list");
            }
        });
    }
})

 function leftSwipe(){
    var parentBox = document.querySelector('#men');
    var childBox = parentBox.querySelector('ul');
    var parentWidth=$("#men").width();
    var childWidth=$("#men>ul").width();
    //console.log($("#men ul").width(),$("#men").width());
    var maxX = 0;
    //var minX = parentWidth-childWidth;
    var minX = parentWidth-childWidth;
    console.log(minX);
    var distance = 100;
    var maxSwipe = maxX + distance;

    var minSwipe = minX - distance;


    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove  = false;
    var currX = 0;


    var addTransition = function(){
        childBox.style.webkitTransition = "all .2s";
        childBox.style.transition = "all .2s";
    }
    var removeTransition = function(){
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    }
    var setTranslateX = function(x){
        childBox.style.webkitTransform = "translateX("+x+"px)";
        childBox.style.transform = "translateX("+x+"px)";
    }


    childBox.addEventListener('touchstart',function(e){

        startX = e.touches[0].clientX;
        //console.log(e);

    });
    childBox.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX-startX;


        removeTransition();

        if((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe){
            setTranslateX(currX + distanceX);

            console.log(currX + distanceX+"qqqq",distanceX);
        }

    });
    childBox.addEventListener('touchend',function(e){

        if(( currX + distanceX)>maxX){
            currX = maxX;
            addTransition();
            setTranslateX(currX);
            console.log(currX,1111)
        }

        else if(( currX + distanceX)<minX){
            currX = minX;
           // currX=currX + distanceX;
            addTransition();
            setTranslateX(currX);
            console.log(currX,222)
        }
        else{
            currX = currX + distanceX;
            console.log(currX,3333)
        }


        startX = 0;
        moveX =0;
        distanceX = 0;
        isMove = 0;
    });







}