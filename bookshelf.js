function manageBookShelf()
{
    debugger;
    if (!localStorage.myBookShelf)
    {
        var bookshelf = [];
        var shelfItem = {"title":"The Killing Dance", "author":"Laurel K. Hamilton"};
        // console.log(shelfItem);
        bookshelf.push(shelfItem);
        console.log(bookshelf);
    }
    else
    {
        bookshelf = JSON.parse(localStorage.getItem("myBookShelf"));
        shelfItem = {"title":"Obsidian Butterfly", "author":"Laurel K. Hamilton"};
        if (!bookshelf.some(e => e.title === shelfItem.title))
        {
            bookshelf.push(shelfItem);
        };
    }
    localStorage.setItem("myBookShelf", JSON.stringify(bookshelf));
    for (i=0; i < bookshelf.length; i++)
    {
        $("#bookshelf").append(`<div class="col-4" id="shelf" style="padding:1vw; border:solid">
        <span><a href="#" class="app_icon" target="#"><img src="KevinDavis.jpg" width="100vw">
        </a><div id="btn_column" style="display:flex; flex-direction:column; width:8vw">
        <button class="option" id="buyBook">Buy Book</button>
        <select id="booksellers" style="display:none">
        <option class="bookstore">Indigo</option>
        <option class="bookstore">Amazon</option>
        <option class="bookstore">Ebay</option>
        <option class="bookstore">Book Outlet</option>
        <option class="bookstore">Books-a-Million (BAM)</option>
        <option class="bookstore">Better World Books</option>
        <option class="bookstore">Kobo</option>
        </select>
        <button class="option" id="borrowBook" value="${bookshelf[i].title}+${bookshelf[i].author}">Borrow Book</button>
        <button class="option" id="showMap value="${bookshelf[i].title}+${bookshelf[i].author}">Show Branches</button>
        <button class="option" id="deleteBook">X</button></div></span>
        <span>${bookshelf[i].title} ${bookshelf[i].author}</span></div>`);
    }
};

// function buildBookshelf()
// {
//     $("body").append(`<div class="row col-4" id="bookshelf"></div>`);
//     manageBookShelf();
// };

var btn_buybook = $("#buyBook");
var btn_options = $("#bookshelf");
var btn_delbook = $("#deleteBook");

// btn_buybook.on("click", ".option", function()
// {
//     event.preventDefault();
//     console.log(this);
//     // $(this.id).attr("display", "block");
//     // window.open(`https://www.torontopubliclibrary.ca/search.jsp?Ntt=${this.value}`, " ", "top=500,left=500,width=400,height=400");
// });

btn_options.on("click", ".option", function()
{
    event.preventDefault();
    alert(this.id.toLowerCase());
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
        window.open(`https://www.torontopubliclibrary.ca/search.jsp?Ntt=${this.value}`, " ", "top=500,left=500,width=400,height=400");
    }
    else if (this.id.toLowerCase() == "showmap")
    {
        getMyLocationURL();
    }
});

btn_delbook.on("click", function()
{
    // for (1=0; i < bookshelf.length; i++)
    // {
    //     if (this.button)
    // };
});

function getMyLocationURL() 
{
    var longitude;
    var latitude;
    var api_key = "pk.eyJ1IjoicmV2ZXJiMTk3MSIsImEiOiJjazF3Zmk4bm0wMDRsM2tvN3k3dHQycXZqIn0.0lNTs0Y0eLfFZDfO_GcT8g";

    alert("Showing map");
    $("#map").attr("display", "block");
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(success, error);
        
        function success(pos)
        {

            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;
            console.log(longitude+" - "+latitude);

            mapboxgl.accessToken = api_key;
            var map = new mapboxgl.Map(
            {
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                center: [longitude, latitude], // starting position [lng, lat]
                zoom: 16, // starting zoom
                // zoom: 12, // starting zoom
            });

            var marker_0 = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        }

        function error(err) 
        {
            console.log(`ERROR(${err.code}): ${err.message}`);
        }   
        
    };
};

$(document).ready(manageBookShelf());