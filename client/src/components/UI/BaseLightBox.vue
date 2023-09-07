<template>
    <slot name="image" :show="show"></slot>
    <teleport to="body">
        <transition name="opacity">
            <div class="lightbox" v-if="visible" @click="hide" ref="lightbox">
                <div class="overlay"></div>
                <div class="lightbox__items">
                    <div class="lightbox__close-button" @click.stop="hide"></div>
                    <transition-group name="opacity" tag="div" class="lightbox__transition">
                        <div v-for="index in [indexLightBox]" v-bind:key="index" class="lightbox__image" @click.stop>
                            <img v-lazyload :data-src="`/assets/${images![indexLightBox].path}`"
                                :src="`/assets/${images![indexLightBox].path}`">
                        </div>
                    </transition-group>
                    <div class="lightbox__slider">
                        <div @click.stop="prev" class="lightbox__slide-left" :class="{ 'hide': !hasPrev() }"><img
                                src="/assets/images/arrow-left-white.svg" alt=""></div>
                        <div @click.stop="next" class="lightbox__slide-right" :class="{ 'hide': !hasNext() }"><img
                                src="/assets/images/arrow-right-white.svg" alt=""></div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
 
<script setup lang="ts">
import { vLazyload } from '@/directives/lazyload';
import { nextTick, ref, watch } from 'vue';
import debounce from '@/composables/debounce'
import { useBodyOverflowHidden } from "@/composables/bodyOverflowHidden";


const props = defineProps({
    index: { type: Number, require: true },
    imagesLength: { type: Number, require: true },
    images: { type: Array, require: true }
})

const visible = ref(false);
const indexLightBox = ref(props.index);
const lightbox = ref<HTMLInputElement | null>(null);

let x: number | null = null;
let y: number | null = null;

function handleTouchStart(event: any) {
    const touch = event.touches[0];
    x = touch.clientX;
    y = touch.clientY;
}

const touchMove = debounce((event: any) => {
    if (!x || !y) {
        return false;
    }

    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;
    let xDiff = x2 - x;
    let yDiff = y2 - y;

    if (Math.abs(xDiff) > 75 && Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0) {
            next();

        } else {
            prev();
        }
    }
    x = null;
    y = null;
}, 100)

function show() {
    useBodyOverflowHidden();
    visible.value = true;
    nextTick(() => {
        lightbox.value?.addEventListener('touchstart', handleTouchStart, false);
        lightbox.value?.addEventListener('touchmove', touchMove, false);
    })

}

function hide() {
    useBodyOverflowHidden();
    visible.value = false;
    indexLightBox.value = props.index;
}

function hasNext() {
    return indexLightBox.value! + 1 < props.imagesLength!;
};
function hasPrev() {
    return indexLightBox.value! - 1 >= 0;
};

function prev() {
    if (hasPrev()) {
        indexLightBox.value! -= 1;
    }
};
function next() {
    if (hasNext()) {
        indexLightBox.value! += 1;
    }
};

watch(() => props.index, (newVal, oldVal) => {
    indexLightBox.value = newVal;
});
</script>
 
<style scoped lang="scss">
.lightbox {

    .lightbox__items {
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        flex-direction: column;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        justify-content: center;

        .lightbox__close-button {
            position: absolute;
            top: 1rem;
            right: 3rem;
            width: 24px;
            height: 24px;
            cursor: pointer;
            z-index: 1;

            &::before,
            &::after {
                content: "";
                position: absolute;
                top: 10px;
                display: block;
                width: 24px;
                height: 3px;
                background: #fff;
            }

            &::before {
                transform: rotate(45deg);
            }

            &::after {
                transform: rotate(-45deg);
            }
        }


        .lightbox__transition {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .lightbox__slider {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            & div {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 35px;
                height: 100%;
                cursor: pointer;
            }

            & div:hover {
                background-color: $bg-dark;
            }

            & div>img {
                width: 20px;
                height: 32px;
                margin-top: 1rem;
            }

            .lightbox__slide-left {
                left: 0;
            }

            .lightbox__slide-right {
                right: 0;
            }
        }
    }

    .lightbox__image {
        position: absolute;
        z-index: 1;

        img {
            width: auto;
            height: auto;
            max-height: 80vh;
            max-width: 80vw;
            border-radius: 10px;
        }
    }
}
</style>
 