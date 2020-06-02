<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Placeholder route reserved for future usage...</p>
    <p>
      Try out the <strong>weather app </strong>
      <router-link to="/weather">here!</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WelcomeMessage extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
