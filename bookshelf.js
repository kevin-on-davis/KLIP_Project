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
        $("#bookshelf").append(`<div class="col-4" id="shelf" style="padding:1vw; border:solid"><span><a href="#" class="app_icon" target="#"><img src="KevinDavis.jpg" width="100vw"></a><div id="btn_column" style="display:flex; flex-direction:column; width:8vw"><button class="option" id="buyBook">Buy Book</button> <button class="option" id="borrowBook">Borrow Book</button> <button class="option" id="deleteBook">X</button></div></span><br/><span>${bookshelf[i].title} ${bookshelf[i].author}</span></div>`);
    }
};

function buildBookshelf()
{
    $("body").append(`<div class="row col-4" id="bookshelf"></div>`);
    manageBookShelf();
};

btn_buybook = $("#buyBook");
btn_brwbook = $("#borrowBook");
btn_delbook = $("#deleteBook");

btn_brwbook.on("click",  "option", this.getMyLocationURL);

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

$(document).ready(buildBookshelf());