$(function(){
    $.get("/theme_api",function(data,status){
        if(data.user_theme == false){}
        else{
            $(function(){
                $( "h1, h2, h3, body, a, ul, label, div, #all_quizzes > div" ).addClass( "dark-theme" );
                $( "li > a" ).addClass( "dark-theme" );
                $( "a > h1" ).addClass( "dark-theme" );
            })
        }
    })
})
