document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("recipe-grid");
  const searchBar = document.getElementById("search-bar");
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  const modal = document.getElementById("recipe-modal");
  const closeModalBtn = document.getElementById("close-modal");

  let allRecipes = [];
  let currentSearchTerm = "";
  let currentCategory = "all";

  // Global close modal listeners (bound once)
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

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
      
      // Click listener to open modal for this specific recipe
      card.addEventListener("click", () => {
        document.getElementById("modal-title").innerText = recipe.title;
        document.getElementById("modal-category").innerText = `${recipe.category} (${recipe.diet})`;
        document.getElementById("modal-prep").innerText = recipe.prepTime;
        
        const ingList = document.getElementById("modal-ingredients");
        ingList.innerHTML = "";
        recipe.ingredients.forEach(ing => {
          const li = document.createElement("li");
          li.innerText = `${ing.amount} ${ing.unit} ${ing.name}`;
          ingList.appendChild(li);
        });
        
        const instList = document.getElementById("modal-instructions");
        instList.innerHTML = "";
        recipe.instructions.forEach(step => {
          const li = document.createElement("li");
          li.innerText = step;
          instList.appendChild(li);
        });
        
        modal.style.display = "flex";
      });

      gridContainer.appendChild(card);
    });
  }

  function filterAndDisplay() {
    let filtered = allRecipes;

    if (currentCategory !== "all") {
      filtered = filtered.filter(recipe => recipe.category.toLowerCase() === currentCategory.toLowerCase());
    }

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