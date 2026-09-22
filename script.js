document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("recipe-grid");
  const searchBar = document.getElementById("search-bar");
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  let allRecipes = [];
  let currentSearchTerm = "";
  let currentCategory = "all";

  function displayRecipes(recipesToDisplay) {
    gridContainer.innerHTML = "";
    if (recipesToDisplay.length === 0) {
      gridContainer.innerHTML = "<p>No recipes found.</p>";
      return;
    }
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

  function filterAndDisplay() {
    let filtered = allRecipes;

    // Filter by category
    if (currentCategory !== "all") {
      filtered = filtered.filter(recipe => recipe.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Filter by search term
    if (currentSearchTerm.trim() !== "") {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(currentSearchTerm)
      );
    }

    displayRecipes(filtered);
  }

  fetch("recipes.json")
    .then((response) => response.json())
    .then((recipes) => {
      allRecipes = recipes;
      displayRecipes(allRecipes);
    })
    .catch((error) => console.error("Error loading recipes:", error));

  searchBar.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value.toLowerCase();
    filterAndDisplay();
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentCategory = e.target.getAttribute("data-category");
      filterAndDisplay();
    });
  });
});