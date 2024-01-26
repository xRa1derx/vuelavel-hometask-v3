<template>
    <section class="blog blog__container">
        <aside class="blog__sidebar blog__sidebar-container" ref="sidebar">
            <nav class="pagination" v-if="pagination.total > 3">
                <ul class="pagination__list">
                    <li class="pagination__pages">
                        <button disabled>
                            Страница {{ pagination.current_page }} из
                            {{ pagination.last_page }}
                        </button>
                    </li>
                    <li class="pagination__control">
                        <button
                            class="pagination__prev"
                            @click="getPosts(pagination.prev_page_url)"
                            :disabled="!pagination.prev_page_url"
                        >
                            &lt;
                        </button>
                        <button
                            class="pagination__next"
                            @click.prevent="getPosts(pagination.next_page_url)"
                            :disabled="!pagination.next_page_url"
                        >
                            &gt;
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
        <div class="blog-post">
            <div class="blog__sidebar-open" @click="openSidebar()">
                <img
                    class="blog__sidebar-image"
                    src="/assets/images/sidebar-open.svg"
                    alt=""
                />
            </div>
            <BlogPostsComponent
                ref="blogPostComponent"
                @paginationData="paginationData"
            >
                <template #textarea>
                    <TextareaCommentComponent />
                </template>
            </BlogPostsComponent>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BlogPostsComponent from "@/components/Blog/BlogPostsComponent.vue";
import TextareaCommentComponent from "@/components/Blog/TextareaCommentComponent.vue";

interface Pagination {
    total: number;
    current_page: number;
    last_page: number;
    prev_page_url: string;
    next_page_url: string;
}

const blogPostComponent = ref();
const sidebar = ref<HTMLInputElement | null>(null);
const pagination = ref<Pagination>({
    total: 0,
    current_page: 0,
    last_page: 0,
    prev_page_url: "",
    next_page_url: "",
});

function getPosts(val: string) {
    blogPostComponent.value.getPosts(val);
}

function openSidebar() {
    sidebar.value!.classList.toggle("sidebar--open");
}

function paginationData(val: Pagination) {
    pagination.value = val;
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
    .blog__sidebar {
        display: flex;
        .pagination {
            width: 100%;
            margin-top: auto;
            .pagination__list {
                list-style-type: none;
                padding: 0;
                li {
                    button {
                        width: 100%;
                        color: #000000;
                    }
                }
                .pagination__control {
                    display: flex;
                }
            }
        }
    }
    .blog-post {
        overflow: auto;

        .blog__sidebar-open {
            position: absolute;
            left: 0.5rem;
            top: 4rem;
            transition: transform 0.6s ease;

            .blog__sidebar-image {
                width: 30px;
                height: 30px;
            }
        }

        .blog__sidebar-open:active {
            transform: rotate(380deg);
        }
    }
}

.blog__container {
    display: flex;
    max-width: 1000px;
    height: calc(100vh - 52px);
    margin: auto;
    padding-top: 3rem;

    .blog__sidebar-container {
        flex: 0 0 0%;
        height: calc(100% - 72px);
        background-color: $bg-grey;
        overflow: hidden;
        transition: all 0.5s ease;
    }

    .sidebar--open {
        flex: 0 0 25%;
        margin-right: 0.5rem;
    }
}

@media (min-width: 601px) {
    .blog__container {
        height: calc(100vh - 72px);
    }

    .blog {
        .blog__sidebar-container {
            display: flex;
            flex: 0 0 25%;
            margin-left: 0.5rem;
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

:disabled {
    color: #fff !important;
}
</style>
