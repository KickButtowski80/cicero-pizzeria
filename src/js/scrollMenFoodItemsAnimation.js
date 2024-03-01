(() => {
    const images = document.querySelectorAll('.image')
    const dinnerLogo = document.querySelector('.dinner-logo')
    const lunchLogo = document.querySelector('.lunch-logo')
    images.forEach(image => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const intersecting = entry.isIntersecting;

                if (intersecting) {
                    image.classList.add('show-image');
                    dinnerLogo.classList.add('dinner-logo-animation')
                    lunchLogo.classList.add('lunch-logo-animation')
                }
                else {
                    image.classList.remove('show-image')
                    dinnerLogo.classList.remove('dinner-logo-animation')
                    lunchLogo.classList.remove('lunch-logo-animation')
                }
            })
        }
            , { threshold: 0.5 })
        observer.observe(image);

    })
})();



