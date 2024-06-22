$(function(){
    var theme = user_theme
    if(user_theme == "True"){
        $("input").prop('checked',true)
        $("*").toggleClass("dark-theme");
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
    })
})
