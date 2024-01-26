<template>
    <div class="editor" v-if="editor">
        <menu-bar
            :editor="editor"
            @alighTextState="alighTextState"
            :typeAlignState="typeAlignState"
        />
        <editor-content
            class="editor__content"
            :editor="editor"
            @click="test()"
        />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, watch } from "vue";
import MenuBar from "@/components/VueTextEditor/MenuBar.vue";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const typeAlignState = ref();

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Highlight,
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
    ],
    onUpdate: ({ editor }) => {
        const value = editor.isEmpty ? "" : editor.getHTML();
        emit("update:modelValue", value);
    },
});

function alighTextState(type: string) {
    typeAlignState.value = type;
}

function test() {
    switch (true) {
        case editor.value?.isActive({ textAlign: "left" }):
            typeAlignState.value = "left";
            break;
        case editor.value?.isActive({ textAlign: "center" }):
            typeAlignState.value = "center";
            break;
        case editor.value?.isActive({ textAlign: "right" }):
            typeAlignState.value = "right";
            break;
        case editor.value?.isActive({ textAlign: "justify" }):
            typeAlignState.value = "justify";
            break;
    }
}

watch(
    () => props.modelValue,
    (value) => {
        const isSame = editor.value?.getHTML() === value;
        if (isSame) {
            return;
        }
        editor.value?.commands.setContent(value, false);
    }
);
</script>

<style lang="scss" scoped>
.editor {
    background-color: #fff;
    border: 3px solid $bg-grey;
    border-radius: 0.75rem;
    color: $bg-grey;
    display: flex;
    flex-direction: column;
    max-height: 26rem;
    margin-bottom: 1rem;

    &__content {
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 1.25rem 1rem;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
