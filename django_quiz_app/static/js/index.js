$(function(){
    $.get("/index_api",function(data,status){
        $.get("/theme_api",function(data_theme,status){
            var page = "";
            if(data_theme.user_theme == false){
                data.forEach(function(quiz){
            
                    page += "<a href='/quiz_page/" + quiz.id + "' class='text_quiz'>" + "<h1>" + quiz.name + "</h1></a>";
                    
                })
                $("#all_quizzes").html(page);
            }
            else{
                $(function(){
                    data.forEach(function(quiz){
            
                        page += "<a href='/quiz_page/" + quiz.id + "' class='text_quiz'>" + "<h1>" + quiz.name + "</h1></a>";
                        
                    })
                    $("#all_quizzes").html(page);
                    $( "h1, h2, h3, body" ).addClass( "dark-theme" );
                })
            }
        })
    })
})