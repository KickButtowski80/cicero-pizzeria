import dinnerMenu from "../assets/json/dinner.json"
import lunchMenu from "../assets/json/lunch.json"


document.addEventListener("DOMContentLoaded", () => {

  let searchWord
  const foodSearchInput = document.querySelector("#food-search");


  const pathName = window.location.pathname
  if (pathName.includes('lunch'))
    loadMenu(lunchMenu, 'lunch', '');
  else
    loadMenu(dinnerMenu, 'dinner', '');

  foodSearchInput.addEventListener("input", (e) => {

    searchWord = e.target.value;

    // Call the loadMenu function for lunch and dinner
    if (pathName.includes('lunch')) {
      loadMenu(lunchMenu, 'lunch', searchWord);
    } else {
      loadMenu(dinnerMenu, 'dinner', searchWord);
    }
  })
});

function loadMenu(data, mealType, searchWord) {
  // debugger;
  const menuList = document.querySelector(`#${mealType}-menu-list`);

  if (searchWord.length === 0) {
    menuList.innerHTML = '';
    renderMenuItems(data[`${mealType}Menu`], menuList)
  } else {
    let searchedMenus = {};
    for (const [category, menuItems] of Object.entries(data[`${mealType}Menu`])) {

      if (category.toLowerCase().includes(searchWord.toLowerCase())) {
        searchedMenus[category] = menuItems;
      }
    }

    if (Object.keys(searchedMenus).length === 0) {
      renderNotFoundItem(mealType, searchWord)
      return;
    }

    renderMenuItems(searchedMenus, menuList, searchWord)
  }

  function highlightedItems(jsonMenu, searchedWord) {
    let foundItems = {};
    for (let [category, categoryData] of Object.entries(jsonMenu)) {
      // console.log(`Category: ${category}`);
      // console.log(`Description: ${categoryData.description}`);


      // Iterate over the items in the category
      for (let [item, itemData] of Object.entries(categoryData.items)) {
        // console.log(`Item: ${item}`);
        // console.log(`Description: ${itemData.description}`);
        // console.log(`Price: ${itemData.price}`);
        let key;

        if ('description' in itemData) {
          key = 'description'
        } else {
          key = 'ingredients'
        }
        let regex = new RegExp(`${searchedWord}`, 'i');

        // if(foundItems.indexOf(itemData[key])) continue;
        if (item.toLowerCase().includes(searchedWord.toLowerCase())) {
          // if (regex.test(itemData[key])) {

          const highlightedWord = `<mark>${searchedWord.toLowerCase()}</mark>`;
          const highlightedString = item.replaceAll(searchedWord.toLowerCase(), highlightedWord);
          item = highlightedString.replaceAll('\n', '');

          foundItems[item] = item;
        }

      }
    }

    console.log('found items', foundItems)
    return foundItems;
  }

  function renderMenuItems(jsonMenu, element, searchWord = '') {
    element.innerHTML = '';

    for (let category in jsonMenu) {

      let description = jsonMenu[category].description;
      let items = jsonMenu[category].items;
      let IsSearchedWordinDiscription = description.toLowerCase().includes(searchWord.toLowerCase());
      if (searchWord.length > 0  && IsSearchedWordinDiscription) {
        let highlightedWord = `<mark>${searchWord}</mark>`;
        let regex = new RegExp(searchWord, 'gi');
        let highlightedString = description.replace(regex, function(match) {
          const hs = match === searchWord ? highlightedWord : highlightedWord;
          return hs;
        });
        description = highlightedString;
      }
      
      // Create category card
      const categoryCard = createCategory(category, description);

      element.appendChild(categoryCard);
      let CategoryId = category.split(" ").join('-')

      //highlight the searched category 
      if (searchWord.length > 0) {
        let searchedCategory = document.querySelector(`#${CategoryId}`)
        let currentContent = searchedCategory.innerHTML;
        let newContent = `<mark>${currentContent}</mark>`;
        searchedCategory.innerHTML = newContent;

        //  let highlightedItemsResult =  highlightedItems(jsonMenu, searchWord)

        //  let object = highlightedItemsResult.reduce((obj, str) => {
        //   let key = str.replace(/<\/?mark>/g, "")
        //     console.log(key)
        //   obj[key] = {str}; // Initialize each string as a key with an empty object as its value
        //   return obj;
        // }, {});
      
        // jsonMenu[category].items = Array.of(Object.values(highlightedItemsResult))[0];
      }

      // Create items list and append it to the category card  

      let itemsCard = createItemsCard(items);
      categoryCard.appendChild(itemsCard);

    }
  }
  function renderNotFoundItem(mealType, searchWord) {


    menuList.innerHTML = `
      <div id="alert-additional-content-1" class="mb-4 rounded-lg border border-gray-300 bg-blue-50 p-4 text-gray-800 dark:border-blue-800 dark:bg-gray-800 dark:text-gray-400" role="alert">
      <div class="flex items-center">
        <svg class="me-2 h-4 w-4 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">there is no ${searchWord} item in the ${mealType} menu.</h3>
      </div>
      <p>please try different name</p>
    </div>`
    return;

  }

  // Function to create category card
  function createCategory(category, description) {
    const card = document.createElement('div');
    card.className = `bg-gray-700  rounded-xl shadow-md m-5 p-2`;
    const categoryItems = category.split(' ').join('-');
    const divCategory = document.createElement('div');
    divCategory.className = 'md:flex md:flex-wrap';
    let CategoryId = category.split(" ").join('-')
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

  function createItemsCard(items) {
    const itemsCard = document.createElement('ul');
    itemsCard.classList.add('grid', 'grid-cols-1', 'lg:grid-cols-5', 'md:grid-cols-3', 'sm:grid-cols-2', 'gap-2');
    for (const item in items) {
      let itemInfo = items[item];
      if (!itemInfo['ingredients'] && !itemInfo['description']) {
        itemInfo.ingredients = 'Beverage';
        itemInfo.price = "$3.00";
      }
      const itemCard = createItem(item, (itemInfo.ingredients || itemInfo.description), itemInfo.price);
      itemsCard.appendChild(itemCard);
    }

    return itemsCard;
  }

  // Function to create item card
  function createItem(itemName, ingredients, price) {
    const itemCard = document.createElement('li');
    itemCard.innerHTML = `
  <div class="shadow-lg rounded-lg border border-gray-200 hover:bg-gray-500 md:p-1 text-base text-black dark:text-white hover:text-gray-200 min-h-full bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:bg-gray-500">
  <div class="px-6 py-4">
    <div class="mb-2 text-xl font-bold flex justify-between items-center">      
      <span class="inline-block">${itemName} </span>
      <button class="mb-2 mr-2 inline-block  rounded-full bg-gray-100 px-2 py-3 text-sm font-semibold text-gray-700">
       💓 Add
      </button>
      </div>
      <div class="text-xl font-bold">${price}</div>
    <p
    id='${itemName}'
    class="rounded-lg shadow-md bg-gray-200 bg-opacity-50 backdrop-blur-lg mt-2 backdrop-filter border border-gray-200 p-2 leading-loose dark:hover:text-white">
     ${ingredients}
    </p>
  </div>
</div>
  `;

    return itemCard;
  }


}
