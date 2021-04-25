<template>
  <div>
    <Note v-for="(obj, i) in notes"
          :key="i"
          :item="obj"
          @click="openNote = true"
    />
  </div>
</template>
<script>
  import api from '../api/api'
  import Note from '../components/Note';

  export default {
    name: 'Notes',
    props: ['folderId'],
    components: {
      Note
    },
    data: () => ({
      notes: [],
      openNote: false
    }),
    async created() {
      const {data} = await api.note.list(this.folderId);
      this.notes = data;
    }
  };
</script>

<style>
</style>