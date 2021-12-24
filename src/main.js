import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
// Axios
// import Axios from "axios";

const app = createApp(App)
    // 注入axios   
    // globalProperties 对第三方进行操作
    // app.config.globalProperties.$axios = Axios

app
    .use(Vant)
    .use(store)
    .use(router)
    .mount("#app");