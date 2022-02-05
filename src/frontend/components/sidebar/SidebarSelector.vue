<template>
    <div class="selector" :style="position">
        <div class="right"></div>
    </div>
</template>

<script>
    export default {
        name: "SidebarSelector",
        computed: {
            position() {
                return {
                    '--position': this.$store.state.sbSelect
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

    .selector
        position: absolute
        width: calc(100% - 15px)
        height: 3.5em
        background: var(--light-grey)
        transform: translateY(calc(3.5em * var(--position))) translateX(-5px)
        border-bottom-left-radius: 20px
        border-top-left-radius: 20px
        // transition: .4s
        z-index: -1
        
        .right
            background-color: var(--light-grey)
            position: absolute
            right: -10px
            width: 30px
            height: calc(100% + 40px)
            transform: translateY(-20px)
        
            &::before
                content: ""
                background-color: var(--dark-blue)
                position: absolute
                top: 0
                right: 0
                width: 20px
                height: 20px
                transform: translateX(-10px)
                border-bottom-right-radius: 20px

            &::after
                content: ""
                background-color: var(--dark-blue)
                position: absolute
                bottom: 0
                right: 0
                width: 20px
                height: 20px
                transform: translateX(-10px)
                border-top-right-radius: 20px
</style>