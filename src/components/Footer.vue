<template>
  <v-bottom-navigation v-model="current" fixed absolute>
        <v-btn height="100%">
          <span>Папки</span>
          <v-icon>mdi-folder</v-icon>
        </v-btn>
        <v-btn @click="create" height="100%">
          <span>Создать</span>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn height="100%">
          <span>Поиск</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-bottom-navigation>
</template>

<script>
export default {
    data: () =>({
        current: null
    }),
    methods:{
        create(){
            this.$emit('create');
        }
    }
}
</script>

<style>

</style>