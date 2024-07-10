$(function(){
    var k = 0;
    $.get("/get_results/" + quizId, function(result_data, result_status){
        var result_var = 0;
        var abcna = "";
        result_data.forEach(function(result_data_data){
            if(currentlyUser == result_data_data.name){
                result_var++;
            }
        });
        if(result_var == 1){
            abcna = "<h1>" + "Bu Teste Zaten Girildi" + "</h1>";
            $(".question_all").html(abcna);
        } else {
            $.get("/get_all/" + quizId, function(data, status){
                var question_all = "";
                data.forEach(function(quiz) {
                    question_all += '<h2 class="quiz_name">' + quiz.name + '</h2>'
                    quiz.questions.forEach(function(questin){
                        
                        question_all += '<h2 class="question_number">' + quiz.questions[k].name + '</h2>'
                        question_all += '<img id="question_photo" src=' + quiz.questions[k].question_photo + ' alt="">'
                        question_all += '<h2 class="question">' + quiz.questions[k].header + '</h2>'
                        question_all += '<div style="display:block"><input class="question_user_answer" style="display:inline" id= a-' + quiz.questions[k].id + ' type="checkbox">'
                        question_all += '<h2 class="a" style="display:inline">' + 'A-)' + quiz.questions[k].a + '</h2></div><br>'
                        question_all += '<div display="style:block"><input style="display:inline" class="question_user_answer b-' + k + '" id= b-' + quiz.questions[k].id + ' type="checkbox">'
                        question_all += '<h2 class="b" style="display:inline">' + 'B-)' + quiz.questions[k].b + '</h2></div><br>'
                        question_all += '<div display="style:block"><input style="display:inline" class="question_user_answer c-' + k + '" id= c-' + quiz.questions[k].id + ' type="checkbox">'
                        question_all += '<h2 class="c" style="display:inline">' + 'C-)' + quiz.questions[k].c + '</h2></div><br>'
                        question_all += '<div display="style:block"><input style="display:inline" class="question_user_answer d-' + k + '" id= d-' + quiz.questions[k].id + ' type="checkbox">'
                        question_all += '<h2 class="d" style="display:inline">' + 'D-)'+ quiz.questions[k].d + '</h2></div><br>'
                        //question_all += '<input class="question_user_answer" id=' + quiz.questions[k].id + ' type="text">'
                        
                        k++;
                        console.log(k)
                    })
                    });
                    $(".question_all").html(question_all)
            });
            
            $(document).on('click', "input[type='checkbox']", function(){
                var x_id = $(this).attr("id")
                if(x_id.includes("a")){
                    if($("#"+x_id).is(":checked") == true){
                    var b_id = x_id.replace('a', 'b' );
                    var c_id = x_id.replace('a', 'c' );
                    var d_id = x_id.replace('a', 'd' );
                    $("#"+b_id).prop('checked', false);
                    $("#"+c_id).prop('checked', false);
                    $("#"+d_id).prop('checked', false);
                    }
                }
                else if(x_id.includes("b")){
                    if($("#"+x_id).is(":checked") == true){
                    var a_id = x_id.replace('b', 'a' );
                    var c_id = x_id.replace('b', 'c' );
                    var d_id = x_id.replace('b', 'd' );
                    $("#"+a_id).prop('checked', false);
                    $("#"+c_id).prop('checked', false);
                    $("#"+d_id).prop('checked', false);
                    }
                }
                else if(x_id.includes("c")){
                    if($("#"+x_id).is(":checked") == true){
                    var a_id = x_id.replace('c', 'a' );
                    var b_id = x_id.replace('c', 'b' );
                    var d_id = x_id.replace('c', 'd' );
                    $("#"+a_id).prop('checked', false);
                    $("#"+b_id).prop('checked', false);
                    $("#"+d_id).prop('checked', false);
                    }
                }
                else if(x_id.includes("d")){
                    if($("#"+x_id).is(":checked") == true){
                    var a_id = x_id.replace('d', 'a' );
                    var b_id = x_id.replace('d', 'b' );
                    var c_id = x_id.replace('d', 'c' );
                    $("#"+a_id).prop('checked', false);
                    $("#"+b_id).prop('checked', false);
                    $("#"+c_id).prop('checked', false);
                    }
                }
                else{}
            });

            $("#submit").one("click",function(){
                $.get("/get_all/" + quizId, function(data, status){
                    var _text = '';
                    var l = 0;
                    var array = [];
                    var all_answer_correct = true;
                    data.forEach(function(quiz) {
                        quiz.questions.forEach(function(question) {
                            //var x = document.getElementById(question.id).value;
                            var ValueA = $("#a-"+question.id).is(":checked");
                            var ValueB = $("#b-"+question.id).is(":checked");
                            var ValueC = $("#c-"+question.id).is(":checked");
                            var ValueD = $("#d-"+question.id).is(":checked");
                            //alert("c-"+question.id)
                            //alert($("c-"+question.id).is(":checked"))

                            if(ValueA == true){
                                x = "a"
                                //alert("a")
                            }
                            else if(ValueB == true){
                                x = "b"
                                //alert("b")
                            }
                            else if(ValueC == true){
                                x = "c"
                                //alert("c")
                            }
                            else if(ValueD == true){
                                x = "d"
                                //alert("d")
                            }
                            else{
                                x = "Blank"
                            }
                            //alert(x)
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
