import { nextTick, onMounted, Ref, onUnmounted, ref, watch } from "vue";

export function useOnWindowResize(
    isMenuOpen: Ref<boolean>,
    closeMenu: () => void
) {
    const windowWidth = ref<number>(window.innerWidth);

    onMounted(() => {
        console.log('зашли');
        nextTick(() => window.addEventListener("resize", onResize));
    });

    onUnmounted(() => {
        console.log('вышли!');
        
        nextTick(() => window.removeEventListener("resize", onResize));
    });

    function onResize() {
        windowWidth.value = window.innerWidth;
    }

    watch(windowWidth, (windowWidth) => {
        if (windowWidth >= 601 && isMenuOpen.value === true) {
            closeMenu();
        }
    });
}
