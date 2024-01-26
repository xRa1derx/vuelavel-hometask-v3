<template>
    <div class="editor__header">
        <template v-for="(item, index) in items">
            <div
                class="divider"
                v-if="item.type === 'divider'"
                :key="`divider${index}`"
            ></div>
            <menu-item v-else :key="index" v-bind="item" />
        </template>
        <button
            class="align-text-picker menu-item"
            :class="{ 'is-active': typeAlignState != 'text' }"
            @click.stop="togglePicker"
            ref="picker"
        >
            <img
                :src="`/assets/tip-tap-icons/align-${typeAlignState}.svg`"
                alt=""
                @click.stop
            />
            <div
                v-clickoutside="togglePicker"
                class="align-text-picker__container"
                v-if="isPickerActive"
            >
                <template v-for="(item, index) in textAlign" :key="item.id">
                    <menu-item
                        v-bind="item"
                        @click="alignText(item.type)"
                    ></menu-item>
                </template>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";
import { vClickoutside } from "@/directives/clickoutside";

const props = defineProps({
    editor: { type: Object, required: true },
    typeAlignState: { type: String, default: "text" },
});
const isPickerActive = ref(false);
const picker = ref<HTMLDivElement | null>(null);

const items = ref([
    {
        icon: "bold.svg",
        title: "Bold",
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive("bold"),
    },
    {
        icon: "italic.svg",
        title: "Italic",
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive("italic"),
    },
    {
        icon: "strikethrough.svg",
        title: "Strike",
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive("strike"),
    },
    {
        icon: "mark-pen-line.svg",
        title: "Highlight",
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive("highlight"),
    },
    {
        type: "divider",
    },
    {
        icon: "h-1.svg",
        title: "Heading 1",
        action: () =>
            props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => props.editor.isActive("heading", { level: 1 }),
    },
    {
        icon: "paragraph.svg",
        title: "Paragraph",
        action: () => props.editor.chain().focus().setParagraph().run(),
        isActive: () => props.editor.isActive("paragraph"),
    },
    {
        icon: "list-unordered.svg",
        title: "Bullet List",
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive("bulletList"),
    },
    {
        icon: "list-ordered.svg",
        title: "Ordered List",
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive("orderedList"),
    },
    {
        type: "divider",
    },
    {
        icon: "double-quotes-l.svg",
        title: "Blockquote",
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive("blockquote"),
    },
    {
        icon: "separator.svg",
        title: "Horizontal Rule",
        action: () => props.editor.chain().focus().setHorizontalRule().run(),
    },
    {
        type: "divider",
    },
]);
const textAlign = ref([
    {
        icon: "align-left.svg",
        title: "Align Left",
        action: () => props.editor.chain().focus().setTextAlign("left").run(),
        isActive: () => props.editor.isActive({ textAlign: "left" }),
        type: "left",
        id: 1,
    },
    {
        icon: "align-center.svg",
        title: "Align Center",
        action: () => props.editor.chain().focus().setTextAlign("center").run(),
        isActive: () => props.editor.isActive({ textAlign: "center" }),
        type: "center",
        id: 2,
    },
    {
        icon: "align-right.svg",
        title: "Align Right",
        action: () => props.editor.chain().focus().setTextAlign("right").run(),
        isActive: () => props.editor.isActive({ textAlign: "right" }),
        type: "right",
        id: 3,
    },
    {
        icon: "align-justify.svg",
        title: "Align Justify",
        action: () =>
            props.editor.chain().focus().setTextAlign("justify").run(),
        isActive: () => props.editor.isActive({ textAlign: "justify" }),
        type: "justify",
        id: 4,
    },
]);

function togglePicker() {
    isPickerActive.value = !isPickerActive.value;
    picker.value?.classList.toggle("is-active");
}

function alignText(type: string) {
    emit("alighTextState", type);
}

const emit = defineEmits(["alighTextState"]);
</script>

<style lang="scss" scoped>
.divider {
    background-color: rgba(#fff, 0.25);
    height: 1.25rem;
    margin-left: 0.5rem;
    margin-right: 0.75rem;
    width: 1px;
}

.editor__header {
    align-items: center;
    background: $bg-grey;
    border-bottom: 3px solid $bg-grey;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    button {
        background: transparent;
        border: none;
        border-radius: 0.4rem;
        color: #fff;
        cursor: pointer;
        height: 1.75rem;
        padding: 0.25rem;
        margin-right: 0.25rem;
        width: 1.75rem;
    }

    .align-text-picker {
        position: relative;

        .align-text-picker__container {
            position: absolute;
            width: 1.75rem;
            background-color: #fff;
            border-radius: 0.5rem;
            left: 0;
            z-index: 1;
            border: 1px solid $muted;
        }
        .align-text-picker__container > button {
            width: 100%;
            height: 100%;
        }
        .align-text-picker__container > button:hover {
            background-color: #303030;
        }
    }

    .align-text-picker:hover:not(:has(*:hover)),
    .is-active {
        background-color: #303030;
    }

    .align-text-picker img {
        pointer-events: none;
    }
}
</style>
