<template>
    <div class="materials">
        <div class="materials__container">
            <template v-for="card in cards">
                <MaterialCardComponent :card="card" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import MaterialCardComponent from "../components/Materials/MaterialCardComponent.vue";
const cards = [
    {
        title: "Spotlight",
        logo: "/assets/images/spotlight.png",
        files: {
            2: [
                {
                    name: "Alphabet",
                    url: "/assets/materials/spotlight/2/alphabet.pptx",
                },
                {
                    name: "Animals",
                    url: "/assets/materials/spotlight/2/animals.pdf",
                },
                {
                    name: "Animals Crossword",
                    url: "/assets/materials/spotlight/2/animals_crossword.pdf",
                },
                {
                    name: "Clothers And Weather Word Search",
                    url: "/assets/materials/spotlight/2/clothers_and_weather_word_search.pdf",
                },
                {
                    name: "part1 2a",
                    url: "/assets/materials/spotlight/2/part1_2a.pptx",
                },
                {
                    name: "To Be",
                    url: "/assets/materials/spotlight/2/to_be.pptx",
                },
            ],
            3: [
                {
                    name: "Cards Present Simple-Continuous",
                    url: "/assets/materials/spotlight/3/cards_present_simple-continuous.pdf",
                },
                {
                    name: "Have Has Got",
                    url: "/assets/materials/spotlight/3/have_has_got.pptx",
                },
                {
                    name: "Present Simple",
                    url: "/assets/materials/spotlight/3/present_simple.pptx",
                },
                {
                    name: "Some Any",
                    url: "/assets/materials/spotlight/3/some_any.pptx",
                },
                {
                    name: "There Is There Are",
                    url: "/assets/materials/spotlight/3/there_is_there_are.pptx",
                },
                {
                    name: "There Is Are",
                    url: "/assets/materials/spotlight/3/there_is-are.jpg",
                },
                {
                    name: "Tic-Tac-Toe (Some Any)",
                    url: "/assets/materials/spotlight/3/tic-tac-toe_(some_any).pptx",
                },
            ],
            4: [
                {
                    name: "Must",
                    url: "/assets/materials/spotlight/4/must.pptx",
                },
                {
                    name: "Occupations (презентация)",
                    url: "/assets/materials/spotlight/4/occupations.pptx",
                },
                {
                    name: "Occupations (печатный материал)",
                    url: "/assets/materials/spotlight/4/occupations.docx",
                },
                {
                    name: "Say The Time",
                    url: "/assets/materials/spotlight/4/say_the_time.pptx",
                },
            ],
        },
        style: { backgroundColor: "#FF7600" },
    },
    {
        title: "Library",
        logo: "/assets/images/library.png",
        parts: [],
        files: {
            1: [
                {
                    name: "Коммуникативный метод обучения иноязычному говорению",
                    url: "/assets/materials/library/Kommunikativnyi_metod_obucheniia_inoiazychnomu_gov.pdf",
                    author: "Е.И.Пассов",
                },
                {
                    name: "Children Learning English",
                    url: "/assets/materials/library/Children_learning_english.pdf",
                    author: "Jayne Moon",
                },
                {
                    name: "Elementary Communication Games",
                    url: "/assets/materials/library/Elementary_communication_games.pdf",
                    author: "Jill Hadfield",
                },
                {
                    name: "Elementary Grammar Games",
                    url: "/assets/materials/library/Elementary_grammar_games.pdf",
                    author: "Jill Hadfield",
                },
                {
                    name: "Games For Grammar Practice",
                    url: "/assets/materials/library/Games_for_grammar_practice.pdf",
                    author: "Maria Lucia Zaorob and Elizabeth Chin",
                },
                {
                    name: "How To Teach Grammar",
                    url: "/assets/materials/library/How_to_teach_grammar.pdf",
                    author: "Scott Thornbury",
                },
            ],
        },
        style: { backgroundColor: "#477768" },
    },
    {
        title: "Grammar Games",
        logo: "/assets/images/grammar_games.jpg",
        parts: [],
        files: {
            1: [
                {
                    name: "Грамматические игры на уроках английского языка в начальной школе",
                    url: "/assets/materials/grammar_games/practice_book_trial.pdf",
                    author: "А.С.Ожеред",
                },
                {
                    name: "Приложение",
                    url: "/assets/materials/grammar_games/application.pdf",
                    author: "А.С.Ожеред",
                },
            ],
        },
        style: { backgroundColor: "#5C4777" },
    },
];
</script>

<style scoped lang="scss">
.materials {
    position: relative;
    height: calc(100vh - 52px);
    background-color: #fff;
    padding: 3rem 1rem;
    z-index: 0;

    .materials__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1000px;
        margin: auto;
        height: 100%;
    }
}

@media (min-width: 601px) {
    .materials {
        height: calc(100vh - 72px);
    }
}

@media (max-height: 580px) and (min-width: 810px) {
    .materials {
        .materials__container {
            margin-top: 3rem;
        }
    }
}

@media (max-height: 470px) and (min-width: 810px) {
    .materials {
        .materials__container {
            margin-top: 7rem;
        }
    }
}

@media (max-height: 340px) and (min-width: 810px) {
    .materials {
        .materials__container {
            margin-top: 10rem;
        }
    }
}

@media (max-width: 810px) {
    .materials {
        .materials__container {
            flex-wrap: wrap;
            margin-top: 7rem;
        }
    }
}
</style>
