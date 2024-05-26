<script setup>
import { useGlobal, useConfig } from '@/store';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useTheme, useDisplay } from 'vuetify';

const { width, smAndDown, mobile, mdAndUp } = useDisplay();
import router from '@/router';
const theme = useTheme();
const route = useRoute();

const globalStore = useGlobal();
const configStore = useConfig();
const title = import.meta.env.VITE_APP_TITLE ?? 'My Advanced Solution';
const showChatByNotification = ref(false);

const shouldShowChat = computed(() => {
  const hiddenRoutes = ['/messages', '/conversations', '/message-details'];

  if (userStore?.userData?.id && !hiddenRoutes.includes(route.path)) {
    return true;
  } else {
    return false;
  }
});

// const loading: WritableComputedRef<boolean> = computed({
//   get: () => globalStore.loading,
//   set: v => globalStore.setLoading(v),
// });

const progress = computed(() => globalStore.progress);

const snackbarVisibility = ref(false);

const snackbarText = computed(() => globalStore.message);

const isDark = computed(() => (configStore.theme ? 'dark' : 'light'));

const handleMinimizedDrawerOpen = () =>{
  showChatByNotification.value = true;
};

watch(
  () => globalStore.message,
  message => (snackbarVisibility.value = message !== '')
);


const onSnackbarChanged = async () => {
  globalStore.setMessage();
  await nextTick();
};

onMounted(() => {
  document.title = title;
});
</script>

<template>
  <v-app theme="light">
    <v-app-bar absolute :elevation="0" color="#f7fcfc" :class="`advanced-header${smAndDown ? '__sm' : '__lg'}`">
      <div>Advanced Solution</div>
    </v-app-bar>
    <v-main :class="`custom-main${smAndDown ? '__sm' : '__lg'}`">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.name" />
      </router-view>
    </v-main>

    <v-overlay v-model="loading" app class="justify-center align-center">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

  </v-app>
  <teleport to="head">
    <meta
      name="theme-color"
      :content="theme.computedThemes.value[isDark].colors.primary"
    />
  </teleport>
</template>

<style lang="scss">
@use 'vuetify/_settings';


html {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: map-get(settings.$grey, 'lighten-2')
    map-get(settings.$grey, 'base');
}

::-webkit-scrollbar {
  width: 3px !important;
}
::-webkit-scrollbar-track {
  background: #e6e6e6 !important;
}
::-webkit-scrollbar-thumb {
  background: #888 !important;
}
::-webkit-scrollbar-thumb:hover {
  background: #555 !important;
}

.v-application {
  overflow-y: auto;
}
.v-app-bar .v-progress-linear {
  position: absolute;
  bottom: 0;
}
</style>
