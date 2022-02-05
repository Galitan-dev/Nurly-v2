<template>
    <div v-on:click="click" class="tab logout">
        <i v-bind:class="'uil uil-' + iconName"></i>
        <h2>{{ $getPage(this.name).displayName }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'SidebarLogoutTab',
        data () {
            return {
                name: "authentication"
            }
        },
        props: {
            iconName: {
                type: String
            }
        },
        methods: {
            click: function () {
                alert('Logout !');
            }
        }
    }
</script>

<style lang="sass" scoped>
    .tab
        padding: .4em 0
        cursor: pointer-
        text-decoration: none
        color: var(--baby-blue-eyes)
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