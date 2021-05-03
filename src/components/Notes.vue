<template>
  <div>
    <Note v-for="(obj, i) in notes"
          :key="i"
          :item="obj"
          @click="openNote = true"
          @delete="del"
          @save="save"
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
      openNote: false
    }),
    methods:{
      del(id){
        this.notes = this.notes.filter(this._id == id);
      },
      save(object){
        let i = this.notes.findIndex(id => object._id == id);
        this.notes[i] = object;
      }
    }
    
  };
</script>

<style>
</style>