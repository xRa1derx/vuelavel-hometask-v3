<template>
    <section class="blog">
        <div class="blog__container">
            <div class="blog__header">
                <nav>
                    <ul class="pagination mt-3">
                        <li class="page-item">
                            <button class="page-link">
                                Previous
                            </button>
                        </li>
                        <li class="page-item disabled">
                            <button class="page-link">
                                Page 1 of 1
                            </button>
                        </li>
                        <li class="page-item">
                            <button class="page-link">
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
                <div class="title-wrap">
                    <div class="post-title">
                        <h5>POST TITLE</h5>
                    </div>
                    <div class="date">
                        <p>DATE</p>
                    </div>
                </div>
            </div>
            <div class="blog__body">
                <div class="post-image-container" ref="imageContainer">
                    IMAGES
                </div>
                <div class="post-content">
                    <p class="ql-editor" ref="post"></p>
                    <button class="show-more">
                        show more
                    </button>
                </div>
                <!-- <div class="post-wrapper"> -->

                <!-- </div> -->

            </div>
            <div class="blog__footer">
                <div class="post-footer">
                    <div class="tags-and-category-wrap">
                        <div class="tags-wrap m-0 d-flex">
                            <span class="text-muted align-self-center mr-1">Tags:
                            </span>
                            <span class="tags">
                                TAG TITLE
                            </span>
                        </div>
                        <div class="category d-flex flex-nowrap">
                            <span class="text-muted mr-1">Category: </span>
                            <span>CATEGORY TITLE</span>
                        </div>
                    </div>

                    <div class="comments">
                        <button>
                            <i class="comments-quantity"> </i>
                            COMMENTS QUANTITY
                            <i class="far fa-comment"> </i>
                        </button>
                    </div>
                </div>
                <div class="post-comments-section">
                    <textarea name="" id=""></textarea>
                </div>
                <nav>
                    <ul class="pagination mb-3">
                        <li class="page-item">
                            <button class="page-link">
                                Previous
                            </button>
                        </li>
                        <li class="page-item disabled">
                            <button class="page-link">
                                Page 1 of 1
                            </button>
                        </li>
                        <li class="page-item">
                            <button class="page-link">
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// import axios from "axios";
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
    .blog__container {
        max-width: 1000px;
        margin: auto;
        .blog__header {
            max-width: 100%;
        }
    }

}

 .post-wrapper {
    position: relative;
    z-index: 1;
    background-color: #fff;
    border-radius: 10px;
}

.title-wrap {
    display: flex;
    justify-content: space-between;
}

.date {
    font-size: 10px;
    display: inline-flex;
    align-self: center;
    margin-right: 0.8rem;
    margin-left: auto;
    flex: 0 0 auto;
}

.date>p {
    margin: 0;
}

.post-title {
    flex: 0 1 auto;
}

.post-title,
.post-content {
    margin: 0 0.8rem;
}

.post-content-hidden {
    max-height: 285px;
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;
}

.show-more {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: var(--clr-accent);
    padding: 0 10px;
    border: none;
    display: none;
}

.post-title>h5 {
    margin-bottom: 0;
    padding: 0.5rem 0;
}

.post-footer {
    display: flex;
    justify-content: space-between;
    margin: 0.8rem;
}

.tags-wrap {
    margin: 0;
    display: flex;
    gap: 0.5rem;
}

.tags {
    background-color: #ffc107;
    padding: 0 8px;
    color: black;
}

.category {
    gap: 0.5rem;
}

.post-image-container {
    min-height: 250px;
    max-height: 300px;
    position: relative;
    display: grid;
    gap: 0.3rem;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 1rem;
}

.images-hidden {
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

.images-hidden::before {
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

.images-hidden:hover::before {
    opacity: 1;
}

.images-show {
    transition: max-height 0.25s ease-in;
    overflow: hidden;
    background-color: #1a1a1a;
}

.post-comments-section {
    background-color: #fff;
    height: 40px;
    padding: 5px 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.textarea-wrap {
    border-radius: 10px;
}

.comments {
    display: flex;
    position: relative;
}

.comments>button {
    font-size: 2rem;
    display: flex;
    border: none;
    background: inherit;
    align-self: end;
    padding: 0;
    gap: 3px;
}

.fa-comment {
    color: rgba(255, 255, 255, 0.055);
}

.comments-quantity {
    font-size: 1rem;
    font-style: inherit;
    color: var(--clr-accent);
    font-weight: 600;
    align-self: flex-end;
}

.ql-editor {
    padding: 0;
}

.pagination {
    justify-content: center;
    margin: 0;
}

.page-link {
    background-color: inherit !important;
    border: none;
    color: var(--clr-accent);
} 

/* .list-enter-active {
    transition: all 0.3s ease-in;
}

.list-leave-active {
    transition: all 0.2s ease-out;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
} */
</style>
