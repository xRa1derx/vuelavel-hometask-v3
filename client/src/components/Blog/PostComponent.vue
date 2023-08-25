<template>
    <div class="blog-post__container">
        <div class="blog-post__header">
            <div class="blog-post__title-container">
                <div class="blog-post__title-text">
                    <h5>{{ post.title }}</h5>
                </div>
                <div class="blog-post__title-date">
                    <p>{{ post.created_at.slice(0, 10) }}</p>
                </div>
            </div>
        </div>
        <div class="blog-post__body">
            <div @click="moreImages()" class="blog-post__images-container"
                :class="{ '--images-hidden': countImages(post.images.length) }" ref="imagesContainer">
                <template v-for="(image, index) in post.images">
                    <div class="blog-post__image-wrap" :class="{
                        '--last-image': index === post.images.length - 1 && post.images.length % 2 != 0,
                    }">
                        <img class="blog-post__image" v-lazyload :data-src='`/assets/images/posts/${image.preview}`' alt="">
                    </div>
                </template>
            </div>
            <div class="blog-post__content-container" ref="contentContainer">
                <p class="blog-post__content-text" v-html="post.content">

                </p>
                <button class="blog-post__content-button" @click="showMoreText()" ref="showMoreButton">
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
                        <template v-for="   tag    in    post.tags   ">
                            <span class="tags-body__text">
                                {{ tag.title }}
                            </span>
                        </template>
                    </div>
                    <div class="category-body">
                        <div class="category-body__wrap">
                            <span class="category-body__title">Category: </span>
                            <span class="category-body__text"> {{ post.category.title }}</span>
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
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import TexareaCommentComponent from './TextareaCommentComponent.vue';
import { vLazyload } from '@/directives/lazyload';

const imagesContainer = ref<HTMLInputElement | null>(null);
const contentContainer = ref<HTMLInputElement | null>(null);
const showMoreButton = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (contentContainer.value!.scrollHeight >= 300) {
        contentContainer.value?.classList.add('blog-post__content-container--hidden');
        showMoreButton.value!.style.display = 'block';
    }
})

function moreImages() {
    if (imagesContainer.value?.classList.contains('--images-hidden')) {
        imagesContainer.value.style.maxHeight =
            Math.ceil(imagesContainer.value.childElementCount / 2) * 275 + "px";
        imagesContainer.value.classList.remove("--images-hidden");
        imagesContainer.value.classList.add("--images-show");
        [...imagesContainer.value.children as HTMLCollectionOf<HTMLElement>].forEach((child) => {
            child.style.zIndex = '0';
        });
    }
}

function showMoreText() {
    contentContainer.value?.classList.remove(
        "blog-post__content-container--hidden"
    );
    showMoreButton.value!.style.display = "none";
}

function countImages(length) {
    if (length >= 3) {
        nextTick(() => {
            [...imagesContainer.value?.children as HTMLCollectionOf<HTMLElement>].forEach((child) => {
                child.style.zIndex = '-1';
            });
        })
        return true;
    }
}

const props = defineProps({
    post: { type: Object, required: true },
})
</script>

<style scoped lang="scss">
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
        position: relative;
        z-index: 0;

        .blog-post__images-container {
            min-height: 250px;
            max-height: 300px;
            position: relative;
            display: grid;
            gap: 0.3rem;
            grid-template-columns: repeat(2, 1fr);

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

        .--last-image {
            grid-column: 1 / 3;
            width: 100%;
            margin: auto;
        }

        .--images-hidden {
            overflow: hidden;
            background-image: linear-gradient(to bottom,
                    #24242400,
                    #24242418,
                    #24242444,
                    #242424b7,
                    #242424e3);
            background-size: cover;
            position: relative;
            cursor: pointer;
        }

        .--images-hidden::before {
            content: "";
            display: block;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #9090901f;
            transition: opacity 0.3s ease-in-out;
        }

        .--images-hidden:hover::before {
            opacity: 1;
        }

        .--images-show {
            transition: max-height 0.25s ease-in;
            overflow: hidden;
            background-color: #1a1a1a;
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
                display: none;
                cursor: pointer;
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

@media (min-width: 1025px) {
    .blog-post__container {
        margin-right: 0;
    }
}
</style>
