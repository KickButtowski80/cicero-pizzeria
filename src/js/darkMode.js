
(() => {

  function toggleLightnessMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.getItem('color-theme') === 'dark' ? localStorage.setItem('color-theme', 'light') : localStorage.setItem('color-theme', 'dark');
  }
  const darkModeCheckboxes = document.querySelectorAll('.slider input[type="checkbox"')

  darkModeCheckboxes.forEach(darkModeCheckbox => {
    darkModeCheckbox.addEventListener('click', toggleLightnessMode)
    darkModeCheckboxes.forEach((btn => btn.addEventListener('keyup',
      function (event) {
        if ([13, 32].includes(event.keyCode)) { toggleLightnessMode() }
      }
    )));
  })

})();
