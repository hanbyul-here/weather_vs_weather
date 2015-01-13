var londonmap = new L.Map('londonmap').setView([51.5286416,-0.1015987], 12);
new L.TileLayer('http://{s}.tiles.mapbox.com/v3/hanbyulhere.knc5n0g8/{z}/{x}/{y}.png',
             { attribution: 'Map tiles &copy; <a href="http://mapbox.com">MapBox</a>', maxZoom: 17 }).addTo(londonmap);
londonmap.doubleClickZoom.disable();
londonmap.scrollWheelZoom.disable();

londonmap.on('click', function(e) {
  
	londonmap.panTo(L.latLng(e.latlng));
    updateData(e.latlng.lat, e.latlng.lng,"#london",london_graph);
});



var nycmap = new L.Map('nycmap').setView([40.73, -73.99570], 12);
new L.TileLayer('http://{s}.tiles.mapbox.com/v3/hanbyulhere.ko1jh8gn/{z}/{x}/{y}.png',
             { attribution: 'Map tiles &copy; <a href="http://mapbox.com">MapBox</a>', maxZoom: 17 }).addTo(nycmap);
nycmap.doubleClickZoom.disable();
nycmap.scrollWheelZoom.disable();

nycmap.on('click', function(e) {
  
	nycmap.panTo(L.latLng(e.latlng));
    updateData(e.latlng.lat, e.latlng.lng,"#nyc",nyc_graph);
});