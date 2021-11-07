<template>
    <div v-on:click="go" v-on:mouseenter="mouseIn" v-on:mouseleave="mouseOut" v-bind:class="'tab ' + name">
        <i v-bind:class="'uil uil-' + iconName"></i>
        <h2>{{ displayName }}</h2>
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
            },
            displayName: {
                type: String
            }
        },
        methods: {
            go: function() {
                window.history.pushState(
                    { additionalInformation: 'Updated the URL with JS' }, 
                    "Nurly - " + this.displayName, 
                    "?page=" + this.name
                );
                this.$parent.setActiveTab(
                    this.name, 
                    this.getPosition()
                );
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
        cursor: pointer
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