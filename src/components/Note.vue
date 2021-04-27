<template>
  <v-card class="elevation-0 mb-2" @click="edit">
    <template v-if="read">
      <v-card-title>
        {{ object.title }}
        <v-spacer />
        <v-btn @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
    </template>

    <template v-if="create">
      <v-card-title>
        <v-text-field label="Название заметки" v-model="object.title" />
        <v-spacer />
        <v-btn @click="createNote" icon><v-icon>mdi-content-save</v-icon></v-btn>
        <v-btn @click="close" icon><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Текст заметки" v-model="object.text" />
      </v-card-text>
    </template>

    <template v-if="!create && state === EDITOR_STATE.view">
      <v-card-title
        >{{ object.title }}
        <v-spacer />

        <v-btn text icon @click="del">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
    </template>

    <template v-if="!create && state === EDITOR_STATE.edit">
      <edit-note
        :object="object"
        @close="state = EDITOR_STATE.view"
        @save="save"
      />
    </template>
  </v-card>
</template>

<script>
import api from "../api/api";
import editNote from "../components/EditNote";

export default {
  name: "Note",
  props: ["item", "create", "read","folders"],
  components: {
    editNote,
  },
  data: () => ({
    state: 0,
    object: {},
    EDITOR_STATE: Object.freeze({ read: -1, view: 0, edit: 1 }),
  }),
  async mounted() {
    if (!this.create) this.create = false;
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
    async del() {
      await api.note.delete(this.object._id);
    },
    edit() {
      this.state = this.EDITOR_STATE.edit;
    },
    async save(object) {
      await api.note.update(object._id, object);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>