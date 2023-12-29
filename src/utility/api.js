const baseURL = "http://127.0.0.1:5000/0.0.1/";

// Hämtar sparade fabler
async function getFables() {
  const response = await fetch("http://127.0.0.1:5000/0.0.1/fables").then(
    (response) => response.json()
  );

  return response;
}

//Hämta och skapa en lista på alla enhörningar
async function listUnicorns() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(baseURL + "unicorns", options);
  const unicorns = JSON.parse(await response.json());

  // document.getElementById("unicorn-list").innerHTML = unicorns.map(unicorn => <li>${unicorn.id}</li>).join("");

  return unicorns;
}

//Hämtar N slumpade enhörningar
async function fetchABunchOfUniqueRandomUnicorns(range) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const unicornList = [];
  const idList = [];
  const unicorns = await listUnicorns(); //Fetch a list of current unicorns

  for (let i in unicorns) {
    idList.push(unicorns[i].id);
  }

  for (let i = 0; i < range; i++) {
    let randomId = Math.floor(Math.random() * idList.length);

    // Genererar ett slumpmässigt index
    let id = idList[randomId];
    idList.splice(randomId, 1);
    let response = await fetch(baseURL + "unicorns/" + id, options);
    let unicorn = await response.json();
    unicornList.push(unicorn);
  }

  return unicornList;
}

export { fetchABunchOfUniqueRandomUnicorns, listUnicorns, getFables };
