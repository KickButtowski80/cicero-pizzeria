const hamburgerIcon = document.querySelector('#hamburgerIcon')

hamburgerIcon.addEventListener('click', () => {
    const navBar = document.querySelector('#navbar');
    const menuItems = document.querySelector('#menu-items')
    menuItems.classList.toggle('hidden');
    navBar.classList.toggle('chang-bg');

})