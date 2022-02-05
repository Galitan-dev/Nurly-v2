<script>
import Dashboard from './components/pages/Dashboard'
import ShortsPage from './components/pages/ShortsPage'
import { h } from 'vue'

const pages = {
    board: Dashboard,
    shorts: ShortsPage
}

export default {
    name: "PageContainer",
    computed: {
        CurrentPage() {
            const pageName = this.$store.state.currentPage.name;
            return h(pages[pageName]);
        }
    },
    render() {
        return h(this.CurrentPage);
    }
}
</script>

<style lang="sass">
    #content
        text-align: center
</style>