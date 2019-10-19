function manageBookShelf()
{
    if (!localStorage.myBookShelf)
    {
        var bookshelf = [];
        var shelfItem = [];
        bookshelf.push(shelfItem);
    }
    else
    {
        bookshelf = JSON.parse(localStorage.getItem("myBookShelf"));
    }

    for (i=0; i < shelfItem.length; i++)
    {
        $("#bookshelf").append(`<div>Book Information<button id="buyBook"></button><button id="borrowBook"></button><button id="deleteBook"></button></div>`);
    }
}

function buildBookshelf()
{
    $("#body").append(`<div class="container"><select class="row" id="bookshelf"></select></div>`);
};

btn_buybook = $("#buyBook");
btn_brwbook = $("#borrowBook");
btn_delbook = $("#deleteBook");

btn_buybook.on("click", "option", function()
{
    console.log("Buy book online");
});

btn_brwbook.on("click", getMyLocationURL());



function getMyLocationURL() {
    var longitude;
    var latitude;
    var api_key = "pk.eyJ1IjoicmV2ZXJiMTk3MSIsImEiOiJjazF3Zmk4bm0wMDRsM2tvN3k3dHQycXZqIn0.0lNTs0Y0eLfFZDfO_GcT8g";

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

            var marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        }

        function error(err) 
        {
            console.log(`ERROR(${err.code}): ${err.message}`);
        }   
        
    };
};

$(document).ready(buildBookshelf());