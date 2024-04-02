
(() => {
    const contactFormCloseBtn = document.querySelector("#response-form-dialog  button");
    const contactForm = document.querySelector("#response-form-dialog");
    contactFormCloseBtn.addEventListener('click', () => {
        contactForm.style.display = "none";
        contactForm.reset();
    });
})();