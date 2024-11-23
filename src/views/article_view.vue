<template>
  <div>
    <QuillEditor ref="editor" theme="snow" :read-only="true" :toolbar="[]" />
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

const editor = ref();

onMounted(async () => {
  const route = useRoute();

  try {
    const resp: AxiosResponse<Article> | undefined = await fetchArticleId(
      route.params.id as string
    );

    if (resp && resp.data) {
      editor.value.getQuill().setContents(resp.data.ops)
    } else {
      console.error("Failed to fetch article data.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the article:", error);
  }
});
</script>
