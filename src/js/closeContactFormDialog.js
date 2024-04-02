
(() => {
    const contactFormCloseBtn = document.querySelector("#response-form-dialog  button");
    const contactForm = document.querySelector("#contact-form");
    contactFormCloseBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = "none";
    });
})();