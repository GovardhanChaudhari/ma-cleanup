HTMLUtils = {
    pluckData: function (html) {
        if (!html) {
            return [];
        }
        var cheerio = Meteor.npmRequire("cheerio");
        var ent = Meteor.npmRequire("ent");
        var $ = cheerio.load(html);
        var $questions = $("#questions");
        var votes = $("#questions .statscontainer .votes strong");
        var questions = $("#questions .question-summary .summary>h3 a");
        var asked = $("#questions .question-summary .summary span.relativetime");
        var cnt = votes.length;
        var result = new Array(cnt);
        var i = 0;
        for (; i < cnt; i++) {
            var question = questions.get(i);
            var vote = votes.get(i);
            var ask = asked.get(i);
            var time;
            if (ask) {
                time = ask.attribs.title;
            }
            result[i] = {
                vote: $(vote).html(),
                question: ent.decode($(question).html()),
                link: question.attribs.href,
                time: time
            };

        }
        /*
         $("#mainbar .question-summary").each(function(i, e) {
         //console.log($(e).attr("src"));
         $("#questions").find(".summary>h3 a:first").attr('href')
         var data = $(e).find(".summary>h3 a").html();
         console.log( ent.decode( data));
         });
         */
        //   console.log(JSON.stringify(result));
        return result
    }
};
