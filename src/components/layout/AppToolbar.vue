<script setup lang="ts">
import {ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import Cookies from 'universal-cookie'
import AngleDownIcon from '~/assets/icons/angle-down.svg'
import ClosePage from '~/assets/icons/close.svg'
import {useToken} from '~/composables/useToken'
import {useLanguage} from '~/composables/useLanguage'
import {IS_DEV} from '~/utils/config'
import {VITE_API_IMG_URL} from '~/utils/config'


const organizationStore = useOrganizationStore()

const imgURL = VITE_API_IMG_URL
const open = ref<boolean>(false)
const imgHash = ref(organizationStore!.organization?.logo_url)
interface Language {
  value: string
  label: string
}

const cookies = new Cookies(null, {path: '/'})

const sidebar = ref(false)

function sidebarOpen() {
  sidebar.value = true
}

function sidebarClose() {
  sidebar.value = false
}

const {locale} = useI18n({useScope: 'local'})
const {setLang, getLang} = useLanguage()


const router = useRouter()
// const { removeToken } = useToken()

const {logout, removeToken} = useToken()
const isOpenSubMenu = ref(false)
const menu1Ref = ref()
const menu2Ref = ref()
const menu2ChildRef = ref()

const languageList = ref<Array<Language>>([
  {value: 'uz', label: 'Uz'},
  {value: 'en', label: 'En'},
  {value: 'ru', label: 'Ru'},
])
const selectedLang = ref(getLang())

watch(isOpenSubMenu, (val) => {
  setTimeout(() => {
    if (val && menu2Ref.value) {
      menu2Ref.value.style.paddingLeft = `${menu1Ref.value.offsetLeft + 16}px`
      menu2ChildRef.value.style.maxWidth = `${menu1Ref.value.offsetWidth}px`
    }
  }, 20)
})

const changeLanguage = (lang: string) => {
  setLang(lang?.value)
  window.location.reload()
}

// const checkLanguage = () => {
//   const selectedLanguage: { label: string; value: string } = getLang()
//   if (selectedLanguage) {
//     const lang = languageList.value.find(
//       p => p.value === selectedLanguage.value,
//     )
//     if (lang) {
//       languageList.value.push(currentLanguage.value)
//       languageList.value = languageList.value.filter(
//         p => p.value !== lang.value,
//       )
//       currentLanguage.value = lang
//       locale.value = lang.value
//     }
//   }
// }
// checkLanguage()

const handleLogout = () => {
  if (IS_DEV) {
    removeToken()
    router.replace({name: 'auth-login'})
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
      {{ $t('modules') }}
    </template>
    <template #profile>
      <div class="flex navbar-dropdown">
        <div class="action action-language">
          <a-dropdown :trigger="['click']">
            <p style="text-transform: capitalize" class="dropdown-trigger select-none">
              {{ selectedLang }}

              <AngleDownIcon/>
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
        <div class="dropdown-trigger-separator"/>
        <div v-if="organizationStore" class="action"/>
        <div>
          <p class="dropdown-trigger select-none" @click="sidebarOpen">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12.1207 12.7805C12.0507 12.7705 11.9607 12.7705 11.8807 12.7805C10.1207 12.7205 8.7207 11.2805 8.7207 9.51047C8.7207 7.70047 10.1807 6.23047 12.0007 6.23047C13.8107 6.23047 15.2807 7.70047 15.2807 9.51047C15.2707 11.2805 13.8807 12.7205 12.1207 12.7805Z"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              />
              <path
                d="M18.7398 19.3796C16.9598 21.0096 14.5998 21.9996 11.9998 21.9996C9.39977 21.9996 7.03977 21.0096 5.25977 19.3796C5.35977 18.4396 5.95977 17.5196 7.02977 16.7996C9.76977 14.9796 14.2498 14.9796 16.9698 16.7996C18.0398 17.5196 18.6398 18.4396 18.7398 19.3796Z"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              />
            </svg>
            <span class="organization-organization__name">
              {{ $t('profile') }}
            </span>
            <AngleDownIcon/>
          </p>
          <a-drawer
            placement="right"
            :open="sidebar"
            :closable="false"
            :trigger="['click']"
            @close="sidebarClose"
          >
            <div class="flex flex-col justify-between h-full">
              <div>
                <div class="flex justify-between items-center">
                  <p class="text-[20px] text-[#48545D] font-medium">
                    {{ $t('profile') }}
                  </p>
                  <button @click="sidebarClose">
                    <ClosePage/>
                  </button>
                </div>
                <div
                  v-if="organizationStore!.organization?.logo_url"
                  style="height: 100px"
                  class="w-full h-[150px] border-[1px] border-[#DFE2E9] rounded-md my-6 flex justify-center"
                >
                  <VImg
                    class="object-contain"
                    alt="organizationName"
                    :src="`${imgURL}${imgHash}`"
                  />
                </div>

                <p class="text-[#A2A5B9] mb-1">
                  {{ $t('companyName') }}
                </p>
                <p class="font-medium text-[#48545D]">
                  {{ organizationStore!.organization?.name }}
                </p>

                <a-divider class="text-[#DFE2E9]"/>

                <p class="text-[#A2A5B9]">
                  {{ $t('fullName') }}
                </p>
                <p class="font-medium text-[#48545D]">
                  {{
                    `${organizationStore!.organization?.lastname + organizationStore?.organization?.firstname} ${organizationStore?.organization?.middlename} `
                  }}
                </p>
                <p class="mt-4 text-[#A2A5B9]">
                  {{ $t('users') }}
                </p>
                <p class="font-medium text-[#0096B2]">
                  {{ organizationStore!.organization?.username }}
                </p>

                <p class="capitalize mt-4 text-[#A2A5B9]">
                  {{ $t('role') }}
                </p>
                <div class="flex ">
                  <p v-for="role in organizationStore!.organization?.roles" class="font-medium text-[#48545D]">
                    {{ role.module_id === 6 ? role.name : null }}
                  </p>
                </div>

                <p class="text-[#A2A5B9] mt-4">
                  {{ $t('numberPhone') }}
                </p>
                <p class="font-medium text-[#48545D]">
                  {{
                    organizationStore?.organization?.firstname ? organizationStore?.organization?.phone_number : '-'
                  }}
                </p>
                <p class="text-[#A2A5B9] mt-4">
                  {{ $t('email') }}
                </p>
                <p class="font-medium text-[#48545D]">
                  {{
                    organizationStore?.organization?.email ? organizationStore?.organization?.email : '-'
                  }}
                </p>
                <a-divider class="text-[#DFE2E9]"/>
              </div>

              <div
                class="w-full flex gap-2 items-center border-[1px] border-[#DFE2E9] py-2 px-3 rounded-md text-[#D65E81]"
                @click="handleLogout"
              >
                <Logout/>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
                  <path
                    stroke="#D65E81" stroke-linecap="round" stroke-linejoin="round"
                    d="M5.6 13.475H1.925c-.371 0-.727-.152-.99-.421a1.46 1.46 0 0 1-.41-1.018V1.964c0-.382.148-.748.41-1.017.263-.27.619-.422.99-.422H5.6M9.976 10.5l3.5-3.5-3.5-3.5M13.475 7h-8.4"
                  />
                </svg>
                <p class="cursor-pointer">
                  {{ $t('exitTheOffice') }}
                </p>
              </div>
            </div>
          </a-drawer>
        </div>
      </div>
    </template>
  </DTHeader>

  <!--  </div> -->
</template>

<style lang="scss">
.ant-drawer-content-wrapper {
  width: 298px !important;
}

.ant-drawer-header {
  background: #FFFFFF;
}

.ant-drawer-close {
  svg {
    fill: #4A5C71;
  }
}

.ant-drawer-title {
  color: #4A5C71 !important;
}
.object-contain{
  object-fit: contain;
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
