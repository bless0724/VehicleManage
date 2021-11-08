$(document).ready(function () {
   $.ajax({
        url: '/api/creator_statistics/',
        type: 'GET',
        data: {},
        // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
        dataType: 'JSON',
        success: function (result) {
            $(".ProfileSideCreator-readCountNumber").eq(0).text(result["yesterday_browse_num"]);
            $(".ProfileSideCreator-readCountNumber").eq(1).text(result["yesterday_like_num"]);
            a1=result["yesterday_browse_num"]-result["the_day_before_yesterday_read_count"];
            a2=result["yesterday_like_num"]-result["the_day_before_yesterday_upvoted_count"];
            if(a1!=0)
            {
                $(".css-1gqd0v0").eq(0).html('<span class="css-1ntg9ig"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--BackToTop" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></span></span>'+'<span class="css-qcbo30">'+parseInt((result["yesterday_browse_num"]-result["the_day_before_yesterday_read_count"])/result["the_day_before_yesterday_read_count"])*100+"%"+'</span>');
            }
            if(a2!=0)
            {
                $(".css-1gqd0v0").eq(1).html('<span class="css-1ntg9ig"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--BackToTop" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></span></span>'+'<span class="css-qcbo30">'+parseInt((result["yesterday_like_num"]-result["the_day_before_yesterday_upvoted_count"])/result["the_day_before_yesterday_upvoted_count"])*100+"%"+'</span>');
            }
        },
        error: function (result) {
            console.log("error: " + JSON.stringify(result));
        }

    });

});