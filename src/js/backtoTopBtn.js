const button = document.getElementById('back-to-top-page');

const handleScroll = () => {
  if (window.scrollY > 300) {
    button.classList.add('show');
  } else {
    button.classList.remove('show');
  }
};
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener('scroll', handleScroll);
});