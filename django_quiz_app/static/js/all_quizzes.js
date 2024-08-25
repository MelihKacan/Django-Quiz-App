$(function(){
    var all_quizzes_html = "";
    var page_number = 1;
    var page_url = "/all_quizzes_api?page=" + page_number;
    $.get(page_url,function(data,status){
        var page_number_html = "";
        if(data.next == null && data.previous == null){
            $("#next_page").hide()
            $("#previous_page").hide()
            page_number_html += "<h1 style='display:inline;'>" + page_number + "</h1>"
        }
        else if(data.previous == null){
            $("#next_page").show()
            $("#previous_page").hide()
        }
        if(data.next != null){
            $("#next_page").show()
            page_number_html += "<h1 style='display:inline;'>" + page_number + "</h1>"
            page_number_html += "<h2 style='display:inline;'>" + (parseInt(page_number) + 1).toString() + "</h2>"
        }

        $("#page_number").html(page_number_html)
        data.results.forEach(function(all_quizzes_datas){
            all_quizzes_html += "<div class='single_quiz_div'><a href='/quiz_page/" + all_quizzes_datas.id + "'><h2>" + all_quizzes_datas.name + "</h2></a>"
            all_quizzes_html += "<h2> Total Questions:" + $(all_quizzes_datas.questions).length + "</h2>"
            var quiz_publish_time_date = new Date(all_quizzes_datas.publish_date_time);
            all_quizzes_html += "<h2> Publish Date: " + quiz_publish_time_date.toString().substring(3, 24) + "</h2>"
            if(all_quizzes_datas.finish_date_time != null){
                var quiz_finish_time_date = new Date(all_quizzes_datas.finish_date_time)
                all_quizzes_html += "<h2> Finish Date: " + quiz_finish_time_date.toString().substring(3, 24) + "</h2></div>"
            }
            else{
                all_quizzes_html += "<h2> Finish Date: Not Determined " + "</h2></div>"
            }
        })
        $("#all_quizzes").html(all_quizzes_html)
    })
    $("#next_page").click(function(){
        page_number++;
        all_quizzes_html = "";
        var page_number_html = "";
        var page_url = "/all_quizzes_api?page=" + page_number;
        $.get(page_url,function(data,status){
            page_number_html += "<h2 style='display:inline;'>" + (parseInt(page_number) - 1 ).toString() + "</h2>"
            page_number_html += "<h1 style='display:inline;'>" + page_number + "</h1>"
            
            if(data.next == null){
                $("#next_page").hide()
                $("#previous_page").show()
            }
            else if(data.next != null && data.previous != null){
                $("#next_page").show()
                $("#previous_page").show()
                page_number_html += "<h2 style='display:inline;'>" + (parseInt(page_number) + 1 ).toString() + "</h2>"
            }

            $("#page_number").html(page_number_html)
            data.results.forEach(function(all_quizzes_datas){
                all_quizzes_html += "<div class='single_quiz_div'><a href='/quiz_page/" + all_quizzes_datas.id + "'><h2>" + all_quizzes_datas.name + "</h2></a>"
                all_quizzes_html += "<h2> Total Questions:" + $(all_quizzes_datas.questions).length + "</h2>"
                var quiz_publish_time_date = new Date(all_quizzes_datas.publish_date_time);
                all_quizzes_html += "<h2> Publish Date: " + quiz_publish_time_date.toString().substring(3, 24) + "</h2>"
                if(all_quizzes_datas.finish_date_time != null){
                    var quiz_finish_time_date = new Date(all_quizzes_datas.finish_date_time)
                    all_quizzes_html += "<h2> Finish Date: " + quiz_finish_time_date.toString().substring(3, 24) + "</h2></div>"
                }
                else{
                    all_quizzes_html += "<h2> Finish Date: Not Determined " + "</h2></div>"
                }
            })
            $("#all_quizzes").html(all_quizzes_html)
        })/*.fail(function() {
            alert('Error'); // or whatever
            $("#all_quizzes").html("<h2> An error occurred </h2>")
        });  For Error Handling */ 
    })


    $("#previous_page").click(function(){
        page_number--;
        all_quizzes_html = "";
        var page_number_html = "";
        var page_url = "/all_quizzes_api?page=" + page_number;
        $.get(page_url,function(data,status){
            if(data.previous == null){
                $("#previous_page").hide()
                $("#next_page").show()
            }
            else if(data.next != null && data.previous != null){
                $("#next_page").show()
                $("#previous_page").show()
                page_number_html += "<h2 style='display:inline;'>" + (parseInt(page_number) - 1 ).toString() + "</h2>"
            }
            page_number_html += "<h1 style='display:inline;'>" + page_number + "</h1>"
            page_number_html += "<h2 style='display:inline;'>" + (parseInt(page_number) + 1 ).toString() + "</h2>"
            
            $("#page_number").html(page_number_html)
            data.results.forEach(function(all_quizzes_datas){
                all_quizzes_html += "<div class='single_quiz_div'><a href='/quiz_page/" + all_quizzes_datas.id + "'><h2>" + all_quizzes_datas.name + "</h2></a>"
                all_quizzes_html += "<h2> Total Questions:" + $(all_quizzes_datas.questions).length + "</h2>"
                var quiz_publish_time_date = new Date(all_quizzes_datas.publish_date_time);
                all_quizzes_html += "<h2> Publish Date: " + quiz_publish_time_date.toString().substring(3, 24) + "</h2>"
                if(all_quizzes_datas.finish_date_time != null){
                    var quiz_finish_time_date = new Date(all_quizzes_datas.finish_date_time)
                    all_quizzes_html += "<h2> Finish Date: " + quiz_finish_time_date.toString().substring(3, 24) + "</h2></div>"
                }
                else{
                    all_quizzes_html += "<h2> Finish Date: Not Determined " + "</h2></div>"
                }
            })
            $("#all_quizzes").html(all_quizzes_html)
        })/*.fail(function() {
            alert('Error'); // or whatever
            $("#all_quizzes").html("<h2> An error occurred </h2>")
        }); For Error Handling */
    })
})