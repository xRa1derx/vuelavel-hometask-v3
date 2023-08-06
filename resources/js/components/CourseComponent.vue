<template>
    <div class="service__course" :class="`service__${course.class}`">
        <div class="service__course-title" :class="`service__${course.class}`">
            <p>{{ course.title }}</p>
        </div>
        <div :class="`service__${course.class}-description`" class="service__course-description">
            <div class="service__course-description-title" :class="`service__${course.class}-description-title`">
                {{ course.about }}
            </div>
        </div>
        <div :class="`service__${course.class}-cost`" class='service__course-cost'>
            <p>{{course.price}}</p>
            <p>{{course.time}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    course: { type: Object, required: true },
})
</script>

<style scoped lang="scss">
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

@media (min-width: 400px) {
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

@media (min-width: 800px) {
    .service__course {
        margin: 0 2rem 3rem 2rem;
    }
}

@media (min-width: 927px) {
    .service__course {
        margin: 0 2.6rem 3rem 2.6rem;
    }
}

@media (min-width: 1000px) {
    .service__course {
        margin: 0 1rem 3rem 1rem;
    }
}
</style>
