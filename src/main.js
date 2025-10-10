import { fetchPlanesInRadius } from './flight-data.js'

const fetchBtn = document.getElementById("fetch-data");

fetchBtn.addEventListener("click", () => { 
  const radius = document.getElementById("radius").value;
  fetchPlanesInRadius(radius);
  console.log(radius);
});
