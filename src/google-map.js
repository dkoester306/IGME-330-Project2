var map, infoWindow;
let markers = [];
let curLocation;
let testCircle;
let openIcon = "img/open.png";
let closedIcon = "img/closed.png";

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    // from https://developers.google.com/maps/documentation/javascript/geolocation
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // draw circle in center
            drawCenterCircle(pos);  

            infoWindow.setPosition(pos);
            infoWindow.setContent('Current Location');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // add center_changed listener to map.
    // will change the center of the circle
    map.addListener("center_changed", function () {
        testCircle.setOptions({
            center: map.getCenter()
        });
    })

}

// draws the center circle on the map.
// Represents the search radius for YELP results
function drawCenterCircle(pos) {
    testCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0,
        map: map,
        center: pos,
        radius: 40000
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// from rit-coffee.html homework file
// function addMarker(latitude, longitude, title) {
//     let position = { lat: latitude, lng: longitude };
//     let marker = new google.maps.Marker({ position: position, map: map });
//     let icon
//     marker.setTitle(title);

//     // add marker to array
//     markers.push(marker);

//     // add a listener for the click event
//     google.maps.event.addListener(marker, "click", function (e) {
//         makeInfoWindow(this.position, this.title);
//     });
// }

// from rit-coffee.html homework file. uses the result object
function addMarker(result) {
    let position = { lat: result.coordinates.latitude, lng: result.coordinates.longitude };
    let marker = new google.maps.Marker({ position: position, map: map });
    marker.setTitle(result.name);
    marker.setIcon('img/open.png');
    // add marker to array
    markers.push(marker);

    // add a listener for the click event
    google.maps.event.addListener(marker, "click", function (e) {
        //makeInfoWindow(this.position, this.title);
        makeResultInfoWindow(this.position, result);
    });
}

// from rit-coffee.html homework file
function makeInfoWindow(position, msg) {
    // close old window if it exists
    if (infoWindow) infoWindow.close();

    // make a new InfoWindow
    infoWindow = new google.maps.InfoWindow({
        map: map,
        position: position,
        content: "<b>" + msg + "</b>"
    });
}

function setCircleEnabled(bool){
    if(bool=="true")
        testCircle.setVisible(true);
    else if(bool=="false")
        testCircle.setVisible(false);
}

// takes in the result to use for all info displayed 
function makeResultInfoWindow(position, result) {
    // close old window if it exists
    if (infoWindow) infoWindow.close();

    // make a new InfoWindow
    infoWindow = new google.maps.InfoWindow({
        map: map,
        position: position,
        // edit this section for CSS markdown (Alex)
        content: '<div id="infoWindowContent">' +
            '<a href="'+ result.url  +'" id="nameHeading" ><h1>'+result.name+'</h1></a>'+
            '<div id="keyInfo">'+
            '<h4>Phone: '+result.display_phone+'</h4>'+
            '<h5>Address: '+ result.location.address1 +'</h5>'+
            '<h5>Rating: '+result.rating+'</h5>'+
            //'<img src="'+result.image_url+'">'+
            '<h5>Distance: '+getMiles(result.distance).toFixed(1)+' miles</h5>'+
            '</div>'+
            '</div>'
    });
}

// 4 functions obtained from https://developers.google.com/maps/documentation/javascript/examples/marker-remove
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
