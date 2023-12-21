
const baseURL = "http://localhost:5000/";   //"http://localhost:5000/"  //"http://unicorns.idioti.se/"




//Knapp för att skicka in en form för att skapa en ny Unicorn
//Knapp för up-vote:a fable  (skicka in fable id)
//Knapp för att spara en ny fable 
//Knapp slumpa en sparad fabel

/* Funktion för att slumpa fram en sparad fabel */
async function randomFableId(json_object) {           //TODO: LÄGG TILL Get för att hämta alla fables först     
   
    //Itirerar json-objektet och skapar en array med alla fabel-id:n
    json_object.fables.map(listOfIds => fable.id);

    // Genererar ett slumpmässigt index
    const id = Math.floor(Math.random() * listOfIds.length);       

   return id;
}









//TODO: Se över namnen nedan, så matchar med HTML / CSS

//Lägg till hide forms ?

// ENHÖRNINGAR


async function fetchABunchOfUniqueRandomUnicorns(range) {   
  const options = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  };

  const unicornList = []
  const unicorns = listUnicorns();
  unicorns.map(listOfIds => unicorns.id);

  for (i = 0; i < range; i++) {
    let randomId = Math.floor(Math.random() * listOfIds.length);

    // Genererar ett slumpmässigt index
  let id = listOfIds.get(randomId);
  listOfIds.delete(randomId);
  let unicorn = await fetch(baseURL + id, options)
  unicornList.appendChild(unicorn);
  }

  return unicornList;
}

async function listUnicorns() {
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };
    const response = await fetch(baseURL, options);
    const unicorns = await response.json();
   //const unicornList = document.querySelector("#unicorns");  //TODO: Byt ut mot knappjävel
   // unicornList.replaceChildren();

    return unicorns;  //Returnerar en unicorn-lista som ska skickas i HTML

   /*  unicorns.forEach((unicorn) => {
      let listItem = document.createElement("li");
      listItem.setAttribute("name", "unicorn_" + unicorn.id);
      listItem.setAttribute("value", unicorn.id);
      listItem.innerHTML = unicorn.name;
      listItem.addEventListener("click", fetchThenDisplayUnicorn);
      unicornList.appendChild(listItem);
    }
    );*/
  }
  
  async function fetchThenDisplayUnicorn(event) {
    const url = baseURL + event.target.value;
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };
    const response = await fetch(url, options);
    const unicorn = await response.json();
    displayUnicorn(unicorn);
  }
  
  function displayUnicorn(unicorn) {
    const date = new Date(unicorn.spottedWhen);
    const legibleDate = date.toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    const sighting = `Av: ${unicorn.reportedBy}, ${legibleDate} i ${unicorn.spottedWhere.name}`;
    const image = document.createElement("img");
    image.setAttribute("src", unicorn.image);
    
    document.querySelector("#unicornName").innerHTML = unicorn.name;
    document.querySelector("#unicornImage").replaceChildren(image);
    document.querySelector("#unicornInfo").innerHTML = unicorn.description;
    document.querySelector("#unicornSighting").innerHTML = sighting;
  }

  async function postUnicorn() {
    
    const unicorn = buildUnicorn("newUnicorn");
    /*
     * POST-anrop med JSON-innehåll
     */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(unicorn)
    };
    
    /*
     * Skicka enhörningen till webbtjänsten
     */
    await fetch(baseURL, options);
    /*
     * Dölj formulären
     */
    hideForms();
  }

  /*
 * Funktionen för att uppdatera en enhörning
 */
async function putUnicorn() {
        
    const unicorn = buildUnicorn("existingUnicorn");

    const url = baseURL + unicorn.id;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(unicorn)
    };
    
    await fetch(url, options);
    hideForms();
  }

  /*
 * Här skapar vi nya enhörningar.
 */
function buildUnicorn(formName) {
    const unicorn = {};
    /*
     * Vi använder oss av magiska strängar för att söka efter rätt element
     */
    unicorn.id = document.querySelector(`#${formName} input[name=id]`).value;
    unicorn.name = document.querySelector(`#${formName} input[name=name]`).value;
    unicorn.description = document.querySelector(`#${formName} [name=description]`).value;
    unicorn.reportedBy = document.querySelector(`#${formName} input[name=reportedBy]`).value;
    unicorn.spottedWhere = {
      name: document.querySelector(`#${formName} input[name='spottedWhere.name']`).value,
      lat: document.querySelector(`#${formName} input[name='spottedWhere.lat']`).value,
      lon: document.querySelector(`#${formName} input[name='spottedWhere.lon']`).value
    };
    unicorn.spottedWhen = document.querySelector(`#${formName} input[name=spottedWhen]`).value + " 00:00:00";
    unicorn.image = document.querySelector(`#${formName} input[name=image]`).value;
    
    /*
     * Här tar vi bort id:t om det inte är definierat och gör det klart för att
     * läggas in i databasen
     */
    if (unicorn.id == "") {
      delete(unicorn.id);
    }
    
    return unicorn;
  }
  
  listUnicorns();
  


// FABLES 



async function listFables() {
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };
    const response = await fetch(baseURL, options);
    const fables = await response.json();
    const fablesList = document.querySelector("#fables");
    fablesList.replaceChildren();
    fables.forEach((fable) => {
      let listItem = document.createElement("li");
      listItem.setAttribute("name", "fable_" + fable.id);
      listItem.setAttribute("value", fable.id);
      listItem.innerHTML = fable.name;
      listItem.addEventListener("click", fetchThenDisplayFable);
      unicornList.appendChild(listItem);
    });
  }
  
  async function fetchThenDisplayFable(event) {
    const url = baseURL + event.target.value;
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };
    const response = await fetch(url, options);
    const fable = await response.json();
    document.querySelector("#fable").innerHTML = fable;
  }
    
  listFables();
  

// ÖVRIGT 

  function hideForms() {
    /*
     * Vi hittar alla formulärelement och applicerar style.display = "none" på
     * samtliga formulär för att dölja dem genom att använda en forEach()
     */
    document.querySelectorAll("form").forEach((form) => {
      form.style.display = "none";
    });
  }


  function showAddForm() {
    hideForms();
    /*
     * Vi väljer ut rätt formulär och visar det genom att applicera
     * style.display = "block" på det
     */
    document.querySelector("#newUnicorn").style.display = "block";
  }

  
function showUpdateForm() {
    hideForms();
    document.querySelector("#existingUnicorn").style.display = "block";
  }

  /*
 * Här kopplar vi ihop funktionerna med respektive knapp
 */
document.querySelector("#addUnicorn").addEventListener("click", showAddForm);
document.querySelector("#updateUnicorn").addEventListener("click", showUpdateForm);
document.querySelector("#postUnicorn").addEventListener("click", postUnicorn);
/*
 * Slutligen döljer vi formulären
 */
hideForms();
listUnicorns();