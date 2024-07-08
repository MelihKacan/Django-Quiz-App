$(function(){
    $.get("/theme_api",function(data,status){
        if(data.user_theme == false){}
        else{
            $(function(){
                $( "h1, h2, h3, body" ).addClass( "dark-theme" );
            })
        }
    })
})
