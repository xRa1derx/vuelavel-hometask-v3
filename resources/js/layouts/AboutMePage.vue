<template>
    <div class="about-me">
        <div class="about-me__container">

            <div class="first-col-skills">
                <div class="skills__card1">
                    <p>Мои ученики сдают международные экзамены: <br>
                        <span>YLE</span>, <span>KET</span>, <span>PET</span>, <span>FCE</span>
                    </p>
                </div>
                <div class="skills__card2">
                    <p>Имею опыт преподавания ученикам из других стран, детям с <span>ОВЗ</span> (дети с нарушением зрения).
                    </p>
                </div>
                <div class="skills__card3">
                    <!-- <p>Имею опыт преподавания по УМК: <span>Millie</span>, <span>Spotlight</span>, <span>Stars</span>,
                        <span>Family and Friends</span>, <span>Solution</span>, <span>New English</span>
                        <span>File</span>, <span>Intelligent Business</span>, <span>Business Result</span>.
                    </p> -->
                    <p>В обучении применяю интерактивную доску <a target="_blank"
                            href="https://miro.com/online-whiteboard/"><span>Miro</span></a>. Для
                        общения вне уроков, использую личный мессенджер.</p>
                </div>
            </div>
            <div class="second-col-skills">
                <div class="skills__card4">
                    <p>Успешно проходят
                        школьную аттестацию:
                        <span>ВПР</span>, <span>ОГЭ</span>, <span>ЕГЭ</span>
                    </p>
                </div>
                <div class="skills__card5">
                    <p>Веду индивидуальные и групповые занятия через <br> <span>Skype, Discord, Zoom</span></p>

                </div>
                <div class="skills__card6">
                    <p>Имею <span>три</span> высших образования, два из них - коррекционных, с отличием. Найду подход к
                        <span>любому</span> ребенку.
                    </p>
                </div>
            </div>
            <div class="certificate">
                <img src="/assets/images/certificate_01.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.about-me {
    width: 100%;
    background-color: #fff;

    .about-me__container {
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding: 3rem 1rem;
        text-align: center;
        overflow-x: auto;

        .certificate {
            flex: 0 0 90%;
            width: 355px;
            box-shadow: -11px 20px 18px 0px rgba(0, 0, 0, 0.25);
            border-radius: 20px;
            margin-left: 1rem;

            img {
                border-radius: 20px;
            }
        }

        .first-col-skills {
            display: flex;

            flex-direction: column;
            align-items: flex-end;
            margin-right: 1rem;

            .skills__card1 {
                width: 250px;
                height: 81px;
                margin-bottom: 20px;
            }

            .skills__card2 {
                width: 250px;
                height: 112px;
                margin-bottom: 20px;
            }

            .skills__card3 {
                width: 250px;
                height: 144px;
            }

            &>div {
                display: flex;
                border-radius: 20px;
                background-color: #242424;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

                p {
                    align-self: center;
                    color: #B9B9B9;
                    padding: 13px 20px;

                    span {
                        color: #FF7600;
                    }

                }
            }
        }

        .second-col-skills {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .skills__card4 {
                width: 250px;
                height: 81px;
                margin-bottom: 20px;
            }

            .skills__card5 {
                width: 250px;
                height: 112px;
                margin-bottom: 20px;

                span {
                    color: #fff;
                }
            }

            .skills__card6 {
                width: 250px;
                height: 144px;
            }

            &>div {
                display: flex;
                border-radius: 20px;
                background-color: #242424;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

                p {
                    align-self: center;
                    color: #B9B9B9;
                    padding: 13px 20px;

                    span {
                        color: #FF7600;
                    }
                }

                .skill-image {
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                }
            }
        }


    }
}

@media (min-width: 601px) {
    .about-me {
        .about-me__container {
            margin: 0 auto;
            padding: 8rem 1rem;

            .certificate {
                max-width: 355px;
            }
        }
    }
}

@media (min-width: 920px) {
    .about-me {
        .about-me__container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 10rem 1rem;

            .certificate {
                width: 100%;
            }

            .first-col-skills {
                width: 100%;
                height: 100%;

                .skills__card1 {
                    width: 260px;
                }

                .skills__card2 {
                    width: 260px;
                }

                .skills__card3 {
                    width: 260px;
                }
            }

            .second-col-skills {
                width: 100%;
                height: 100%;

                .skills__card4 {
                    width: 260px;
                }

                .skills__card5 {
                    width: 260px;
                }

                .skills__card6 {
                    width: 260px;
                }
            }
        }
    }
}

@media (min-width: 1000px) {
    .about-me {
        .about-me__container {
            .first-col-skills {

                .skills__card1 {
                    width: 290px;
                }

                .skills__card2 {
                    width: 290px;
                }

                .skills__card3 {
                    width: 290px;
                }
            }

            .second-col-skills {

                .skills__card4 {
                    width: 290px;
                }

                .skills__card5 {
                    width: 290px;
                }

                .skills__card6 {
                    width: 290px;
                }
            }
        }
    }
}

// </style>
