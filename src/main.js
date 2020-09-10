//import { register } from 'register-service-worker'

if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
        console.log("[PWA] active service worker found, no need to register");
        navigator.serviceWorker.getRegistration().then(function(reg) {
            console.log("[PWA] try update service worker");
            reg.update();
        });
    } else {
        // Register the service worker
        navigator.serviceWorker.register("sw.js", {
                scope: "./"
            })
            .then(function(reg) {
                console.log("[PWA] Service worker has been registered for scope: " + reg.scope);
                localStorage.setItem('pwa', 'install')
            });
        // Load controlled and uncontrolled pages once the worker is active.
        //navigator.serviceWorker.ready.then(reload);
    }
}

import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'

// ELEMENT UI LIB
import Element from 'element-ui'
import './element-variables.scss'
import locale from 'element-ui/lib/locale/lang/zh-TW'
Vue.use(Element, { locale })

// FONTAWESOME SETUP
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, fab, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/** @see https://github.com/FortAwesome/vue-fontawesome#processing-i-tags-into-svg-using-font-awesome*/
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch()

// VUEX
import store from './store'

Vue.config.productionTip = false


new Vue({
    store,
    render: h => h(App),
}).$mount('#app')