import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import VueQuillEditor from 'vue-quill-editor'
Vue.config.productionTip = false;

Vue.use(VueQuillEditor);


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
