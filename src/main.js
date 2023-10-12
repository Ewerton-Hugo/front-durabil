/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components

import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser,fas, faClock } from '@fortawesome/free-solid-svg-icons';
import VueTheMask from 'vue-the-mask';

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
library.add(faUser,fas,faClock);
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueTheMask)

registerPlugins(app)

app.mount('#app')
