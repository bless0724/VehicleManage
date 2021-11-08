$(document).ready(function () {
    //推荐
    $.ajax({
        url: '/api/recommend/',
        type: 'GET',
        data: {count: 5},
        // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
        dataType: 'JSON',
        success: function (result) {
            console.log(result);
            $.each(result, function (i, val) {
                var card = "                                            <div class=\"Card TopstoryItem TopstoryItem-isRecommend\" tabindex=\"0\">\n" +
                    "                                                <div class=\"Feed\">\n" +
                    "                                                    <div class=\"ContentItem AnswerItem\">\n" +
                    "                                                        <h2 class=\"ContentItem-title\">\n" +
                    "                                                            <div itemprop=\"zhihu:question\"\n" +
                    "                                                                 itemtype=\"http://schema.org/Question\" itemscope=\"\">\n" +
                    "                                                                <a target=\"_blank\"\n" +
                    "                                                                   data-za-detail-view-element_name=\"Title\"\n" +
                    "                                                                   href=\"/cms/question/" + val["qid"] + "/answer/" + val["answer"]["aid"] + "\">" + val["question_title"] + "</a>\n" +
                    "                                                            </div>\n" +
                    "                                                        </h2>\n" +
                    "                                                        <div class=\"RichContent is-collapsed\">\n" +
                    "                                                            <div class=\"RichContent-inner\">\n" +
                    "                                                                <span\n" +
                    "                                                                    class=\"RichText ztext CopyrightRichText-richText\"\n" +
                    "                                                                    itemprop=\"text\">" + val["answer"]["answer_content"] + "…</span>\n" +
                    "                                                                <button type=\"button\"\n" +
                    "                                                                        class=\"Button ContentItem-more Button--plain\">\n" +
                    "                                                                    阅读全文<span\n" +
                    "                                                                        style=\"display: inline-flex; align-items: center;\">\n" +
                    "                                                                    ​<svg\n" +
                    "                                                                        class=\"Zi Zi--ArrowDown ContentItem-arrowIcon\"\n" +
                    "                                                                        fill=\"currentColor\" viewBox=\"0 0 24 24\"\n" +
                    "                                                                        width=\"24\" height=\"24\"><path\n" +
                    "                                                                        d=\"M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z\"\n" +
                    "                                                                        fill-rule=\"evenodd\"></path></svg></span>\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                            <div class=\"ContentItem-actions\">\n" +
                    "                                                                <span>\n";
                if (val["answer"]["attitude"] == 1) {
                    card += "                                                                    <button class=\"Button VoteButton VoteButton--up is-active\" aid='" + val["answer"]["aid"] + "'>" +
                        "                                                                        <span style=\"display: inline-flex; align-items: center;\">​\n" +
                        "                                                                <svg\n" +
                        "                                                                    class=\"Zi Zi--TriangleUp VoteButton-TriangleUp\"\n" +
                        "                                                                    fill=\"currentColor\" viewBox=\"0 0 24 24\" width=\"10\"\n" +
                        "                                                                    height=\"10\"><path\n" +
                        "                                                                    d=\"M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z\"\n" +
                        "                                                                    fill-rule=\"evenodd\"></path></svg></span> 已赞同 " +
                        val["answer"]["like"] + "</button\n" + "                                                                    ><button type=\"button\"\n" +
                        "                                                                    class=\"Button VoteButton VoteButton--down\" aid='" + val["answer"]["aid"] + "'>";
                } else if (val["answer"]["attitude"] == -1 || val["answer"]["attitude"]==null) {
                    card += "                                                                    <button class=\"Button VoteButton VoteButton--up\" aid='" + val["answer"]["aid"] + "'>" +
                        "                                                                        <span style=\"display: inline-flex; align-items: center;\">​\n" +
                        "                                                                <svg\n" +
                        "                                                                    class=\"Zi Zi--TriangleUp VoteButton-TriangleUp\"\n" +
                        "                                                                    fill=\"currentColor\" viewBox=\"0 0 24 24\" width=\"10\"\n" +
                        "                                                                    height=\"10\"><path\n" +
                        "                                                                    d=\"M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z\"\n" +
                        "                                                                    fill-rule=\"evenodd\"></path></svg></span> 赞同 " +
                        val["answer"]["like"] + "</button\n" + "                                                                    ><button type=\"button\"\n" +
                        "                                                                    class=\"Button VoteButton VoteButton--down\" aid='" + val["answer"]["aid"] + "'>";
                } else if (val["answer"]["attitude"] == 0) {
                    card += "                                                                    <button class=\"Button VoteButton VoteButton--up\" aid='" + val["answer"]["aid"] + "'>" +
                        "                                                                        <span style=\"display: inline-flex; align-items: center;\">​\n" +
                        "                                                                <svg\n" +
                        "                                                                    class=\"Zi Zi--TriangleUp VoteButton-TriangleUp\"\n" +
                        "                                                                    fill=\"currentColor\" viewBox=\"0 0 24 24\" width=\"10\"\n" +
                        "                                                                    height=\"10\"><path\n" +
                        "                                                                    d=\"M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z\"\n" +
                        "                                                                    fill-rule=\"evenodd\"></path></svg></span> 赞同 " +
                        val["answer"]["like"] + "</button\n" + "                                                                    ><button type=\"button\"\n" +
                        "                                                                    class=\"Button VoteButton VoteButton--down is-active\" aid='" + val["answer"]["aid"] + "'>";
                }
                card += "                                                                    <span\n" +
                    "                                                                    style=\"display: inline-flex; align-items: center;\">\n" +
                    "                                                                        ​<svg\n" +
                    "                                                                    class=\"Zi Zi--TriangleDown\" fill=\"currentColor\"\n" +
                    "                                                                    viewBox=\"0 0 24 24\" width=\"10\" height=\"10\"><path\n" +
                    "                                                                    d=\"M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z\"\n" +
                    "                                                                    fill-rule=\"evenodd\"></path></svg>\n" +
                    "                                                                    </span>\n" +
                    "                                                                </button></span>\n" +
                    "                                                                <button type=\"button\"\n" +
                    "                                                                        class=\"Button ContentItem-action Button--plain Button--withIcon Button--withLabel\">\n" +
                    "                                                                    <span style=\"display: inline-flex; align-items: center;\">​\n" +
                    "                                                                        <svg\n" +
                    "                                                                            class=\"Zi Zi--Comment Button-zi\"\n" +
                    "                                                                            fill=\"currentColor\" viewBox=\"0 0 24 24\"\n" +
                    "                                                                            width=\"1.2em\" height=\"1.2em\"><path\n" +
                    "                                                                            d=\"M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z\"\n" +
                    "                                                                            fill-rule=\"evenodd\"></path></svg></span>" + val["answer"]["comment"] + " 条评论\n" +
                    "                                                                </button>\n" +
                    "                                                                <button type=\"button\"\n" +
                    "                                                                        class=\"Button ContentItem-action Button--plain Button--withIcon Button--withLabel\">\n" +
                    "                                                                    <span style=\"display: inline-flex; align-items: center;\">​<svg\n" +
                    "                                                                            class=\"Zi Zi--Star Button-zi\"\n" +
                    "                                                                            fill=\"currentColor\" viewBox=\"0 0 24 24\"\n" +
                    "                                                                            width=\"1.2em\" height=\"1.2em\"><path\n" +
                    "                                                                            d=\"M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z\"\n" +
                    "                                                                            fill-rule=\"evenodd\"></path></svg></span>收藏\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                        </div>\n" +
                    "                                                    </div>\n" +
                    "                                                </div>\n" +
                    "                                            </div>";
                $("#card_topstory_list").append(card);
            });
        },
        error: function (result) {
            console.log("error: " + JSON.stringify(result));
        }

    });
    //热搜榜
    $.ajax({
        url: '/api/top_search/',
        type: 'GET',
        data: {count: 10},
        // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
        dataType: 'JSON',
        success: function (result) {
            var count = 0
            $.each(result, function (i, val) {
                count += 1;
                if (count <= 3) {
                    var card = "                                        <div class=\"TopSearch-item\" style='position: relative;' data-za-detail-view-path-module=\"HotSearchWordItem\"\n" +
                        "                                             data-za-extra-module=\"{}\">\n" +
                        "                                            <a class=\"TopSearch-itemLink\" target=\"_blank\"\n" +
                        "                                               href=\"/cms/search/content/?query=" + val["search_content"] + "\" style='width: auto;'><span" +
                        "                                                    class=\"TopSearch-itemText\">" + val["search_content"] + "</span>" +
                        "                                                <svg class=\"Zi Zi--Hot TopSearch-hot\" fill=\"currentColor\"\n" +
                        "                                                     viewBox=\"0 0 24 24\" width=\"18\" height=\"18\">\n" +
                        "                                                    <defs>\n" +
                        "                                                        <linearGradient id=\"id-2014200654-a\" x1=\"63.313%\" x2=\"46.604%\"\n" +
                        "                                                                        y1=\"-13.472%\" y2=\"117.368%\">\n" +
                        "                                                            <stop offset=\"2.35%\" stop-color=\"#EC471E\"></stop>\n" +
                        "                                                            <stop offset=\"100%\" stop-color=\"#FF6DC4\"></stop>\n" +
                        "                                                        </linearGradient>\n" +
                        "                                                    </defs>\n" +
                        "                                                    <path fill=\"url(#id-2014200654-a)\"\n" +
                        "                                                          d=\"M14.553 20.78c.862-.651 1.39-1.792 1.583-3.421.298-2.511-.656-4.904-2.863-7.179.209 2.291.209 3.73 0 4.314-.41 1.143-1.123 1.983-1.91 2.03-1.35.079-2.305-.512-2.863-1.774-.676 1.25-.782 2.556-.318 3.915.31.906.94 1.684 1.89 2.333C7.144 20.131 5 17.336 5 14.022c0-2.144.898-4.072 2.325-5.4.062 2.072.682 3.598 2.13 4.822-.67-1.112-.734-2.11-.734-3.517 0-3.253 2.067-6.007 4.913-6.927a7.35 7.35 0 0 0 2.157 4.918C17.722 9.214 19 11.463 19 14.022c0 3.073-1.844 5.7-4.447 6.758z\"\n" +
                        "                                                          fill-rule=\"evenodd\"></path>\n" +
                        "                                                </svg></a>\n" + "<div style='color: #808080;display: inline;position: absolute;right: 1px;'>" + val["count"] + "</div>" +
                        "                                            </div>";
                } else {
                    var card = "                                        <div class=\"TopSearch-item\" data-za-detail-view-path-module=\"HotSearchWordItem\"\n" +
                        "                                             data-za-extra-module=\"{}\" style='position: relative;'><a class=\"TopSearch-itemLink\" target=\"_blank\"\n" +
                        "                                                                          href=\"/search?q=" + val["search_content"] + "\" style='width: auto;'>" +
                        "                                              <span class=\"TopSearch-itemText\">" + val["search_content"] + "</span> </a> <div style='color: #808080;display: inline;position: absolute;right: 1px;'>" + val["count"] + "</div> </div>";

                }
                ;
                $("#TopSearch-items").append(card);
            });
        },
        error: function (result) {
            console.log("error: " + JSON.stringify(result));
        }

    });
    //公告榜
    $.ajax({
        url: '/api/notice/',
        type: 'GET',
        data: {count: 10},
        // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
        dataType: 'JSON',
        success: function (result) {
            var count = 0;
            $.each(result, function (i, val) {
                count += 1;
                var card = "<div class=\"TopSearch-item\" data-za-detail-view-path-module=\"HotSearchWordItem\"\n" +
                    "                                             data-za-extra-module=\"{}\"><a class=\"TopSearch-itemLink\" target=\"_blank\"" +
                    "                                                                          href=\"/cms/notice/" + val["nid"] + "\"><span" +
                    " class=\"TopSearch-itemText\">" + val["title"] + "</span></a></div>";
                $("#Announcement-items").append(card);
            });
        },
        error: function (result) {
            console.log("error: " + JSON.stringify(result));
        }

    });
    //提交问题
    $("#submit-question").click(function () {
        question_title = $("#question_title").val();
        question_details = $("#question_details").val();
        console.log(question_title);
        console.log(question_details);
        if (question_title.length != 0) {
            $.ajax({
                url: '/api/ask_question/',
                type: 'POST',
                data: {title: question_title, describe: question_details},
                // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
                dataType: 'JSON',
                success: function (result) {
                    console.log(result["state"]);
                    if (result["state"] == "200") {
                        // alert("问题提交成功！");
                        // $("#quest").css('display', 'none');
                        $.ajax({
                            url: '/api/follow_question/',
                            type: 'GET',
                            data: {qid: result["qid"]},
                            // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
                            dataType: 'JSON',
                            success: function (result1) {
                            },
                            error:function(result1){

                            }});
                        window.location.href = '/cms/question_detail/' + result["qid"];
                    }
                    if (result["state"] == "401") {
                        alert("标题少于3个字符，请重新输入标题！");
                    }
                },
                error: function (result) {
                    console.log("failed");
                }
            });
        }
    });
    //点赞
    $("body").on('click', '.Button.VoteButton.VoteButton--up', function (e) {
        now = this;
        $.ajax({
            url: '/api/attitude/',
            type: 'GET',
            data: {aid: $(this).attr("aid"), attitude: 1},
            dataType: 'JSON',
            success: function (result) {
                if (result["state"] == "200") {
                    if ($(now).hasClass('is-active')) {
                        $(now).removeClass("is-active");
                        $(now).html(
                            '<span style="display: inline-flex; align-items: center;">​\n' +
                            '                                                                <svg class="Zi Zi--TriangleUp VoteButton-TriangleUp" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg></span>' +
                            '赞同 ' + result["like_num"] + '</button>'
                        );
                        $(now).next().removeClass("is-active");

                    } else {
                        $(now).html(
                            '<span style="display: inline-flex; align-items: center;">​\n' +
                            '                                                                <svg class="Zi Zi--TriangleUp VoteButton-TriangleUp" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg></span>' +
                            '已赞同 ' + result["like_num"] + '</button>'
                        );
                        $(now).addClass("is-active");
                        $(now).next().removeClass("is-active");
                    }
                }
                if (result["state"] == "401") {
                    console.log("error: attitude错误!");
                }
                if (result["state"] == "402") {
                    console.log("error: aid不存在!");
                }
            },
            error: function (result) {
                console.log("error: " + JSON.stringify(result));
            }
        });
        console.log();
    });

    $("body").on('click', '.Button.VoteButton.VoteButton--down', function (e) {
        now = this;
        $.ajax({
            url: '/api/attitude/',
            type: 'GET',
            data: {aid: $(this).attr("aid"), attitude: 0},
            dataType: 'JSON',
            success: function (result) {
                if (result["state"] == "200") {
                    if ($(now).hasClass('is-active')) {
                        $(now).removeClass("is-active");
                        $(now).prev().removeClass("is-active");
                        $(now).prev().html(
                            '<span style="display: inline-flex; align-items: center;">​\n' +
                            '                                                                <svg class="Zi Zi--TriangleUp VoteButton-TriangleUp" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg></span>' +
                            '赞同 ' + result["like_num"] + '</button>'
                        );
                    } else {
                        $(now).addClass("is-active");
                        $(now).prev().removeClass("is-active");
                        $(now).prev().html(
                            '<span style="display: inline-flex; align-items: center;">​\n' +
                            '                                                                <svg class="Zi Zi--TriangleUp VoteButton-TriangleUp" fill="currentColor" viewBox="0 0 24 24" width="10" height="10"><path d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z" fill-rule="evenodd"></path></svg></span>' +
                            '赞同 ' + result["like_num"] + '</button>'
                        );
                    }

                }
                if (result["state"] == "401") {
                    console.log("error: attitude错误!");
                }
                if (result["state"] == "402") {
                    console.log("error: aid不存在!");
                }
            },
            error: function (result) {
                console.log("error: " + JSON.stringify(result));
            }
        });
        console.log();
    });
    //搜索
    var selectedItem = -1;
    var autocomplete = $(".AutoComplete-menu")
    var setSelectedItem = function (item) {
        selectedItem = item;
        //按上下键是循环显示的，小于0就设置成最大值，大于最大值就设置成0
        if (selectedItem < 0) {
            selectedItem = autocomplete.find(".Menu-item").length - 1;
        } else if (selectedItem > autocomplete.find(".Menu-item").length - 1) {
            selectedItem = 0;
        }
        //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
        autocomplete.find(".Menu-item").removeClass("is-active")
            .eq(selectedItem).addClass("is-active");
        autocomplete.find(".Menu-item").removeClass("is-active")
            .eq(selectedItem).addClass("is-active");
    };

    $("#Popover1-toggle").blur(function () {
        wrap_searchbox();
    });

    $("#search-button").mousedown(function () {
        $(location).attr('href', "/cms/search/content/?query="+$("#Popover1-toggle").val());
    });


    $("#Popover1-toggle").focus(function () {
        selectedItem = -1;
        var text = $(this).val();
        if (text.length != 0) {
            $.ajax({
                type: "GET",
                url: "/api/search_hint/",
                dataType: "JSON",
                data: {
                    q: text,
                    count: 10
                },
                async: false,
                success: function (result) {
                    $("#Popover1-content > div > div:nth-child(1)").html("");
                    $("#Popover1-content > div > div:nth-child(2)").html("");
                    $("#Popover1-content > div > div:nth-child(2)").append(
                        '<div class="Menu-item" id="AutoComplete2-searchLink-' + text +
                        '" role="option">\n' +
                        '                        <div data-za-module="TopNavBar">\n' +
                        '                            <div data-za-module="SearchSuggestionList">\n' +
                        '                                <div class="SearchBar-searchLink" data-za-detail-view-element_name="ViewSeachResult">\n' +
                        '                                    查看「' + text +
                        '」的搜索结果\n' +
                        '                                </div>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>'
                    );

                    if (result["state"] == "200") {
                        $.each(result["hint"], function (i, val) {
                            var card = '                    <div class="Menu-item" id="AutoComplete2-suggest-' + val +
                                '" role="option">\n' +
                                '                        <div data-za-module="TopNavBar">\n' +
                                '                            <div data-za-module="SearchSuggestionList">\n' +
                                '                                <div class="SearchBar-defaultResult"\n' +
                                '                                     data-za-detail-view-path-module="SearchSuggestionItem"\n' +
                                '                                     data-za-detail-view-path-index="1"><span>'
                            if (val.indexOf(text) != -1) {
                                card += '<em>' + text + '</em>' + val.replace(text, '')
                            } else {
                                card += val;
                            }
                            card += '</span></div>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>';
                            $("#Popover1-content > div > div:nth-child(1)").append(card);
                        });

                    }

                },
                error: function (result) {
                    console.log("error: " + JSON.stringify(result));
                }
            });
        } else {
            $.ajax({
                url: '/api/top_search/',
                type: 'GET',
                data: {count: 6},
                dataType: 'JSON',
                // async: false,
                success: function (result) {
                    $("#Popover1-content > div > div:nth-child(1)").html("");
                    $("#Popover1-content > div > div:nth-child(2)").html("");
                    card = "<div class=\"SearchBar-label\">Dou Know热搜</div>";
                    var count = 0;
                    $.each(result, function (i, val) {
                        count += 1;
                        if (count <= 3) {
                            card += '                    <div class="Menu-item" id="AutoComplete2-topSearch-' + val["search_content"] +
                                '" role="option">\n' +
                                '                        <div data-za-module="TopNavBar">\n' +
                                '                            <div data-za-module="HotSearchWordList">\n' +
                                '                                <div class="SearchBar-topSearchItem">' + val["search_content"] +
                                '' +
                                '                                    <svg class="Zi Zi--Hot SearchBar-hotIcon" fill="currentColor" viewBox="0 0 24 24"\n' +
                                '                                         width="18" height="18">\n' +
                                '                                        <defs>\n' +
                                '                                            <linearGradient id="id-2014200654-a" x1="63.313%" x2="46.604%" y1="-13.472%"\n' +
                                '                                                            y2="117.368%">\n' +
                                '                                                <stop offset="2.35%" stop-color="#EC471E"></stop>\n' +
                                '                                                <stop offset="100%" stop-color="#FF6DC4"></stop>\n' +
                                '                                            </linearGradient>\n' +
                                '                                        </defs>\n' +
                                '                                        <path fill="url(#id-2014200654-a)"\n' +
                                '                                              d="M14.553 20.78c.862-.651 1.39-1.792 1.583-3.421.298-2.511-.656-4.904-2.863-7.179.209 2.291.209 3.73 0 4.314-.41 1.143-1.123 1.983-1.91 2.03-1.35.079-2.305-.512-2.863-1.774-.676 1.25-.782 2.556-.318 3.915.31.906.94 1.684 1.89 2.333C7.144 20.131 5 17.336 5 14.022c0-2.144.898-4.072 2.325-5.4.062 2.072.682 3.598 2.13 4.822-.67-1.112-.734-2.11-.734-3.517 0-3.253 2.067-6.007 4.913-6.927a7.35 7.35 0 0 0 2.157 4.918C17.722 9.214 19 11.463 19 14.022c0 3.073-1.844 5.7-4.447 6.758z"\n' +
                                '                                              fill-rule="evenodd"></path>\n' +
                                '                                    </svg>\n' +
                                '                                </div>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>'
                        } else {
                            card += '                    <div class="Menu-item" id="AutoComplete2-topSearch-' + val["search_content"] +
                                '" role="option">\n' +
                                '                        <div data-za-module="TopNavBar">\n' +
                                '                            <div data-za-module="HotSearchWordList">\n' +
                                '                                <div class="SearchBar-topSearchItem">' + val["search_content"] +
                                '</div>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>'
                        }
                    });
                    $("#Popover1-content > div > div:nth-child(1)").append(card);
                },
                error: function (result) {
                    console.log("error: " + JSON.stringify(result));
                }
            });

        }
        expand_searchbox();
    });
    $("#Popover1-toggle").bind('input propertychange', 'none', function () {
        selectedItem = -1;
        var text = $(this).val();
        if (text.length != 0) {
            $.ajax({
                type: "GET",
                url: "/api/search_hint/",
                dataType: "JSON",
                data: {
                    q: text,
                    count: 10
                },
                async: false,
                success: function (result) {
                    $("#Popover1-content > div > div:nth-child(1)").html("");
                    $("#Popover1-content > div > div:nth-child(2)").html("");
                    $("#Popover1-content > div > div:nth-child(2)").append(
                        '<div class="Menu-item" id="AutoComplete2-searchLink-' + text +
                        '" role="option">\n' +
                        '                        <div data-za-module="TopNavBar">\n' +
                        '                            <div data-za-module="SearchSuggestionList">\n' +
                        '                                <div class="SearchBar-searchLink" data-za-detail-view-element_name="ViewSeachResult">\n' +
                        '                                    查看「' + text +
                        '」的搜索结果\n' +
                        '                                </div>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>'
                    );

                    if (result["state"] == "200") {
                        $.each(result["hint"], function (i, val) {
                            var card = '                    <div class="Menu-item" id="AutoComplete2-suggest-' + val +
                                '" role="option">\n' +
                                '                        <div data-za-module="TopNavBar">\n' +
                                '                            <div data-za-module="SearchSuggestionList">\n' +
                                '                                <div class="SearchBar-defaultResult"\n' +
                                '                                     data-za-detail-view-path-module="SearchSuggestionItem"\n' +
                                '                                     data-za-detail-view-path-index="1"><span>'
                            if (val.indexOf(text) != -1) {
                                card += '<em>' + text + '</em>' + val.replace(text, '')
                            } else {
                                card += val;
                            }
                            card += '</span></div>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>';
                            $("#Popover1-content > div > div:nth-child(1)").append(card);
                        });

                    }

                },
                error: function (result) {
                    console.log("error: " + JSON.stringify(result));
                }
            });
        } else {
            $.ajax({
                url: '/api/top_search/',
                type: 'GET',
                data: {count: 6},
                dataType: 'JSON',
                // async: false,
                success: function (result) {
                    $("#Popover1-content > div > div:nth-child(1)").html("");
                    $("#Popover1-content > div > div:nth-child(2)").html("");
                    card = "<div class=\"SearchBar-label\">Dou Know热搜</div>";
                    var count = 0;
                    $.each(result, function (i, val) {
                        count += 1;
                        if (count <= 3) {
                            card += '                    <div class="Menu-item" id="AutoComplete2-topSearch-' + val["search_content"] +
                                '" role="option">\n' +
                                '                        <div data-za-module="TopNavBar">\n' +
                                '                            <div data-za-module="HotSearchWordList">\n' +
                                '                                <div class="SearchBar-topSearchItem">' + val["search_content"] +
                                '' +
                                '                                    <svg class="Zi Zi--Hot SearchBar-hotIcon" fill="currentColor" viewBox="0 0 24 24"\n' +
                                '                                         width="18" height="18">\n' +
                                '                                        <defs>\n' +
                                '                                            <linearGradient id="id-2014200654-a" x1="63.313%" x2="46.604%" y1="-13.472%"\n' +
                                '                                                            y2="117.368%">\n' +
                                '                                                <stop offset="2.35%" stop-color="#EC471E"></stop>\n' +
                                '                                                <stop offset="100%" stop-color="#FF6DC4"></stop>\n' +
                                '                                            </linearGradient>\n' +
                                '                                        </defs>\n' +
                                '                                        <path fill="url(#id-2014200654-a)"\n' +
                                '                                              d="M14.553 20.78c.862-.651 1.39-1.792 1.583-3.421.298-2.511-.656-4.904-2.863-7.179.209 2.291.209 3.73 0 4.314-.41 1.143-1.123 1.983-1.91 2.03-1.35.079-2.305-.512-2.863-1.774-.676 1.25-.782 2.556-.318 3.915.31.906.94 1.684 1.89 2.333C7.144 20.131 5 17.336 5 14.022c0-2.144.898-4.072 2.325-5.4.062 2.072.682 3.598 2.13 4.822-.67-1.112-.734-2.11-.734-3.517 0-3.253 2.067-6.007 4.913-6.927a7.35 7.35 0 0 0 2.157 4.918C17.722 9.214 19 11.463 19 14.022c0 3.073-1.844 5.7-4.447 6.758z"\n' +
                                '                                              fill-rule="evenodd"></path>\n' +
                                '                                    </svg>\n' +
                                '                                </div>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>'
                        } else {
                            card += '                    <div class="Menu-item" id="AutoComplete2-topSearch-' + val["search_content"] +
                                '" role="option">\n' +
                                '                        <div data-za-module="TopNavBar">\n' +
                                '                            <div data-za-module="HotSearchWordList">\n' +
                                '                                <div class="SearchBar-topSearchItem">' + val["search_content"] +
                                '</div>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>'
                        }
                    });
                    $("#Popover1-content > div > div:nth-child(1)").append(card);
                },
                error: function (result) {
                    console.log("error: " + JSON.stringify(result));
                }
            });
        }
    });
    $("#Popover1-toggle").keyup(function (e) {
        expand_searchbox();
        // 判断上下键与enter键
        switch (e.keyCode) {
            case 38: //上
                if (selectedItem == -1) {
                    setSelectedItem(autocomplete.find(".Menu-item").length - 1);
                } else {
                    //索引减1
                    setSelectedItem(selectedItem - 1);
                }
                // e.preventDefault();
                break;
            case 40: //下
                if (selectedItem == -1) {
                    setSelectedItem(0);
                } else {
                    setSelectedItem(selectedItem + 1);
                }
                // e.preventDefault();
                break;
            case 27:
                    wrap_searchbox();
                    break

        }
    });
    $("#Popover1-toggle").keydown(function (e) {
        if(e.keyCode==13){
            if(selectedItem==-1)
            {
                if(getParams("type"))
                {
                    $(location).attr('href',  "/cms/search/" +getParams("type")+
                        "/?query="+$("#Popover1-toggle").val());
                }
                else
                {
                    $(location).attr('href',  "/cms/search/content/?query="+$("#Popover1-toggle").val());
                }
            }
            else
                {
                    if(getParams("type"))
                    {
                        $(location).attr('href', "/cms/search/" +getParams("type")+
                            "/?query=" + autocomplete.find(".Menu-item").eq(selectedItem).attr("id").split('-')["2"]);
                    }
                    else{
                        $(location).attr('href', "/cms/search/content/?query=" + autocomplete.find(".Menu-item").eq(selectedItem).attr("id").split('-')["2"]);
                    }

            }
            e.preventDefault();
        }
    });
    //鼠标移入
    $("body").on('mousemove', '.Menu-item', function (e) {
        $(this).addClass("is-active");
    });

    //鼠标移出
    $("body").on('mouseout', '.Menu-item', function (e) {
        $(this).removeClass("is-active");
    });

    //鼠标点击跳转
    $("body").on('click', '.Menu-item', function (e) {
        if(getParams("type"))
        {
            $(location).attr('href', "/cms/search/" +getParams("type")+
                "/?query=" + $(this).attr("id").split('-')["2"]);
        }
        else{
            $(location).attr('href', "/cms/search/content/?query=" + $(this).attr("id").split('-')["2"]);
        }
    });

    //滚动
    $(window).scroll(function () {
        var scroH = $(document).scrollTop();
        if (scroH > 26) {
            $("#root > div > div:nth-child(2) > header").addClass("is-fixed");
            $("#root > div > div:nth-child(2) > header").attr('style', 'width: 1519.2px; top: 0px; left: 0px;');
        }
        // if(scroH<26)
        // {
        //     $("#root > div > div:nth-child(2) > header").removeClass("is-fixed");
        //     $("#root > div > div:nth-child(2) > header")attr('style','none');
        // }
    });

    $("#Popover15-toggle").click(function () {
        open_notification();
    });
    $("#Popover15-toggle").blur(function () {
        close_notification();
    });

    $("#Popover16-toggle").click(function () {
        open_message();
    });
    $("#Popover16-toggle").blur(function () {
        close_message();
    });

    $("#Popover17-toggle").click(function () {
        open_user();
    });
    $("#Popover15-content").blur(function () {
        close_user();
    });

    $("#login_button").click(function () {
        $(location).attr('href', '/userzone/login/');
    })

});

// $(document).on('mousewheel DOMMouseScroll', onMouseScroll);
// function onMouseScroll(e){
//     e.preventDefault();
//     var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
//     var delta = Math.max(-1, Math.min(1, wheel) );
//     if(delta<=0){//向下滚动
//         console.log('向下滚动',delta);
//         $("#root > div > div:nth-child(2) > header").addClass("is-fixed");
//         $("#root > div > div:nth-child(2) > header").attr('style','width: 1519.2px; top: 0px; left: 0px;')
//         // $("#root > div > div:nth-child(2) > header").css('style','width: 1519.2px; top: 0px; left: 0px;');
//     }else{//向上滚动
//         console.log('向上滚动',delta);
//         $("#root > div > div:nth-child(2) > header").removeClass("is-fixed");
//         $("#root > div > div:nth-child(2) > header")attr('style','none')
//     }
// }

// $(document).scroll(function() {
//     var scroH = $(document).scrollTop();  //滚动高度
//     var viewH = $(window).height();  //可见高度
//     var contentH = $(document).height();  //内容高度
//     console.log(scroH)
//     if(scroH >1080){  // 距离顶部大于1080px时
//         console.log(scroH);
//     }
//     if (contentH - (scroH + viewH) <= 1080){  // 距离底部高度小于1080px
//
//     }
//     if (contentH = (scroH + viewH)){  //滚动条滑到底部啦
//
//     }
// });

function expand_searchbox() {
    // $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").removeClass("SearchBar-input Input-wrapper Input-wrapper--grey");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").addClass("SearchBar-focusedInput is-focus");
    $("#search-button").addClass("Button--blue");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > button").addClass("SearchBar-hiddenAskButton");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label > button > span > svg").addClass("isFocus hasValue");
    $("#Popover1-content").css('display', 'block');
}

function wrap_searchbox() {
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").removeClass();
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").addClass("SearchBar-input Input-wrapper Input-wrapper--grey");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > button").removeClass("SearchBar-hiddenAskButton")
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label > button > span > svg").removeClass("isFocus hasValue")
    $("#Popover1-content").css('display', 'none');
}

function open_notification() {
    $("#Popover13-content").css('display', 'block');

}

function close_notification() {
    $("#Popover13-content").css('display', 'none');

}

function open_message() {
    $("#Popover14-content").css('display', 'block');

}

function close_message() {
    $("#Popover14-content").css('display', 'none');

}

function open_user() {
    $("#Popover15-content").css('display', 'block');

}

function close_user() {
    $("#Popover15-content").css('display', 'none');

}

function getParams(key) {

    var result = {};
    var paramStr = encodeURI(window.document.location.search);
    if (paramStr) {
        paramStr = paramStr.substring(1);
        var params = paramStr.split('&');
        for (var p = 0; p < params.length; p++) {
            result[params[p].split('=')[0]] = unescape(params[p].split('=')[1]);
        }
    }
    return result[key];
};