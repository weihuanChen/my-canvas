import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './index.css'
import ViewUiPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
createApp(App).use(router).use(ViewUiPlus).mount('#app')
