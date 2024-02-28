(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const intersecting = entry.isIntersecting;

            if (intersecting) {
                entry.target.style.backgroundColor = "blue";
            }
            else {
                entry.target.style.backgroundColor = "green"
            }
        })
    }
        , { threshold: [0.4, 0.5] })

    const foodMenu = document.getElementById('food-menu');
    if (foodMenu) {
        observer.observe(foodMenu);
    }
})();