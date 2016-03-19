var map;
var destin = [];
var user_position;
function initEventMap() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    user_position = pos.coords;
    console.log(user_position);
    renderMap();
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
  function renderMap() {
    map = new google.maps.Map(document.getElementById('event-map'), {
      center: {lat: 0, lng: 50},
      zoom: 3,
      disableDefaultUI: true,
      zoomControl: false,
      scrollwheel: false,
      draggable: false,
      disableDoubleClickZoom: true
    });

    //setMarkers(map);

    var input = (document.getElementById('location'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      localStorage.lat = place.geometry.location.lat();
      localStorage.lng = place.geometry.location.lng();
    });
  }
}

function setMarkers(map) {

  destin.push( [-34, 150] );
  // Adds markers to the map.

  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };


  for (var i = 0; i < destin.length; i++) {
    //var loc = destin[i];
    var marker = new google.maps.Marker({
      position: {lat: user_position.latitude, lng: user_position.longitude},
      map: map,
      shape: shape,
      animation: google.maps.Animation.DROP,
      url: '/'
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
