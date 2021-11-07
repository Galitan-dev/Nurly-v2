<template>
  <input type="checkbox" name="toggleMenu" id="toggleMenu"> 
  <div class="title noselect">
    <label for="toggleMenu">
      <i class="uil uil-link-broken"></i>
      <h1>Nurly</h1>
    </label>
  </div>
  <div class="tabs">
    <SidebarTab name="home" displayName="Accueil" iconName="estate"></SidebarTab>
    <SidebarTab name="shorts" displayName="Mes Raccourcies" iconName="cube"></SidebarTab>
    <SidebarTab name="visits" displayName="Visites" iconName="eye"></SidebarTab>
    <SidebarTab name="settings" displayName="Paramètres" iconName="setting"></SidebarTab>
    <SidebarTab name="help" displayName="Aide" iconName="comment-question"></SidebarTab>
    <SidebarLogoutTab displayName="Se Déconnecter" iconName="signout"></SidebarLogoutTab>
    <SidebarSelector :position="selectorPosition"></SidebarSelector>
  </div>
</template>
  
<script>
import SidebarTab from './components/SidebarTab'
import SidebarLogoutTab from './components/SidebarLogoutTab'
import SidebarSelector from './components/SidebarSelector'

export default {
  name: 'Sidebar',
  components: {
    SidebarTab,
    SidebarLogoutTab,
    SidebarSelector
  },
  data: function () {

    return {
      selectorPosition: 0,
      activeTab: {
        name: 'home',
        position: 0
      }
    }
  },
  methods: {
    setActiveTab: function(name, position) {
      this.activeTab = {
        name,
        position
      };

      this.selectorPosition = position;
    },
    focus: function(position) {
      this.selectorPosition = position;
    },
    unfocus: function() {
      this.selectorPosition = this.activeTab.position;
    }
  }
}
</script>


<style lang="sass">
  @import "./assets/sass/main.sass"

  #sidebar
    background: var(--primary-background)
    position: fixed
    top: 0
    bottom: 0
    padding: 20px
    color: var(--primary-color)
    display: flex
    flex-direction: column
    align-items: center

    .title
      label
        text-align: center
        margin-bottom: 30px
        display: flex
        align-items: center
      i
        font-size: 3em
        cursor: pointer
      h1
        font-size: 3em
        margin: 0 10px
        text-transform: uppercase
        font-family: "Stick No Bills"
        cursor: pointer

    #toggleMenu
      display: none

  @media only screen and (max-device-width: 850px)
    #toggleMenu:not(:checked) ~ .title h1,
    #toggleMenu:not(:checked) ~ .tabs h2
      display:none

  @media only screen and (min-device-width: 850px)
    #toggleMenu:checked
      ~ .title h1
        display: none

      ~ .tabs
        h2
          display: none
        .selector
          width: 122%
</style>