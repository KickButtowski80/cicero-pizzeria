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
  <div class="m-2 shadow-lg rounded-lg border border-gray-200
  hover:bg-gray-500 p-6 text-base text-black hover:text-white
  bg-gray-300 dark:border-gray-700 dark:bg-gray-800
  dark:hover:bg-gray-700">
  <div class="px-6 py-4">
    <div class="mb-2 text-xl font-bold flex justify-between">
      
      <span class="inline-block">${itemName} ${price} </span>
      <div class="mb-2 mr-2 inline-block h-10 rounded-full bg-gray-100
       px-6 py-3 text-sm font-semibold text-gray-700">
       💓 Add to Cart
      </div>
    </div>
    <p class="block max-w-sm ">
     ${ingredients}
    </p>
  </div>
</div>
  `;

  return itemCard;
}

