<template>
  <div>
    <v-dialog v-model="newFolder">
      <v-card>
        <v-card-title>Создать папку</v-card-title>
        <v-card-text>
          <v-text-field v-model="newFolderName" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="black" @click="add"> Создать </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer>
      <v-list>
        <v-list-item>
          <v-list-item @click="newFolder = true">
            <v-icon>mdi-folder-plus-outline</v-icon> Создать папку
          </v-list-item>
        </v-list-item>
        <v-list-item v-for="({ folder }, i) in folders" :key="i">
          <v-list-item-title>
            <v-icon>mdi-folder</v-icon> {{ folder }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import api from "../api/api";
export default {
  name: "Folders",
  data: () => ({
    folders: [],
    newFolderName: "",
    current: "",
    newFolder: false,
  }),
  async created() {
    const { data } = await api.folder.list();
    const notes = await api.note.list();
    console.log(notes);
    console.log(data);
    this.folders = data;
  },
  methods: {
    async add() {
      await api.folder.create(this.newFolderName);
      this.newFolder = false;
    },
    async delete({ current }) {
      await api.folder.delete({ current });
    },
    change() {},
  },
};
</script>

<style>
</style>