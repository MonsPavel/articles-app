<script setup>
import { useRouter } from 'vue-router';
import navigation from './constants/navigation';

const router = useRouter();

const goTo = (to) => {
  router.push(to);
};
</script>

<template>
  <v-app>
    <v-app-bar class="mb-5">
      <template v-slot:prepend>
        <v-btn
          v-for="item in navigation"
          variant="text"
          :key="item.to"
          @click="goTo(item.to)"
          class="mr-2"
        >
          {{ item.text }}
        </v-btn>
      </template>
    </v-app-bar>
    <div class="content">
      <RouterView :key="$route.fullPath" />
    </div>
  </v-app>
</template>

<style scoped>
.content{
  margin: 90px;
}
</style>
