export function renderData(tableBodyId: string, planeTotalId : string, flightList: any) {
  (<HTMLElement>document.getElementById(planeTotalId)).innerHTML = flightList.length;
  displayFlightTable(tableBodyId, flightList);
}

export function clearTableData(element: any) {
  element.innerHTML = "";
}

function displayFlightTable(tableBodyId: string, flightList: any) {
  const tableBodyElement = document.getElementById(tableBodyId);
  clearTableData(tableBodyElement);

  flightList.forEach((flight: any) => {
    console.log(flight);
    let row = (<HTMLTableElement>tableBodyElement).insertRow();
    row.className =
      "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200";

    let callsign = row.insertCell(0);
    callsign.innerHTML = flight.callsign;
    callsign.className = "dark:text-white px-6 py-2";

    let airline = row.insertCell(1);
    airline.innerHTML = flight.airlineName;
    airline.className = "dark:text-white px-6 py-2";

    let type = row.insertCell(2);
    type.innerHTML = flight.planeType;
    type.className = "dark:text-white px-6 py-2";

    let altitude = row.insertCell(3);
    altitude.innerHTML = `${flight.altitudeBaro} ft`;
    altitude.className = "dark:text-white px-6 py-2";

    let groundSpeed = row.insertCell(4);
    groundSpeed.innerHTML = `${flight.speedInKmh.toFixed(0)} km/h`;
    groundSpeed.className = "dark:text-white px-6 py-2";
  });
}
