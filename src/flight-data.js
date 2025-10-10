export async function fetchPlanesInRadius(radius) {
  const url = `https://api.airplanes.live/v2/point/45.50/-73.56/${radius}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    // logPlanesInRadius(result);
    loadTableData("plane-data-table-body", result);

  } catch (error) {
    console.error(error.message);
  }
}

function logPlanesInRadius(planeList) {
  planeList.ac.forEach(plane => {
    console.log(`Plane: ${plane.desc}`);
  });
}

function loadTableData(element, planeList) {
  const table = document.getElementById(element);
  planeList.ac.forEach(plane => {
    let row = table.insertRow();
    let callsign = row.insertCell(0);
    callsign.innerHTML = `${plane.flight}`;
    let type = row.insertCell(1);
    type.innerHTML = `${plane.desc}`;
    let altitude = row.insertCell(2);
    altitude.innerHTML = `${plane.alt_geom.toLocaleString()}`;
  });
}