$(function(){
    var click_counter = 0;

    $("#logo_text").click(function(){
        window.location.replace("/");
    })

    $("#3_horizontal_line").click(function(){
        if(click_counter == 0){
            $("li").css({"display":"block","float":"none"});
            $("ul a").css({"top": "0", "right": "0","position":"relative","display":"block"});
            click_counter++;
        }
        else{
            $("li").css("display","none");
            click_counter = 0;
        }
    })
})