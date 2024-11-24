<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          href="/"
          >{{ $t("app.grace") }}</a
        ><button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <u class="text-white">=</u>
        </button>
      </div>
      <div
        v-if="$route.path === '/'"
        class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
        v-bind:class="{ hidden: !showMenu, block: showMenu }"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#about"
              ><i
                class="lg:text-gray-300 text-gray-500 fab fa-facebook text-lg leading-lg"
              ></i
              ><span class="inline-block md:ml-2">{{
                $t("app.about")
              }}</span></a
            >
          </li>
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#resources"
              ><span class="inline-block md:ml-2">{{
                $t("app.resources")
              }}</span></a
            >
          </li>
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#contact"
            >
              {{ $t("app.contact_us") }}
            </a>
          </li>
          <li>
            <button
              @click="changeLanguage(isAfaan ? 'am' : isEng ? 'or' : 'en')"
              class="text-gray-600 md:text-white text-xs font-bold underline px-3 py-4"
            >
              {{ isAfaan ? "AM" : isEng ? "OR" : "EN" }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    isEng() {
      return this.$i18n.locale === "en";
    },
    isAfaan() {
      return this.$i18n.locale === "or";
    },
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
    changeLanguage(lang: string) {
      this.$i18n.locale = lang;
    },
  },
};
</script>
