$(function(){
    function getCurrentISODateTime() {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    }

    dateTime1 = getCurrentISODateTime()

    $.get("/get_all/" + quizId, function(data, status){
        data.forEach(function(quiz) {
        if(quiz.finish_date_time == null){}
        else{
        dateTime2 = quiz.finish_date_time;

            function compareISODateTimes(dateTime1, dateTime2) {
            const date1 = new Date(dateTime1);
            const date2 = new Date(dateTime2);

            if (date1 > date2) {
                return 1;
            } else if (date1 < date2) {
                return -1;
            } else {
                return 0;
            }
        }

        const comparisonResult = compareISODateTimes(dateTime1, dateTime2);

        if (comparisonResult > 0) {
            $("h2").hide();
            $("#submit").hide();
            $("input").hide();
            abcna = "<h1>" + "Bu Testin Zamanı Geçti" + "</h1>";
            $("#abc").html(abcna);
        } else if (comparisonResult < 0) {
        }
    }
    
    })
})
})