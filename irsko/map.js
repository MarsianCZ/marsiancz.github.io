// Initialize the map
const map = L.map('map').setView([53.4, -8], 7); // Center of Ireland

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define locations with proper coordinates
const locations = [
    { name: "Dublin Airport", coords: [53.4264, -6.2499], day: 1 },
    { name: "Glendalough", coords: [53.0113, -6.3279], day: 1 },
    { name: "Monastic Site", coords: [53.0109, -6.3290], day: 1 },
    { name: "Upper & Lower Lakes", coords: [53.0124, -6.3205], day: 1 },
    { name: "Trooperstown Wood Lodge", coords: [53.0045, -6.3107], day: 1 },
    { name: "Wicklow Mountains National Park", coords: [53.0626, -6.3227], day: 2 },
    { name: "Kilkenny", coords: [52.6541, -7.2448], day: 2 },
    { name: "Kilkenny Castle", coords: [52.6505, -7.2493], day: 2 },
    { name: "St. Canice's Cathedral", coords: [52.6553, -7.2578], day: 2 },
    { name: "Kyteler's Inn", coords: [52.6535, -7.2533], day: 2 },
    { name: "Rock of Cashel", coords: [52.5201, -7.8905], day: 3 },
    { name: "Kenmare", coords: [51.8806, -9.5835], day: 3 },
    { name: "Beara Peninsula", coords: [51.7500, -9.9000], day: 4 },
    { name: "Eyeries village", coords: [51.6741, -9.9597], day: 4 },
    { name: "Healy Pass", coords: [51.7468, -9.6919], day: 4 },
    { name: "Ring of Kerry", coords: [51.9682, -9.5921], day: 5 },
    { name: "Killarney National Park", coords: [52.0096, -9.5579], day: 5 },
    { name: "Ladies View", coords: [51.9650, -9.6026], day: 5 },
    { name: "Dingle", coords: [52.1408, -10.2686], day: 5 },
    { name: "Dick Mack's Pub", coords: [52.1397, -10.2686], day: 5 },
    { name: "Slea Head Drive", coords: [52.1067, -10.4585], day: 6 },
    { name: "Dingle Peninsula", coords: [52.1700, -10.3600], day: 6 },
    { name: "Tarbert", coords: [52.5909, -9.3759], day: 6 },
    { name: "Killimer", coords: [52.6179, -9.4052], day: 6 },
    { name: "Doolin", coords: [53.0246, -9.3772], day: 6 },
    { name: "Gus O'Connor's Pub", coords: [53.0163, -9.3777], day: 6 },
    { name: "Cliffs of Moher", coords: [52.9716, -9.4268], day: 7 },
    { name: "Burren National Park", coords: [53.0461, -9.0419], day: 7 },
    { name: "Clifden", coords: [53.4886, -10.0208], day: 7 },
    { name: "Connemara National Park", coords: [53.5477, -9.9408], day: 8 },
    { name: "Diamond Hill", coords: [53.5553, -9.9414], day: 8 },
    { name: "Kylemore Abbey", coords: [53.5619, -9.8882], day: 8 },
    { name: "Westport", coords: [53.8008, -9.5147], day: 8 },
    { name: "Matt Molloy's Pub", coords: [53.7986, -9.5227], day: 8 },
    { name: "Benbulben", coords: [54.3670, -8.3799], day: 9 },
    { name: "Drumcliff", coords: [54.3279, -8.4944], day: 9 },
    { name: "Sligo", coords: [54.2697, -8.4694], day: 9 },
    { name: "Donegal Town", coords: [54.6547, -8.1093], day: 9 },
    { name: "Slieve League", coords: [54.6276, -8.6799], day: 9 },
    { name: "Ardara", coords: [54.7665, -8.4100], day: 9 },
    { name: "Glenveagh National Park", coords: [55.0349, -8.0970], day: 10 },
    { name: "Assaranca Waterfall", coords: [54.7608, -8.4753], day: 10 },
    { name: "Maghera Beach", coords: [54.7572, -8.5306], day: 10 },
    { name: "Clonmacnoise", coords: [53.3242, -7.9851], day: 10 },
    { name: "Killary Harbour", coords: [53.6144, -9.8382], day: 9 },
    { name: "Doolough Valley", coords: [53.6573, -9.7523], day: 9 },
    { name: "Enniskillen", coords: [54.3439, -7.6318], day: 10 },
    { name: "Mullingar", coords: [53.5246, -7.3421], day: 10 },
    { name: "Poulnabrone Dolmen", coords: [53.0489, -9.1397], day: 8 },
    { name: "Swords", coords: [53.4561, -6.2180], day: 11 },
    { name: "Malahide", coords: [53.4508, -6.1637], day: 11 }
];

// Add markers for each location
locations.forEach(loc => {
    const marker = L.marker(loc.coords)
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>Den ${loc.day}`);
});

// Route lines by day
const dayColors = [
    '#2a6e3f', // green
    '#1E73BE', // blue
    '#9C27B0', // purple
    '#FF5722', // orange
    '#E91E63', // pink
    '#795548', // brown
    '#009688', // teal
    '#FF9800', // amber
    '#3F51B5', // indigo
    '#F44336', // red
    '#607D8B'  // blue grey
];

// Group locations by day
for (let day = 1; day <= 11; day++) {
    const dayPoints = locations.filter(loc => loc.day === day).map(loc => loc.coords);
    
    if (dayPoints.length >= 2) {
        // Create a polyline for each day's route
        L.polyline(dayPoints, {
            color: dayColors[(day-1) % dayColors.length],
            weight: 3,
            opacity: 0.7,
            dashArray: '5, 10'
        }).addTo(map).bindPopup(`Den ${day} - trasa`);
    }
}

// Add the entire route as a subtle background line
const allPoints = [];
for (let day = 1; day <= 11; day++) {
    const dayPoints = locations.filter(loc => loc.day === day).map(loc => loc.coords);
    allPoints.push(...dayPoints);
}

if (allPoints.length >= 2) {
    L.polyline(allPoints, {
        color: '#000',
        weight: 1,
        opacity: 0.3
    }).addTo(map);
}