export async function fetchPlanesInRadius(radius) {
  const url = `https://api.airplanes.live/v2/point/45.50/-73.56/${radius}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    renderData("plane-data-table-body", "plane-total", result);

  } catch (error) {
    console.error(error.message);
  }
}

function renderData(tableId, planeTotaId, planeList) {
  // getElementById(planeTotaId).innerHTML = planeList.ac.length;
  displayFlightTable(tableId, planeList);
}

function displayFlightTable(element, planeList) {
  const table = document.getElementById(element);
  clearTableData(table);
  planeList.ac.forEach(plane => {
    let row = table.insertRow();
    row.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200";

    let callsign = row.insertCell(0);
    callsign.innerHTML = plane.flight;
    callsign.className = "dark:text-white px-6 py-2";

    let type = row.insertCell(1);
    type.innerHTML = checkForUndefined(plane.desc);
    type.className = "dark:text-white px-6 py-2"

    let altitude = row.insertCell(2);
    altitude.innerHTML = parseAltitude(plane);
    altitude.className = "dark:text-white px-6 py-2"

    let groundSpeed = row.insertCell(3);
    groundSpeed.innerHTML = `${convertKtsToKmh(plane.gs)} km/h`;
    groundSpeed.className = "dark:text-white px-6 py-2";
  });
}

export function clearTableData(element) {
  element.innerHTML = '';
}

function checkForUndefined(param) {
  if (param === undefined) {
    return "Unknown";
  }

  return param;
}

function parseAltitude(plane) {
  const altNumber = (Number(plane.alt_geom));
  let output = isNaN(altNumber) ? "Unknown" : `${altNumber.toLocaleString()} ft`;

  return output;
}

function convertKtsToKmh(speedInKts) {
  const speedInKmh = (Number(speedInKts) * 1.852).toFixed(0);
  let output = isNaN(speedInKmh) ? "Unknown" : speedInKmh;
  
  return output;
}