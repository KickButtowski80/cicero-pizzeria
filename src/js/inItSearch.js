document.addEventListener("DOMContentLoaded", () => {
  let searchWord;
  const foodSearchInput = document.querySelector("#food-search");

  const pathName = window.location.pathname;
  if (pathName.includes("lunch")) {
    loadMenu(lunchMenu, "lunch", "");
  } else {
    loadMenu(dinnerMenu, "dinner", "");
  }

  foodSearchInput.addEventListener("input", (e) => {
    searchWord = e.target.value;

    // Call the loadMenu function for lunch and dinner
    if (pathName.includes("lunch")) {
      loadMenu(lunchMenu, "lunch", searchWord);
    } else {
      loadMenu(dinnerMenu, "dinner", searchWord);
    }
  });
});
