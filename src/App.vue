<template>
  <v-app>
    <v-main>
      <regulars/>
    </v-main>
  </v-app>
</template>

<script>
import regulars from '../src/components/Regulars'
export default {
  name: "App",
  components:{
    regulars
  },
};
</script>
