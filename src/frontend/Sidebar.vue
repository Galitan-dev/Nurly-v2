<template>
  <input type="checkbox" name="toggleMenu" id="toggleMenu"> 
  <div class="title noselect">
    <label for="toggleMenu">
      <i class="uil uil-link-broken"></i>
      <h1>Nurly</h1>
    </label>
  </div>
  <div class="tabs">
    <SidebarSelector></SidebarSelector>
    <SidebarTab name="board" displayName="Dashboard" iconName="estate"></SidebarTab>
    <SidebarTab name="shorts" displayName="Mes Raccourcies" iconName="cube"></SidebarTab>
    <SidebarTab name="visits" displayName="Visites" iconName="eye"></SidebarTab>
    <SidebarTab name="settings" displayName="Paramètres" iconName="setting"></SidebarTab>
    <SidebarTab name="help" displayName="Aide" iconName="comment-question"></SidebarTab>
    <SidebarLogoutTab displayName="Se Déconnecter" iconName="signout"></SidebarLogoutTab>
  </div>
</template>
  
<script>
import SidebarTab from './components/sidebar/SidebarTab'
import SidebarLogoutTab from './components/sidebar/SidebarLogoutTab'
import SidebarSelector from './components/sidebar/SidebarSelector'

export default {
  name: 'Sidebar',
  components: {
    SidebarTab,
    SidebarLogoutTab,
    SidebarSelector
  }
}
</script>


<style lang="sass">
  @import "./assets/sass/main.sass"

  #sidebar
    position: sticky
    background: var(--dark-blue)
    height: 100vh
    width: max-content
    padding: 20px
    color: var(--light-blue)
    display: flex
    flex-direction: column
    align-items: center

    .title
      height: 4em
      label
        text-align: center
        margin-bottom: 30px
        display: flex
        align-items: center
      i
        font-size: 3em
        cursor: pointer
      h1    
        margin: 0 10px
        font-size: 3em
        text-transform: uppercase
        font-family: "Stick No Bills"
        cursor: pointer

    #toggleMenu
      display: none

  @media only screen and (max-device-width: 850px)
    #toggleMenu:not(:checked) ~ .title,
    #toggleMenu:not(:checked) ~ .tabs .tab
      overflow: hidden
      width: 1em

  @media only screen and (min-device-width: 850px)
    #toggleMenu:checked
      ~ .title 
        h1
          display: none

      ~ .tabs
        h2
          display: none
        .selector .right
          right: 24px
</style>