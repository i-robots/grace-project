<template>
  <div class="items-center flex flex-wrap">
    <div class="mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold text-center mb-6">{{ $t("app.play_list") }}</h1>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-danger">{{ error }}</div>
    <div v-if="videos.length" class="items-center flex flex-wrap">
      <div v-for="video in videos" :key="video.id" class="md:w-1/3 w-full p-4">
        <a
          :href="
            'https://www.youtube.com/watch?v=' +
            video.snippet.resourceId.videoId
          "
          class="flex flex-col mb-4 border p-2"
          target="_blank"
        >
          <h2 class="md:max-w-md max-w-sm">{{ video.snippet.title || ".." }}</h2>
          <p class="truncate max-w-sm overflow-hidden">
            {{ video.snippet.description }}
          </p>
          <img
            class="p-4"
            :src="video.snippet.thumbnails.medium.url"
            :alt="video.snippet.title"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPlaylist } from "../lib/api";
export default {
  data() {
    return {
      videos: [],
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchVideos();
  },
  methods: {
    async fetchVideos() {
      const playlistId = "PL-qVPpXgy2ZfM0Solkpo3pSbJEy06HogG"; // Replace with your actual playlist ID

      try {
        const response = await fetchPlaylist(playlistId);
        if (response.data) {
          this.videos = response.data.items;
        } else {
          this.error = "No videos found.";
        }
      } catch (error) {
        this.error = "Failed to load videos.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
