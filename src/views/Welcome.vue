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
