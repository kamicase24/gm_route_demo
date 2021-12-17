function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -24.345, lng: 134.46 }, // Australia.
  });
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    draggable: true,
    map,
    panel: document.getElementById("panel"),
  });

  directionsRenderer.addListener("directions_changed", () => {
    const directions = directionsRenderer.getDirections();

    if (directions) {
      computeTotalDistance(directions);
    }
  });
  var latlng1 = new google.maps.LatLng(-12.2090126, -76.96205);
  var latlng2 = new google.maps.LatLng(-12.2090126, -75.96205);
  /*
  displayRoute(
    latlng1,
    latlng2,
    directionsService,
    directionsRenderer
  );
  */
  displayRoute(
    "-12.2090126,-76.96205",
    "-12.2090126,-75.96205",
    directionsService,
    directionsRenderer
  );
}

function displayRoute(origin, destination, service, display) {
  service
    .route({
    origin: "-12.065629,-77.059973",
    destination: "-11.8537358,-77.1272883",
    waypoints: [
      { "location": "-12.0819221,-77.0492485" },
      { "location": "-12.0978738,-77.007423" },
      { "location": "-12.0760342,-76.9804198" }
    ],
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true,
    })
    .then((result) => {
      display.setDirections(result);
    })
    .catch((e) => {
      alert("Could not display directions due to: " + e);
    });
}

function computeTotalDistance(result) {
  let total = 0;
  const myroute = result.routes[0];

  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }

  total = total / 1000;
  document.getElementById("total").innerHTML = total + " km";
}
