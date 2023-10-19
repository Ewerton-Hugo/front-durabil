<template>
  <v-app-bar flat>
    <v-app-bar-title>
      Test CRUD vue

      <div @click="returnToMainPage" class="btn" v-if="isVisible">
        <v-btn variant="tonal"> Entrar </v-btn>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      isVisible: true, // Inicialmente visível
    };
  },
  methods: {
    returnToMainPage() {
      this.isVisible = !this.isVisible;
      this.$router.push("/home");
    },
  },
};
</script>

<script setup>
//
</script>
