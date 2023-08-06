<template>
    <div class="service">
        <div class="service__courses">
            <CourseComponent v-for="(course, index) in courses" :key="index" :course="course" @click="showCourse(course)" />

            <teleport to="body">
                <div class="show-course">
                    <transition name="opacity">
                        <BaseModal v-if="isCourseShowing" @closeModal="showCourse()" :cssStyle="cssStyle">
                            <template #header>
                                <div class="service__course-title" :class="`service__${oneCourseInfo['class']}-title`">
                                    <p>{{ oneCourseInfo['title'] }}</p>
                                </div>
                                <div class="closeModal" @click="showCourse()"></div>
                            </template>
                            <template #body>
                                <div :class="`service__${oneCourseInfo['class']}-description`" class="service__description">
                                    <div :class="`service__${oneCourseInfo['class']}-description-title `"
                                        class="service__course-description-title">
                                        <p>{{ oneCourseInfo['about'] }}</p>
                                    </div>
                                    <div :class="`service__${oneCourseInfo['class']}-description-body `"
                                        class="service__course-description-body">
                                        <template v-for="description of oneCourseInfo['description']">
                                            <div v-html="description"
                                                :class="`service__${oneCourseInfo['class']}-description-body-text`">
                                            </div>
                                        </template>
                                    </div>
                                    <div class="service__cost">
                                        <div :class="`service__${oneCourseInfo['class']}-cost`"
                                            class="service__course-cost">
                                            <p>{{ oneCourseInfo['price'] }}</p>
                                            <p>{{ oneCourseInfo['time'] }}</p>
                                        </div>
                                        <div :class="`service__${oneCourseInfo['class']}-packet-cost`"
                                            class="service__course-packet-cost">
                                            <p>{{ oneCourseInfo['packetPrice'] }}</p>
                                            <p>{{ oneCourseInfo['packetTime'] }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #footer></template>
                        </BaseModal>
                    </transition>
                </div>
            </teleport>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CourseComponent from '../components/CourseComponent.vue';
import BaseModal from '../components/BaseModal.vue';
const cssStyle = ref({
    width: '500px'
});
const courses = ref([
    {
        title: "The Goal",
        about: "Подготовка к экзаменам",
        description: ["Готовлю к любому виду школьной аттестация (ВПР, ОГЭ, ЕГЭ), экзаменам (YLE, KET, PET, FCE). На первом занятии делаем имитацию экзамена. Уже после первого занятия более точно определим ваш уровень и что необходимо делать для достижения желаемого балла - насколько нужно подтянуть грамматику и лексику и сколько времени это займет. На последующих уроках обязательно разбираем структуру экзамена, систему оценок. На каждое занятие предоставляю индивидуально скомпанованный материал. На уроке использую свою методику и наработки, которые помогли уже многим ученикам достичь своей цели!"],
        price: "от 800 р",
        time: "50 мин",
        packetPrice: "3500 р",
        packetTime: "5 занятий",
        class: 'goal'
    },
    {
        title: "Speak Up",
        about: "Английский для дошкольников",
        // description: ["Учимся говорить грамотно"],
        description: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur veritatis inventore voluptatibus nam minus facere ex sed. Doloribus at minus consequuntur nobis laudantium, odio, tempora pariatur recusandae fugiat consectetur quibusdam."],
        price: "800 р",
        time: "50 мин",
        packetPrice: "3500 р",
        packetTime: "5 занятий",
        class: 'speak-up'
    },
    {
        title: "Helping Hand",
        about: "Английский для школьников",
        description: ["Устраняем пробелы по школьной программе"],
        price: "900 р",
        time: "50 мин",
        packetPrice: "4000 р",
        packetTime: "5 занятий",
        class: 'helping-hand'
    },
    {
        title: "Got It",
        about: "Английский для взрослых",
        description:
            ["Изучаем язык как <span>хобби</span>", "Для <span>путешествий</span>", "Для <span>жизни вдругой стране</span>"],
        price: "1000 р",
        time: "50 мин",
        packetPrice: "4500 р",
        packetTime: "5 занятий",
        class: 'got-it'
    },
    {
        title: "Business English",
        about: "Деловой английский",
        description: ["Elementary", "Pre-Intermediate", "Intermediate"],
        price: "1500 р",
        time: "50 мин",
        packetPrice: "6500 р",
        packetTime: "5 занятий",
        class: 'business'
    },
]);
const oneCourseInfo = ref({})
const isCourseShowing = ref(false);
function showCourse(course = {}) {
    isCourseShowing.value = !isCourseShowing.value;
    oneCourseInfo.value = course;
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
    }
}

.show-course {
    color: #fff;

    .service__course-title {
        font-size: 30px;
        margin-right: 1rem;
    }

    .service__description {
        .service__course-description-title {
            padding-bottom: 1rem;

        }

        .service__course-description-body {
            padding-bottom: 1rem;
            color: $muted;
        }

        .service__cost {
            display: flex;
            justify-content: space-between;

            .service__course-cost {
                & p:nth-child(1) {
                    color: $accent-primary;
                }
            }

            .service__course-packet-cost {
                & p:nth-child(1) {
                    color: $attention;
                }
            }
        }

    }

    .service__got-it-description-body-text {
        &:nth-child(1):deep(span) {
            color: #fff
        }

        &:nth-child(2):deep(span) {
            color: $accent-primary;
        }

        &:nth-child(3):deep(span) {
            color: $attention;
        }
    }
}
</style>
