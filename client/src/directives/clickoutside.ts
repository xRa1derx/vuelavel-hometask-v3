export const vClickoutside = {
    beforeMount: function (element: any, binding: any) {
        //  check that click was outside the el and his children
        element.clickOutsideEvent = function (event: any) {
            // and if it did, call method provided in attribute value
            if (!(element === event.target || element.contains(event.target))) {
                binding.value(event);
            }
        };
        document.body.addEventListener("click", element.clickOutsideEvent);
    },
    unmounted: function (element: any) {
        document.body.removeEventListener("click", element.clickOutsideEvent);
    },
};
