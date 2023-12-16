<script setup lang="ts">
import { IconEtm, IconKabinet, IconMarket, IconRkp, IconWms, Logo } from '~/assets/icons/header'
import { ref } from 'vue'
import {
  HEADER_DTM,
  HEADER_RKP,
  HEADER_MARKET,
  HEADER_CABINET,
  VITE_HEADER_DWM
} from '~/utils/config'

const currentProject = ref('rkp')

const isOpenMenu = ref(false)

const menus = [
  { url: HEADER_MARKET, text: 'Market', icon: IconMarket, name: 'market' },
  { url: VITE_HEADER_DWM, text: 'DWM', icon: IconWms, name: 'wvm' },
  { url: HEADER_RKP, text: 'RKP', icon: IconRkp, name: 'rkp' },
  { url: HEADER_DTM, text: 'DTM', icon: IconEtm, name: 'dtm' },
  { url: HEADER_CABINET, text: 'Kabinet', icon: IconKabinet, name: 'cabinet' }
]
</script>

<template>
  <div class="dt-header_container">
    <header class="dt-header">
      <a href="https://dt.uz" class="dt-header__logo">
        <Logo />
      </a>
      <nav class="dt-header__nav">
        <a
          :key="menu.url"
          v-for="menu in menus"
          :href="menu.url"
          class="dt-header__nav__item"
          :class="{ active: menu.name === currentProject }"
        >
          <component class="dt-header__nav__item__icon" :is="menu.icon" />
          {{ menu.text }}
        </a>
      </nav>
      <div class="dt-header__navbar-menu" @click="isOpenMenu = !isOpenMenu">
        <button>
          <slot name="modules"></slot>
        </button>
        <div class="arrow-down-icon" :class="{ opened: isOpenMenu }">
          <svg width="10" height="10" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#fff"
              d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"
            />
          </svg>
        </div>
      </div>
      <div class="dt-header__navbar-right">
        <slot name="profile"></slot>
      </div>
    </header>
    <div class="dt-header__mobile" :class="{ open: isOpenMenu }">
      <a
        :key="menu.url"
        v-for="menu in menus"
        :href="menu.url"
        class="dt-header__nav__item"
        :class="{ active: menu.name === currentProject }"
      >
        <component class="dt-header__nav__item__icon" :is="menu.icon" />
        {{ menu.text }}
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dt-header_container {
  position: relative;
  background: #303d4d;
  z-index: 10;
  width: 100%;
  user-select: none;
}
.dt-header_container .dt-header {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 100px;
  justify-content: space-between;
  padding: 0 50px;
  background: #303d4d;
  z-index: 20;
}
.dt-header_container .dt-header__logo {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.dt-header_container .dt-header__menu-icon {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.dt-header_container .dt-header__nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
}
.dt-header_container .dt-header__nav__item {
  color: #a2a5b9;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
  fill: #a2a5b9;
}
.dt-header_container .dt-header__nav__item:hover {
  fill: #a2a5b9 !important;
  color: #2abbde;
}
.dt-header_container .dt-header__nav__item.active {
  fill: #a2a5b9 !important;
  color: #2abbde;
}
.dt-header_container .dt-header__nav__arrow-down {
  color: #a2a5b9;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dt-header_container .dt-header__nav__arrow-down.open {
  transform: rotate(180deg);
}
.dt-header_container .dt-header__navbar-right {
  display: flex;
  align-items: center;
  gap: 30px;
  height: 100%;
}

.dt-header_container .dt-hidden-nav {
  width: 100%;
  position: fixed;
  top: -100%;
  left: 0;
  background: #303d4d;
  height: fit-content;
  transition: top 0.3s;
  z-index: -1;
}
.dt-header_container .dt-hidden-nav.active {
  top: 62px;
}
.dt-header_container .dt-hidden-nav__menus {
  flex-wrap: wrap;
  display: flex;
  column-gap: 36px;
  row-gap: 10px;
  padding: 10px 0;
  background: #303d4d;
}
.dt-header_container .dt-hidden-nav__menus__item {
  color: #a2a5b9;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
}
.dt-header_container .dt-hidden-nav__menus__item:hover {
  color: #2abbde;
}

.dt-header_container .dt-header__mobile {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  gap: 36px;
  background: #303d4d;
  width: 100%;
  height: fit-content;
  position: absolute;
  top: -100%;
  z-index: -1;
  left: 0;
  transition: all 0.3s;
}

.dt-header__navbar-menu {
  align-items: center;
  gap: 6px;
  color: #fff;
  cursor: pointer;
  display: none;
  font-weight: 500;
}

@media (max-width: 992px) {
  .dt-header_container .dt-header {
    gap: 60px;
    padding: 0 30px;
  }
  .dt-header_container .dt-header__nav {
    gap: 26px;
    display: none;
  }
  .dt-header_container .dt-header__nav__item {
    color: #a2a5b9;
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s;
    fill: #a2a5b9;
  }
  .dt-header_container .dt-header__mobile.open {
    top: 56px;
    padding: 30px 20px;
  }
  .dt-header_container .dt-header__navbar-menu {
    display: flex;
  }
  .dt-header__navbar-menu .arrow-down-icon.opened {
    transform: rotate(180deg);
  }
}

@media (max-width: 767px) {
  .dt-header_container .dt-header {
    padding: 0 24px;
    gap: 40px;
  }
}
@media (max-width: 500px) {
  .dt-header_container .dt-header {
    padding: 0 12px;
    gap: 20px;
  }
  .dt-header_container .dt-header__logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .dt-header_container .dt-header__mobile {
    padding: 0 16px;
  }
  .dt-header_container .dt-header__mobile.close {
    padding: 0 20px;
  }
  .dt-header_container .dt-header__mobile.open {
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 30px 20px;
    top: 56px;
  }
}
</style>
