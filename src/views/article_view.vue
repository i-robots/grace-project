<template>
  <div>
    <section class="bg-gray-700 h-20">
      <navbar-component></navbar-component>
    </section>

    <QuillEditor
      ref="editor"
      theme="snow"
      :read-only="$route.query.edit ? false : true"
      :toolbar="$route.query.edit ? 'essential' : []"
    />

    <div v-if="$route.query.edit" class="absolute bottom-2 right-2 flex gap-3">
      <button
        class="bg-gray-800 text-gray-100 px-5 py-2 rounded-md hover:bg-gray-600"
      >
        Close
      </button>
      <button
        @click="onSave"
        class="bg-gray-800 px-5 py-2 text-gray-100 rounded-md hover:bg-gray-600"
      >
        Update Article
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import { fetchArticleId } from "../lib/api";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AxiosResponse } from "axios";
import { Article } from "../types/article";
import NavbarComponent from "../components/Navbar.vue";
import { updateObject } from "../lib/api";

const editor = ref();
const route = useRoute();

onMounted(async () => {
  try {
    const resp: AxiosResponse<Article> | undefined = await fetchArticleId(
      route.params.id as string
    );

    if (resp && resp.data) {
      editor.value.getQuill().setContents(resp.data.ops);
    } else {
      console.error("Failed to fetch article data.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the article:", error);
  }
});

const onSave = async () => {
  if (route.params.id) {
    let payload = editor.value.getQuill().getContents();

    if (typeof payload.ops[0].insert === "string") {
      payload = { ...payload, title: payload.ops[0].insert };
    }
    const res = await updateObject(route.params.id as string, payload);
    alert(res?.data.message);
  }
};
</script>
