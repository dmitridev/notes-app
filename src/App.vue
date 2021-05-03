<template>
  <v-app>
    <v-main>
      <login v-if="!login"/>
      <regulars v-if="login"/>
    </v-main>
  </v-app>
</template>

<script>
import regulars from '../src/components/Regulars'
import login from '../src/components/Login'
export default {
  name: "App",
  components:{
    regulars,
    login,
  },
  data: () =>({
    login:false
  })
};
</script>
