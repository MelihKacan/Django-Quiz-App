$(function(){
    $.get("/get_results/" + quizId, function(result_data, result_status){
        var result_var = 0;
        var abcna = "";
        result_data.forEach(function(result_data_data){
            if(currentlyUser == result_data_data.name){
                result_var++;
            }
        });
        if(result_var == 1){
            $("h2").hide();
            $("#submit").hide();
            $("input").hide();
            abcna = "<h1>" + "Bu Teste Zaten Girildi" + "</h1>";
            $("#abc").html(abcna);
        } else {
            $("#submit").one("click",function(){
                $.get("/get_all/" + quizId, function(data, status){
                    var _text = '';
                    var l = 0;
                    var array = [];
                    var all_answer_correct = true;
                    data.forEach(function(quiz) {
                        quiz.questions.forEach(function(question) {
                            var x = document.getElementById(question.id).value;
                            /*_text += '<div>';
                            _text += '<h2>' + "Correct Answer: " + question.correct_answer + '</h2>';
                            _text += '<h2>' + "Answer: " + x + '</h2>';
                            _text += '</div>';*/
                            $("#abc").html(_text);

                            if(question.correct_answer == x){
                                array[l] = true;
                            } else if(question.correct_answer != x){
                                array[l] = false;
                            }
                            l++;
                            console.log(l);
                        });
                    });
                    var co_ans_num = 0;
                    alert(array);
                    for(var o = 0; o < l; o++){
                        if(array[o] == false){
                            all_answer_correct = false;
                        } else if(array[o] != false){
                            co_ans_num++;
                        }
                    }
                    if(all_answer_correct == true){
                        alert("Tebrikler" + (co_ans_num/l) * 100);
                    } else {
                        alert("Başarı Puanın: " + (co_ans_num/l) * 100);
                    }

                    $.ajax({
                        url: "/post_results",
                        type: "POST",
                        headers: {
                            'X-CSRFToken': csrfToken
                        },
                        data: JSON.stringify({
                            "name": currentlyUser,
                            "success": (co_ans_num/l) * 100,
                            "results": [quizId]
                        }),
                        contentType: "application/json",
                        success: function(response){
                            console.log(response);
                        },
                        error: function(xhr, status, error){
                            console.log(xhr.responseText);
                        }
                    });

                    $.ajax({
                        url: "/user_exp_api_post",
                        type: "POST",
                        headers: {
                            'X-CSRFToken': csrfToken
                        },
                        data: JSON.stringify({
                            "currently_user": currentlyUser,
                            "exp": l * 5,
                        }),
                        contentType: "application/json",
                        success: function(response){
                            console.log(response);
                        },
                        error: function(xhr, status, error){
                            console.log(xhr.responseText);
                        }
                    });
                    setTimeout(1000);
                    window.location.href = "/";
                });
            });
        }
    });
});
