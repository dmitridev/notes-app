<template>
  <div>
    <Note v-for="(obj, i) in notes"
          :key="i"
          :item="obj"
          @click="openNote = true"
    />
    <v-divider></v-divider>
  </div>
</template>
<script>
  import Note from '../components/Note';

  export default {
    name: 'Notes',
    props: ['folderId','notes'],
    components: {
      Note
    },
    data: () => ({
      notes: [],
      openNote: false
    }),
  };
</script>

<style>
</style>