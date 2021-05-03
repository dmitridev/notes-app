<template>
  <v-card class="elevation-0 mb-2" @click="edit">

    <template v-if="create">

      <v-card-title>
        <v-text-field label="Название заметки" v-model="object.title" />
        
        <v-spacer />

        <v-btn @click="createNote" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>

        <v-btn @click="close" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <quill-editor label="Текст заметки" v-model="object.text" />
      </v-card-text>
    </template>

    <template v-if="!create && state === EDITOR_STATE.view">
      <v-card-title> {{ object.title }} </v-card-title>
    </template>

    <template v-if="!create && state === EDITOR_STATE.edit">
      <edit-note :object="object" @close="state = EDITOR_STATE.view" @save="save" @delete="del" />
    </template>

  </v-card>
</template>

<script>
import api from "../api/api";
import editNote from "../components/EditNote";
import {quillEditor} from 'vue-quill-editor';

export default {
  name: "Note",
  props: ["item", "create", "read", "folders"],
  components: {
    editNote,quillEditor
  },
  data: () => ({
    state: 0,
    object: {
      title: '',
      text: '',
    },
    EDITOR_STATE: Object.freeze({ read: -1, view: 0, edit: 1 }),
  }),
  async mounted() {
    this.state = this.EDITOR_STATE.view;
    if (this.item) {
      this.object.title = this.item.title;
      this.object.text = this.item.text;
      this.object.folderId = this.item.folderId;
      this.object._id = this.item._id;
    }
  },
  methods: {
    async createNote() {
      try {
        await api.note.create(this.object);
        this.$emit("afterCreate",this.object);
      } catch (e) {
        console.err(e);
      }
    },
    async del(id) {
      await api.note.delete(id);
      this.$emit('delete',id);
    },
    edit() {
      this.state = this.EDITOR_STATE.edit;
    },
    async save(object) {
      await api.note.update(object._id, object);
      this.$emit('save',object);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>