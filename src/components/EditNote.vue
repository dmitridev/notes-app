<template>
  <v-dialog v-model="open" fullscreen>
    <v-card>
      <v-card-title>
        <v-text-field v-model="item.title"/>
        <v-spacer/>
        <v-btn text icon @click="save">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn @click="del" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon text @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <quillEditor v-model="item.text"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
  export default {
    props: ['object', 'create'],
    components:{
      quillEditor
    },
    data: () => ({
      open: true,
      item: {}
    }),
    async created() {
      const {_id="",title = "", text = ""} = this.object;
      this.item.title = title;
      this.item.text = text;
      this.item._id = _id;
    },
    methods: {
      close() {
        this.open = false;
        this.$emit('close');
      },
      save() {
        this.$emit('save',this.item);
      },
      del(){
        this.$emit('delete',this.item._id);
      }
    }
  }
</script>