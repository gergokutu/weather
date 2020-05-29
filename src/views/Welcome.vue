<template>
  <div class="welcome">
    <WelcomeMessage msg="Welcome" />
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeMessage from "@/components/WelcomeMessage.vue";

export default {
  name: "Welcome",
  components: {
    WelcomeMessage
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.welcome {
  opacity: 0.6;
  margin-top: 15%;
}
</style>
