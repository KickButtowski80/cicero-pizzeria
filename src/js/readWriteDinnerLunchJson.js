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

  const menuList = document.querySelector(`#${mealType}-menu-list`);

  if (searchWord.length === 0) {
    menuList.innerHTML = '';
    renderMenuItems(data[`${mealType}Menu`], menuList);
    return;
  }
    let searchedMenus = {};
    // for (const [category, menuItems] of Object.entries(data[`${mealType}Menu`])) {
    //   let isInCategory = category.toLowerCase().includes(searchWord.toLowerCase());

    //   for (let item in menuItems.items) {

    //     let isInMenuItem = item.toLowerCase().includes(searchWord.toLowerCase());
    //     debugger;
    //     if (!searchedMenus[category]) {
    //       searchedMenus[category] = {
    //         description: category.description,
    //         items: {}
    //       };
    //     }
    //     if (isInCategory || isInMenuItem) {
    //       // Ensure searchedMenus[category] is an object
    //       if (!searchedMenus[category]) {
    //         searchedMenus[category] = { ...menuItems, items: {} };
    //       }

    //       // Add the item to searchedMenus[category]
    //       searchedMenus[category].items[item] = menuItems.items[item];
    //     }
    //   }
    // }

    for (const [category, menuItems] of Object.entries(data[`${mealType}Menu`])) {
      let isInCategory = category.toLowerCase().includes(searchWord.toLowerCase());
      if (isInCategory) {
        searchedMenus[category] = menuItems;
      }

      for (let item in menuItems.items) {
        // let pizza = menuItems.items[pizzaName]; // Access the value (details) of each item

        let isInMenuItem = item.toLowerCase()
          .includes(searchWord.toLowerCase());
        debugger;
        // if (isInMenuItem) {
        //      searchedMenus[pizzaName] = pizzaName

        // }

      }

    }

    // if (Object.keys(searchedMenus).length === 0) {
    //   renderNotFoundItem(mealType, searchWord)
    //   return;
    // }

    renderMenuItems(data[`${mealType}Menu`], menuList, searchWord)

   
}
  function highlightedItems(items, searchedWord) {

    // for (let [category, categoryData] of Object.entries(jsonMenu)) {
    //   // console.log(`Category: ${category}`);
    //   // console.log(`Description: ${categoryData.description}`);
    // console.log('items in highlightedItems', items)

    let searchedWordPattern = new RegExp(`${searchedWord}`, 'ig');
    let itemWHighlightedKeys = [];
    for (el of Object.keys(items)) {

      if (searchedWordPattern.test(el)) {
        // Use capture group for efficiency
        // Capture groups are a powerful feature in regular expressions
        // that allow you to extract and reuse portions of the matched text.
        // They play a crucial role in various tasks like highlighting
        // search terms, extracting data from text, and validating user
        // input.
        el = el.replace(searchedWordPattern, `<mark>$&</mark>`)
      }
      console.log('element;, ', el)

      itemWHighlightedKeys.push(el)
    }
    return itemWHighlightedKeys;
  }

  function highlightDescription(description, searchWord) {
    let IsSearchedWordinDescripton = description.toLowerCase().includes(searchWord.toLowerCase());
    if (searchWord.length > 0 && IsSearchedWordinDescripton) {
      let highlightedWord = `<mark>${searchWord}</mark>`;
      let regex = new RegExp(searchWord, 'gi');
      let highlightedString = description.replace(regex, function (match) {
        const hs = match === searchWord ? highlightedWord : highlightedWord;
        return hs;
      });

      description = highlightedString;
    }
    return description;
  }

  function renderMenuItems(jsonMenu, element, searchWord = '') {

    element.innerHTML = '';


    for (let category in jsonMenu) {

      let description = jsonMenu[category].description;
      let items = jsonMenu[category].items;

      if (searchWord.length > 0) description = highlightDescription(description, searchWord)

      // Create category card
      const categoryCard = createCategory(category, description);

      element.appendChild(categoryCard);
      let CategoryId = category.split(" ").join('-')

      //highlight the searched category 

      if (searchWord.length > 0) {
        let searchedCategory = document.querySelector(`#${CategoryId}`)
        let currentContent = searchedCategory.innerHTML;
        if (category.toLowerCase().includes(`${searchWord}`.toLocaleLowerCase())) {
          let regex = new RegExp(searchWord, 'gi');
          searchedCategory.innerHTML = currentContent.replace(regex, `<mark>${searchWord}</mark>`);

        }


        let highlightedItemsResult = highlightedItems(items, searchWord);
        let newKeys = [...highlightedItemsResult]

        if (JSON.stringify(jsonMenu[category].items) === JSON.stringify(highlightedItemsResult)) {
          return;
        }
        let newObj = {}
        newKeys.forEach((newKey, i) => {
          newObj[newKey] = items[Object.keys(items)[i]]
        })

        items = { ...newObj }
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
    <p id='${itemName}'
    class="rounded-lg shadow-md bg-gray-200 bg-opacity-50 backdrop-blur-lg mt-2 backdrop-filter border border-gray-200 p-2 leading-loose dark:hover:text-white">
     ${ingredients}
    </p>
  </div>
</div>
  `;
    return itemCard;
  }

