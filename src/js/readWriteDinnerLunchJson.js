import dinnerMenu from "../assets/json/dinner.json";
import lunchMenu from "../assets/json/lunch.json";
import highlightSearchWord from "./highlightSearchWord";

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
      .replace("include", "")
      .includes(searchWord.toLowerCase());

    let isInItemName;

    if (!searchMenu[category] || isInCategory || isInDescription) {
      searchMenu[category] = { description: description, items: {} };
    }
    let menuItems = data[`${mealType}Menu`][category].items;
    for (const [itemName, itemInfo] of Object.entries(menuItems)) {
      isInItemName = itemName.toLowerCase().includes(searchWord.toLowerCase());
      if (isInItemName) {
        searchMenu[category].items[itemName] = itemInfo;
      }
    }
    let isItemsinSearchMenu =
      searchMenu[category]?.items &&
      Object.keys(searchMenu[category].items).length > 0;

    if (isInCategory || isInDescription) {
      searchMenus[highlightSearchWord(category, searchWord)] = {
        description: highlightSearchWord(description, searchWord),
        items: menuItems,
      };
    } else if (isItemsinSearchMenu) {
      searchMenus[highlightSearchWord(category, searchWord)] = {
        description: highlightSearchWord(description, searchWord),
        items: searchMenu[category]?.items || {},
      };
    }
  }

  let messageSearchWordCount = getSearchWordCountInCatDesItems(
    searchMenus,
    searchWord,
  );

  if (Object.keys(searchMenus).length === 0) {
    renderNotFoundItem(mealType, menuList, searchWord);
    const info = document.getElementById("info");
    info.innerHTML = "";
    return;
  }
  renderMenuItems(searchMenus, menuList, searchWord, messageSearchWordCount);
}

function countOccurrences(sentence, searchWord) {
  const regex = new RegExp(searchWord, "gi"); // Create a global regex for the search word
  const matches = sentence.match(regex); // Find all matches
  return matches ? matches.length : 0; // Return the count of matches, or 0 if no matches
}
function getSearchWordCountInCatDesItems(searchMenus, searchWord) {
  let lowerCaseSearchWord = searchWord.toLowerCase();
  let searchWordInCatCount = 0;
  let searchWordInDescriptionCount = 0;
  let searchWordInItemsCount = 0;
  for (let cat in searchMenus) {
    const lowerCaseCat = cat.toLowerCase();
    if (lowerCaseCat.includes(lowerCaseSearchWord)) {
      searchWordInCatCount += countOccurrences(cat, searchWord);
    }
    let lowerCaseDescription = searchMenus[cat].description.toLowerCase();
    searchWordInDescriptionCount += countOccurrences(
      lowerCaseDescription,
      searchWord,
    );
    for (let item in searchMenus[cat].items) {
      if (item.toLowerCase().includes(lowerCaseSearchWord)) {
        searchWordInItemsCount += 1;
      }
    }
  }
  return `${searchWordInCatCount} categories,<br>
    ${searchWordInDescriptionCount} description<br>
    ,and  ${searchWordInItemsCount} items that<br>
    match your ${searchWord}      
  `;
}

function renderMenuItems(
  jsonMenu,
  element,
  searchWord,
  messageSearchWordCount,
) {
  element.innerHTML = "";
  const info = document.getElementById("info");

  if (!messageSearchWordCount) info.innerHTML = "";
  if (messageSearchWordCount) {
    const searchInfoBox = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.style.fontSize = "1em";
    h1.style.textAlign = "center";
    h1.textContent = `${searchWord} count info`;
    searchInfoBox.appendChild(h1);
    const messageElement = document.createElement("div");
    messageElement.innerHTML = messageSearchWordCount;
    searchInfoBox.appendChild(messageElement);
    searchInfoBox.style.padding = "10px";
    searchInfoBox.style.margin = "10px";
    searchInfoBox.style.border = "1px solid #000";
    searchInfoBox.style.backgroundColor = "#f0f0f0";
    searchInfoBox.style.display = "inline-block";
    info.innerHTML = "";
    info.append(searchInfoBox);
  }
  for (let category in jsonMenu) {
    let description = jsonMenu[category].description;

    let items = jsonMenu[category].items;
    const categoryCard = createCategory(category, description);
    element.appendChild(categoryCard);
    let itemsCard = createItemsCard(items, searchWord);
    categoryCard.appendChild(itemsCard);
  }
}
function getOppositeMenu() {
  const pathName = window.location.pathname;
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
       <a href=".${getOppositeMenu()}">${getOppositeMenu().split(/[./]/)[1]} Menu</a>
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
function createItem(itemName, ingredients, price, searchWord) {
  const itemCard = document.createElement("li");
  itemCard.innerHTML = `
  <div class="shadow-lg rounded-lg border border-gray-200 hover:bg-gray-500 md:p-1 text-base text-black dark:text-white hover:text-gray-200 min-h-full bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:bg-gray-500">
  <div class="px-6 py-4">
    <div class="mb-2 text-xl font-bold flex justify-between items-center">      
      <span class="inline-block">${highlightSearchWord(itemName, searchWord)} </span>
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
