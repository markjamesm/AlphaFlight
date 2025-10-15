import { renderData } from "./display.js";

type AirplanesLiveData = {
  ac: Array<{ flight: string }>;
}

type FlightDetails = {
  // props here
}

export async function fetchPlanesInRadius(radius: number) {
  const airplanesLiveRes = await fetch(
    `https://api.airplanes.live/v2/point/45.50/-73.56/${radius}`
  );

  const airplanesLiveJson = await airplanesLiveRes.json();

  const adsbdbRes = airplanesLiveJson.ac.map((d: AirplanesLiveData) =>
    fetch(`https://api.adsbdb.com/v0/callsign/${d.flight}`).then((r) =>
      r.json()
    )
  );

  const adsbdbJson = await Promise.all(adsbdbRes);

  const nearbyFlights = airplanesLiveJson.ac.map((plane: any) => {
    const match = adsbdbJson.find(
      (planeAdsbdbApi) =>
        planeAdsbdbApi?.response?.flightroute?.callsign === plane?.flight.trim()
    );

    const completeFlightData = {
      callsign: plane?.flight ?? "Unknown",
      airlineName: match?.response?.flightroute?.airline?.name ?? "Unknown",
      planeType: plane?.desc ?? "Unknown",
      altitudeBaro: parseAltitude(plane.alt_baro),
      speedInKmh: convertKtsToRoundedKmh(plane.gs),
    };

    return completeFlightData;
  });

  renderData("plane-data-table-body", "plane-total", nearbyFlights);
}

function parseAltitude(altitude: string) {
  const altNumber = Number(altitude);
  let output = isNaN(altNumber) ? "Unknown" : altNumber.toLocaleString();

  return output;
}

function convertKtsToRoundedKmh(speedInKts: string) {
  const speedInKmh: number = Number(speedInKts) * 1.852;
  let output = isNaN(speedInKmh) ? "Unknown" : speedInKmh;

  return output;
}
