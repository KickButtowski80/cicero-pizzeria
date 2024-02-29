(() => {
    const images = document.querySelectorAll('.image')
    const dinnerLogo = document.querySelector('.dinner-logo')
    images.forEach(image => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const intersecting = entry.isIntersecting;

                if (intersecting) {
                    image.classList.add('show-image');
                    dinnerLogo.classList.add('show-dinner-logo')
                }
                else {
                    image.classList.remove('show-image')
                    dinnerLogo.classList.remove('show-dinner-logo')
                }
            })
        }
            , { threshold: 0.5 })
        observer.observe(image);

    })
})();


 
  