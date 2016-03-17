var map;
var destin = [];
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    disableDefaultUI: true,
    zoomControl: false, 
    scrollwheel: false,
    draggable: false,
    disableDoubleClickZoom: true
  });

  setMarkers(map);
}

function setMarkers(map) {

  destin.push([-34, 150]);
  // Adds markers to the map.

  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };


  for (var i = 0; i < destin.length; i++) {
    var loc = destin[i];
    var marker = new google.maps.Marker({
      position: {lat: loc[0], lng: loc[1]},
      map: map,
      shape: shape,
      animation: google.maps.Animation.DROP,
      url: 'https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus'
    });

    // add click event to zoom in on marker
    google.maps.event.addListener(marker, 'click', function() {
      
      window.location.href = this.url;  
      
      
      //map.setCenter(this.getPosition());
      //map.setZoom(10);
      // setTimeout to zoom out to world
      //window.setTimeout(function() {
      //map.setZoom(2);
      //map.setCenter(center);
    //}, 6000);
    });
  }    
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}