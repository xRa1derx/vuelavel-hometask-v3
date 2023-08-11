<template>
    <div class="wrapper">
        <main>
            <section class="greetings-page">
                <div class="greetings-page__about">
                    <span class="greetings-page__first-word"> твой </span>
                    <br />
                    <span class="greetings-page__second-word">
                        Английский
                    </span>
                    <br />
                    <span class="greetings-page__third-word"> здесь </span>
                </div>
                <div class="greetings-page__primary-image">
                    <div class="teacher">
                        <div class="teacher__container">
                            <img
                                v-lazyload
                                data-src="/assets/images/teacher.png"
                                src="/assets/images/teacher_backplate.svg"
                                class="teacher__img --fade"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <p class="greetings-page__text">
                    Привет, меня зовут Алёна, <br />
                    я преподаю английский язык более 15-ти лет.
                </p>
                <div class="greetings-page__buttons">
                    <div class="phone-link" @click="sendEmailOpen()">
                        <button class="phone-link__button">
                            <img
                                class="phone-img"
                                src="/assets/images/phone.svg"
                                alt=""
                            />
                        </button>
                    </div>
                    <div class="telegram-link">
                        <a href="https://t.me/AlyonaOzhered" target="_blank"
                            ><img
                                class="telegram-img"
                                src="/assets/images/telegram.svg"
                                alt=""
                        /></a>
                    </div>
                </div>
            </section>
            <AbouteMePage />
            <ServicePage />
        </main>
        <transition name="opacity">
            <SendMailComponent
                v-if="isEmailOpen"
                @closeModal="sendEmailOpen()"
            />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AbouteMePage from "../layouts/AboutMePage.vue";
import ServicePage from "../layouts/ServicePage.vue";
import SendMailComponent from "../components/SendMailComponent.vue";
import { vLazyload } from "../directives/lazyload";

const isEmailOpen = ref<boolean>(false);
function sendEmailOpen() {
    isEmailOpen.value = !isEmailOpen.value;
}
</script>
<style scoped lang="scss">
.wrapper {
    main {
        .greetings-page {
            padding: 1rem;
            max-width: 1000px;
            margin: auto;

            .greetings-page__about {
                line-height: 1;
                display: table;
                margin: 5rem auto 3rem auto;

                .greetings-page__first-word {
                    letter-spacing: 2px;
                    font-size: 30px;
                    margin-left: -1rem;
                    color: #fff;
                }

                .greetings-page__second-word {
                    position: relative;
                    color: #ff7600;
                    font-size: 38px;
                    text-align: center;
                    margin: 0.3rem 0;
                    font-weight: 700;
                }

                .greetings-page__second-word::after {
                    content: "";
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background-color: #fff;
                    border-radius: 50%;
                    right: 3rem;
                    top: -4rem;
                }

                .greetings-page__third-word {
                    letter-spacing: 2px;
                    font-size: 30px;
                    color: #fff;
                    float: right;
                }
            }

            .greetings-page__primary-image {
                margin-bottom: 3rem;

                .teacher {
                    position: relative;
                    width: 60%;
                    margin: auto;
                    .teacher__container::before {
                        content: "";
                        position: absolute;
                        width: 50px;
                        height: 50px;
                        background-color: $muted;
                        border-radius: 50%;
                        top: -1rem;
                        left: -1rem;
                    }
                }
            }

            .greetings-page__text {
                text-align: center;
                margin-top: -2rem;
                margin-bottom: 3rem;
                color: #b9b9b9;
                line-height: 17px;
            }

            .greetings-page__buttons {
                height: 30px;
                position: relative;
                display: flex;

                div {
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                }

                .phone-link {
                    border-radius: 50%;
                    margin-right: 1rem;

                    .phone-link__button {
                        cursor: pointer;
                        border: none;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }

                    .phone-link__button:hover {
                        background-color: $muted;
                    }

                    .phone-img {
                        height: 100%;
                    }
                }

                .telegram-link {
                    background-color: transparent;
                    padding: 0;
                    border: none;
                    border-radius: 50%;

                    .telegram-img {
                        height: 100%;
                    }
                }

                .telegram-link:hover {
                    background-color: #3390ec;
                }
            }
        }
    }
}

@media (min-width: 601px) {
    .wrapper {
        main {
            .greetings-page {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                margin-bottom: 10rem;
                margin-top: 5rem;

                .greetings-page__about {
                    grid-row: 1;
                    grid-column: 1/2;
                    margin: 0;
                    align-self: center;
                    margin-bottom: 7rem;
                    text-align: center;
                    justify-self: start;

                    .greetings-page__first-word {
                        letter-spacing: 2px;
                        font-size: 34px;
                        color: #fff;
                        margin-right: 11.5rem;
                    }

                    .greetings-page__second-word {
                        position: relative;
                        font-size: 42px;
                        margin-left: 1.5rem;
                    }

                    .greetings-page__second-word::after {
                        content: "";
                        width: 0;
                        height: 0;
                    }

                    .greetings-page__third-word {
                        position: relative;
                        letter-spacing: 2px;
                        font-size: 34px;
                        color: #fff;
                        float: none;
                        margin-left: 11.5rem;
                    }

                    .greetings-page__third-word::after {
                        content: "";
                        position: absolute;
                        width: 300px;
                        height: 1px;
                        background: rgb(255, 255, 255);
                        background: linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 1) 0%,
                            rgba(255, 118, 0, 1) 65%
                        );
                        bottom: -0.5rem;
                        left: 0;
                    }
                }

                .greetings-page__primary-image {
                    grid-row: 1;
                    grid-column: 2 /3;

                    .teacher {
                        .teacher__container::before {
                            width: 0;
                            height: 0;
                        }
                    }

                    .teacher::before {
                        position: absolute;
                        content: "";
                        width: 50px;
                        height: 50px;
                        background-color: $muted;
                        border-radius: 50%;
                        bottom: 0rem;
                        right: -3rem;
                    }

                    .teacher::after {
                        content: "";
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background-color: #fff;
                        border-radius: 50%;
                        right: 1rem;
                    }
                }

                .greetings-page__text {
                    grid-row: 1;
                    grid-column: 1/2;
                    align-self: center;
                    text-align: left;
                    margin-bottom: -10rem;
                    justify-self: start;
                }

                .greetings-page__buttons {
                    grid-row: 2;
                    grid-column: 1 / 2;
                    justify-content: start;
                }

                .greetings-page__buttons::before {
                    content: "";
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background-color: $bg-dark;
                    bottom: -225px;
                    right: 10px;
                    border-radius: 50%;
                }

                .greetings-page__buttons::after {
                    content: "";
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    background-color: #fff;
                    bottom: -255px;
                    right: 110px;
                    border-radius: 50%;
                }
            }
        }
    }
}

@media (min-width: 800px) {
    .wrapper {
        main {
            .greetings-page {
                .greetings-page__about {
                    .greetings-page__first-word {
                        font-size: 38px;
                    }

                    .greetings-page__second-word {
                        font-size: 46px;
                    }

                    .greetings-page__third-word {
                        font-size: 38px;
                    }

                    .greetings-page__third-word::after {
                        width: 450px;
                    }
                }
            }
        }
    }
}

@media (min-width: 1000px) {
    .wrapper {
        main {
            .greetings-page {
                .greetings-page__about {
                    .greetings-page__first-word {
                        font-size: 42px;
                    }

                    .greetings-page__second-word {
                        font-size: 50px;
                    }

                    .greetings-page__third-word {
                        font-size: 42px;
                    }
                }

                .greetings-page__primary-image {
                    .teacher::before {
                        width: 70px;
                        height: 70px;
                        bottom: 0;
                        right: -4rem;
                    }

                    .teacher::after {
                        width: 40px;
                        height: 40px;
                        right: 1rem;
                        bottom: -2rem;
                    }
                }
            }
        }
    }
}
</style>
