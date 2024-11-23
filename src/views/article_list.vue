<template>
  <div v-if="articles.length" class="mt-4 flex flex-col gap-3 mx-4">
    <h1 class="text-xl font-bold">Article list</h1>
    <div
      v-for="a in articles"
      :key="a._id"
      class="border p-3 cursor-pointer hover:bg-slate-200"
      @click="$router.push({ path: `/article/${a._id}` })"
    >
      <div v-html="renderContent(a.ops)"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AxiosResponse } from "axios";
import { fetchArticle } from "../lib/api";
import { ref, onMounted } from "vue";
import { Article, Op } from "../types/article";

const articles = ref<Article[]>([]);

onMounted(async () => {
  try {
    const resp: AxiosResponse<Article[]> | undefined = await fetchArticle();

    // Check if articles are returned
    if (resp && resp.data) {
      articles.value = resp.data;
    } else {
      console.error("Failed to fetch articles");
    }
  } catch (error) {
    console.error("An error occurred while fetching articles:", error);
  }
});

const renderContent = (ops: Op[]) => {
  let html = "";

  ops.slice(0, 4).forEach((op, i) => {
    if (typeof op.insert === "string") {
      // Handle text-based ops
      const text = op.insert.trim();
      if (i === 0) {
        html += `<h3 class="font-bold">${text}</h3>`;
      } else {
        html += `<p>${text}</p>`;
      }
    }
  });

  return html;
};
</script>
