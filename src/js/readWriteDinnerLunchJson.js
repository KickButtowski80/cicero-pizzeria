import dinnerMenu from "../assets/json/dinner.json";
import lunchMenu from "../assets/json/lunch.json";
import highlightCategory from "./highlightCategory";

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

function loadMenu(data, mealType, searchWord) {
  const menuList = document.querySelector(`#${mealType}-menu-list`);

  if (searchWord.length === 0) {
    menuList.innerHTML = "";
    renderMenuItems(data[`${mealType}Menu`], menuList);
    return;
  }
  let searchMenu = {};
  let searchMenus = {};
  for (let [category, menuItems] of Object.entries(data[`${mealType}Menu`])) {
    let isInCategory = category
      .toLowerCase()
      .includes(searchWord.toLowerCase());
    let description = data[`${mealType}Menu`][category].description;
    let isInDescription = description
      .toLowerCase()
      .includes(searchWord.toLowerCase());
    let isInItemName;
    if (isInCategory || isInDescription) {
      searchMenu = { [category]: { description: description } };
    }
    let menuItems = data[`${mealType}Menu`][category].items;
    let isItemNameMatch = false;
    for (const [itemName, itemInfo] of Object.entries(menuItems)) {
      isInItemName = itemName?.toLowerCase().includes(searchWord.toLowerCase());
      if (isInItemName) {
        isItemNameMatch = true;
        break;
      }
    }

    if (isInCategory || isInDescription || isItemNameMatch) {
      searchMenus[highlightCategory(category, searchWord)] = {
        description: highlightDescription(description, searchWord),
        items: menuItems,
      };
    }
  }
  if (Object.keys(searchMenus).length === 0) {
    renderNotFoundItem(mealType, menuList, searchWord);
    return;
  }
  renderMenuItems(searchMenus, menuList, searchWord);
}
// function highlightItems(searchedMenus, searchWord) {
//   let newMenu = {};
//   Object.entries(searchedMenus).forEach((category, items) => {

//   });


//   if (searchWord.length > 0) {
//     let highlightedItemsKeys = highlightedItemsKeys(items, searchWord);

//     if (
//       JSON.stringify(category.items) === JSON.stringify(highlightedItemsKeys)
//     ) {
//       return;
//     }
//     let markDownItems = {};
//     highlightedItemsKeys.forEach((newKey, i) => {
//       markDownItems[newKey] = items[Object.keys(items)[i]];
//     });

//     items = { ...markDownItems };
//   }
//   // }

//   return searchedMenus;
// }

// function highlightedItemsKeys(items, searchedWord) {

//   let searchedWordPattern = new RegExp(`${searchedWord}`, "ig");
//   let itemWHighlightedKeys = [];
//   for (el of Object.keys(items)) {
//     if (searchedWordPattern.test(el)) {
//       // Use capture group for efficiency
//       // Capture groups are a powerful feature in regular expressions
//       // that allow you to extract and reuse portions of the matched text.
//       // They play a crucial role in various tasks like highlighting
//       // search terms, extracting data from text, and validating user
//       // input.
//       el = el.replace(searchedWordPattern, `<mark>$&</mark>`);
//     }

//     itemWHighlightedKeys.push(el);
//   }
//   return itemWHighlightedKeys;
// }
// function highlightCategory(category, searchWord) {
//   debugger;
//   let regex = new RegExp(searchWord, "gi");
//   category = category.replace(regex, `<mark>$&</mark>`);
//   return category;
// }
function highlightDescription(description, searchWord) {
  let regex = new RegExp(searchWord, "gi");
  return description.replace(regex, "<mark>$&</mark>");
}

function renderMenuItems(jsonMenu, element, searchWord) {
  element.innerHTML = "";

  for (let category in jsonMenu) {
    let description = jsonMenu[category].description;
    let items = jsonMenu[category].items;
    const categoryCard = createCategory(category, description);
    element.appendChild(categoryCard);
    let itemsCard = createItemsCard(items, searchWord);
    categoryCard.appendChild(itemsCard);
  }
}
function currentMenu() {
  const pathName = window.location.pathname;
  debugger;
  if (pathName.includes("lunch")) {
    return "/dinner.html";
  } else {
    return "/lunch.html";
  }
}
function renderNotFoundItem(mealType, menuList, searchWord) {
  menuList.innerHTML = `
      <div id="alert-additional-content-1" class="mb-4 rounded-lg border border-gray-300 bg-blue-700 p-4 text-white dark:border-blue-800 dark:bg-gray-800 dark:text-gray-400" role="alert">
      <div class="flex items-center">
        <svg class="me-2 h-4 w-4 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">there is no ${searchWord} item in the ${mealType} menu.</h3>
      </div>
      <p>please try different name or
       <a href=".${currentMenu()}">${currentMenu().split(/[./]/)[1]} Menu</a>
      </p>
    </div>`;
  return;
}

// Function to create category card
function createCategory(category, description) {
  const card = document.createElement("div");
  card.className = `bg-gray-700  rounded-xl shadow-md m-5 p-2`;
  const categoryItems = category.split(" ").join("-");
  const divCategory = document.createElement("div");
  divCategory.className = "md:flex md:flex-wrap";
  let CategoryId = category.split(" ").join("-");
  divCategory.innerHTML = `
      <div class="py-8">
          <div id='${CategoryId}' class=" tracking-wide text-2xl
           text-white font-semibold">${category}</div>
          <p class="mt-2 text-gray-300 text-xl">${description}</p>
      </div> 
      <div class='${categoryItems}'></div>
  `;

  card.appendChild(divCategory);

  return card;
}

function createItemsCard(items, searchWord) {
  const itemsCard = document.createElement("ul");
  itemsCard.classList.add(
    "grid",
    "grid-cols-1",
    "lg:grid-cols-5",
    "md:grid-cols-3",
    "sm:grid-cols-2",
    "gap-2",
  );
  for (const item in items) {
    let itemInfo = items[item];
    if (!itemInfo["ingredients"] && !itemInfo["description"]) {
      itemInfo.ingredients = "Beverage";
      itemInfo.price = "$3.00";
    }
    const itemCard = createItem(
      item,
      itemInfo.ingredients || itemInfo.description,
      itemInfo.price,
      searchWord,
    );
    itemsCard.appendChild(itemCard);
  }

  return itemsCard;
}

// Function to create item card
function createItem(itemName, ingredients, price, searchWord = "4") {
  // debugger
  const itemCard = document.createElement("li");
  itemCard.innerHTML = `
  <div class="shadow-lg rounded-lg border border-gray-200 hover:bg-gray-500 md:p-1 text-base text-black dark:text-white hover:text-gray-200 min-h-full bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:bg-gray-500">
  <div class="px-6 py-4">
    <div class="mb-2 text-xl font-bold flex justify-between items-center">      
      <span class="inline-block">${highlightCategory(itemName, searchWord)} </span>
      <button class="mb-2 mr-2 inline-block  rounded-full bg-gray-100 px-2 py-3 text-sm font-semibold text-gray-700">
       💓 Add
      </button>
      </div>
      <div class="text-xl font-bold">${price}</div>
    <p id='${itemName}'
    class="rounded-lg shadow-md bg-gray-200 bg-opacity-50 backdrop-blur-lg mt-2 backdrop-filter border border-gray-200 p-2 leading-loose dark:hover:text-white">
     ${ingredients}
    </p>
  </div>
</div>
  `;
  return itemCard;
}
