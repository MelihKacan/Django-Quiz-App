$(function(){
    $.get("/get_user_id",function(data,status){
        var user_id = data.user_id
    
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

    $.get("/theme_api",function(data,status){

    var theme = data.user_theme
    if(theme == true){
        $("input").prop('checked',true)
    }
    $("input").click(function(){
        if($("input").prop('checked') == true){
            theme = true
            $("*").toggleClass("dark-theme");
        }
        else{
            theme = false
            $('.theme_checkbox').prop('checked', true);
            $("*").toggleClass("dark-theme");
        }
        $.ajax({
            url: "/post_settings",
            type: "POST",
            headers: {
                'X-CSRFToken': csrfToken
            },
            data: JSON.stringify({
                "user_id": Number(user_id),
                "theme":theme
            }),
            contentType: "application/json",
            success: function(response){
                console.log(response);
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
        });
    });
});
});
});
