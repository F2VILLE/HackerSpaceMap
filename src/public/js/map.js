let map = L.map("map").setView([51.505, -0.09], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const iconOpen = L.icon({
  iconUrl: '/img/open.png',
  iconSize: [38, 38],
  iconAnchor: [22, 22],
  popupAnchor: [-10, -11],
});

const iconClosed = L.icon({
  iconUrl: '/img/closed.png',
  iconSize: [38, 38],
  iconAnchor: [22, 22],
  popupAnchor: [-10, -11],
});

const iconIdk = L.icon({
  iconUrl: '/img/idk.png',
  iconSize: [38, 38],
  iconAnchor: [22, 22],
  popupAnchor: [-10, -11],
});

fetch("/api/hackerspace/all")
  .then((r) => r.json())
  .then((data) => {
    if (data.updatedAt) {
      document.getElementById("updatedAt").innerText = `Last update at ${new Date(data.updatedAt).toLocaleString()}`;
    }
    console.log(data);
    console.log(data.data.length);
    for (const hackerspace of data.data) {
      console.log(hackerspace);
      if (!hackerspace.location) continue;
      L.marker([hackerspace.location.lat, hackerspace.location.lon], {icon: (hackerspace.state ? (hackerspace.state.open ? iconOpen : iconClosed) : iconIdk)})
        .addTo(map)
        .bindPopup(
          `<b>${hackerspace.space}</b><br>${hackerspace.location.address}${hackerspace.url ? "<br><a href='" + hackerspace.url + "'>Website</a>" : ""}`
        )
    }
  })
  .catch((err) => console.error(err));
