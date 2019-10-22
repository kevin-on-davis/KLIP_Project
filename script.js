var URL = "https://www.googleapis.com/books/v1/volumes?q=";
var key = "AIzaSyAHyK5HiH907jV8Xw1X_mQVAl4GsJOUvwk";
var searchInput;
var results
var isbn;

$("#bookshelfLink").on("click", function() {
    src="index.html";
})

function test(){
    searchInput = document.getElementById("searchTermInput").value;
    var queryURL = URL + searchInput + "&key=" + key;

    if (event.keyCode == 13) {
        $.get(queryURL).then(function(response){
            results =  response;
            outputResults();
            bookInfo.style.display="block";
        }) 
    } else {
        event.preventDefault();
    }
}

function outputResults() {
    $("#bookInfo").empty();
    var iterations = 10;

    for(i = 0; i < iterations; i++) {   
        $("<div>").attr({
            class: "row add-people-section",
            id: "book" + i
        }).appendTo("#bookInfo")
        $("<div>").attr({
            class: "small-12 medium-6 columns about-people",
            id: "peopleCol" + i
        }).appendTo("#book"+i)
        $("<div>").attr({
            class: "about-people-avatar",
            id: "avatar" + i
        }).appendTo("#peopleCol"+i)
        $("<img>").attr({
            style: "width: 100px; height:150px; padding:0px 0px 0px 20px;",
            src: results.items[i].volumeInfo.imageLinks.smallThumbnail,
        }).appendTo("#avatar"+i)
        $("<div>").attr({
            class:"about-people-author",
            id: "author" + i
        }).appendTo("#peopleCol"+i)
        $("<p> "+results.items[i].volumeInfo.title+" </p>").attr({
            class: "author-name hyperLink",
            isbn: results.items[i].volumeInfo.industryIdentifiers[0].identifier
        }).appendTo("#author"+i)
        $("<p> "+results.items[i].volumeInfo.authors+" </p>").attr({
            class: "author-mutual",
        }).appendTo("#author"+i)
    }

    $(".author-name").click(function(){
        localStorage.setItem("isbn",$(this).attr("isbn"))
        window.open("./bookshelf.html")
    })
}