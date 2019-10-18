var api_key = "pk.eyJ1IjoicmV2ZXJiMTk3MSIsImEiOiJjazF3Zmk4bm0wMDRsM2tvN3k3dHQycXZqIn0.0lNTs0Y0eLfFZDfO_GcT8g";

function getMyLocationURL() {
    var longitude;
    var latitude;
    // var longitude = -79;
    // var latitude = 43;
    debugger;
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(success, error);
        
        function success(pos)
        {
            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;
            console.log(longitude+"-"+latitude);
            // myMarker = `{pin-l}-{Home}+{blue}(${longitude},${latitude})`;
            queryPlaceURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${api_key}`;
            // queryMapURL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},14.25,0,60/600x600?access_token=${api_key}`;
            // console.log(queryMapURL);
            console.log(queryPlaceURL);

            
            mapboxgl.accessToken = api_key;
            var map = new mapboxgl.Map(
            {
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                center: [longitude, latitude], // starting position [lng, lat]
                zoom: 16, // starting zoom
            });
        }

        function error(err) 
        {
            console.log(`ERROR(${err.code}): ${err.message}`);
        }   
        
    };
};

$(document).ready(getMyLocationURL());



