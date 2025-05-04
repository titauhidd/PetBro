function removeactiveClass() {
  const buttons = document.getElementsByClassName("pets-btn"); //selecting the button from the displaybuttons function
  console.log(buttons); //gives an html collection
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
}

function loadpetCategories(id) {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      removeactiveClass(); //if their is any active class by calling this funtion it will remove the active class from the button.
      const activeBtn = document.getElementById(`${id}`); //getting the id dynamically.
      console.log(activeBtn);
      activeBtn.classList.add("active");
      displaypets(data.data);
      // console.log("Full response:", data);
      // console.log("Trying to access category:", data.category);
    })
    .catch((err) => console.log("Err", err));
}

// Loading Buttons:------------------------------------

function loadbuttons() {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displaybuttons(data.categories))
    .catch((err) => console.log("ERR:-", err));
}

function displaybuttons(buttons) {
  // console.log(buttons)
  const btndiv = document.getElementById("ctg-btn");

  buttons.forEach((btn) => {
    // console.log(btn.category_icon);
    const createBtn = document.createElement("div");
    createBtn.innerHTML = `
    <button id="${btn.category}" onclick="loadpetCategories('${btn.category}')" class="btn py-10 px-12 rounded-lg pets-btn"><span>
         <img class="w-[80%]" src="${btn.category_icon}" alt=""> 
    </span><span class="text-xl font-bold">${btn.category}s</span></button>
    `;
    btndiv.appendChild(createBtn);
  });
}

loadbuttons();

// Show ALl Pets:-----------------

function loadpets() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displaypets(data.pets));
}
function displaypets(pets) {
  // console.log(pets);
  const petsCategory = document.getElementById("pets-ctg");
  petsCategory.innerHTML = "";

  if (pets.length === 0) {
    petsCategory.classList.remove("grid");
    petsCategory.innerHTML = `
    <div class="text-center min-h-screen w-full">
    <img class="mx-auto" src="./assets/error.webp"/>
    <h2 class="text-3xl font-bold">No Pets To Show</h2>
    </div>
    `;
  } else {
    petsCategory.classList.add("grid");
  }

  pets.forEach((petli) => {
    // console.log(petli);
    const displaypetsCtg = document.createElement("div");
    displaypetsCtg.classList = "shadow-md p-6 rounded-md";
    displaypetsCtg.innerHTML = `
    
            <div class="">
              <img class=" rounded-lg" src="${petli.image}" alt="">
              
            </div>
            <div class="border-b-[0.5px] border-gray-400" >
              <p class="pt-2 font-bold text-xl">${petli.pet_name}</p>
              <p class="pt-2"><span class="mr-2"><i class="fa-solid fa-square"></i></span>Breed: ${
                petli.breed ?? "Unknown"
              }</p>
              <p class="pt-2"><span class="mr-2"><i class="fa-solid fa-cake-candles"></i></span>Birth: ${
                petli.date_of_birth ?? "Unknown"
              }</p>
              <p class="pt-2"><span class="mr-2"><i class="fa-solid fa-venus"></i></span>Gender: ${
                petli.gender ?? "Unknown"
              }</p>
              <p class="pt-2 pb-4"><span class="mr-2"><i class="fa-solid fa-dollar-sign"></i></span>Price: ${
                petli.price ?? "Unknown"
              }</p>

            </div>
            <div class="pt-4 flex items-center justify-between">
              <button onclick="likebutton('${
                petli.image
              }')" class="btn rounded-md px-6"><span><i class="fa-solid fa-thumbs-up"></i></span></button>
              <button class="btn rounded-md px-6 text-[#0E7A81]">Adopt</button>
              <button onclick="loaddetailsbuttonMdl('${
                petli.petId
              }')" class="btn rounded-md px-6 text-[#0E7A81]">Details</button>
            </div>

          
    `;
    petsCategory.appendChild(displaypetsCtg);
  });
}

loadpets();

// Details Button Modal :------------------------------------

function loaddetailsbuttonMdl(petId) {
  console.log(petId);
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displaypetsMdl(data.petData))
    .catch((err) => console.log("Error:", err));
}

function displaypetsMdl(petDetails) {
  console.log(petDetails);
  const petDModal = document.getElementById("detailsModal");
  petDModal.innerHTML = `
   <div class="">
              <img class="w-full rounded-md" rounded-lg" src="${
                petDetails.image
              }" alt="">
              
            </div>
            <div class="border-b-[0.5px] border-gray-400" >
              <p class="pt-2 font-bold text-xl">${petDetails.pet_name}</p>
              <p class="pt-2"><span class="mr-2"><i class="fa-solid fa-square"></i></span>Breed: ${
                petDetails.breed ?? "Unknown"
              }</p>
              <p class="pt-2"><span class="mr-2"><i class="fa-solid fa-cake-candles"></i></span>Birth: ${
                petDetails.date_of_birth ?? "Unknown"
              }</p>
              <p class="pt-2"><span class="mr-2"><i class="fa-solid fa-venus"></i></span>Gender: ${
                petDetails.gender ?? "Unknown"
              }</p>
              <p class="pt-2 pb-4"><span class="mr-2"><i class="fa-solid fa-dollar-sign"></i></span>Price: ${
                petDetails.price ?? "Unknown"
              }</p>

            </div>
            <div>
            <p class="pt-4">
            ${petDetails.pet_details ?? "Unknown"}
            </p>
            </div>
  `;
  document.getElementById("showDetailsModal").click();
}

// loaddetailsbuttonMdl();

// likeButton-------------------------

function likebutton(petimg) {
  // console.log(petimg);
  const lkpetsdiv = document.getElementById("likedPets");
  const lkimg = document.createElement("img");

  lkimg.src = petimg; // getting the image url at petimg so that's why added directly to lkimg.src
  lkimg.classList.add("w-full", "rounded-md");

  lkpetsdiv.appendChild(lkimg);
}

// likebutton();
