// //IMPORTATION

let buttonPosition = document.getElementById("positionBtn");
let latText = document.getElementById("latitude");
let longText = document.getElementById("longitude");
let buttonSave = document.getElementById("savePosition");
let buttonLoad = document.getElementById("lastPosition");
let loadLat = document.getElementById("loadLatText");
let loadLong = document.getElementById("loadLongText");
let buttonDelete = document.getElementById("deletePosition");

// APPARITION DE LA MAP

var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

// ACTION CLICK // FONCTION LOCALISATION

buttonPosition.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    // CREATION VARIABLES LATITUDE LONGITUDE

    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    // AFFICHAGE DES DONNEES A DEUX DECIMALES

    latText.innerText = lat.toFixed(2);
    longText.innerText = long.toFixed(2);

    // IMPACT DES COORDONNEES SUR LA MAP

    map.flyTo([lat, long], 18);

    L.marker([lat, long]).addTo(map);

    // SAUVEGARDE DE POSITION

    buttonSave.addEventListener("click", function () {
      localStorage.setItem("saveLatitude", lat);

      localStorage.setItem("saveLongitude", long);
    });

    // CHARGEMENT DE LA DERNIERE POSITION

    buttonLoad.addEventListener("click", function () {
      let loadLat = localStorage.getItem("saveLatitude");
      let loadLong = localStorage.getItem("saveLongitude");

      loadLatText.innerText = loadLat;
      loadLongText.innerText = loadLong;
    });

    // SUPPRESSION DES DONNEES DU LOCAL STORAGE

    buttonDelete.addEventListener("click", function () {
      localStorage.removeItem("saveLatitude");
      localStorage.removeItem("saveLongitude");
      location.reload();
    });
  });
});

// MAP LEAFLET

// buttonPosition.addEventListener("click", function () {
//     map.on("geosearch_showlocation", function () {

//     });
// }

// L.marker([lat, long]).addTo(map);
