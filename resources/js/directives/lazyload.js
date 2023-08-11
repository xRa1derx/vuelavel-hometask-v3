export const vLazyload = {
    mounted: (el) => {
        function loadImages() {
            el.src = el.dataset.src;
            console.log(el.dataset);
        }
        function callback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImages();
                    observer.unobserve(el);
                }
            });
        };
        function createIntersectionObserver() {
            const options = {
                root: null,
                trashhold: 0
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(el);
            // console.log(el.classList.contains('--active__teacher__img'));
            // el.classList.remove('--active__teacher__img');
        }

        if (!window['IntersectionObserver']) {
            loadImages();
        } else {
            createIntersectionObserver();
        }

    }
}