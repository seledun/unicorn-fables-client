const baseURL = "http://127.0.0.1:5000/0.0.1/";

// Hämtar sparade fabler
async function getFables() {
  try {
    const response = await fetch(baseURL + "fables");
    const fables = await response.json();
    return fables;
  } catch (error) {
    console.error(error);
  }
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

//Rankar upp en fable
async function upvote(id) {
  const options  = {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  };
  await fetch(baseURL + "fables/" + id, options);
}

//Generar en ny fabel
async function generateFable(bgImage, id) {
  let mood = "";
  if (bgImage == 1) {
    mood = "happy";
  } else {
    mood = "night";
  }

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      mood: mood,
    }),
  };

  const response = await fetch(baseURL + "fables", options);
  const fabel = await response.json();

  console.log(fabel);

  return fabel;
}

async function fetchBestFables(range) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const fableList = [];
  const fables = await getFables(); //Fetch a list of current unicorns
  const sortedFables = sortFablesByRank(fables); //Sort

  for (let i = 0; i < range; i++) {
    if(i >= sortedFables.length) {
      break;
    }
    fableList.push(sortedFables[i]);
  }
  return fableList;
}

function sortFablesByRank(fables) {
  const sortedArray = fables;

  for (let i = 0; i < sortedArray.length; i++) {
    let highestVotedFableIndex = i;
    let highestFableVote = sortedArray[i].votes;
    for(let j = i+1; j < sortedArray.length; j++) {
      if (sortedArray[j].votes > highestFableVote) {
        highestVotedFableIndex = j;
        highestFableVote = sortedArray[j].votes;
      }
    }
    let temp = sortedArray[i];
    sortedArray[i] = fables[highestVotedFableIndex];
    sortedArray[highestVotedFableIndex] = temp;
    console.log(sortedArray[i]);
  }
  return sortedArray;
}

async function getWholeFable(id) {
  const options = {
    method: "GET",
  };

  let response = await fetch(baseURL + "fables/" + id, options);
  const fabel = await response.json();

  return fabel;
}

export { fetchABunchOfUniqueRandomUnicorns, fetchBestFables, upvote, getWholeFable, getFables, generateFable };
