import { createApp } from "vue";
import * as Vue from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router/index";

const app = createApp(App);

app.use(router);

app.mount("#app");
