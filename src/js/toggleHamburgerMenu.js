const hamburgerIcon = document.querySelector('#hamburgerIcon')
const menuBg = document.querySelector('.menu-bg')
const flyoutMenuId = document.querySelectorAll('#flyout-menu-items');
const flyoutMenuItems = document.querySelectorAll('#flyout-menu-items li');
const navBarLogo = document.querySelector('#flyout-menu-logo');
const navbar = document.getElementById('flyout-navbar')

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('change');
    navbar.classList.toggle('show-flyout-navbar');
    toggleClasses(menuBg, 'in-view', 'out-view');
    toggleClasses(flyoutMenuId[0], 'in-view-menuItems', 'out-view-menuItems');
    toggleClasses(navBarLogo, 'in-view-logo', 'out-view-logo');

});


Array.from(flyoutMenuItems).slice(0, -1).forEach(fmi => fmi.addEventListener('click', () => {
    flyoutMenuId[0].classList.remove('in-view-menuItems');
    menuBg.classList.remove('in-view');
    navBarLogo.classList.remove('in-view-logo');
}))


function toggleClasses(element, class1, class2) {
    if (element.classList.contains(class1)) {
        element.classList.remove(class1);
        element.classList.add(class2);
    } else {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
}

