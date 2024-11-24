<template>
  <div class="w-full h-[90vh] flex flex-col justify-between">
    <div class="h-full">
      <QuillEditor ref="editor" :modules="modules" toolbar="full" />
    </div>
    <div class="fixed bottom-2 right-2 flex gap-3">
      <button
        @click="$router.push({ path: '/' })"
        class="bg-gray-800 text-gray-100 px-5 py-2 rounded-md hover:bg-gray-600"
      >
        Close
      </button>
      <button
        @click="onSave"
        class="bg-gray-800 px-5 py-2 text-gray-100 rounded-md hover:bg-gray-600"
      >
        {{ articleId ? "Update" : "Save" }} Article
      </button>
    </div>
  </div>
</template>
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import { ref } from "vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { uploadImageToImgBB, saveObject, updateObject } from "../lib/api";

const editor = ref();
const articleId = ref();

const onSave = async () => {
  let payload = editor.value.getQuill().getContents();

  if (articleId.value) {
    if (typeof payload.ops[0].insert === "string") {
      payload = { ...payload, title: payload.ops[0].insert };
    }
    const res = await updateObject(articleId.value, payload);
    alert(res.data.message);
  } else {
    const res = await saveObject(payload);
    articleId.value = res.data.data._id;
    alert(res.data.message);
  }
};

const modules = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: async (file) => {
      try {
        const quill = editor.value.getQuill();
        quill.enable(false);
        const res = await uploadImageToImgBB(file);
        const imageUrl = res?.data?.data.url;

        // Insert the uploaded image into Quill editor
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);
        quill.enable();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
