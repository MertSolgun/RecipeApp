const inputDiv = document.querySelector(".inputDiv input");
const searchBtn = document.querySelector(".searchBtn");
const cardImgContainer = document.querySelector(".cardImg");
const recipeContainer = document.querySelector(".recipeContainer ");
const imgContainer = document.querySelector(".imgContent");
const viewRecipe = document.querySelector(".viewRecipe");
const itemContainer = document.querySelector(".itemContainer");

const itemsContainerBtn = document.querySelector(".fa-x");
let ingredients = [];

async function recipe() {
  cardImgContainer.innerHTML = "";

  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputDiv.value}`
  );

  if (!api.ok) {
    swal(`No response from Api Status Code${api.status}`);
    return;
  }

  const response = await api.json();
  // strInstructions
  if (!response.meals) {
    recipeContainer.innerHTML = "";
    cardImgContainer.innerHTML = "";
    viewRecipe.style.display = "none";
    swal("Not Found!", "The requested food name could not be found.");
  } else if (inputDiv.value === "") {
    swal(`Please enter food name`);
    recipeContainer.innerHTML = "";
    cardImgContainer.innerHTML = "";
    viewRecipe.style.display = "none";
  } else {
    let newSpan = document.createElement("span");
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    let newDiw = document.createElement("div");
    newItemContainer = document.createElement("div");
    newDiw.className = "imgContent";
    viewRecipe.style.display = "flex";
    itemContainer.appendChild(newItemContainer);
    cardImgContainer.appendChild(newImg);
    cardImgContainer.appendChild(newDiw);
    newDiw.appendChild(newSpan);
    newDiw.appendChild(newP);

    newImg.src = response.meals[0].strMealThumb;
    newSpan.innerHTML = response.meals[0].strMeal;
    newP.innerHTML = response.meals[0].strArea;
    newItemContainer.innerHTML = response.meals[0].strInstructions;
    recipeContainer.innerHTML = "";

    viewRecipe.addEventListener("click", () => {
      itemContainer.style.display = "block";
    });

    for (let i = 1; i <= 20; i++) {
      const strIngredient = response.meals[0][`strIngredient${i}`];
      const measure = response.meals[0][`strMeasure${i}`];

      if (strIngredient && strIngredient.trim() !== "") {
        const ingredientSpan = document.createElement("li");

        ingredientSpan.innerText = `${strIngredient} - ${measure}`;

        recipeContainer.appendChild(ingredientSpan);
      }
    }
  }
}

searchBtn.addEventListener("click", recipe);
inputDiv.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    recipe();
  }
});

itemsContainerBtn.addEventListener("click", () => {
  itemContainer.style.display = "none";
});
