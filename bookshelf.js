var bookshelf = [];

function manageBookShelf()
{
    debugger;
    if (!localStorage.myBookShelf)
    {
        var shelfItem = {"frontCover":"KevinDavis.jpg", "title":"The Killing Dance", "author":"Laurell K. Hamilton","ISBN":"ISBN Number"};
        // console.log(shelfItem);
        bookshelf.push(shelfItem);
        console.log(bookshelf);
    }
    else
    {
        bookshelf = JSON.parse(localStorage.getItem("myBookShelf"));
        var shelfItem = {"frontCover":"KevinDavis.jpg", "title":"The Killing Dance", "author":"Laurell K. Hamilton","ISBN":"ISBN Number"};

        if (!bookshelf.some(e => e.ISBN === shelfItem.ISBN))
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
                <button class="option" style="width:50%" id="buyBook">Buy</button>
                <button class="option" style="width:50%" id="borrowBook" value="${bookshelf[i].author} ${bookshelf[i].title}">Borrow</button>
                <button class="option" style="width:50%" id="showMap" value="${bookshelf[i].title}+${bookshelf[i].author}">Map</button>
                <button class="option" style="width:50%" id="deleteBook" value="${i}">X</button><br/>
        </div>`);
    }
};

{

};

var btn_options = $("#savedBook");

btn_options.on("click", ".option", function()
{
    event.preventDefault();

    if (this.id.toLowerCase() == "buybook")
    {
        if ($("#booksellers").css("display") == "none")
        {
            $("#booksellers").css("display", "block");
            this.text("Hide Online Sellers");
        }
        else
        {
            $("#booksellers").css("display", "none");
            this.text("Buy");
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
        var modArr = bookshelf.filter(book => bookshelf.indexOf(book) != this.value);
        localStorage.setItem("myBookShelf", JSON.stringify(modArr));
        manageBookShelf()
    }
});

function getMyLocationURL() 
{
    var longitude;
    var latitude;
    var api_key = "pk.eyJ1IjoicmV2ZXJiMTk3MSIsImEiOiJjazF3Zmk4bm0wMDRsM2tvN3k3dHQycXZqIn0.0lNTs0Y0eLfFZDfO_GcT8g";

    $("#map").css("display", "block");
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(success, error);
        
        function success(pos)
        {

            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;

            // mapboxgl.accessToken = api_key;
            // var map = new mapboxgl.Map(
            // {
            //     container: 'map', // container id
            //     style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            //     center: [longitude, latitude], // starting position [lng, lat]
            //     zoom: 16, // starting zoom
            //     // zoom: 12, // starting zoom
            // }
            // );

            // var marker_0 = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        }

        function error(err) 
        {
            console.log(`ERROR(${err.code}): ${err.message}`);
        }   
        
    };
};

$(document).ready(manageBookShelf());