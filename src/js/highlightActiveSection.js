(() => {
    let allMenuItems = document.querySelectorAll('#flyout-menu-items li a, #static-menu-items li a');
   
    const options = {
         threshold: window.location.pathname.includes('/lunch.html' || '/dinner.html') ? 0 : 0.3
    }

    allMenuItems.forEach(menuItem => {
        
        const hashId = menuItem.hash;
        const observedElement = document.querySelector(hashId);
        if (observedElement === null) return;
        let observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                menuItem.parentElement.classList.add("active");
            } else {
                menuItem.parentElement.classList.remove("active");
            }

        }, options);
        observer.observe(observedElement)
    })
})();