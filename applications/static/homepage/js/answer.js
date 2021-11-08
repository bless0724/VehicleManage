$(document).ready(function () {
    $.ajax({
        url: '/api/answer_detail/',
        type: 'GET',
        data: {qid: window.location.href.split('/')[5], aid: window.location.href.split('/')[7]},
        dataType: 'JSON',
        success: function (result) {
            $(".QuestionPage").html("");
            if (result["current_user"]["uid"] == result["user"]["uid"]) {
                var head = '                <div>\n' +
                    '                    <div class="QuestionHeader">\n' +
                    '                        <div class="QuestionHeader-content">\n' +
                    '                            <div class="QuestionHeader-main">' +
                    '<h1 class="QuestionHeader-title">' + result['title'] + '</h1>                                <div>\n' +
                    '                                    <div class="QuestionHeader-detail">\n' +
                    '                                        <div class="QuestionRichText QuestionRichText--expandable QuestionRichText--collapsed">\n' +
                    '                                            <div><span class="RichText ztext" itemProp="text">' + result["describe"] +
                    '</span>' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>' +
                    '                            <div class="QuestionHeader-side">\n' +
                    '                                <div class="QuestionHeader-follow-status">\n' +
                    '                                    <div class="QuestionFollowStatus">\n' +
                    '                                        <div class="NumberBoard QuestionFollowStatus-counts NumberBoard--divider">\n' +
                    '                                            <button type="button" class="Button NumberBoard-item Button--plain">\n' +
                    '                                                <div class="NumberBoard-itemInner">\n' +
                    '                                                    <div class="NumberBoard-itemName">关注者</div>\n' +
                    '                                                    <strong class="NumberBoard-itemValue Follower_num">' + result["follower_num"] +
                    '</strong></div>\n' +
                    '                                            </button>\n' +
                    '                                            <div\n' +
                    '                                                    class="NumberBoard-item">\n' +
                    '                                                <div class="NumberBoard-itemInner">\n' +
                    '                                                    <div class="NumberBoard-itemName">被浏览</div>\n' +
                    '                                                    <strong class="NumberBoard-itemValue">' + result["browse_view"] +
                    '</strong>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>' +
                    '                        <div class="QuestionHeader-footer">\n' +
                    '                            <div class="QuestionHeader-footer-inner">\n' +
                    '                                <div class="QuestionHeader-main QuestionHeader-footer-main">\n' +
                    '                                    <div class="QuestionButtonGroup">\n' +
                    '                                        <button type="button" \n'
                if (result["follow_status"] == 0) {
                    head += '                                                class="Button FollowButton Button--primary Button--blue Question--Follow--Button" qid="' + result["qid"] +
                        '">' + '                                            关注问题\n' +
                        '                                        </button>\n'
                } else if (result["follow_status"] == 1) {
                    head += 'class="Button FollowButton Button--primary Question--Follow--Button Button--grey" qid="' + result["qid"] +
                        '">' + '                                            已关注\n' +
                        '                                        </button>\n'
                }
                head += '                                        <button type="button" class="Button Button--blue" id="write-answer">\n' +
                    '                                            <svg viewBox="0 0 12 12"\n' +
                    '                                                 class="Icon QuestionButton-icon Button-icon Icon--modify"\n' +
                    '                                                 style="height:16px;width:14px" width="14" height="16"\n' +
                    '                                                 aria-hidden="true"><title></title>\n' +
                    '                                                <g>\n' +
                    '                                                    <path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"\n' +
                    '                                                          fill-rule="evenodd"/>\n' +
                    '                                                </g>\n' +
                    '                                            </svg>\n' +
                    '                                            写回答\n' +
                    '                                        </button>\n' +
                    '                                    </div>\n' +
                    '                                    <div\n' +
                    '                                            class="QuestionHeaderActions">\n' +
                    '                                        <button style="margin-right:16px" type="button" \n' +
                    '                                                class="Button Button--grey Button--withIcon Button--withLabel"><span\n' +
                    '                                                style="display:inline-flex;align-items:center">​<svg\n' +
                    '                                                class="Zi Zi--Invite Button-zi" fill="currentColor" viewBox="0 0 24 24"\n' +
                    '                                                width="1.2em" height="1.2em"><path\n' +
                    '                                                d="M4 10V8a1 1 0 1 1 2 0v2h2a1 1 0 0 1 0 2H6v2a1 1 0 0 1-2 0v-2H2a1 1 0 0 1 0-2h2zm10.455 2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-7 6c0-2.66 4.845-4 7.272-4C17.155 14 22 15.34 22 18v1.375c0 .345-.28.625-.625.625H8.08a.625.625 0 0 1-.625-.625V18z"\n' +
                    '                                                fill-rule="evenodd"></path></svg></span>邀请回答\n' +
                    '                                        </button>\n' +
                    '                                        <button type="button"\n' +
                    '                                                class="Button Button--plain Button--withIcon Button--withLabel Question--Report--Button" qid="' + result["qid"] +
                    '"><span\n' +
                    '                                                style="display:inline-flex;align-items:center">​<svg\n' +
                    '                                                class="Zi Zi--Report Button-zi" fill="currentColor" viewBox="0 0 24 24"\n' +
                    '                                                width="1.2em" height="1.2em"><path\n' +
                    '                                                d="M19.947 3.129c-.633.136-3.927.639-5.697.385-3.133-.45-4.776-2.54-9.949-.888-.997.413-1.277 1.038-1.277 2.019L3 20.808c0 .3.101.54.304.718a.97.97 0 0 0 .73.304c.275 0 .519-.102.73-.304.202-.179.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V3.964c0-.599-.42-.972-1.053-.835z"\n' +
                    '                                                fill-rule="evenodd"></path></svg></span>举报\n' +
                    '                                        </button>\n' + '<button type="button" class="Button Button--plain Button--withIcon Button--withLabel Question--Delete--Button" qid="' + result["qid"] +
                    '"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--Trash" fill="currentColor" viewBox="0 0 24 24" width="16" height="16" style="margin-right: 5px;"><path d="M16.464 4s.051-2-1.479-2H9C7.194 2 7.465 4 7.465 4H4.752c-2.57 0-2.09 3.5 0 3.5l1.213 13.027S5.965 22 7.475 22h8.987c1.502 0 1.502-1.473 1.502-1.473l1.2-13.027c2.34 0 2.563-3.5 0-3.5h-2.7zM8.936 18.5l-.581-9h1.802v9H8.936zm4.824 0v-9h1.801l-.61 9H13.76z" fill-rule="evenodd"></path></svg></span>删除</button>'
                $(".QuestionPage").append(head);
            } else {
                var head = '                <div>\n' +
                    '                    <div class="QuestionHeader">\n' +
                    '                        <div class="QuestionHeader-content">\n' +
                    '                            <div class="QuestionHeader-main">' +
                    '<h1 class="QuestionHeader-title">' + result['title'] + '</h1>                                <div>\n' +
                    '                                    <div class="QuestionHeader-detail">\n' +
                    '                                        <div class="QuestionRichText QuestionRichText--expandable QuestionRichText--collapsed">\n' +
                    '                                            <div><span class="RichText ztext" itemProp="text">' + result["describe"] +
                    '</span>' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>' +
                    '                            <div class="QuestionHeader-side">\n' +
                    '                                <div class="QuestionHeader-follow-status">\n' +
                    '                                    <div class="QuestionFollowStatus">\n' +
                    '                                        <div class="NumberBoard QuestionFollowStatus-counts NumberBoard--divider">\n' +
                    '                                            <button type="button" class="Button NumberBoard-item Button--plain">\n' +
                    '                                                <div class="NumberBoard-itemInner">\n' +
                    '                                                    <div class="NumberBoard-itemName">关注者</div>\n' +
                    '                                                    <strong class="NumberBoard-itemValue Follower_num">' + result["follower_num"] +
                    '</strong></div>\n' +
                    '                                            </button>\n' +
                    '                                            <div\n' +
                    '                                                    class="NumberBoard-item">\n' +
                    '                                                <div class="NumberBoard-itemInner">\n' +
                    '                                                    <div class="NumberBoard-itemName">被浏览</div>\n' +
                    '                                                    <strong class="NumberBoard-itemValue">' + result["browse_view"] +
                    '</strong>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>' +
                    '                        <div class="QuestionHeader-footer">\n' +
                    '                            <div class="QuestionHeader-footer-inner">\n' +
                    '                                <div class="QuestionHeader-main QuestionHeader-footer-main">\n' +
                    '                                    <div class="QuestionButtonGroup">\n' +
                    '                                        <button type="button" \n'
                                    if (result["follow_status"] == 0) {
                    head += '                                                class="Button FollowButton Button--primary Button--blue Question--Follow--Button" qid="' + result["qid"] +
                        '">' + '                                            关注问题\n' +
                        '                                        </button>\n'
                } else if (result["follow_status"] == 1) {
                    head += 'class="Button FollowButton Button--primary Question--Follow--Button Button--grey" qid="' + result["qid"] +
                        '">' + '                                            已关注\n' +
                        '                                        </button>\n'
                }
                    head+='                                        <button type="button" class="Button Button--blue" id="write-answer">\n' +
                    '                                            <svg viewBox="0 0 12 12"\n' +
                    '                                                 class="Icon QuestionButton-icon Button-icon Icon--modify"\n' +
                    '                                                 style="height:16px;width:14px" width="14" height="16"\n' +
                    '                                                 aria-hidden="true"><title></title>\n' +
                    '                                                <g>\n' +
                    '                                                    <path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"\n' +
                    '                                                          fill-rule="evenodd"/>\n' +
                    '                                                </g>\n' +
                    '                                            </svg>\n' +
                    '                                            写回答\n' +
                    '                                        </button>\n' +
                    '                                    </div>\n' +
                    '                                    <div\n' +
                    '                                            class="QuestionHeaderActions">\n' +
                    '                                        <button style="margin-right:16px" type="button" \n' +
                    '                                                class="Button Button--grey Button--withIcon Button--withLabel"><span\n' +
                    '                                                style="display:inline-flex;align-items:center">​<svg\n' +
                    '                                                class="Zi Zi--Invite Button-zi" fill="currentColor" viewBox="0 0 24 24"\n' +
                    '                                                width="1.2em" height="1.2em"><path\n' +
                    '                                                d="M4 10V8a1 1 0 1 1 2 0v2h2a1 1 0 0 1 0 2H6v2a1 1 0 0 1-2 0v-2H2a1 1 0 0 1 0-2h2zm10.455 2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-7 6c0-2.66 4.845-4 7.272-4C17.155 14 22 15.34 22 18v1.375c0 .345-.28.625-.625.625H8.08a.625.625 0 0 1-.625-.625V18z"\n' +
                    '                                                fill-rule="evenodd"></path></svg></span>邀请回答\n' +
                    '                                        </button>\n' +
                    '                                        <button type="button"\n' +
                    '                                                class="Button Button--plain Button--withIcon Button--withLabel Question--Report--Button Question--Report--Button" qid="' + result["qid"] +
                    '"><span\n' +
                    '                                                style="display:inline-flex;align-items:center">​<svg\n' +
                    '                                                class="Zi Zi--Report Button-zi" fill="currentColor" viewBox="0 0 24 24"\n' +
                    '                                                width="1.2em" height="1.2em"><path\n' +
                    '                                                d="M19.947 3.129c-.633.136-3.927.639-5.697.385-3.133-.45-4.776-2.54-9.949-.888-.997.413-1.277 1.038-1.277 2.019L3 20.808c0 .3.101.54.304.718a.97.97 0 0 0 .73.304c.275 0 .519-.102.73-.304.202-.179.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V3.964c0-.599-.42-.972-1.053-.835z"\n' +
                    '                                                fill-rule="evenodd"></path></svg></span>举报\n' +
                    '                                        </button>\n';
                $(".QuestionPage").append(head);
            }
            $(".QuestionPage").append(
                '                                    </div>\n' +
                '                                    <div class="QuestionHeader-actions"></div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div>\n' +
                '                        <div class="Sticky"></div>\n' +
                '                    </div>\n' +
                '                </div>' +
                '                <div class="Question-main">\n' +
                '                    <div class="Question-mainColumn">\n' +
                '                        <div>\n' +
                '                            <div id="write-QuestionAnswers-statusWrapper" class="QuestionAnswers-statusWrapper"></div>\n' +
                '                            <div id="QuestionAnswers-answers" class="QuestionAnswers-answers"\n' +
                '                                 data-zop-feedlistmap="0,0,1,0" data-za-detail-view-path-module="ContentList"\n' +
                '                                 data-za-extra-module="{}">\n' +
                '                                <div class="Card AnswersNavWrapper">\n' +
                '                                    <div class="ListShortcut">\n' +
                '                                        <div class="List">\n' +
                '                                            <div>\n' +
                '                                                <div class="" id="answer-lists">' +
                '</div></div></div></div></div></div></div>'
            );
            $.each(result["answer_list"], function (i, val) {
                console.log(val);
                var card = '                                                    <div class="List-item" tabindex="0">\n' +
                    '                                                        <div class="ContentItem AnswerItem" itemprop="suggestedAnswer"\n' +
                    '                                                             itemtype="http://schema.org/Answer">\n' +
                    '                                                            <div class="ContentItem-meta">\n' +
                    '                                                                <div class="AuthorInfo AnswerItem-authorInfo AnswerItem-authorInfo--related"\n' +
                    '                                                                     itemprop="author" itemscope=""\n' +
                    '                                                                     itemtype="http://schema.org/Person">\n' +
                    '                                                                    <span class="UserLink AuthorInfo-avatarWrapper"><img\n' +
                    '                                                                            class="Avatar AuthorInfo-avatar" width="38"\n' +
                    '                                                                            height="38"\n' +
                    '                                                                            src="/static/homepage/images/touxiang.jpg"\n' +
                    '                                                                            ></span>\n' +
                    '                                                                    <div class="AuthorInfo-content">\n' +
                    '                                                                        <div class="AuthorInfo-head"><span\n' +
                    '                                                                                class="UserLink AuthorInfo-name">' + val["user"]["nickname"] +
                    '</span>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <div class="AuthorInfo-detail">\n' +
                    '                                                                            <div class="AuthorInfo-badge"></div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>' +
                    '                                                            <div class="RichContent RichContent--unescapable">\n' +
                    '                                                                <div class="RichContent-inner"><span\n' +
                    '                                                                        class="RichText ztext CopyrightRichText-richText"\n' +
                    '                                                                        itemprop="text"><p>' + val["content"] +
                    '</p></span>\n' +
                    '                                                                </div>\n' +
                    '                                                                <div>\n' +
                    '                                                                    <div class="ContentItem-time"><a target="_blank"\n' +
                    '                                                                                                     href="/cms/question/' + result["qid"] + '/answer/' + val["aid"] + '">' +
                    '<span>发布于 ' + val["time"] +
                    '</span></a>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                                <div class="ContentItem-actions"><span>';
                if (val["attitude"] == 1) {
                    card += '                                                                        <button\n type="button" aid="' + val["aid"] + '"' +
                        '                                                                        class="Button VoteButton VoteButton--up is-active"><span\n' +
                        '                                                                        style="display: inline-flex; align-items: center;">​<svg\n' +
                        '                                                                        class="Zi Zi--TriangleUp VoteButton-TriangleUp"\n' +
                        '                                                                        fill="currentColor" viewBox="0 0 24 24"\n' +
                        '                                                                        width="10" height="10"><path\n' +
                        '                                                                        d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z"\n' +
                        '                                                                        fill-rule="evenodd"></path></svg></span>已赞同' + val["like_num"] +
                        '</button><button\n' +
                        '                                                                        aria-label="反对" type="button" aid="' + val["aid"] + '"' +
                        '                                                                        class="Button VoteButton VoteButton--down"><span\n' +
                        '                                                                        style="display: inline-flex; align-items: center;">​<svg\n' +
                        '                                                                        class="Zi Zi--TriangleDown" fill="currentColor"\n' +
                        '                                                                        viewBox="0 0 24 24" width="10" height="10"><path\n' +
                        '                                                                        d="M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z"\n' +
                        '                                                                        fill-rule="evenodd"></path></svg></span></button>';
                } else if (val["attitude"] == -1 || val["attitude"] == null) {
                    card += '                                                                        <button\n type="button" aid="' + val["aid"] + '"' +
                        '                                                                        class="Button VoteButton VoteButton--up"><span\n' +
                        '                                                                        style="display: inline-flex; align-items: center;">​<svg\n' +
                        '                                                                        class="Zi Zi--TriangleUp VoteButton-TriangleUp"\n' +
                        '                                                                        fill="currentColor" viewBox="0 0 24 24"\n' +
                        '                                                                        width="10" height="10"><path\n' +
                        '                                                                        d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z"\n' +
                        '                                                                        fill-rule="evenodd"></path></svg></span>赞同' + val["like_num"] +
                        '</button><button\n' +
                        '                                                                        aria-label="反对" type="button" aid="' + val["aid"] + '"' +
                        '                                                                        class="Button VoteButton VoteButton--down"><span\n' +
                        '                                                                        style="display: inline-flex; align-items: center;">​<svg\n' +
                        '                                                                        class="Zi Zi--TriangleDown" fill="currentColor"\n' +
                        '                                                                        viewBox="0 0 24 24" width="10" height="10"><path\n' +
                        '                                                                        d="M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z"\n' +
                        '                                                                        fill-rule="evenodd"></path></svg></span></button>';
                } else if (val["attitude"] == 0) {
                    card += '                                                                        <button\n type="button" aid="' + val["aid"] + '"' +
                        '                                                                        class="Button VoteButton VoteButton--up"><span\n' +
                        '                                                                        style="display: inline-flex; align-items: center;">​<svg\n' +
                        '                                                                        class="Zi Zi--TriangleUp VoteButton-TriangleUp"\n' +
                        '                                                                        fill="currentColor" viewBox="0 0 24 24"\n' +
                        '                                                                        width="10" height="10"><path\n' +
                        '                                                                        d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z"\n' +
                        '                                                                        fill-rule="evenodd"></path></svg></span>赞同' + val["like_num"] +
                        '</button><button\n' +
                        '                                                                        aria-label="反对" type="button" aid="' + val["aid"] + '"' +
                        '                                                                        class="Button VoteButton VoteButton--down is-active"><span\n' +
                        '                                                                        style="display: inline-flex; align-items: center;">​<svg\n' +
                        '                                                                        class="Zi Zi--TriangleDown" fill="currentColor"\n' +
                        '                                                                        viewBox="0 0 24 24" width="10" height="10"><path\n' +
                        '                                                                        d="M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z"\n' +
                        '                                                                        fill-rule="evenodd"></path></svg></span></button>';
                }
                card += '</span>' +
                    '                                                                    <button type="button"\n' +
                    '                                                                            class="Button ContentItem-action Button--plain Button--withIcon Button--withLabel" >\n' +
                    '                                                                        <span style="display: inline-flex; align-items: center;">​<svg\n' +
                    '                                                                                class="Zi Zi--Comment Button-zi"\n' +
                    '                                                                                fill="currentColor" viewBox="0 0 24 24"\n' +
                    '                                                                                width="1.2em" height="1.2em"><path\n' +
                    '                                                                                d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"\n' +
                    '                                                                                fill-rule="evenodd"></path></svg></span>添加评论\n' +
                    '                                                                    </button>' +
                    '                                                                    <button type="button" aid="' + val["aid"] + '"' +
                    '                                                                            class="Button ContentItem-action Button--plain Button--withIcon Button--withLabel Favorite--Button">\n' +
                    '                                                                        <span style="display: inline-flex; align-items: center;">​<svg\n' +
                    '                                                                                class="Zi Zi--Star Button-zi"\n' +
                    '                                                                                fill="currentColor" viewBox="0 0 24 24"\n' +
                    '                                                                                width="1.2em" height="1.2em"><path\n' +
                    '                                                                                d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"\n' +
                    '                                                                                fill-rule="evenodd"></path></svg></span>收藏\n' +
                    '                                                                    </button>' +
                    '<button type="button" aid="' + val["aid"] + '"' +
                    'class="Button ContentItem-action Button--plain Button--withIcon Button--withLabel Answer--Report--Button"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--Report Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M19.947 3.129c-.633.136-3.927.639-5.697.385-3.133-.45-4.776-2.54-9.949-.888-.997.413-1.277 1.038-1.277 2.019L3 20.808c0 .3.101.54.304.718a.97.97 0 0 0 .73.304c.275 0 .519-.102.73-.304.202-.179.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V3.964c0-.599-.42-.972-1.053-.835z" fill-rule="evenodd"></path></svg></span>举报</button>';
                if (val["user"]["uid"] == result["current_user"]["uid"]) {
                    card += '<button type="button" aid="' + val["aid"] + '"' +
                        'class="Button ContentItem-action Button--plain Button--withIcon Button--withLabel Answer--Detete--Button"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--Trash" fill="currentColor" viewBox="0 0 24 24" width="16" height="16" style="margin-right: 5px;"><path d="M16.464 4s.051-2-1.479-2H9C7.194 2 7.465 4 7.465 4H4.752c-2.57 0-2.09 3.5 0 3.5l1.213 13.027S5.965 22 7.475 22h8.987c1.502 0 1.502-1.473 1.502-1.473l1.2-13.027c2.34 0 2.563-3.5 0-3.5h-2.7zM8.936 18.5l-.581-9h1.802v9H8.936zm4.824 0v-9h1.801l-.61 9H13.76z" fill-rule="evenodd"></path></svg></span>删除</button>';

                }
                card += '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>';
                $("#answer-lists").append(card);
            });
            $("#answer-lists").append(
                '<div class="Card ViewAll" data-za-detail-view-path-module="MessageItem" data-za-extra-module="{&quot;card&quot;:{&quot;content&quot;:{&quot;item_num&quot;:26}}}"><a class="QuestionMainAction ViewAll-QuestionMainAction" data-za-detail-view-element_name="ViewAll" href="/cms/question_detail/' + result["qid"] + '">查看全部 ' + result["answer_num"] + ' 个回答</a></div>'
            );

        },
        error: function (result) {
            console.log("error: " + JSON.stringify(result));
        }

    });
    $("#submit-question").click(function () {
        question_title = $("#question_title").val();
        question_details = $("#question_details").val();
        if (question_title.length != 0) {
            $.ajax({
                url: '/api/ask_question/',
                type: 'POST',
                data: {title: question_title, describe: question_details},
                // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
                dataType: 'JSON',
                success: function (result) {
                    if (result["state"] == "200") {
                        // alert("问题提交成功！");
                        // $("#quest").css('display', 'none');
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
    $("body").on('click', '#write-answer', function () {
        $(".QuestionAnswers-statusWrapper").html("");
        $(".QuestionAnswers-statusWrapper").append("                                <div class=\"Card QuestionAnswers-answerAdd\" id=\"js-answerAddCard\"><a name=\"draft\"></a>\n" +
            "                                    <div class=\"AnswerAdd\">\n" +
            "                                        <div class=\"AnswerAdd-header\">\n" +
            "                                            <div class=\"AuthorInfo AnswerAdd-info\" itemprop=\"author\" itemscope=\"\"\n" +
            "                                                 itemtype=\"http://schema.org/Person\">\n" +
            "                                                <span class=\"UserLink AuthorInfo-avatarWrapper\"><img\n" +
            "                                                        class=\"Avatar AuthorInfo-avatar\" width=\"38\" height=\"38\"\n" +
            "                                                        src=\"/static/homepage/images/touxiang.jpg\"></span>\n" +
            "                                                <div class=\"AuthorInfo-content\">\n" +
            "                                                    <div class=\"AuthorInfo-head\"><span class=\"UserLink AuthorInfo-name\">" + "Galaxy" +
            "</span>\n" +
            "                                                    </div>\n" +
            "                                                    <div class=\"AuthorInfo-detail\">\n" +
            "                                                        <div class=\"AuthorInfo-badge\"><span class=\"ztext AnswerAdd-bio\">" + "来自未来的太空旅客" +
            "</span>\n" +
            "                                                        </div>\n" +
            "                                                    </div>\n" +
            "                                                </div>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"ContentItem-meta\">\n" +
            "                                            <textarea id=\"scpg\" name=\"editor01\" style=\"width:2px;height:1px\" rows=\"20\"\n" +
            "                                                      cols=\"20\"></textarea>\n" +
            "                                            <script type=\"text/javascript\">\n" +
            "                                                CKEDITOR.replace('editor01');\n" +
            "                                            </script>\n" +
            "                                        </div>\n" +
            "                                        <div>\n" +
            "                                            <div class=\"Sticky AnswerForm-footer is-bottom\" style=\"\">\n" +
            "                                                <div class=\"AnswerForm-footerContent AnswerForm-container\">\n" +
            "                                                    <div class=\"AnswerForm-status\">\n" +
            "                                                        <div>\n" +
            "                                                            <button aria-label=\"删除草稿\" data-tooltip=\"删除草稿\" type=\"button\"\n" +
            "                                                                    class=\"Button AnswerForm-delete Button--plain\">\n" +
            "                                                                <svg viewBox=\"0 0 18 20\" class=\"Icon Icon--delete\"\n" +
            "                                                                     width=\"14\" height=\"16\" aria-hidden=\"true\"\n" +
            "                                                                     style=\"height: 16px; width: 14px;\"><title></title>\n" +
            "                                                                    <g>\n" +
            "                                                                        <path d=\"M13.464 2s.05-2-1.48-2H6C4.193 0 4.464 2 4.464 2H1.752c-2.57 0-2.09 3.5 0 3.5l1.213 13.027S2.965 20 4.475 20h8.987c1.502 0 1.502-1.473 1.502-1.473l1.2-13.027c2.34 0 2.563-3.5 0-3.5h-2.7zM5.936 16.5l-.58-9h1.8v9h-1.22zm4.824 0v-9h1.8l-.61 9h-1.19z\"\n" +
            "                                                                              fill-rule=\"evenodd\"></path>\n" +
            "                                                                    </g>\n" +
            "                                                                </svg>\n" +
            "                                                            </button>\n" +
            "                                                        </div>\n" +
            "                                                    </div>\n" +
            "                                                    <div class=\"AnswerForm-footerRight\">\n" +
            "                                                        <div class=\"Popover\">\n" +
            "                                                            <button type=\"button\" id=\"Popover46-toggle\" aria-haspopup=\"true\"\n" +
            "                                                                    aria-expanded=\"false\" aria-owns=\"Popover46-content\"\n" +
            "                                                                    class=\"Button Button--plain\">\n" +
            "                                                                <svg viewBox=\"0 0 20 20\"\n" +
            "                                                                     class=\"Icon Icon--setting Icon--left\" width=\"14\"\n" +
            "                                                                     height=\"16\" aria-hidden=\"true\"\n" +
            "                                                                     style=\"height: 16px; width: 14px;\"><title></title>\n" +
            "                                                                    <g>\n" +
            "                                                                        <path d=\"M18.868 15.185c-.164.096-.315.137-.452.137-.123 0-1.397-.26-1.617-.233-1.355.013-1.782 1.275-1.836 1.74-.055.454 0 .893.19 1.304.138.29.125.577-.067.85-.863.893-2.165 1.016-2.357 1.016-.123 0-.247-.055-.356-.15-.11-.097-.685-1.14-1.07-1.47-1.303-.954-2.246-.328-2.63 0-.397.33-.67.7-.835 1.126-.07.18-.18.302-.33.37-1.354.426-2.918-.92-3.014-1.056-.082-.11-.123-.22-.123-.356-.014-.138.383-1.276.342-1.688-.342-1.9-1.836-1.687-2.096-1.673-.303.014-.604.068-.92.178-.205.056-.396.03-.588-.054-.888-.462-1.137-2.332-1.11-2.51.055-.315.192-.52.438-.604.425-.164.81-.452 1.15-.85.932-1.262.344-2.25 0-2.634-.34-.356-.725-.645-1.15-.81-.137-.04-.233-.15-.328-.315C-.27 6.07.724 4.95.978 4.733c.255-.22.6-.055.723 0 .426.164.878.22 1.344.15C4.7 4.636 4.784 3.14 4.81 2.908c.015-.247-.11-1.29-.136-1.4-.027-.123-.014-.22.027-.315C5.318.178 7.073 0 7.223 0c.178 0 .33.055.44.178.108.124.63 1.11 1 1.4.398.338 1.582.83 2.588.013.398-.273.96-1.288 1.083-1.412.123-.123.26-.178.384-.178 1.56 0 2.33 1.03 2.438 1.22.083.124.096.248.07.37-.03.152-.33 1.153-.262 1.606.366 1.537 1.384 1.742 1.89 1.783.494.027 1.645-.357 1.81-.344.164.014.315.083.424.206.535.31.85 1.715.905 2.14.027.233-.014.44-.11.562-.11.138-1.165.714-1.48 1.112-.855.982-.342 2.25-.068 2.606.26.37 1.22.905 1.288.96.15.137.26.302.315.494.146 1.413-.89 2.387-1.07 2.47zm-8.905-.535c.644 0 1.246-.123 1.822-.356.575-.248 1.082-.59 1.493-1.016.425-.425.754-.92 1-1.495.247-.562.357-1.18.357-1.81 0-.66-.11-1.262-.356-1.825-.248-.562-.577-1.056-1.002-1.48-.41-.427-.918-.756-1.493-1.003-.576-.233-1.178-.357-1.822-.357-.644 0-1.247.124-1.81.357-.56.247-1.067.576-1.478 1.002-.425.425-.768.92-1 1.48-.247.564-.37 1.167-.37 1.826 0 .644.123 1.248.37 1.81.232.563.575 1.07 1 1.495.424.426.917.768 1.48 1.016.56.233 1.164.356 1.808.356z\"></path>\n" +
            "                                                                    </g>\n" +
            "                                                                </svg>\n" +
            "                                                                设置\n" +
            "                                                            </button>\n" +
            "                                                        </div>\n" +
            "                                                        <button type=\"button\"\n" +
            "                                                               id='submit-answer' class=\"Button AnswerForm-submit Button--primary Button--blue\">\n" +
            "                                                            提交回答\n" +
            "                                                        </button>\n" +
            "                                                    </div>\n" +
            "                                                </div>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </div>"
        );
        console.log("正在写回答");
    });
    $("body").on('click', '#submit-answer', function () {
        var value = CKEDITOR.instances['scpg'].getData();
        if (value.length != 0) {
            $.ajax({
                url: '/api/answer/',
                type: 'POST',
                data: {qid: window.location.href.split('/')[5], answer: value},
                // headers: {'X-CSRFtoken': $.cookie('csrftoken') },
                dataType: 'JSON',
                success: function (result) {
                    console.log(result["state"]);
                    if (result["state"] == "200") {
                        // alert("问题提交成功！");
                        // $("#quest").css('display', 'none');
                        window.location.href = '/cms/question_detail/' + window.location.href.split('/')[5];
                    }
                    if (result["state"] == "401") {
                        alert("参数不对！");
                    }
                    if (result["state"] == "402") {
                        alert("回答内容少于3个字符！");
                    }
                    if (result["state"] == "403") {
                        alert("问题不存在！");
                    }
                },
                error: function (result) {
                    console.log("failed");
                }
            });
        }
    });
    $("body").on('click', '.Question--Follow--Button', function (e) {
        now = this;
        $.ajax({
            url: '/api/follow_question/',
            type: 'GET',
            data: {qid: $(this).attr("qid")},
            dataType: 'JSON',
            success: function (result) {
                if (result["state"] == "200") {
                    if ($(now).hasClass('Button--grey')) {
                        $(now).removeClass("Button--grey");
                        $(now).addClass("Button--blue");
                        $(now).text("关注问题");
                        $(".Follower_num").text(result["follower_num"]);
                    } else {
                        $(now).text("已关注");
                        $(now).removeClass("Button--blue");
                        $(now).addClass("Button--grey");
                        $(".Follower_num").text(result["follower_num"]);
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
    $("#Popover1-toggle").focus(function () {
        expand_searchbox();
    });
    $("#Popover1-toggle").blur(function () {
        wrap_searchbox();
    });
    $("#search-button").click(function () {
        // alert("search-button");
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
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").removeClass("SearchBar-input Input-wrapper Input-wrapper--grey");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").addClass("SearchBar SearchBar-focusedInput Input-wrapper Input-wrapper--grey is-focus");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > button").addClass("SearchBar-hiddenAskButton");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label > button > span > svg").addClass("isFocus");
    // show = $('#Popover1-content').css('display');
    // $("#Popover1-content").css('display',show =='block'?'none':show);
    $("#Popover1-content").css('display', 'block');
}

function wrap_searchbox() {
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").removeClass();
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label").addClass("SearchBar-input Input-wrapper Input-wrapper--grey");
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > button").removeClass("SearchBar-hiddenAskButton")
    $("#root > div > div:nth-child(2) > header > div.AppHeader-inner > div.SearchBar > div > form > div > div > label > button > span > svg").removeClass("isFocus")
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