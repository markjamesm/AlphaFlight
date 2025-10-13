export async function fetchPlanesInRadius(radius) {
  const url = `https://api.airplanes.live/v2/point/45.50/-73.56/${radius}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const airplanesLiveData = await response.json();

    const flightList = await Promise.all(
      airplanesLiveData.ac.map(async (plane) => {
        const callsignInfo = await fetchCallsignInfo(plane.flight);

        const flightData = new FlightData(
          plane.flight,
          callsignInfo.response.flightroute.airline.name,
          plane.desc ?? "Unknown",
          parseAltitude(plane.alt_geom),
          convertKtsToRoundedKmh(plane.gs)
        );
        flightList.push(flightData);

        return flightData;
      })
    );

    renderData("plane-data-table-body", "plane-total", flightList);
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchCallsignInfo(callsign) {
  const url = `https://api.adsbdb.com/v0/callsign/${callsign}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

function renderData(tableId, planeTotalId, flightList) {
  document.getElementById(planeTotalId).innerHTML = flightList.length;
  displayFlightTable(tableId, flightList);
}

function displayFlightTable(tableId, flightList) {
  const table = document.getElementById(tableId);
  clearTableData(table);

  flightList.forEach((flight) => {
    console.log(flight);
    let row = table.insertRow();
    row.className =
      "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200";

    let airline = row.insertCell(0);
    airline.innerHTML = flight.airlineName;
    airline.className = "dark:text-white px-6 py-2";

    let callsign = row.insertCell(1);
    callsign.innerHTML = flight.callsign;
    callsign.className = "dark:text-white px-6 py-2";

    let type = row.insertCell(2);
    type.innerHTML = flight.planeType;
    type.className = "dark:text-white px-6 py-2";

    let altitude = row.insertCell(3);
    altitude.innerHTML = `${flight.altitudeGeom} ft`;
    altitude.className = "dark:text-white px-6 py-2";

    let groundSpeed = row.insertCell(4);
    groundSpeed.innerHTML = `${flight.speed} km/h`;
    groundSpeed.className = "dark:text-white px-6 py-2";
  });
}

export function clearTableData(element) {
  element.innerHTML = "";
}

function parseAltitude(altitudeGeom) {
  const altNumber = Number(altitudeGeom);
  let output = isNaN(altNumber) ? "Unknown" : altNumber.toLocaleString();

  return output;
}

function convertKtsToRoundedKmh(speedInKts) {
  const speedInKmh = (Number(speedInKts) * 1.852).toFixed(0);
  let output = isNaN(speedInKmh) ? "Unknown" : speedInKmh;

  return output;
}

class FlightData {
  constructor(callsign, airlineName, planeType, altitudeGeom, speed) {
    this.callsign = callsign;
    this.airlineName = airlineName;
    this.planeType = planeType;
    this.altitudeGeom = altitudeGeom;
    this.speed = speed;
  }
}
