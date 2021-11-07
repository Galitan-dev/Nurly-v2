<template>
    <div class="selector" :style="positionStyle">
        <div class="right"></div>
    </div>
</template>

<script>
    export default {
        name: "SidebarSelector",
        props: {
            position: {
                type: Number
            }
        },
        computed: {
            positionStyle() {
                return {
                    '--position': this.position || 0
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

    .selector
        position: relative
        width: calc(100% + 5px)
        height: 3.5em
        background: var(--secondary-background)
        transform: translateY(calc(-0.2em - 3.5em *(6 - var(--position)))) translateX(-5px)
        z-index: -1
        border-bottom-left-radius: 20px
        border-top-left-radius: 20px
        transition: .4s transform
        
        .right
            background-color: var(--secondary-background)
            position: absolute
            right: -20px
            width: 20px
            height: calc(100% + 40px)
            transform: translateY(-20px)
            transition: .4s
        
            &::before
                content: ""
                background-color: var(--primary-background)
                position: absolute
                top: 0
                right: 0
                width: 20px
                height: 20px
                border-bottom-right-radius: 20px

            &::after
                content: ""
                background-color: var(--primary-background)
                position: absolute
                bottom: 0
                right: 0
                width: 20px
                height: 20px
                border-top-right-radius: 20px

</style>