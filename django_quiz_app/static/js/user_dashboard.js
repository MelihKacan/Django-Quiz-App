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
        $("#user_exp").append(data.user_profile.user_exp)
        $("#user_level").append(data.user_profile.user_level)
        var full_url = data.user_profile.profile_photo;
        $(".user_dashboard_user_photo").attr('src', full_url);
        $("#quiz_success").html(_success);

        $("#user_level_button").click(function(){
            if(data.user_profile.user_exp >= 100){
                var random = Math.floor(Math.random() * 2) + 1
                alert(random)
                if(random == 2){
                    alert("Level Atladın. Tebrikler")
                    $.ajax({
                        url: "/user_level_api_post",
                        type: "POST",
                        headers: {
                            'X-CSRFToken': csrfToken
                        },
                        data: JSON.stringify({
                            "user": data.user_id,
                            "user_level": data.user_profile.user_level + 1,
                            "user_exp": data.user_profile.user_exp - 100
                        }),
                        contentType: "application/json",
                        success: function(response){
                            location.reload(true);
                        },
                        error: function(xhr, status, error){
                            console.log(xhr.responseText);
                        }
                    });
                }
                else{
                    alert("Şanssızlık sonucu level atlayamadın. Bir dahaki sefere bol şans")
                    $.ajax({
                        url: "/user_level_api_post",
                        type: "POST",
                        headers: {
                            'X-CSRFToken': csrfToken
                        },
                        data: JSON.stringify({
                            "user": data.user_id,
                            "user_level": data.user_profile.user_level,
                            "user_exp": data.user_profile.user_exp - 100
                        }),
                        contentType: "application/json",
                        success: function(response){
                            location.reload(true);
                        },
                        error: function(xhr, status, error){
                            console.log(xhr.responseText);
                        }
                    });
                }
            }
            else{
                alert("Yeterli Exp Puanın Yok")
            }
        })
})
})