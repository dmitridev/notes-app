<template>
  <v-app>
    <v-main>
      <router-view />
      <v-bottom-navigation v-model="current" fixed>
        <v-btn height="100%">
          <span>Папки</span>
          <v-icon>mdi-folder</v-icon>
        </v-btn>
        <v-btn height="100%">
          <span>Списки</span>
          <v-icon> mdi-text-box </v-icon>
        </v-btn>
        <v-btn height="100%">
          <span>Создать</span>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn height="100%">
          <span>Поиск</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: {
      folders: {
        list: { icon: "mdi-document" },
      },
    },
    current: "",
  }),
};
</script>
