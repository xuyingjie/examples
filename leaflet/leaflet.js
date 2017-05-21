var map = L.map('map', {
  center: [39.54, 116.23],
  zoom: 7
})

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


fetch('bei_jing_geo.json')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({
        stroke: true,
        color: '#3388ff',
        weight: 0.8,
        fillColor: '#3388ff',
      })
    }).addTo(map)
  })

