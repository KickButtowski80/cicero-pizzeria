
(() => {
    const contactFormCloseBtn = document.querySelector("#response-form-dialog  button");
    const contactFormDialog = document.querySelector("#response-form-dialog");
    const contactForm = document.querySelector("#contact-form");
    contactFormCloseBtn.addEventListener('click', () => {
        contactForm.reset();
        contactFormDialog.style.display = "none";
    });
})();