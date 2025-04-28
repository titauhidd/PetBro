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
    console.log(btn.category_icon);
    const createBtn = document.createElement("div");
    createBtn.innerHTML = `
    <button class="btn py-10 px-12"><span>
         <img class="w-[80%]" src="${btn.category_icon}" alt=""> 
    </span><span class="text-xl font-bold">${btn.category}s</span></button>
    `;
    btndiv.appendChild(createBtn);
  });
}

loadbuttons();
