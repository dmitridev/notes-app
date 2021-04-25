<template>
  <div>
    <!--
    <v-dialog v-model="newFolder" width="600px">
      <v-card>
        <v-card-title>Создать папку</v-card-title>
        <v-card-text>
          <v-text-field v-model="newFolderName"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="black" @click="add"> Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
-->
      <!-- <v-list class="flex xs4">

        <v-list-item @click="newFolder = true">
          <v-icon>mdi-folder-plus-outline</v-icon>
          Создать папку
        </v-list-item>

        <v-list-item v-for="({ folder }, i) in folders" :key="i" @click="getNotesForFolder">
          <v-list-item-title>
            <v-icon>mdi-folder</v-icon>
            {{ folder }}
          </v-list-item-title>
        </v-list-item>

      </v-list>
      -->
      <div>
        <Notes :folderId="null"/>
      </div>
  </div>
</template>
<script>
  import Notes from "../components/Notes";
  import api from "../api/api";

  export default {
    name: "Folders",
    data: () => ({
      folders: [],
      newFolderName: "",
      current: "",
      newFolder: false,
      navigation: true,
    }),
    components: {
      Notes
    },
    async created() {
      const {data} = await api.folder.list();
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
      async delete({current}) {
        await api.folder.delete({current});
      },
      getNotesForFolder() {
      },
      change() {
      },
    },
  };
</script>

<style>
</style>