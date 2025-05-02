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
    <button class="btn py-10 px-12 rounded-lg"><span>
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
  console.log(pets);
  const petsCategory = document.getElementById("pets-ctg");
  pets.forEach((petli) => {
    console.log(petli);
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
              <button class="btn rounded-md px-6"><span><i class="fa-solid fa-thumbs-up"></i></span></button>
              <button class="btn rounded-md px-6 text-[#0E7A81]">Adopt</button>
              <button class="btn rounded-md px-6 text-[#0E7A81]">Details</button>
            </div>

          
    `;
    petsCategory.appendChild(displaypetsCtg);
  });
}

loadpets();
