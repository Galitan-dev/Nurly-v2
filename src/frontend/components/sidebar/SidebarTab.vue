<template>
    <div v-on:click="$goToPage(this.name)" v-on:mouseenteree="$focusPage(this.name)" v-on:mouseleaveee="$unfocusPage()" v-bind:class="'tab ' + name" :style="color">
        <i v-bind:class="'uil uil-' + iconName"></i>
        <h2>{{ $getPage(this.name).displayName }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'SidebarTab',
        props: {
            name: {
                type: String
            },
            iconName: {
                type: String
            }
        },
        computed: {
            color() {
                return {
                    'color': this.$store.state.currentPage.name == this.name ? "var(--yale-blue)": "var(--baby-blue-eyes)"
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .tab
        padding: .4em 0
        cursor: pointer
        text-decoration: none
        display: flex
        align-items: center
        i
            font-size: 2.5em
        h2
            font-size: 1.5em
            margin: 0 10px
            font-weight: normal
            cursor: pointer
</style>