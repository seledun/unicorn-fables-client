const baseURL = "http://127.0.0.1:5000/0.0.1/";

// Fetches saved fables
async function getFables() {
  try {
    const response = await fetch(baseURL + "fables");
    const fables = await response.json();
    return fables;
  } catch (error) {
    console.error(error);
  }
}

//Fetches and creates a list of all unicorns
async function listUnicorns() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(baseURL + "unicorns", options);
  const unicorns = await response.json();

  return unicorns;
}

//Gets random unicorns
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
    if (idList.length == 0) {
      break;
    }

    let randomId = Math.floor(Math.random() * idList.length);
    // Generates a random index
    let id = idList[randomId];
    idList.splice(randomId, 1);
    let response = await fetch(baseURL + "unicorns/" + id, options);

    let unicorn = await response.json();

    if (unicorn.description.length <= 40) {
      i--;
      continue;
    }

    unicornList.push(unicorn);
  }

  return unicornList;
}

//Upvotes a fable so it gets pushed higher up on the list
async function upvote(id) {
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  };
  await fetch(baseURL + "fables/" + id, options);
}

//Generates a new fable
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

  return fabel;
}

//Fectches the best fables from the list
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
    if (i >= sortedFables.length) {
      break;
    }
    fableList.push(sortedFables[i]);
  }
  return fableList;
}

//Function to sort fables by how much upvotes they have
function sortFablesByRank(fables) {
  const sortedArray = fables;

  for (let i = 0; i < sortedArray.length; i++) {
    let highestVotedFableIndex = i;
    let highestFableVote = sortedArray[i].votes;
    for (let j = i + 1; j < sortedArray.length; j++) {
      if (sortedArray[j].votes > highestFableVote) {
        highestVotedFableIndex = j;
        highestFableVote = sortedArray[j].votes;
      }
    }
    let temp = sortedArray[i];
    sortedArray[i] = fables[highestVotedFableIndex];
    sortedArray[highestVotedFableIndex] = temp;
  }
  return sortedArray;
}

//Function to get whole fable
async function getWholeFable(id) {
  const options = {
    method: "GET",
  };

  let response = await fetch(baseURL + "fables/" + id, options);
  const fabel = await response.json();

  return fabel;
}

//Fetches next fable in list
async function getNextFable(id) {
  const fables = await getFables();
  let nextFable = fables[0];
  let currFable = fables[0];

  for (let i = 0; i < fables.length; i++) {
    currFable = fables[i];
    if (i == fables.length - 1) {
      break;
    }
    if (currFable.id == id) {
      nextFable = fables[i + 1];
      break;
    }
  }

  const responseFable = await fetch(baseURL + "fables/" + nextFable.id);
  return await responseFable.json();
}
export {
  fetchABunchOfUniqueRandomUnicorns,
  fetchBestFables,
  upvote,
  getWholeFable,
  getFables,
  generateFable,
  getNextFable,
};
