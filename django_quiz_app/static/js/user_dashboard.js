$(function(){
    $.get("/user_dashboard_api",function(data,status){
        _success = ""
        _quiz_name = ""
        $("#username").text(data.user_name)
        
        data.solved_quiz_results.forEach(function(result){
            data.solved_quiz.forEach(function(quiz){
                if(quiz.id == result.results){
                    //alert("oldu" + quiz.id.toString() + result.results.toString());
                    _success += "<div>" + "<h3 class='user_dashboard_quiz_name'>" + quiz.name + "</h3>"
                    _success += "<h3 class='user_dashboard_quiz_result'>" + result.success + "</h3>" + "</div>"
                }
            })
        })
        console.log(data.user_profile_photo)
        var full_url = data.user_profile_photo;
        $(".user_dashboard_user_photo").attr('src', full_url);
        $("#quiz_success").html(_success);

    })
})