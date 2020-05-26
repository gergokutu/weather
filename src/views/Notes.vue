<template>
  <div class="notes">
    <h1>Notes...</h1>
    <div id="test">
      {{ this.$store.state.posts }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  mounted() {
    this.$store.dispatch("loadPosts");
  }
}
</script>
