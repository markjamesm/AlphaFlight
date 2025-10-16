import { fetchPlanesInRadius } from './flight-data.js'
import { clearTableData } from './display.js'

const fetchBtn = document.getElementById("fetch-data");

fetchBtn?.addEventListener("click", () => { 
  const radius = (<HTMLInputElement>document?.getElementById("radius"))?.value ?? 10;
  fetchPlanesInRadius(Number(radius));
});

const clearBtn = document.getElementById("clear-btn");

clearBtn?.addEventListener("click", () => {
  const tableBody = <HTMLElement>document.getElementById("plane-data-table-body");
  clearTableData(tableBody);
})