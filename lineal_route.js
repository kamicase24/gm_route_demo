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
      origin: "-12.2090126,-76.9620588",
      destination: "-12.1051263,-77.0028562",
      waypoints: [
        { location: "-12.104963,-76.980991" },
        { location: "-12.1045964,-76.9842247" },
        { location: "-12.101774,-76.9907281" },
        { location: "-12.1050965,-76.9933549" },
        { location: "-12.0994447,-76.996047" },
        { location: "-12.0978116,-76.9931347" },
        { location: "-12.0954443,-76.9947088" },
        { location: "-12.0939368,-76.9921102" },
        { location: "-12.0916982,-76.9905426" },
        { location: "-12.0914723,-76.9901215" },
        { location: "-12.0916722,-76.987905" },
        { location: "-12.0890027,-76.9837732" },
        { location: "-12.0830871,-76.982705" },
        { location: "-12.0834526,-76.9785412" },
        { location: "-12.0760621,-76.9823146" },
        { location: "-12.0727609,-76.9813088" },
        { location: "-12.0740563,-76.977757" },
        { location: "-12.0741857,-76.9878166" },
        { location: "-12.0780321,-76.9903767" },
        { location: "-12.0829066,-76.9874133" },
        { location: "-12.0882852,-76.9955903" },
        { location: "-12.0898548,-76.9976512" },
        { location: "-12.0911092,-76.994775" },
        { location: "-12.0955072,-77.0008473" },
        { location: "-12.1007541,-77.0048398" },
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