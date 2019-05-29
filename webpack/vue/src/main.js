import Vue from 'vue';
import router from './router';
// import store from './store'

import VueTap from '@/plugins/vue-tap';
import VueToast from '@/plugins/vue-toast';
Vue.use(VueTap);
Vue.use(VueToast);

// 基本样式
import 'normalize.css';
import '@/styles/base.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    // store,
    render: h => h('router-view')
}).$mount('#app');
