const form = document.getElementById('contact-form'); // Get the form element

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  form.reset();
});
