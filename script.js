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
    console.log(results)
    // var title = results.items[0].volumeInfo.title;
    // var author = results.items[0].volumeInfo.authors;
    // var frontCover = results.items[0].volumeInfo.imageLinks.smallThumbnail;


    for( i = 0; i < iterations; i++) {   
        $("<div>").attr({
            class: "row",
            id: "row" + i
        }).appendTo("#bookInfo")
        $("<div>").addClass("author-image").appendTo("#row"+i)
        $("<div>").addClass("small-12 medium-4 columns").appendTo("#row"+i)
        $("<img>").attr("src",results.items[i].volumeInfo.imageLinks.smallThumbnail).appendTo("#bookInfo")
        $("<div>").addClass("small-12 medium-4 columns").appendTo("#row"+i)
        $("<h5>").attr({
            isbn: results.items[i].volumeInfo.industryIdentifiers[0].identifier,
        }).text(results.items[i].volumeInfo.title).appendTo("#row"+i)
        $("<h7>").text('By: ' + results.items[i].volumeInfo.authors).appendTo("#row"+i)
    }

    $("h5").click(function(){
        localStorage.setItem("isbn",$(this).attr("isbn"))
        window.open("./bookshelf.html")
    })

    
}


