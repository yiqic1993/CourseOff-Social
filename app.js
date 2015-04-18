
$(document).ready(function() {

// $(".nav[data-visible=term]").on("change", function(e){
//     console.log("aeg");
// })

var year;
setTimeout(function(){
    var term = $(".nav[data-visible=term]").find("a").first().text().split(" ");
    year = term[1];
    var semester = term[0];
    if(semester == "Fall"){
        year= year+"08";
    } else if (semester == "Summer") {
        year = year + "05";
    } else if (semester == "Spring") {
        year = year + "01";
    }
    console.log(year);
    $(".course-info-container").on("mouseover", function(e){
        var courseBar = $(e.target);
        var abbr="";
        if(courseBar.hasClass('name')){
            abbr = getAbbr(courseBar.text());
        } else {
            abbr = getAbbr(courseBar.find(".name").text());
        }
        if (abbr!=""){
            var willTakeResult = userService.getFriendsByCourseName(year, abbr, false);
            var takenResult = userService.getFriendsByCourseName(year, abbr, true);
            console.log(willTakeResult,takenResult)
            var friends = getFriendsName(willTakeResult.concat(takenResult));
            // var takenFrends = getFriendsName(takenResult);

            // var friends = 
            if (friends!=""){
                console.log(friends);
                courseBar.attr("title",friends);
            }
        } else {
            console.log(abbr)
        }
        
    })
}, 2000);



var insertListener = function(event){
    if (event.animationName == "nodeInserted") {
        
        var popupBody = $(event.target).find('.body');
        var refID = popupBody.find("em").first().html();
        var courseName = $(event.target).find(".title").html();
        var abbr = $(".course-box:hover").find(".course-content").text().split(" ").join("");
        var willTakeResult = userService.getFriendsByCourseName(year, abbr, false);
        var takenResult = userService.getFriendsByCourseName(year, abbr, true);
        var willTakefriends = getFriendsName(willTakeResult);
        var takenFrends = getFriendsName(takenResult);
        console.log(year, abbr);
        if(popupBody.find(".myFriends").length==0){
            if (willTakefriends!=""){
                popupBody.append("<div class='myFriends'>"+
                "<h5>Friends will take the course</h5>"+willTakefriends+"</div>");
            }
            if (takenFrends!=""){

            popupBody.append("<div class='myFriends'>"+
                "<h5>Friends Taken the course </h5>"+takenFrends+"</div>");
            }
        };

    }
}



document.addEventListener("animationstart", insertListener, false); // standard + firefox
document.addEventListener("MSAnimationStart", insertListener, false); // IE
document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari
// console.log('test');
});

var getFriendsName = function(results){
    if (results){
        return results.map(function(d){
                return d.name;});
    } else {
        return "";
    }
}
// console.log(year);
var getAbbr = function(name){
    return name.split("-")[0].slice(1,-1).split(" ").join("-");
}
