$(function(){

    function getCSRFToken() {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, 10) == ('csrftoken' + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(10));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrfToken = getCSRFToken()

    $.get("/user_dashboard_api",function(data,status){
        _success = ""
        _quiz_name = ""
        $("#username").text(data.user_name)
        $("#user_photo_file_input").hide()
        
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

        switch (true) {
            case (4 >= data.user_profile.user_level): 
            $("#user_level_up").append(100)
            break;
            case (4 < data.user_profile.user_level && data.user_profile.user_level < 10):
            $("#user_level_up").append(300)
            break;
            case (10 <= data.user_profile.user_level && data.user_profile.user_level < 20): 
            $("#user_level_up").append(500)    
            break;
            case (20 <= data.user_profile.user_level && data.user_profile.user_level < 30): 
            $("#user_level_up").append(1000)    
            break;
            case (30 == data.user_profile.user_level): 
            $("#user_level_up").hide()   
            break;
          }

        $("#user_level_button").click(function(){
            switch (true) {
                case (4 >= data.user_profile.user_level &&  data.user_profile.user_exp >= 100): 
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
                break;
                case (4 < data.user_profile.user_level && data.user_profile.user_level < 10  &&  data.user_profile.user_exp >= 300):
                    console.log(data.user_profile.user_level)
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
                            "user_exp": data.user_profile.user_exp - 300
                        }),
                        contentType: "application/json",
                        success: function(response){
                            location.reload(true);
                        },
                        error: function(xhr, status, error){
                            console.log(xhr.responseText);
                        }
                    });
                break;
                case (10 <= data.user_profile.user_level && data.user_profile.user_level < 20 &&  data.user_profile.user_exp >= 500): 
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
                            "user_exp": data.user_profile.user_exp - 500
                        }),
                        contentType: "application/json",
                        success: function(response){
                            location.reload(true);
                        },
                        error: function(xhr, status, error){
                            console.log(xhr.responseText);
                        }
                    });
                break;
                case (20 <= data.user_profile.user_level && data.user_profile.user_level < 30 &&  data.user_profile.user_exp >= 1000): 
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
                            "user_exp": data.user_profile.user_exp - 1000
                        }),
                        contentType: "application/json",
                        success: function(response){
                            location.reload(true);
                        },
                        error: function(xhr, status, error){
                            console.log(xhr.responseText);
                        }
                    });
                break;
                case(30 == data.user_profile.user_level):
                alert("Maksimum Levele Ulaştın Zaten")
                break;
                default:
                    alert("Yeterli Exp Puanın Yok")
              }
        })
    $(".user_dashboard_user_photo_click").click(function(){
        $("#user_photo_file_input").show()
        $("#user_photo_file_input").on("change",function(){
            var image = document.getElementById("user_photo_file_input").files[0]
            var form_data = new FormData()
            form_data.append("profile_photo", image)
            $.ajax({
                url: "/user_photo_api_post",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrfToken
                },
                data: form_data,
                processData: false,
                contentType: false,
                success: function(response){
                    console.log(response);
                    location.reload();
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
            });
        })
    })
})
})