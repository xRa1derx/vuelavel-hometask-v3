export const vLazyload = {
    mounted: (el) => {
        function loadImages() {
            el.src = el.dataset.src;
        }
        function callback(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImages();
                    entry.target.addEventListener("load", () => {
                        entry.target.classList.remove("--fade");
                    });
                    observer.unobserve(el);
                }
            });
        }
        function createIntersectionObserver() {
            const options = {
                root: null,
                threshold: 0,
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(el);
        }

        if (!window["IntersectionObserver"]) {
            loadImages();
        } else {
            createIntersectionObserver();
        }
    },
};
