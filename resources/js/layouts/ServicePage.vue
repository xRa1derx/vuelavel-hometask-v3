<template>
    <div class="service">
        <div class="service__courses">
            <div class="service__course" :class="`service__${course.class}`" v-for="(course, index) in courses" :key="index"
                @click="showCourse()">
                <div class="service__course-title" :class="`service__${course.class}`">
                    <p>{{ course.title }}</p>
                </div>
                <div :class="`service__${course.class}-description`" class="service__course-description">
                    <div class="service__course-description-title" :class="`service__${course.class}-description-title`">
                        {{ course.about }}
                    </div>
                </div>
                <div :class="`service__${course.class}-cost`" class='service__course-cost'>
                    <p>от 800р</p>
                    <p>50 мин</p>
                </div>
            </div>
        </div>
        <!-- <div class="service__goal service__course">
                <div class="service__goal-title service__course-title">
                    <p>The Goal</p>
                </div>
                <div class="service__goal-description">
                    <div
                        class="service__goal-description-title service__course-description-title"
                    >
                        Подготовка к экзаменам
                    </div>
                    <div
                        class="service__goal-description-body service__course-description-body"
                    >
                        <ul>
                            <li>ВПР</li>
                            <li>ОГЭ</li>
                            <li>ЕГЭ</li>
                            <li>
                                Cambridge <br />
                                exams
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="service__goal-cost service__course-cost">
                    <p>от 800р</p>
                    <p>50 мин</p>
                </div>
                <div
                    class="service__goal-packet-cost service__course-packet-cost"
                >
                    <p>от 3500 р</p>
                    <p>5 занятий</p>
                </div>
            </div>
            <div class="service__speak-up service__course">
                <div class="service__speak-up-title service__course-title">
                    Speak Up
                </div>
                <div class="service__speak-up-description">
                    <div
                        class="service__speak-up-description-title service__course-description-title"
                    >
                        Английский для дошкольников
                    </div>
                    <div
                        class="service__speak-up-description-body service__course-description-body"
                    >
                        Учимся говорить <span>грамотно</span>
                    </div>
                </div>
                <div class="service__speak-up-cost service__course-cost">
                    <p>800р</p>
                    <p>50 мин</p>
                </div>
                <div
                    class="service__speak-up-packet-cost service__course-packet-cost"
                >
                    <p>3500 р</p>
                    <p>5 занятий</p>
                </div>
            </div>
            <div class="service__helping-hand service__course">
                <div class="service__hepling-hand-title service__course-title">
                    Helping Hand
                </div>
                <div class="service__helping-hand-description">
                    <div
                        class="service__helping-hand-description-title service__course-description-title"
                    >
                        Английский для школьников
                    </div>
                    <div
                        class="service__helping-hand-description-body service__course-description-body"
                    >
                        Устраняем пробелы по <span>школьной</span> программе
                    </div>
                </div>
                <div class="service__helping-hand-cost service__course-cost">
                    <p>900р</p>
                    <p>50 мин</p>
                </div>
                <div
                    class="service__helping-hand-packet-cost service__course-packet-cost"
                >
                    <p>4000 р</p>
                    <p>5 занятий</p>
                </div>
            </div>
            <div class="service__got-it service__course">
                <div class="service__got-it-title service__course-title">
                    Got It
                </div>
                <div class="service__got-it-description">
                    <div
                        class="service__got-it-description-title service__course-description-title"
                    >
                        Английский для взрослых
                    </div>
                    <div
                        class="service__got-it-description-body service__course-description-body"
                    >
                        Изучаем язык как <span>хобби</span> <br />
                        Для <span>путешествий</span> <br />
                        Для жизни в<span>другой стране</span>
                    </div>
                </div>
                <div class="service__got-it-cost service__course-cost">
                    <p>1000р</p>
                    <p>50 мин</p>
                </div>
                <div
                    class="service__got-it-packet-cost service__course-packet-cost"
                >
                    <p>4500 р</p>
                    <p>5 занятий</p>
                </div>
            </div>
            <div class="service__business service__course">
                <div class="service__business-title service__course-title">
                    Business English
                </div>
                <div class="service__business-description">
                    <div
                        class="service__business-description-title service__course-description-title"
                    >
                        Деловое общение
                    </div>
                    <div
                        class="service__business-description-body service__course-description-body"
                    >
                        <span>Elementary</span><br />
                        <span>Pre-Intermediate</span><br />
                        <span>Intermediate</span>
                    </div>
                </div>
                <div class="service__business-cost service__course-cost">
                    <p>1500р</p>
                    <p>50 мин</p>
                </div>
                <div
                    class="service__business-packet-cost service__course-packet-cost"
                >
                    <p>6500 р</p>
                    <p>5 занятий</p>
                </div>
            </div> -->
            <BaseModal v-if="isCourseShowing" @closeModal="showCourse()">
                <template #header>
                    <div class="service__goal-title service__course-title">
                        <p>The Goal</p>
                    </div>
                </template>
                <template #body></template>
                <template #footer></template>
            </BaseModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseModal from '../components/BaseModal.vue';
const courses = ref([
    {
        title: "The Goal",
        about: "Подготовка к экзаменам",
        description: ["ВПР", "ОГЭ", "ЕГЭ", "Cambridge exams"],
        price: "800 р",
        time: "50 мин",
        packetPrice: "3500 р",
        packetTime: "5 занятий",
        class: 'goal'
    },
    {
        title: "Speak Up",
        about: "Английский для дошкольников",
        descriptiom: "Учимся говорить грамотно",
        price: "800 р",
        time: "50 мин",
        packetPrice: "3500 р",
        packetTime: "5 занятий",
        class: 'speak-up'
    },
    {
        title: "Helping Hand",
        about: "Английский для школьников",
        descriptiom: "Устраняем пробелы по школьной программе",
        price: "900 р",
        time: "50 мин",
        packetPrice: "4000 р",
        packetTime: "5 занятий",
        class: 'helping-hand'
    },
    {
        title: "Got It",
        about: "Английский для взрослых",
        descriptiom:
            "Изучаем язык как хобби Для путешествий Для жизни вдругой стране",
        price: "1000 р",
        time: "50 мин",
        packetPrice: "4500 р",
        packetTime: "5 занятий",
        class: 'got-it'
    },
    {
        title: "Business English",
        about: "Деловой английский",
        descriptiom: "Elementary Pre-Intermediate Intermediate",
        price: "1500 р",
        time: "50 мин",
        packetPrice: "6500 р",
        packetTime: "5 занятий",
        class: 'business'
    },
]);
const isCourseShowing = ref(false);
function showCourse() {
    isCourseShowing.value = !isCourseShowing.value;
    // event.target.firstElementChild.classList.toggle("hide");
    // event.target.children[1].firstChild.classList.toggle("hide");
    // event.target.children[1].lastChild.classList.toggle("show");
    // event.target.children[1].classList.toggle("margin0");
    // event.target.lastChild.classList.toggle("show");
    console.dir(event.target);
}
</script>

<style lang="scss" scoped>
.service {
    color: #fff;

    .service__courses {
        display: flex;
        max-width: 1000px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: self-end;
        margin: 3rem auto;
        color: $muted;
        pointer-events: none;

        .service__course {
            position: relative;
            width: 140px;
            min-height: 225px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
            border-radius: 20px;
            margin: 0 1rem 3rem 1rem;
            transition: transform 0.15s ease-in;
            background-color: $bg-grey;
            pointer-events: all;
            cursor: pointer;

            .service__course-title {
                color: #fff;
                padding: 1rem;
                font-size: 24px;
            }

            .service__course-description-title {
                padding: 0 1rem;
            }

            & div {
                pointer-events: none;
            }

            .service__course-description {
                margin-top: auto;
            }

            .service__course-cost {
                padding-bottom: 1rem;
            }

            .service__course-cost p:first-child {
                font-size: 24px;
                color: $accent-primary;
            }

            .service__course-cost p:last-child {
                color: #fff;
            }
        }

        .service__course:hover {
            transform: scale(1.02);
        }

        .service__course::before {
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            border-width: 0px;
            border-style: solid;
            border-color: $bg-dark $bg-dark #fff #fff;
            transition: 0.2s ease-in;
            opacity: 0;
            transform: scale(1.02);
        }

        .service__course:hover::before {
            border-width: 15px;
            border-bottom-left-radius: 5px;
            opacity: 1;
            box-shadow: 0 5px 4px -4px #112429;
        }
    }
}

@media (min-width: 400px) {
    .service {

        .service__courses {

            .service__course {
                width: 168px;

                .service__course-title {
                    font-size: 30px;
                }

                .service__course-cost p:first-child {
                    font-size: 30px;
                }
            }
        }
    }
}

@media (min-width: 800px) {
    .service {
        .service__courses {
            .service__course {
                margin: 0 2rem 3rem 2rem;
            }
        }
    }
}

@media (min-width: 927px) {
    .service {
        .service__courses {
            .service__course {
                margin: 0 2.6rem 3rem 2.6rem;
            }
        }
    }
}

@media (min-width: 1000px) {
    .service {
        .service__courses {
            .service__course {
                margin: 0 1rem 3rem 1rem;
            }
        }
    }
}
</style>
