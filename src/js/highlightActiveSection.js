(() => {
    let allMenuItems = document.querySelectorAll('#flyout-menu-items li a, #static-menu-items li a');
    const currentPathName = window.location.pathname;
    const options = {
        threshold: currentPathName.includes('/lunch.html') ||
            currentPathName.includes('/dinner.html') ? 0 : 0.3
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