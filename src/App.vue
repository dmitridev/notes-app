<template>
  <v-app>
    <v-main>
      <regulars/>
      <!--
      <router-view />
      <v-dialog v-model="create" fullscreen>
        <Note :create="create" @close="create=false" />
      </v-dialog>
      <v-bottom-navigation v-model="current" fixed>
        <v-btn height="100%">
          <span>Папки</span>
          <v-icon>mdi-folder</v-icon>
        </v-btn>
      
        <v-btn height="100%">
          <span>Списки</span>
          <v-icon> mdi-text-box </v-icon>
        </v-btn>
        <v-btn @click="create = true" height="100%">
          <span>Создать</span>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn height="100%">
          <span>Поиск</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-bottom-navigation>
      -->
    </v-main>
  </v-app>
</template>

<script>
import regulars from '../src/components/regulars'
export default {
  name: "App",
  components:{
    regulars
  },

  data: () => ({
    items: {
      folders: {
        list: { icon: "mdi-document" },
      },
      
    },
    create: false,
    current: "",
  }),
};
</script>
