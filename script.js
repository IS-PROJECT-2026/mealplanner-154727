document.addEventListener("DOMContentLoaded", () => {
  fetch("recipes.json")
    .then((response) => response.json())
    .then((recipes) => {
      const gridContainer = document.getElementById("recipe-grid");
      recipes.forEach((recipe) => {
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
    })
    .catch((error) => console.error("Error loading recipes:", error));
});