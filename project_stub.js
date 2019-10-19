var api_key = "pk.eyJ1IjoicmV2ZXJiMTk3MSIsImEiOiJjazF3Zmk4bm0wMDRsM2tvN3k3dHQycXZqIn0.0lNTs0Y0eLfFZDfO_GcT8g";

function getMyLocationURL() {
    var longitude;
    var latitude;

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

$(document).ready(getMyLocationURL());



