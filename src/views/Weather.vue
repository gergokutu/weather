<template>
  <div class="weather">
    <h1>Search bar comes here >>> Figma</h1>
    <!-- <h3 v-for="(item, index) in cityInfo" :key="index">
      {{ item }}
    </h3> -->
    <h3>{{ cityInfo.city_name }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState(["cityInfo"])
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
