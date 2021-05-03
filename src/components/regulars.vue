<template>
  <div>

    <v-layout>
      <div class="flex xl0 xs">
        <Notes :notes="notes"/>
      </div>
    </v-layout>
    <v-layout>
      <Footer class="flex xs12" @create="createNote" @search="search"/>
    </v-layout>

    <v-dialog v-model="create" fullscreen>
      <Note :create="create" @close="create=false" @afterCreate="updateNotes"/>
    </v-dialog>

  </div>
</template>

<script>
import api from '../api/api'
import Notes from './Notes'
import Note from './Note'
import Footer from './Footer'

export default {
  name: "regulars",
  components:{
    Notes, Footer, Note
  },
  data: () => ({
    folder: null,
    folders: [],
    notes: [],
    create:false
  }),
  async mounted(){
    const {data} = await api.note.list();
    this.notes = data;
  },
  methods: {
    chooseFolder(folder) {
      this.folder = folder;
    },
    createNote() {
      this.create = true;
    },
    search(){},
    updateNotes(obj){
      this.notes.push(obj);
    }
  },
};
</script>

<style>
</style>