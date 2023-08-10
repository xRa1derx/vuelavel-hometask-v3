<template>
    <section class="blog blog__container">
        <aside class="blog__sidebar blog__sidebar-container" ref="sidebar">
            <div></div>
        </aside>
        <div class="blog-post">
            <div class="blog__sidebar-open" @click="openSidebar()">
                <img class="blog__sidebar-image" src="/assets/images/sidebar-open.svg" alt="">
            </div>
            <div class="blog-post__container">
                <div class="blog-post__header">
                    <div class="blog-post__title-container">
                        <div class="blog-post__title-text">
                            <h5>POST TITLE</h5>
                        </div>
                        <div class="blog-post__title-date">
                            <p>DATE</p>
                        </div>
                    </div>
                </div>
                <div class="blog-post__body">
                    <div class="blog-post__images-container" ref="imageContainer">
                        <div class="blog-post__image-wrap --last-image">
                            <!-- <img class="blog__image" src="https://unsplash.it/1200/600?image=1026" alt=""> -->
                            <img class="blog-post__image"
                                src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/4vFU/oobTmaLnH/IMG_9360.JPG" alt="">

                        </div>
                        <!-- <img src="https://unsplash.it/301" alt=""> -->
                    </div>
                    <!-- post-content -->
                    <div class="blog-post__content-container blog-post__content-container--hidden">
                        <!-- ql-editor -->
                        <p class="blog-post__content-text" ref="post">
                            Я давно хотела черкнуть пару строк о влиянии физического развития на умственное – может кому и
                            будут
                            интересны мои рассуждения и выводы.

                            Собрав декретные мысли в кулак и вооружившись интернетом, написалось....



                            С самых пеленок, большинство из мам задаются целью вырастить интеллектуально развитого ребенка.
                            Скупаются магазины игрушек, книжные магазины, дома появляется огромные коробки Школы Семи гномов
                            и
                            Умницы, в развивающие центры чуть ли не с рождения…. И список всего, что делают большинство мам
                            для
                            развития умственных способностей ребенка, можно продолжать еще долго. Но с этого ли нужно начать
                            умственное воспитание? Я считаю НЕТ. Это, конечно, всё должно присутствовать в жизни ребенка, но
                            на
                            первом месте – физическое воспитание. И уже оно потянет за собой умственное.



                            В процессе физического воспитания оказывается прямое воздействие на развитие умственных
                            способностей
                            ребенка. Когда малыш ползет, бежит, катится на беговеле или ползет по лестнице возникают
                            познавательные ситуации, связанные с овладением техникой физических упражнений, ее
                            совершенствованием, овладением приемами практических действий и пр. (как выполнить движения
                            экономнее, точнее, выразительнее и т.д.,). В результате занятий физическими упражнениями
                            улучшается
                            мозговое кровообращение, активизируются психические процессы, обеспечивающие восприятие,
                            переработку
                            и воспроизведение информации. Так, имеются многочисленные данные о том, что под влиянием
                            физических
                            упражнений увеличивается объем памяти, повышается устойчивость внимания, ускоряется решение
                            элементарных интеллектуальных задач, убыстряются зрительно-двигательные реакции. Условием
                            эффективной интеллектуальной деятельности является как и тренированный мозг, так и тренированное
                            тело, мускулатуру, помогающую нервной системе справиться с умственными нагрузками. Активность и
                            устойчивость внимания, памяти, переработки информации восприятия, напрямую зависит от уровня
                            физической подготовки организма. Протекание психических процессов (память, внимание, мышление)
                            сильно зависит от физических качеств организма — выносливости, быстроты, силы и др.



                            Существует закономерность: чем больше у ребенка развивается способность управления своим телом,
                            тем
                            быстрее и лучше он усваивает теоретические знания, но чем симметричнее, разнообразнее и точнее
                            движения, тем равномернее развиваются оба полушария головного мозга (левое полушарие отвечает за
                            логику, правое – творчество, синхронная работа полушарий мозга означает большую успешность:
                            мыслительный и познавательный процессы идут более легко и результативно).



                            Первое, что заставляет полушария работать оба полушария в тандеме – ползание. Поэтому ползать –
                            полезнее чем ходить!! И только лыжи могут так же заставить развиваться мозг!!



                            А потом малыш начинает ходить) и происходит глобальный скачок в умственном развитии. И тут
                            главное –
                            не мешать ему развиваться: убрать навсегда коляску, велосипед с ручкой, всевозможные виды
                            транспорта, упрощающие жизнь маме, но не дающие полноценно развиваться ребенку.



                            Умственное и физическое воспитание очень тесно связаны: с одной стороны, физическое воспитание
                            создает благоприятные условия для умственной деятельности и способствует развитию интеллекта. С
                            другой стороны, умственное воспитание создает условия более вдумчивого отношения к физической
                            активности, что существенно повышает эффективность физического воспитания.



                            В более позднем возрасте, наверное лет с 6-7, умственные занятия будут выходить на первый план,
                            а
                            когда малышу год, два, – научится самому спускаться и подниматься по лестнице гораздо полезнее,
                            чем
                            в красную баночку положить красный кружок!
                        </p>
                        <!-- show-more -->
                        <button class="blog-post__content-button">
                            show more
                        </button>
                    </div>
                </div>
                <div class="blog-post__footer">
                    <div class="blog-post__footer-container">
                        <div class="tags-and-category">
                            <div class="tags-body">
                                <span class="tags-body__title">
                                    Tags:
                                </span>
                                <span class="tags-body__text">
                                    TAG TITLE
                                </span>
                            </div>
                            <div class="category-body">
                                <div class="category-body__wrap">
                                    <span class="category-body__title">Category: </span>
                                    <span class="category-body__text">CATEGORY TITLE</span>
                                </div>
                            </div>
                        </div>
                        <div class="comments">
                            <div class="comments__wrap">
                                <span class="comments__quantity">0</span>
                                <button class="comments__button">
                                    <img class="comments__button-image" src="/assets/images/comments.svg" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
                    <TexareaCommentComponent />
                </div>
            </div>
            <div class="blog-post__container">
                <div class="blog-post__header">
                    <div class="blog-post__title-container">
                        <div class="blog-post__title-text">
                            <h5>POST TITLE</h5>
                        </div>
                        <div class="blog-post__title-date">
                            <p>DATE</p>
                        </div>
                    </div>
                </div>
                <div class="blog-post__body">
                    <div class="blog-post__images-container" ref="imageContainer">
                        <div class="blog-post__image-wrap --last-image">
                            <!-- <img class="blog__image" src="https://unsplash.it/1200/600?image=1026" alt=""> -->
                            <img class="blog-post__image"
                                src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/4vFU/oobTmaLnH/IMG_9360.JPG" alt="">

                        </div>
                        <!-- <img src="https://unsplash.it/301" alt=""> -->
                    </div>
                    <!-- post-content -->
                    <div class="blog-post__content-container blog-post__content-container--hidden">
                        <!-- ql-editor -->
                        <p class="blog-post__content-text" ref="post">
                            Я давно хотела черкнуть пару строк о влиянии физического развития на умственное – может кому и
                            будут
                            интересны мои рассуждения и выводы.

                            Собрав декретные мысли в кулак и вооружившись интернетом, написалось....



                            С самых пеленок, большинство из мам задаются целью вырастить интеллектуально развитого ребенка.
                            Скупаются магазины игрушек, книжные магазины, дома появляется огромные коробки Школы Семи гномов
                            и
                            Умницы, в развивающие центры чуть ли не с рождения…. И список всего, что делают большинство мам
                            для
                            развития умственных способностей ребенка, можно продолжать еще долго. Но с этого ли нужно начать
                            умственное воспитание? Я считаю НЕТ. Это, конечно, всё должно присутствовать в жизни ребенка, но
                            на
                            первом месте – физическое воспитание. И уже оно потянет за собой умственное.



                            В процессе физического воспитания оказывается прямое воздействие на развитие умственных
                            способностей
                            ребенка. Когда малыш ползет, бежит, катится на беговеле или ползет по лестнице возникают
                            познавательные ситуации, связанные с овладением техникой физических упражнений, ее
                            совершенствованием, овладением приемами практических действий и пр. (как выполнить движения
                            экономнее, точнее, выразительнее и т.д.,). В результате занятий физическими упражнениями
                            улучшается
                            мозговое кровообращение, активизируются психические процессы, обеспечивающие восприятие,
                            переработку
                            и воспроизведение информации. Так, имеются многочисленные данные о том, что под влиянием
                            физических
                            упражнений увеличивается объем памяти, повышается устойчивость внимания, ускоряется решение
                            элементарных интеллектуальных задач, убыстряются зрительно-двигательные реакции. Условием
                            эффективной интеллектуальной деятельности является как и тренированный мозг, так и тренированное
                            тело, мускулатуру, помогающую нервной системе справиться с умственными нагрузками. Активность и
                            устойчивость внимания, памяти, переработки информации восприятия, напрямую зависит от уровня
                            физической подготовки организма. Протекание психических процессов (память, внимание, мышление)
                            сильно зависит от физических качеств организма — выносливости, быстроты, силы и др.



                            Существует закономерность: чем больше у ребенка развивается способность управления своим телом,
                            тем
                            быстрее и лучше он усваивает теоретические знания, но чем симметричнее, разнообразнее и точнее
                            движения, тем равномернее развиваются оба полушария головного мозга (левое полушарие отвечает за
                            логику, правое – творчество, синхронная работа полушарий мозга означает большую успешность:
                            мыслительный и познавательный процессы идут более легко и результативно).



                            Первое, что заставляет полушария работать оба полушария в тандеме – ползание. Поэтому ползать –
                            полезнее чем ходить!! И только лыжи могут так же заставить развиваться мозг!!



                            А потом малыш начинает ходить) и происходит глобальный скачок в умственном развитии. И тут
                            главное –
                            не мешать ему развиваться: убрать навсегда коляску, велосипед с ручкой, всевозможные виды
                            транспорта, упрощающие жизнь маме, но не дающие полноценно развиваться ребенку.



                            Умственное и физическое воспитание очень тесно связаны: с одной стороны, физическое воспитание
                            создает благоприятные условия для умственной деятельности и способствует развитию интеллекта. С
                            другой стороны, умственное воспитание создает условия более вдумчивого отношения к физической
                            активности, что существенно повышает эффективность физического воспитания.



                            В более позднем возрасте, наверное лет с 6-7, умственные занятия будут выходить на первый план,
                            а
                            когда малышу год, два, – научится самому спускаться и подниматься по лестнице гораздо полезнее,
                            чем
                            в красную баночку положить красный кружок!
                        </p>
                        <!-- show-more -->
                        <button class="blog-post__content-button">
                            show more
                        </button>
                    </div>
                </div>
                <div class="blog-post__footer">
                    <div class="blog-post__footer-container">
                        <div class="tags-and-category">
                            <div class="tags-body">
                                <span class="tags-body__title">
                                    Tags:
                                </span>
                                <span class="tags-body__text">
                                    TAG TITLE
                                </span>
                            </div>
                            <div class="category-body">
                                <div class="category-body__wrap">
                                    <span class="category-body__title">Category: </span>
                                    <span class="category-body__text">CATEGORY TITLE</span>
                                </div>
                            </div>
                        </div>
                        <div class="comments">
                            <div class="comments__wrap">
                                <span class="comments__quantity">0</span>
                                <button class="comments__button">
                                    <img class="comments__button-image" src="/assets/images/comments.svg" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
                    <TexareaCommentComponent />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TexareaCommentComponent from '../components/Blog/TextareaCommentComponent.vue'
// import axios from "axios";
const sidebar = ref<HTMLInputElement | null>(null);
function openSidebar() {
    sidebar.value.classList.toggle('blog__sidebar-container--open');
}
// import BaseLightbox from "../UI/BaseLightBox.vue";
// import CommentTextarea from "../Comments/CommentTextarea.vue";
// import BaseSuccessAddComment from "../UI/BaseSuccessAddComment.vue";
// import BaseSpinner from "../UI/BaseSpinner.vue";

    // emits: ["loading", "commentLink"],
    // props: ["current_page_url"],
    // data() {
    //     return {
    //         posts: [],
    //         pagination: {},
    //         loading: false,
    //         newCommentNotification: false,
    //         alertMessages: [
    //             { text: "Success!", width: 65 },
    //             {
    //                 text: "Wait a little while your comment will be checked!",
    //                 width: 290,
    //             },
    //         ],
    //     };
    // },
    // mounted() {
    //     this.getPosts(this.current_page_url);
    // },
    // methods: {
    //     ...mapActions({
    //         getRole: "auth/role",
    //         isLoginOpen: "loginOpen",
    //     }),
    //     scrollUp() {
    //         const blog = document.querySelector(".blog");
    //         if (blog) {
    //             blog.scrollTop = 0;
    //         }
    //     },
    //     commentsLink(id) {
    //         if (localStorage.getItem("x_xsrf_token")) {
    //             this.getRole();
    //         }
    //         this.$emit("commentLink", id, this.pagination.current_page_url);
    //     },
    //     getPosts(page_url, destination) {
    //         page_url = page_url || "/api/admin/posts";
    //         this.$emit("loading", true);
    //         axios
    //             .get(page_url)
    //             .then((res) => {
    //                 this.posts = res.data.data;
    //                 this.makePagination(res.data);
    //                 if (destination === "next") {
    //                     this.scrollUp();
    //                 }
    //             })
    //             .then(() => {
    //                 this.$refs.imageContainer.forEach((element) => {
    //                     const countImages = element.childElementCount;
    //                     if (countImages >= 3) {
    //                         [...element.children].forEach((child) => {
    //                             child.style.zIndex = -1;
    //                         });
    //                     }
    //                     if (
    //                         element.nextElementSibling.firstChild
    //                             .scrollHeight >= 300
    //                     ) {
    //                         element.nextElementSibling.classList.add(
    //                             "post-content-hidden"
    //                         );
    //                         element.nextElementSibling.lastChild.style.display =
    //                             "block";
    //                     }
    //                 });
    //             })
    //             .finally(() => {
    //                 this.$emit("loading", false);
    //             });
    //     },
    //     makePagination(response) {
    //         let pagination = {
    //             current_page: response.current_page,
    //             last_page: response.last_page,
    //             prev_page_url: response.prev_page_url,
    //             next_page_url: response.next_page_url,
    //             current_page_url: `${response.path}?page=${response.current_page}`,
    //             total: response.total,
    //             totalCountOnCurrentPage: response.data.length,
    //         };
    //         this.pagination = pagination;
    //     },
    //     getFullDate(post) {
    //         let date = post.created_at.slice(0, 16).replace("T", " ");
    //         let t = date.split(/[- :]/);
    //         let time = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4]));
    //         return time.toLocaleString("en-US", {
    //             day: "numeric",
    //             month: "short",
    //             year: "numeric",
    //         });
    //     },
    //     moreImages(post, event) {
    //         const target = event.target;
    //         if (target.classList.contains("post-image-container")) {
    //             const images = document.getElementById(`${post.title}`);
    //             images.style.maxHeight =
    //                 Math.ceil(target.childElementCount / 2) * 275 + "px";
    //             images.classList.remove("images-hidden");
    //             images.classList.add("images-show");
    //             [...images.children].forEach((child) => {
    //                 child.style.zIndex = 0;
    //             });
    //         }
    //     },
    //     showMoreText(event) {
    //         if (event.target) {
    //             event.target.offsetParent.classList.remove(
    //                 "post-content-hidden"
    //             );
    //             event.target.style.display = "none";
    //         }
    //     },
    //     async addComment(___, text, post_id) {
    //         let user_id = this.$store.state.auth.user.id || 0;
    //         const data = { text, post_id, user_id, depth: 0, parent_id: null };
    //         await axios.post("/api/user/comment/create", data).then(() => {
    //             if (data.user_id !== 0) {
    //                 this.getPosts();
    //             }
    //             this.newCommentNotification = true;
    //         });
    //     },
    // },
    // watch: {
    //     newCommentNotification(val) {
    //         if (val) {
    //             setTimeout(() => {
    //                 this.newCommentNotification = false;
    //             }, 8000);
    //         }
    //     },
    // },
</script>

<style lang="scss" scoped>
.blog {
    color: #fff;

    .blog-post {
        overflow: auto;

        .blog__sidebar-open {
            position: absolute;
            left: 1rem;
            top: 4.1rem;
            transition: transform 0.6s ease;

            .blog__sidebar-image {
                width: 30px;
                height: 30px;
            }
        }

        .blog__sidebar-open:active {
            transform: rotate(380deg);
        }

        .blog-post__container {
            margin: 0 0.7rem 3rem 1rem;

            &:nth-child(even) {
                background-color: $bg-grey;
            }

            .blog-post__header {
                max-width: 100%;

                .blog-post__title-container {
                    display: flex;
                    justify-content: space-between;

                    .blog-post__title-text {
                        flex: 0 1 auto;
                        margin: 0 0.8rem;

                        & h5 {
                            margin-bottom: 0;
                            padding: 0.5rem 0;
                            font-size: 1.25rem;
                            font-weight: 500;
                        }
                    }

                    .blog-post__title-date {
                        font-size: 10px;
                        display: inline-flex;
                        align-self: center;
                        margin-right: 0.8rem;
                        margin-left: auto;
                        flex: 0 0 auto;
                    }
                }
            }

            .blog-post__body {
                .blog-post__images-container {
                    min-height: 250px;
                    max-height: 300px;
                    position: relative;
                    display: grid;
                    gap: 0.3rem;
                    grid-template-columns: repeat(2, 1fr);

                    .--last-image {
                        grid-column: 1 / 3;
                        width: 100%;
                        margin: auto;
                    }

                    .blog-post__image-wrap {
                        .blog-post__image {
                            object-fit: cover;
                            width: 100%;
                            height: 250px;
                            cursor: pointer;
                            position: relative;
                            animation: fade 1s linear;
                            // visibility: hidden;
                            background-color: #1a1a1a;
                        }
                    }

                    .--last-image .blog-post__image {
                        object-fit: contain;
                    }

                }

                .blog-post__content-container {
                    background-color: #fff;
                    color: #000;

                    .blog-post__content-text {
                        padding: 0.8rem 1rem;
                    }

                    .blog-post__content-button {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        background-color: $attention;
                        padding: 0 10px;
                        border: none;
                        // display: none;
                    }
                }

                .blog-post__content-container--hidden {
                    max-height: 285px;
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 1rem;
                }
            }

            .blog-post__footer {
                .blog-post__footer-container {
                    display: flex;
                    justify-content: space-between;
                    margin: 0.8rem;

                    .tags-and-category {
                        .tags-body {
                            .tags-body__title {
                                color: $muted;
                                margin-right: 1rem;
                            }

                            .tags-body__text {
                                background-color: #ffc107;
                                padding: 0 0.5rem;
                                color: black;
                                margin-left: 0.5rem;
                            }
                        }

                        .category-body {
                            .category-body__wrap {
                                display: flex;
                                flex-wrap: nowrap;

                                .category-body__title {
                                    color: $muted;
                                    margin-right: 1rem;
                                }
                            }
                        }
                    }

                    .comments {
                        .comments__wrap {
                            display: flex;
                            position: relative;

                            .comments__quantity {
                                color: $accent-primary;
                                font-weight: 600;
                                align-self: flex-end;
                                pointer-events: none;
                            }

                            .comments__button {
                                border: none;
                                background: inherit;
                                align-self: end;
                                cursor: pointer;

                                .comments__button-image {
                                    width: 30px;
                                    height: 30px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.blog__container {
    display: flex;
    max-width: 1000px;
    height: calc(100vh - 117px);
    margin: auto;
    margin-top: 45px;

    .blog__sidebar-container {
        flex: 0 0 0%;
        height: calc(100% - 72px);
        background-color: $bg-grey;
        margin-left: 0;
        transition: all 0.5s ease;
        // display: none;
    }

    .blog__sidebar-container--open {
        flex: 0 0 25%;
        margin-left: 1rem;
    }
}

@media (min-width: 601px) {
    .blog {
        .blog__sidebar-container {
            display: flex;
        }

        .blog-post {
            .blog__sidebar-open {
                display: none;
            }
        }
    }
}

@media (min-width: 1025px) {
    .blog {
        .blog-post {
            .blog-post__container {
                margin-right: 0;
            }
        }
    }
}


.blog-post::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #242424f6;
}

.blog-post::-webkit-scrollbar:horizontal {
    height: 12px;
    margin-right: 20px;
}

.blog-post::-webkit-scrollbar-thumb {
    background-color: #efe4e4;
    border: 1px solid #000000;
}

.blog-post::-webkit-scrollbar-thumb:hover {
    background-color: #d3c9c9;
    border: 1px solid #333333;
}

.blog-post::-webkit-scrollbar-thumb:active {
    background-color: #999999;
    border: 1px solid #333333;
}



.slide-enter-active {
    // transition: all 0.3s ease-in;
}

.slide-leave-active {
    // transition: all 0.2s ease-out;
}

.slide-enter-from {
    // left: 200px;
}

.slide-leave-to {
    // opacity: 0;
    // transform: translateX(-30px);
}
</style>
