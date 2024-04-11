import data from "../assets/json/lunch.json"
document.addEventListener("DOMContentLoaded", () => {
   const lunchMenuList = document.querySelector('#lunch-menu-list')
 
  for (const category in data.lunchMenu) {
    const description = data.lunchMenu[category].description;
    let items = data.lunchMenu[category].items
    const categoryCard = createCategory(category, description, items);

    lunchMenuList.appendChild(categoryCard);
    const itemsCard = document.createElement('ul');
    const categoryItems = category.split(' ').join('-')
    const categoryCardEl = document.querySelector(`.${categoryItems}`)
    for (const item in items) {
      let itemInfo = items[item];
      const itemCard = createItem(item, itemInfo.ingredients, itemInfo.price);
      itemsCard.appendChild(itemCard)
    }
    categoryCardEl.appendChild(itemsCard)
  }
})

function createCategory(category, description) {
  const card = document.createElement('div');
  card.className = `bg-white rounded-xl shadow-md  
   m-5`;
  const categoryItems = category.split(' ').join('-')
  const img = document.createElement('div');
  img.className = 'md:flex md:flex-wrap';
  img.innerHTML = `
    
      <div class="p-8">
          <div class="uppercase tracking-wide text-sm
           text-indigo-500 font-semibold">${category}</div>
          <p class="mt-2 text-gray-500">${description}</p>
      </div> 
      <div class='${categoryItems}'></div>
  `;

  card.appendChild(img);
  return card;
}


function createItem(itemName, ingredients, price) {

  const itemCard = document.createElement('li')
  itemCard.innerHTML = `
    <div class="rounded  shadow-lg m-2">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${itemName}</div>
        <p class="text-gray-700 text-base">${ingredients}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price}</span>
      </div>
    </div>
  `;

  return itemCard;
}






// function createCategoryElement(category, description) {
//     const categoryItem = document.createElement('li');
//     categoryItem.textContent = category;

//     const categoryTitle = document.createElement('h1');
//     categoryTitle.textContent = description;

//     const categoryList = document.createElement('ul');
//     categoryList.appendChild(categoryItem);
//     categoryList.appendChild(categoryTitle);

//     return categoryList;
// }

// for(const category in data.lunchMenu){
//     console.log(category);
//     const description = data.lunchMenu[category].description;
//     const categoryList = createCategoryElement(category, description);
//     lunchMenuList.appendChild(categoryList);
// }




