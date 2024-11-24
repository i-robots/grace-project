<script setup lang="ts">
import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
//@ts-ignore
import playlist from "./playlist.vue";
import { ref, onMounted } from "vue";
import { fetchArticle } from "../lib/api"; // Replace with your API function
import { Article, Op } from "../types/article";
import { AxiosResponse } from "axios";

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
        html += `<h2 class="tracking-widest text-md title-font font-bold text-[#B8860B] mb-1 uppercase">${text}</h2>`;
      } else {
        html += `<h1 class="title-font text-lg font-medium text-gray-900 mb-3">${text}</h1>`;
      }
    }
  });

  return html;
};
</script>
<template>
  <div>
    <navbar-component></navbar-component>
    <main>
      <div
        class="relative pt-16 pb-32 flex content-center items-center justify-center"
        style="min-height: 75vh"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('https://previews.123rf.com/images/serezniy/serezniy2204/serezniy220400586/184373799-crown-of-thorns-cross-and-nails-covered-with-blood-on-wooden-background-jesus-christ-s-sacrifice-and.jpg');
          "
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-5xl">
                  {{ $t("app.header") }}
                </h1>
                <p class="mt-4 text-lg text-gray-300">
                  {{ $t("app.header_1") }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <section class="relative py-20">
        <div
          class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style="height: 80px"
          id="resources"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div class="container mx-auto px-4">
          <playlist />
        </div>
        <div class="container mx-auto px-4">
          <div class="items-center flex flex-wrap">
            <div class="mx-auto py-8 px-4">
              <h1 class="text-3xl font-bold text-center mb-6">
                {{ $t("app.featured_articles") }}
              </h1>
              <div class="flex flex-wrap -m-4" v-if="articles.length">
                <!--start here-->
                <div
                  class="p-4 md:w-1/3 w-full cursor-pointer hover:bg-slate-200"
                  v-for="(a, count) in articles"
                  :key="a._id"
                  @click="$router.push({ path: `/article/${a._id}` })"
                >
                  <div
                    class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
                  >
                    <div class="w-full">
                      <div class="w-full flex p-2">
                        <div class="p-2">
                          <img
                            src="../assets/img/photo_.jpg"
                            alt="author"
                            class="w-10 h-10 rounded-full overflow-hidden"
                          />
                        </div>
                        <div class="pl-2 pt-2">
                          <p class="font-bold">Israel dubarge</p>
                          <p class="text-xs">{{count * 3 + 1  }} June 2024</p>
                        </div>
                      </div>
                    </div>

                    <img
                      class="lg:h-32 md:h-24 h-24 w-full object-cover object-center opacity-50 blur-xs"
                      src="../assets/img/photo_.jpg"
                      alt="blog cover"
                    />

                    <div class="p-4">
                      <div v-html="renderContent(a.ops)"></div>
                      <div class="flex items-center flex-wrap">
                        <a :href="`/article/${a._id}`" class="text-green-800 md:mb-2 lg:mb-0">
                          <p class="inline-flex items-center">
                            Read Article
                            <svg
                              class="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="pt-20 pb-48">
        <div class="container mx-auto px-4" id="about">
          <div class="flex flex-wrap justify-center text-center mb-24">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold">
                {{ $t("app.meet_elders") }}
              </h2>
              <p class="text-lg leading-relaxed m-4 text-gray-600">
                {{ $t("app.elder_text") }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="../assets/img/team-1-800x800.png"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">
                    {{ $t("app.elders.habtamu") }}
                  </h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    {{ $t("app.elder") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="../assets/img/team-2-800x800.png"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">
                    {{ $t("app.elders.israel") }}
                  </h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    {{ $t("app.pastor") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="../assets/img/team-3-800x800.png"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">
                    {{ $t("app.elders.yishrun") }}
                  </h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    {{ $t("app.elder") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="../assets/img/team-4-470x470.png"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">
                    {{ $t("app.elders.migbaru") }}
                  </h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    {{ $t("app.elder") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="pb-20 relative block bg-gray-900">
        <div
          class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style="height: 80px"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div class="container mx-auto px-4 lg:pt-24 lg:pb-64 pb-8">
          <div class="flex flex-wrap text-center justify-center">
            <div class="w-full lg:w-6/12 px-4 mt-4">
              <h2 class="text-4xl font-semibold text-white">
                {{ $t("app.looking_for_church") }}
              </h2>
              <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-200">
                {{ $t("app.church_text_long") }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap mt-12 justify-center">
            <div class="w-full lg:w-3/12 px-4 text-center">
              <div
                class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center"
              >
                <i class="fas fa-medal text-xl">📖</i>
              </div>
              <h6 class="text-xl mt-5 font-semibold text-white">
                {{ $t("app.bible_teach") }}
              </h6>
              <p class="mt-2 mb-4 text-gray-400">
                {{ $t("app.bible_authority") }}
              </p>
            </div>
            <div class="w-full lg:w-3/12 px-4 text-center">
              <div
                class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center"
              >
                <i class="fas fa-poll text-xl">G</i>
              </div>
              <h5 class="text-xl mt-5 font-semibold text-white">
                {{ $t("app.centerd_worship") }}
              </h5>
              <p class="mt-2 mb-4 text-gray-400">
                {{ $t("app.worship_text") }}
              </p>
            </div>
            <div class="w-full lg:w-3/12 px-4 text-center">
              <div
                class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center"
              >
                <i class="fas fa-lightbulb text-xl">✝️</i>
              </div>
              <h5 class="text-xl mt-5 font-semibold text-white">
                {{ $t("app.community") }}
              </h5>
              <p class="mt-2 mb-4 text-gray-400">
                {{ $t("app.join_txt") }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="relative block py-24 lg:pt-0 bg-gray-900" id="contact">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300"
              >
                <div class="flex-auto p-5 lg:p-10">
                  <h4 class="text-2xl font-semibold">{{ $t("app.everyone_welcome") }}</h4>
                  <p class="leading-relaxed mt-1 mb-4 text-gray-600">
                    {{ $t("app.complete_form") }}
                  </p>
                  <div class="relative w-full mb-3 mt-8">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="full-name"
                      > {{ $t("app.full_name") }}</label
                    ><input
                      type="text"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      :placeholder="$t('app.full_name')"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="email"
                      > {{ $t("app.email") }}</label
                    ><input
                      type="email"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      :placeholder="$t('app.email')"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="message"
                      > {{ $t("app.message") }}</label
                    ><textarea
                      rows="4"
                      cols="80"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      :placeholder="$t('app.type_msg')"
                    ></textarea>
                  </div>
                  <div class="text-center mt-6">
                    <button
                      class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style="transition: all 0.15s ease 0s"
                    >
                    {{ $t("app.send_message") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer-component></footer-component>
  </div>
</template>
