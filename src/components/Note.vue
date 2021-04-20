<template>
  <v-card>
    <template v-if="create">
      <v-card-title>
        <v-text-field v-model="object.title" />
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="object.text" />  
      </v-card-text>
    </template>
    

    <template v-if="state === EDITOR_STATE.view">
      <v-card-title>{{ object.title }}</v-card-title>
      <v-card-text v-html="object.text" />
      <v-card-actions class="justify-end">
        <v-btn text icon @click="edit">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn text icon @click="del">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </template>

    <template v-if="state === EDITOR_STATE.edit">
      <v-card-title>
        <v-text-field v-model="object.title" />
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="object.text" />  
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text icon @click="save">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn></v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "Note",
  props: ['item','create'],
  data: () => ({
    state: 0,
    object : {},
    EDITOR_STATE: Object.freeze({ view: 0, edit: 1 }),
  }),
  async mounted () {
    this.object.title = this.item.title;
    this.object.text = this.item.text;
    this.object.folderId = this.item.folderId;
    this.object._id = this.item._id;
  },
};
</script>

<style>
</style>