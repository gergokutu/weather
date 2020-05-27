<template>
  <div class="notes">
    <h1>Notes...</h1>
    <h3 v-for="(item, index) in posts" :key="index">
      {{ item }}
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState(["posts"])
  }
})
export default class Notes extends Vue {
  mounted() {
    const test = "test";
    const age = 6;
    this.$store.dispatch("loadPosts", { test, age });
  }
}
</script>
