<template>
    <div v-on:click="logout" v-on:mouseenter="mouseIn" v-on:mouseleave="mouseOut" class="tab logout">
        <i v-bind:class="'uil uil-' + iconName"></i>
        <h2>{{ displayName }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'SidebarLogoutTab',
        props: {
            iconName: {
                type: String
            },
            displayName: {
                type: String
            }
        },
        methods: {
            logout: function () {
                alert('Logout !');
            },
            mouseIn: function() {
                this.$parent.focus(this.getPosition());
            },
            mouseOut: function() {
                this.$parent.unfocus();
            },
            getPosition: function() {
                return Array.from(this.$el.parentNode.children).indexOf(this.$el);
            }
        }
    }
</script>

<style lang="sass" scoped>
    .tab
        padding: .4em 0
        cursor: pointer-
        text-decoration: none
        color: var(--primary-color)
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