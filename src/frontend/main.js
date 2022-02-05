import { createApp } from 'vue'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import PageContainer from './PageContainer'
import navigation from './plugins/navigation'

const [ navPlugin, navStore ] = navigation({
    board: "Dashboard",
    shorts: "Mes Raccourcies",
    visits: "Visites",
    settings: "Paramètres",
    help: "Aide",
    authentication: "Authentification",
    notfound: "Page Introuvable"
});

createApp(Sidebar)
    .use(navStore)
    .use(navPlugin)
    .mount('#sidebar');

createApp(Topbar)
    .mount('#topbar');

createApp(PageContainer)
    .use(navStore)
    .use(navPlugin)
    .mount('#content')