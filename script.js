document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("recipe-grid");
  const searchBar = document.getElementById("search-bar");
  let allRecipes = [];

  function displayRecipes(recipesToDisplay) {
    gridContainer.innerHTML = "";
    recipesToDisplay.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");
      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>Category:</strong> ${recipe.category} (${recipe.diet})</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.length} items</p>
      `;
      gridContainer.appendChild(card);
    });
  }

  fetch("recipes.json")
    .then((response) => response.json())
    .then((recipes) => {
      allRecipes = recipes;
      displayRecipes(allRecipes);
    })
    .catch((error) => console.error("Error loading recipes:", error));

  searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filteredRecipes);
  });
});