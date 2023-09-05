<template>
    <div class="material-card" :class="{ offBoxShadow: isCardOpen }">
        <div class="material-card__wrapper" :class="{ hideCard: isCardOpen }" @click="openCard()"
            :style="{ backgroundColor: props.card?.style.backgroundColor }">
            <div class="material-card__logo"> <img :src="props.card?.logo" alt=""> </div>
        </div>
        <div class="material-card__sheet">
            <div class="material-card__sheet-header">
                <img class="material-card__sheet-img" src="/assets/images/material-book.svg" alt="">
                <p class="material-card__sheet-title">{{ props.card?.title }}</p>
            </div>
            <template v-for="(parts, __, index) of props.card?.files">
                <ul class="material-card__files" v-if="index == isPartSelected">
                    <template v-for="file in parts">
                        <li class="material-card__file">
                            <a class="material-card__file-link" :href="`${file.url}`" download>
                                <span class="material-card__file-name">{{ file.name }}</span>
                                <span v-if="file.author" class="material-card__file-author"> ({{ file.author }})</span>
                            </a>
                        </li>
                    </template>
                </ul>
            </template>
            <div class="material-card__parts">
                <template v-for="(__, key, index) in props.card?.files">
                    <div class="material-card__part" v-if="Object.keys(props.card?.files).length > 1"
                        @click="selectPart(index)">
                        <button> {{ key }}</button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    card: { type: Object, require: true }
});

const isCardOpen = ref(false);
const isPartSelected = ref(0);

function openCard() {
    isCardOpen.value = !isCardOpen.value;
}

function selectPart(index) {
    isPartSelected.value = index;
}

</script>

<style scoped lang="scss">
.material-card {
    position: relative;
    flex: 0 0 30%;
    height: 50%;
    min-height: 290px;
    box-shadow: 15px -6px 5px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    -webkit-transition: 0.3s ease;
    -moz-transition: 0.3s ease;
    -o-transition: 0.3s ease;
    transition: 0.3s ease;


    &:hover {
        box-shadow: none;
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
    }

    &:hover>.material-card__sheet {
        box-shadow: none;
    }

    .material-card__wrapper {
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        height: 100%;
        background-color: black;
        z-index: 1;
        border-radius: 20px;
        box-shadow: 0px -2px 3px rgba(0, 0, 0, 0.25);
        transition: all 0.3s ease;
        cursor: pointer;

        &::after {
            content: '';
            position: absolute;
            margin-left: auto;
            margin-right: auto;
            top: -3rem;
            left: 0;
            right: 0;
            background-color: #F2F2F2;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            box-shadow: inset 0px -5px 0px rgba(0, 0, 0, 0.25);
            z-index: 1;
        }

        .material-card__logo {
            padding: 1rem;
            margin: auto;

            img {
                border-radius: 10px;
            }
        }
    }

    .hideCard {
        animation: hide 0.5s ease forwards;
    }

    @keyframes hide {
        0% {
            top: 0;
        }

        50% {
            opacity: 0.5;
        }

        75% {
            opacity: 0;
        }

        100% {
            top: 10vh;
            opacity: 0;
            display: none;
        }
    }

    .material-card__sheet {
        display: flex;
        flex-direction: column;
        position: absolute;
        box-sizing: content-box;
        width: 90%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        top: 0;
        left: 0;
        right: 0;
        background-color: #F2F2F2;
        padding-top: 6rem;
        margin-top: -6rem;
        box-shadow: 14px -2px 9px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        transition: all 0.3s ease;

        .material-card__sheet-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            z-index: 2;

            img {
                margin: auto;
            }

            p {
                text-align: center;
            }
        }

        .material-card__files {
            padding: 1rem;
            list-style: square;
            list-style-position: inside;
            overflow: auto;

            .material-card__file {
                padding: 0.2rem 0.4rem;
                border-radius: 5px;

                .material-card__file-author {
                    color: $accent-primary;
                }

                &:hover {
                    background-color: $bg-grey;
                    color: #fff;
                }
            }
        }
    }

    .material-card__parts {
        display: flex;
        justify-content: space-around;
        margin-top: auto;
        padding: 1rem;
    }
}

.offBoxShadow {
    box-shadow: none;
}

@media (max-width: 810px) {
    .material-card {
        flex: 0 0 48%;
        margin-bottom: 7rem;
    }
}

@media (max-width: 520px) {
    .material-card {
        flex: 0 0 100%;
    }
}
</style>
