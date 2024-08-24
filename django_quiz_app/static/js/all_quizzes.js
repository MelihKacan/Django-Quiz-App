$(function(){
    var all_quizzes_html = "";
    $.get("/all_quizzes_api",function(data,status){
        data.forEach(function(all_quizzes_datas){
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
})