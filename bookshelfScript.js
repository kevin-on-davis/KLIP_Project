var isbn = localStorage.getItem("isbn")
var source
var title
var author

var queryURL1 = `https://www.googleapis.com/books/v1/volumes?q=${escape(isbn)}+&key=AIzaSyAHyK5HiH907jV8Xw1X_mQVAl4GsJOUvwk`
console.log(queryURL1);

$.ajax({
    url: queryURL1,
    method: "GET",
}).then(showReviewAndRec);

function showReviewAndRec(response){
console.log(response);

$("#picture").empty();
    source = response.items[0].volumeInfo.imageLinks.thumbnail
    var bookImage = $("<img>");
    bookImage.attr("src", source);
    console.log(source);
    $("#picture").append(bookImage);


    $("#synopsis").empty();
    $("#synopsis").append("<b>Synopsis: </b>" + response.items[0].volumeInfo.description);

    $("#genre").empty();
    $("#genre").append("Category: " + response.items[0].volumeInfo.categories);

    title = response.items[0].volumeInfo.title
    $("#title").empty();
    $("#title").append(title);

    author = response.items[0].volumeInfo.authors[0]
    $("#author").empty();
    $("#author").append("Author: " + author);

    $("#publicationYear").empty();
    $("#publicationYear").append("Date of Publication: " + response.items[0].volumeInfo.publishedDate);

    $("#publishers").empty();
    $("#publishers").append("Published by: " + response.items[0].volumeInfo.publisher);

    $("#isbn").empty();
    $("#isbn").append("ISBN: " + response.items[0].volumeInfo.industryIdentifiers[1].identifier);

    $("#reviews").empty();
    $("#reviews").append("Avg. Rating: " + response.items[0].volumeInfo.averageRating + "/5");

    //var isbn = response.items[0].volumeInfo.industryIdentifiers[1];
}


var bookshelf = [];
$("#addToShelf").click(function(){
    addToBookShelf()
})

function addToBookShelf(){

    bookshelf = [];
    if (!localStorage.myBookShelf)
    {  
        var shelfItem = {"frontCover":source, "title":title, "author":author,"isbn":isbn};

        bookshelf.push(shelfItem);
    }
    else
    {
        bookshelf = JSON.parse(localStorage.getItem("myBookShelf"));
        var shelfItem = {"frontCover":source, "title":title, "author":author,"isbn":isbn};

        if (!bookshelf.some(e => e.isbn === shelfItem.isbn))
        {
            bookshelf.push(shelfItem);
        };
    }
    localStorage.setItem("myBookShelf", JSON.stringify(bookshelf));
    $("#savedBook").empty();
    for (i=0; i < bookshelf.length; i++)
    {
        $("#savedBook").append(`<div class="col-6"><img src="${bookshelf[i].frontCover}" width="150px"><br/><span style="display:flex">${bookshelf[i].title}<br/>${bookshelf[i].author}</span> </div>
        <div class="col-6" id="btn_column" style="display:flex; flex-direction:column">
                <button class="option" style="width:50%" id="buyBook" value="${bookshelf[i].author} ${bookshelf[i].title}">Buy</button>
                <button class="option" style="width:50%" id="borrowBook" value="${bookshelf[i].author} ${bookshelf[i].title}">Borrow</button>
                <button class="option" style="width:50%" id="showMap" value="${bookshelf[i].title}+${bookshelf[i].author}">Map</button>
                <button class="option" style="width:50%" id="deleteBook" value="${i}">X</button><br/>
        </div>`);
    }

}

function loadBookShelf()
{
    debugger;

    bookshelf = JSON.parse(localStorage.getItem("myBookShelf"));

    $("#savedBook").empty();
    for (i=0; i < bookshelf.length; i++)
    {
        $("#savedBook").append(`<div class="col-6"><img src="${bookshelf[i].frontCover}" width="75px"><br/><span style="display:flex">${bookshelf[i].title}<br/>${bookshelf[i].author}</span> </div>
        <div class="col-6" id="btn_column" style="display:flex; flex-direction:column">
                <button class="option" style="width:50%" id="buyBook" value="${bookshelf[i].author} ${bookshelf[i].title}">Buy</button>
                <button class="option" style="width:50%" id="borrowBook" value="${bookshelf[i].author} ${bookshelf[i].title}">Borrow</button>
                <button class="option" style="width:50%" id="showMap" value="${bookshelf[i].title}+${bookshelf[i].author}">Map</button>
                <button class="option" style="width:50%" id="deleteBook" value="${i}">X</button><br/>
        </div>`);
    }
};


var btn_options = $("#savedBook");
var lst_bookseller = $("#booksellers");

lst_bookseller.on("click", "option", function(event)
{
    alert(this);
});

btn_options.on("click", ".option", function()
{
    event.preventDefault();

    if (this.id.toLowerCase() == "buybook")
    {
        if ($("#booksellers").css("display") == "none")
        {
            $("#booksellers").css("display", "block");
        }
        else
        {
            $("#booksellers").css("display", "none");
        };
    }
    else if (this.id.toLowerCase() == "borrowbook")
    {
        alert(this.value);
        window.open(`https://www.torontopubliclibrary.ca/search.jsp?Ntt=${this.value}`, " ", "top=500,left=500,width=400,height=400");
    }
    else if (this.id.toLowerCase() == "showmap")
    {
        getMyLocationURL();
    }
    else if (this.id.toLowerCase() == "deletebook")
    {
        if (this.value == 0)
        {
            var elmnt_hldr = bookshelf.shift();
            console.log("There "+this.value );
            localStorage.setItem("myBookShelf", JSON.stringify(bookshelf));
            loadBookShelf();
        }
        else
        {
            var modArr = bookshelf.filter(book => bookshelf.indexOf(book) != this.value);
            localStorage.setItem("myBookShelf", JSON.stringify(modArr));
            loadBookShelf();
        }
    }
});

function getMyLocationURL() 
{   
    if (navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition(success, error);
       function success(pos)
       {
            $("#mapBox").empty()
            $("<div>").attr({
                style: "width: 600px; height: 400px; position: absolute",
                id: "mapid"
            }).appendTo("#mapBox")
        
            var longitude
            var latitude
            var mymap = L.map('mapid').setView([43.65,  -79.39], 11);
            
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGFicm9tZSIsImEiOiJjazF1N3M0aTQwYWYxM21vamhwenRrZ3FwIn0.U1Kj3RdOyh3OX2JIuKBvAw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(mymap);

            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;

            searchBorder = (longitude-0.025).toFixed(6) + "," + (latitude-0.025).toFixed(6) + "," + (longitude+0.025).toFixed(6) + "," + (latitude+0.025).toFixed(6)
            searchTerm = "library"
            // toronto = "-79.347015,43.651070" 
            
            url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?bbox=${searchBorder}&limit=10&access_token=pk.eyJ1IjoicGFicm9tZSIsImEiOiJjazF1N3M0aTQwYWYxM21vamhwenRrZ3FwIn0.U1Kj3RdOyh3OX2JIuKBvAw`

            console.log(url)
            $.get(url).then(function(response){
                console.log(response)
                for (x = 0; x <= response.features.length; x++){
                    longitude = response.features[x].center[0]
                    latitude = response.features[x].center[1]
                    var marker = L.marker([latitude,longitude ]).addTo(mymap);
                    marker.bindPopup("<b>" + response.features[x].text + "</b><br>" + response.features[x].properties.address);
                }
            })
       };
       
       function error(err)
       {
        console.log(`ERROR(${err.code}): ${err.message}`);
       }
   };
};

$(document).ready(loadBookShelf());