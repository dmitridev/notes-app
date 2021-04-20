<template>
  <div>
    <v-card v-for="({ title }, i) in notes" :key="i"> 
        <v-card-title>{{title}}</v-card-title>
    </v-card>
  </div>
</template>
<script>
import api from '../api/api'
export default {
    name: 'Notes',
    props: ['folderId'],
    data: () => ({
        notes: []
    }),
    async created () {
        const {data} = await api.note.list(this.folderId);
        this.notes = data;
    }
};
</script>

<style>
</style>