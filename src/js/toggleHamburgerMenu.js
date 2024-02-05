const hamburgerIcon = document.querySelector('#hamburgerIcon')
const menuBg = document.querySelector('.menu-bg')
const menuItems = document.querySelectorAll('#flyout-menu-items')
const navBarLogo = document.querySelector('#flyout-menu-logo');
hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('change');
    toggleClasses(menuBg, 'in-view', 'out-view');
    toggleClasses(menuItems[0], 'in-view-menuItems', 'out-view-menuItems');
    toggleClasses( navBarLogo, 'in-view-logo', 'out-view-logo');

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

