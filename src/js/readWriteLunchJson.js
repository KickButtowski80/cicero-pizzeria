import data from "../assets/json/lunch.json"
document.addEventListener("DOMContentLoaded",  () => {
 
    const lunchMenuList = document.querySelector('.lunch-menu-list')
    data = JSON.stringify(data)
    //  const blob = new Blob([data], { type: "application/json" });
    for(const category in data.lunchMenu){
      console.log(category);
      const categoryItem = document.createElement('li');
      categoryItem.textContent = category;
      const categoryList = document.createElement('ul');
      categoryList.appendChild(categoryItem);
      lunchMenuList.appendChild(categoryList)
      const description = data.lunchMenu[category].description;
      const categoryTitle = document.createElement('h1');
      categoryTitle.textContent = description;
      categoryList.appendChild(categoryTitle)
    }


});



