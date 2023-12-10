<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DTHeader from '@shohrux_saidov/dt-header'
import AngleDownIcon from '~/assets/icons/angle-down.svg'
import ClosePage from '~/assets/icons/close.svg'
import UserProfileIcon from '~/assets/icons/user-tag-line.svg'
import { useToken } from '~/composables/useToken'
import { useStorageService } from '~/modules/storage-service'
import '@shohrux_saidov/dt-header/dist/style.css'
import Cookies from 'universal-cookie'
import {IS_DEV} from "~/utils/config";

const open = ref<boolean>(false);

interface Language {
  value: string
  label: string
}
const cookies = new Cookies(null, { path: '/' })

const sidebar = ref(false)

function sidebarOpen() {
  sidebar.value = true
}
function sidebarClose() {
  sidebar.value = false
}

const { locale } = useI18n({ useScope: 'local' })
const { $set, $get } = useStorageService()

const organizationStore = useOrganizationStore()

const router = useRouter()
// const { removeToken } = useToken()

const {logout, removeToken} = useToken()
const isOpenSubMenu = ref(false)
const menu1Ref = ref()
const menu2Ref = ref()
const menu2ChildRef = ref()

const languageList = ref<Array<Language>>([
  { value: 'uz', label: 'Uz' },
  { value: 'en', label: 'En' },
])

const currentLanguage = ref<Language>({ value: 'ru', label: 'Ру' })
cookies.set('lang', currentLanguage.value.value)
watch(isOpenSubMenu, (val) => {
  setTimeout(() => {
    if (val && menu2Ref.value) {
      menu2Ref.value.style.paddingLeft = `${menu1Ref.value.offsetLeft + 16}px`
      menu2ChildRef.value.style.maxWidth = `${menu1Ref.value.offsetWidth}px`
    }
  }, 20)
})

const changeLanguage = (selectedLanguage: Language, i: number) => {
  languageList.value.push(currentLanguage.value)
  currentLanguage.value = { ...selectedLanguage }
  languageList.value.splice(i, 1)
  $set(selectedLanguage)
  window.location.reload()
}

const checkLanguage = () => {
  const selectedLanguage: { label: string; value: string } = $get()
  if (selectedLanguage) {
    const lang = languageList.value.find(
      p => p.value === selectedLanguage.value,
    )
    if (lang) {
      languageList.value.push(currentLanguage.value)
      languageList.value = languageList.value.filter(
        p => p.value !== lang.value,
      )
      currentLanguage.value = lang
      locale.value = lang.value
    }
  }
}
checkLanguage()


const handleLogout = () => {
  if (IS_DEV) {
    removeToken()
    router.replace({ name: 'auth-login' })
    return
  }
  logout()
}


// const mainNavActive = ref(false)
//
// function menuToggle() {
//   mainNavActive.value = !mainNavActive.value
// }

const maxWidth = 1060

function updateIsOpenSubMenu() {
  isOpenSubMenu.value = window.innerWidth <= maxWidth
}

updateIsOpenSubMenu()
window.addEventListener('resize', updateIsOpenSubMenu)
</script>

<template>
  <!--  <div class="ant-layout-header__inner"> -->
  <DTHeader>
    <template #modules>
      {{$t('modules')}}
    </template>
    <template #profile>
    <div class="flex navbar-dropdown">
      <div class="action action-language">
        <a-dropdown :trigger="['click']">
          <p class="dropdown-trigger select-none">
            {{ $t(currentLanguage.label) }}
            <AngleDownIcon />
          </p>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <div
                  v-for="(language, i) in languageList"
                  :key="`language-${i}`"
                >
                  <p @click="changeLanguage(language, i)">
                    {{ $t(language.label) }}
                  </p>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="dropdown-trigger-separator" />
      <div v-if="organizationStore" class="action" />
      <div>
        <p @click="sidebarOpen" class="dropdown-trigger select-none">
          <UserProfileIcon />
          <span class="organization-organization__name">
          {{ organizationStore?.organization?.name }}
          </span>
          <AngleDownIcon />
        </p>
        <a-drawer
          placement="right"
          @close="sidebarClose"
          :open="sidebar"
          :closable="false"
          :trigger="['click']"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <div class="flex justify-between items-center">
              <p class="text-[20px] text-[#48545D] font-medium">{{ $t('profile') }}</p>
                <button  @click="sidebarClose"><ClosePage /></button>

              </div>
              <div
                v-if="organizationStore!.organization?.logo"
                class="w-full h-[150px] border-[1px] border-[#DFE2E9] rounded-md my-6 flex justify-center"
              >
                <VImg
                  :src-from-local-server="!!organizationStore!.organization.logo"
                  class="object-contain"
                  alt="organizationName"
                  :src="organizationStore!.organization.logo"
                />
              </div>

              <p class="text-[#A2A5B9] mb-1">{{ $t('companyName') }}</p>
              <p class="font-medium text-[#48545D]">{{ organizationStore!.organization?.name }}</p>

              <a-divider class="text-[#DFE2E9]" />

              <p class="text-[#A2A5B9]">{{ $t('fullName') }}</p>
              <p class="font-medium text-[#48545D]">
                {{ organizationStore!.organization?.director.firstname + ' ' + organizationStore!.organization?.director?.middlename + ' ' + organizationStore!.organization?.director?.lastname }}
              </p>

<!--              <p class="mt-4 text-[#A2A5B9]">{{ $t('user') }}</p>-->
<!--              <p class="font-medium text-[#0096B2]">{{ organizationStore!.organization?.username }}</p>-->

              <!--              <p class="capitalize mt-4 text-[#A2A5B9]">{{ $t('role') }}</p>-->
              <!--              <div class="flex gap-2">-->
              <!--                <p class="font-medium text-[#48545D]" v-for="role in user.roles">{{ role.name }}</p>-->
              <!--              </div>-->
              <a-divider />
            </div>
            <div
              class="w-full flex gap-2 items-center border-[1px] border-[#DFE2E9] py-2 px-3 rounded-md text-[#D65E81]"
              @click="handleLogout"
            >
              <Logout />
              <p class="cursor-pointer">{{ $t('exitTheOffice') }}</p>
            </div>
          </div>
        </a-drawer>
      </div>


    </div>
    </template>
  </DTHeader>

  <!--  </div> -->
</template>

<style   lang="scss">
.ant-drawer-header{
  background: #FFFFFF;
}
.ant-drawer-close{
  svg{
    fill: #4A5C71;
  }
}
  .ant-drawer-title{
    color: #4A5C71 !important;
  }


//::-webkit-scrollbar{
//  width: 15px;
//}
//::-webkit-scrollbar-track{
//  background: #FFFFFF;
//}
//::-webkit-scrollbar-thumb{
//  background: #616a80;
//}
</style>
