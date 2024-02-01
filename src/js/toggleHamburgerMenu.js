const hamburgerIcon = document.querySelector('#hamburgerIcon')
const menuBg = document.querySelector('.menu-bg')
const menuItems = document.querySelectorAll('#menu-items')
const navBar = document.querySelector('#navbar');
hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('change');
    toggleClasses(menuBg, 'in-view', 'out-view');
    toggleClasses(menuItems[0], 'in-view-menuItems', 'out-view-menuItems');


});

function toggleClasses(element, class1, class2) {
    if (element.classList.contains(class1)) {
        element.classList.remove(class1);
        element.classList.add(class2);
    } else {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
}

