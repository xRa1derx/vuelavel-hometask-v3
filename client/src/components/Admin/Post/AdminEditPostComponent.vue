<template>
    <div class="edit-post edit-post__container">
        <div class="edit-post__row">
            <div class="edit-post__title">
                <base-error :errors="errors.title">
                    <template #error>{{ errors.title[0] }}</template>
                    <template #default
                        ><label for="title">Заголовок</label></template
                    >
                </base-error>
                <textarea
                    rows="1"
                    ref="textareaPostTitle"
                    type="text"
                    id="title"
                    oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                    v-model="post.title"
                ></textarea>
            </div>
        </div>
        <div class="edit-post__row">
            <div class="edit-post__category">
                <label>Категория</label>
                <select
                    class="custom-select mr-sm-2"
                    id="category"
                    aria-describedby="categoryHelp"
                    @change="onChangeCategories($event)"
                >
                    <option>{{ post.category.title }}</option>
                    <option
                        v-for="category in post.all_categories"
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.title }}
                    </option>
                </select>
            </div>
            <div class="edit-post__tags-container">
                <div class="edit-post__tags">
                    <label>Тэги</label>
                    <select multiple @change="onChangeTags($event)">
                        <option
                            v-for="tag in post.all_tags"
                            :key="tag.id"
                            :value="tag.id"
                            :selected="
                                post.tags.some(
                                    (currentTag) => currentTag.id == tag.id
                                )
                            "
                        >
                            {{ tag.title }}
                        </option>
                    </select>
                </div>
                <div class="edit-post__selected-tags">
                    <template
                        v-if="selectedTags[0]?.title"
                        v-for="selectedTag in selectedTags"
                    >
                        <span>{{ selectedTag.title }}</span>
                    </template>
                    <template v-else v-for="tag in post.tags">
                        <span>{{ tag.title }}</span>
                    </template>
                </div>
            </div>
        </div>
        <base-drop-zone @dropzone="dropzone" @removeImage="removeImage">
        </base-drop-zone>
        <base-error :errors="errors.content">
            <template #error>{{ errors.content[0] }}</template>
        </base-error>
        <tip-tap v-model="post.content"></tip-tap>
        <button @click="saveChanges()" class="edit-post__save-changes btn">
            Сохранить изменения
        </button>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import BaseDropZone from "@/components/UI/BaseDropZone.vue";
import TipTap from "@/components/VueTextEditor/TipTap.vue";
import BaseError from "@/components/UI/BaseError.vue";
import router from "@/router";

interface Post {
    title: string;
    category: { title: string };
    content: string;
    tags: [{ id: number; title: string }];
    all_categories: [{ id: number; title: string }];
    all_tags: [{ id: number; title: string }];
}

const textareaPostTitle = ref<HTMLDivElement | undefined>();
const route = useRoute();
const post = ref<Post>({
    title: "",
    category: { title: "" },
    content: "",
    tags: [{ id: 0, title: "" }],
    all_categories: [{ id: 0, title: "" }],
    all_tags: [{ id: 0, title: "" }],
});
const selectedTags = ref([{ title: "", id: null }]);
const images = ref();
const imageIdsForDelete = ref([null]);
const selectedCategoryId = ref(null);
const errors = ref({ title: [], content: [] });

onMounted(() => {
    getPost();
});

function onChangeTags(event: any) {
    selectedTags.value = [];
    [...event.target].forEach((tag) => {
        tag.selected == true
            ? selectedTags.value.push(findSelectedTag(+tag.value) as never)
            : "";
    });
}

function findSelectedTag(tagId: number) {
    return post.value.all_tags.filter((item) => item.id == tagId)[0];
}
function onChangeCategories(event: any) {
    selectedCategoryId.value = event.target.value;
}

function dropzone(val: any) {
    images.value = val;
}

function removeImage(val: any) {
    imageIdsForDelete.value.push(val.id);
}

function resizeTextarea(e: number) {
    textareaPostTitle.value!.style.overflow = "hidden";
    textareaPostTitle.value!.style.height = e + "px";
}

function getPost() {
    axios.get(`/api/admin/post/${route.params.id}`).then((res) => {
        post.value = res.data;
        selectedTags.value = res.data.tags;
        selectedCategoryId.value = res.data.category.id;
        res.data.images.forEach((image: any) => {
            let file = {
                id: image.id,
                name: image.name,
                size: image.size,
            };

            images.value.displayExistingFile(file, "/" + image.path);
        });
    });
}

function saveChanges() {
    const data = new FormData();
    data.append("title", post.value.title);
    data.append("category_id", selectedCategoryId.value!);
    const selectedTagsIds = selectedTags.value.map((tag) => tag.id);
    selectedTagsIds.forEach((tag) => {
        data.append("tags[]", tag!);
    });
    data.append("content", post.value.content);
    const saveImages = images.value.getAcceptedFiles();
    saveImages.forEach((image: any) => {
        data.append("images[]", image);
        images.value.removeFile(image);
    });
    imageIdsForDelete.value.forEach((idForDelete) => {
        data.append("image_ids_for_delete[]", idForDelete!);
    });
    data.append("_method", "patch");
    axios
        .post(`/api/admin/post/${route.params.id}`, data)
        .then((res) => router.push({ name: "admin.posts" }))
        .catch((err) => (errors.value = err.response.data.errors));
}

watch(post, () => {
    nextTick(() => {
        resizeTextarea(textareaPostTitle.value!.scrollHeight);
    });
});
</script>

<style lang="scss" scoped>
label {
    color: #fff;
}
.edit-post {
    .edit-post__row {
        display: flex;
        flex-direction: column;
        & div {
            margin-bottom: 1rem;
        }
        .edit-post__title {
            display: flex;
            flex-direction: column;
            width: 100%;
            textarea {
                resize: none;
            }
        }
        .edit-post__tags-container {
            flex: 50%;
            .edit-post__tags {
                display: flex;
                flex-direction: column;
            }
            .edit-post__selected-tags {
                display: flex;
                flex-wrap: wrap;
                span {
                    background-color: #ffc107;
                    color: black;
                    border-radius: 10px;
                    padding: 0 7px;
                    margin: 0 5px 5px 0;
                }
            }
        }
        .edit-post__category {
            display: flex;
            flex-direction: column;
            flex: 50%;
        }
    }
    .edit-post__save-changes {
        float: right;
    }
}

.edit-post__container {
    overflow: auto;
    height: 100%;
    padding-right: 0.5rem;
}

@media (min-width: 601px) {
    .edit-post {
        .edit-post__row {
            flex-direction: row;
        }
    }
}
</style>
