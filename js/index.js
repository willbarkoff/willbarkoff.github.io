$( document ).ready(function() {
    var greetings = ["Hello", "Howdy", "Hi", "G'day"];
    $("#greeting").text("👋 " + greetings[Math.floor(Math.random() * greetings.length)]);
    $("#greeting").fadeIn(2000, function(){
        $("#introduction").fadeIn(2000, function(){
            $("#scrollhint").fadeIn(2000);
        });
    });
    $.get( "https://api.github.com/users/nywillb/events", function(data) {
        for(var i = 0; i < 30; i++) {
            console.log(data[i]);
            parsedData = parseGithubData(data[i]);
            if(parsedData.html_url.startsWith("undefined")){
                parsedData.html_url.replace("undefined", "https://github.com")
            }
            $("#recentItems").append(makeCard(parsedData.text, parsedData.html_url))
        }
        $("#loadingRecents").fadeOut(function(){
            $("#recentItems").fadeIn();
        })    
    });
});

/*
 * yes, I know this is very hacky
 * but I have an SAT Subject Test
 * tomorrow and my parents are
 * yelling at me to sleep.
 */

function makeCard(title, link) { 
    return "<div class=\"activitycard\">" + 
        "<div class=\"card\">" +
            "<div class=\"card-body\">" +
                "<p class=\"card-text\">" +
                    title +
                "</p>" +
                "<a href=\"" + link + "\" class=\"card-link\">More...</a>" +
            "</div>" + 
        "</div>" +
    "</div>";
}
