export async function fetchPlanesInRadius(radius) {
  const url = `https://api.airplanes.live/v2/point/45.50/-73.56/${radius}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    logPlanesInRadius(result);

  } catch (error) {
    console.error(error.message);
  }
}

function logPlanesInRadius(planeList) {
    planeList.ac.forEach(plane => {
        console.log(`Plane: ${plane.desc}`);
    });
}