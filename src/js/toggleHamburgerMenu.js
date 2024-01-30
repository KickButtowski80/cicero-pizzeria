const hamburgerIcon = document.querySelector('#hamburgerIcon')
const  menuBg = document.querySelector('.menu-bg')
const menuItems = document.querySelectorAll('#menu-items')
const navBar = document.querySelector('#navbar');
hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('change');
    menuBg.classList.toggle('in-view');
    menuItems[0].classList.toggle('hidden');

})
