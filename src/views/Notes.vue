<template>
  <div class="notes">
    <h1>Notes...</h1>
    <h3 v-for="(item, index) in posts" :key="index">
      {{ item.title }}
    </h3>
  </div>
</template>

<script>
// import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

// @Component
export default {
  name: "notes",
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  computed: {
    ...mapState(["posts"])
  }
};
</script>
