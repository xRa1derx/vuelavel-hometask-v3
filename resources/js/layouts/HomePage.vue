<template>
    <div class="wrapper">
        <TheHeader />
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
                                class="teacher__circle"
                                src="/assets/images/teacher-bg.jpg"
                                alt=""
                            />
                            <img
                                class="teacher__img"
                                src="/assets/images/teacher.png"
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
                    <button class="mail-btn">
                        <img
                            class="mail-img"
                            src="/assets/images/mail2.svg"
                            alt=""
                        />
                    </button>
                    <div class="social-link">
                        <a target="_blank" href="https://vk.com/alyonamilka"
                            ><img
                                class="vk-image"
                                src="/assets/images/vk.png"
                                alt=""
                        /></a>
                    </div>
                    <button class="telegram-btn">
                        <img
                            class="telegram-img"
                            src="/assets/images/telegram.svg"
                            alt=""
                        />
                    </button>
                </div>
            </section>
        </main>
        <AbouteMePage />
    </div>
</template>

<script setup lang="ts">
import TheHeader from "../components/TheHeader.vue";
import AbouteMePage from "../layouts/AboutMePage.vue";
</script>

<style scoped lang="scss">
.wrapper {
    background-color: $bg-dark;
    main {
        padding: 1rem;
        .greetings-page {
            .greetings-page__about {
                line-height: 1;
                display: table;
                margin: 5rem auto 0 auto;
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
                    max-width: 14rem;
                    margin: 0 auto;
                    .teacher__container {
                        position: relative;
                        height: 310px;
                        display: grid;
                        align-items: end;
                        border-radius: 0 0 100vw 100vw;
                        overflow: hidden;
                        .teacher__circle {
                            position: absolute;
                            object-fit: cover;
                            width: 100%;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: 0 auto;
                            border-radius: 50%;
                        }

                        .teacher__img {
                            position: relative;
                            transform: scale(1.15);
                            bottom: 10px;
                        }
                    }

                    .teacher__container::before {
                        content: "";
                        width: 50px;
                        height: 50px;
                        background-color: $muted;
                        border-radius: 50%;
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
                gap: 1rem;
                .mail-btn {
                    width: 30px;
                    height: 30px;
                    padding: 5px;
                    border-radius: 50%;
                    border: none;
                    .mail-img {
                        height: 100%;
                    }
                }
                .social-link {
                    .vk-image {
                        width: 30px;
                        height: 100%;
                    }
                }
                .telegram-btn {
                    width: 30px;
                    height: 30px;
                    background-color: transparent;
                    padding: 0;
                    border: none;
                    .telegram-img {
                        height: 100%;
                    }
                }
            }
        }
    }
}

.wrapper {
    main {
        @media (min-width: 601px) {
            .greetings-page {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                margin-bottom: 5rem;
                .greetings-page__about {
                    grid-row: 1;
                    grid-column: 1/2;
                    margin: 0;
                    align-self: center;
                    margin-bottom: 7rem;
                    text-align: center;
                    justify-self: center;
                    .greetings-page__first-word {
                        letter-spacing: 2px;
                        font-size: 30px;
                        color: #fff;
                        margin-right: 11rem;
                        margin-left: 0;
                    }
                    .greetings-page__second-word::after {
                        content: "";
                        width: 0;
                        height: 0;
                    }
                    .greetings-page__third-word {
                        letter-spacing: 2px;
                        font-size: 30px;
                        color: #fff;
                        float: none;
                        margin-left: 8rem;
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
                    margin: 0 1rem;
                    margin-bottom: -10rem;
                    justify-self: center;
                }
                .greetings-page__buttons {
                    grid-row: 2;
                    grid-column: 1 / 2;
                    justify-content: center;
                }
            }
        }
    }
}
</style>
