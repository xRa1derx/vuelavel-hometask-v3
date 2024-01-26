<template>
    <div ref="dropzoneRef" class="dropzone"></div>
    <div v-if="!dropzone" id="template-preview">
        <div class="dz-preview dz-file-preview">
            <div class="dz-details">
                <div class="dz-custom-image-wrap">
                    <img data-dz-thumbnail />
                </div>
                <div class="dz-file-details">
                    <div class="dz-filename">
                        <span>Имя файла: </span>
                        <span data-dz-name></span>
                    </div>
                    <div class="dz-size">
                        <span>Размер: </span><span data-dz-size></span>
                    </div>
                    <div class="dz-error-message">
                        <span data-dz-errormessage></span>
                    </div>
                </div>
            </div>
            <div class="dz-progress">
                <span class="dz-upload" data-dz-uploadprogress></span>
            </div>
            <a class="dz-custom-remove" data-dz-remove
                ><img src="/assets/images/trash.svg"
            /></a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Dropzone from "dropzone";

const emit = defineEmits(["dropzone", "removeImage"]);
const dropzone = ref();
const dropzoneRef = ref<HTMLDivElement | string>("");

onMounted(() => {
    dropzone.value = new Dropzone(dropzoneRef.value, {
        url: "empty",
        autoProcessQueue: false,
        addRemoveLinks: true,
        maxFiles: 10,
        maxFilesize: 2,
        previewTemplate: document.getElementById("template-preview")?.innerHTML,
        acceptedFiles: "image/*",
    });
    dropzone.value.on("removedfile", (file: any) => {
        emit("removeImage", file);
    });
});

watch(dropzone, (newVal) => {
    emit("dropzone", newVal);
});
</script>

<style lang="scss">
.dropzone {
    width: 100%;
    word-break: break-word;
    & .dz-preview:last-child{
        border-bottom: none;
    }
    .dz-default {
        width: 99.3%;
        margin: auto;
        margin-bottom: 1rem;
        .dz-button {
            width: 100%;
            text-align: center;
            padding: 2rem 1rem;
            border: solid 4px rgba(255, 255, 255, 0.152);
            border-radius: 20px;
            background-color: $bg-grey;
            transition: all 0.2s linear;
            color: #fff;
            cursor: pointer;
        }
        .dz-button:hover {
            box-shadow: 0px 0px 5px 1px #fff;
            border: solid 4px rgba(255, 255, 255, 0.152);
        }
    }
    .dz-preview {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        padding-bottom: 1rem;
        border-bottom: 1px solid $bg-grey;
        .dz-remove {
            display: none;
        }

        .dz-details {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            .dz-file-details {
                display: flex;
                flex-direction: column;
                .dz-filename {
                    max-width: 250px;
                    & span:nth-child(1) {
                        color: #fff;
                        font-weight: 600;
                    }
                    & span:nth-child(2) {
                        color: $muted;
                    }
                }
                .dz-size {
                    & span:nth-child(1) {
                        font-weight: 600;
                        color: #fff;
                    }
                    & span:nth-child(2) {
                        color: $muted;
                    }
                }
                .dz-error-message {
                    span {
                        color: $attention;
                    }
                }
            }
            .dz-custom-image-wrap {
                width: 120px;
                img {
                    border-radius: 30px;
                }
            }
        }
        .dz-custom-remove {
            display: flex;
            align-self: center;
            flex-shrink: 0;
            img {
                width: 15px;
                height: 15px;
                cursor: pointer;
            }
        }
    }
}
</style>
