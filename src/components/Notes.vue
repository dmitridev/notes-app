<template>
  <div>
    <v-card v-for="({ title }, i) in notes" :key="i"> 
        <v-card-title>{{title}}</v-card-title>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Notes',
    props: ['folderId'],
    data: () => ({
        notes: []
    }),
    async created () {
        const {data} = await axios.get(`/api/notes/list?folderId=${this.folderId}`);
        this.notes = data;
    }
};
</script>

<style>
</style>