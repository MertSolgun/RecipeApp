const inputDiv = document.querySelector(".inputDiv input");
const searchBtn = document.querySelector(".searchBtn");
const cardImgContainer = document.querySelector(".cardImg");
const recipeContainer = document.querySelector(".recipeContainer ");
const imgContainer = document.querySelector(".imgContent");
const viewRecipe = document.querySelector(".viewRecipe");
const itemContainer = document.querySelector(".itemContainer");

let ingredients = [];

async function recipe() {
  cardImgContainer.innerHTML = "";
  itemContainer.innerHTML = "";
  recipeContainer.innerHTML = "";
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputDiv.value}`
  );

  if (!api.ok) {
    swal(`No response from Api Status Code${api.status}`);
    return;
  }

  const response = await api.json();

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
    let xBtn = document.createElement("i");
    xBtn.className = "fa-solid fa-x";
    xBtn.addEventListener("click", () => {
      itemContainer.style.display = "none";
    });

    newItemContainer = document.createElement("div");
    newItemContainer.className = "x";
    newItemContainer.appendChild(xBtn);

    let recipeText = document.createElement("div");
    recipeText.innerHTML = response.meals[0].strInstructions;
    newItemContainer.appendChild(recipeText);

    let newSpan = document.createElement("span");
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    let newDiw = document.createElement("div");
    newDiw.className = "imgContent";

    newImg.src = response.meals[0].strMealThumb;
    newSpan.innerHTML = response.meals[0].strMeal;
    newP.innerHTML = response.meals[0].strArea;

    newDiw.appendChild(newSpan);
    newDiw.appendChild(newP);
    cardImgContainer.appendChild(newImg);
    cardImgContainer.appendChild(newDiw);

    itemContainer.appendChild(newItemContainer);

    viewRecipe.style.display = "flex";
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
