<script setup lang="ts">
import { VITE_API_IMG_URL } from '~/utils/config'
import { useLanguage } from '~/composables/useLanguage'
import { useToken } from '~/composables/useToken'
import Logout from '~/assets/icons/logout.svg'

const { locale } = useI18n()
const { setLang } = useLanguage()
const imgURL = VITE_API_IMG_URL
const toggleProfile = ref(false)
const { organization } = useOrganizationStore()
const { handleLogout, removeToken } = useToken()

$loadDtHeader({
  currentLang: locale.value,
  position: 'auto',
  activeModule: 'rkp',
  enableProfileIcon: true,
  mode: 'dev',
  enableLanguageSwitcher: true,

  onSelectLanguage: (lang: string) => {
    setLang(lang)
    locale.value = lang
  },
})
const handleLogoutAndRemoveToken = () => {
  handleLogout()
  removeToken()
}
const onClickProfileIcon = () => {
  toggleProfile.value = !toggleProfile.value
}
const button = document.querySelector('.dt-header-profile')
button?.addEventListener('click', onClickProfileIcon)
</script>

<template>
  <RouterView />
  <a-drawer
    width="299px"
    placement="right"
    :open="toggleProfile"
    :trigger="['click']"
    @close="onClickProfileIcon"
  >
    <div v-if="!organization.organization.id" class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <div class="text-[20px] text-[1#48545D] font-medium">
            {{ $t("profile") }}
          </div>
        </div>
        <div
          style="height: 100px"
          class="w-full h-[150px] border-[1px] border-[#DFE2E9] rounded-md my-6 flex justify-center"
        >
          <VImg
            class="object-contain"
            alt="organizationName"
            :src="`${imgURL}${organization?.logo_url}`"
          />
        </div>
        <p class="text-[#A2A5B9] mt-6">
          {{ $t("companyName") }}
        </p>
        <p class="font-medium font-medium text-[#0096B2]">
          {{ organization?.name }}
        </p>

        <div class="bg-[#DFE2E9] w-full h-[0.5px] my-2" />
        <p class="mt-2 text-[#A2A5B9]">
          {{ $t("tin") }}
        </p>
        <p class="font-medium text-[#0096B2]">
          {{ organization?.tin ? organization?.tin : "-" }}
        </p>
        <!--        <p class="text-[#A2A5B9]"> -->
        <!--          {{ $t("fullName") }} -->
        <!--        </p> -->

        <!--        <p class="font-medium text-[#48545D] uppercase"> -->
        <!--          &lt;!&ndash;          {{ userData?.first_name }} {{ userData?.middle_name }} {{ userData?.last_name }} &ndash;&gt; -->
        <!--        </p> -->
        <p class="text-[#A2A5B9]">
          {{ $t("address") }}
        </p>

        <p class="font-medium text-[#0096B2] ">
          {{ organization?.address }}
        </p>
        <p class="mt-2 text-[#A2A5B9]">
          {{
            $t("numberPhone")
          }}
        </p>
        <p v-for="(item, index) in organization?.phone_numbers" :key="index" class="font-medium text-[#0096B2]">
          {{ item?.number ? item?.number : "-" }}
        </p>
        <div v-if="organization?.phone_numbers.length === 0">
          <p class="font-medium text-[#0096B2]">
            -
          </p>
        </div>
        <p class="mt-2 text-[#A2A5B9]">
          {{ $t("email") }}
        </p>
        <p class="font-medium text-[#0096B2]">
          {{ organization?.email ? organization?.email : "-" }}
        </p>
        <p class="mt-2 text-[#A2A5B9]">
          {{ $t("website") }}
        </p>
        <p class="font-medium text-[#0096B2]">
          {{ organization?.website ? organization?.website : "-" }}
        </p>

        <ul v-for="(item, index) in organization?.account_numbers" :key="index" class="font-medium text-[#0096B2] ">
          <li class="py-1">
            <p class="text-[#A2A5B9]">
              {{ $t("bankName") }}
            </p>
            {{ item?.bank_name }}
          </li>
          <li class="py-1">
            <p class="text-[#A2A5B9]">
              {{ $t("mfo") }}
            </p>
            {{ item?.mfo }}
          </li>
          <li class="py-1">
            <p class="text-[#A2A5B9]">
              {{ $t("bankName") }}
            </p>
            {{ item?.account_number }}
          </li>
        </ul>
        <div class="bg-[#DFE2E9] w-full h-[0.5px] my-2" />
      </div>
      <div
        class="w-full relative flex gap-2 mt-2 items-center border-[1px] border-[#DFE2E9] py-2 px-3 rounded-md text-[#D65E81]"
        @click="handleLogoutAndRemoveToken"
      >
        <Logout />
        <p class="cursor-pointer">
          {{ $t("exitTheOffice") }}
        </p>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <div class="text-[20px] text-[1#48545D] font-medium">
            {{ $t("profile") }}
          </div>
        </div>
        <div
          style="height: 100px"
          class="w-full h-[150px] border-[1px] border-[#DFE2E9] rounded-md my-6 flex justify-center"
        >
          <VImg
            class="object-contain"
            alt="organizationName"
            :src="`${imgURL}${organization?.organization.director.logo_url}`"
          />
        </div>
        <p class="text-[#A2A5B9] mt-6">
          {{ $t("companyName") }}
        </p>
        <p class="font-medium font-medium text-[#0096B2]">
          {{ organization?.organization.name }}
        </p>

        <div class="bg-[#DFE2E9] w-full h-[0.5px] my-2" />
        <p class="mt-2 text-[#A2A5B9]">
          {{ $t("tin") }}
        </p>
        <p class="font-medium text-[#0096B2]">
          {{ organization?.organization.tin ? organization?.organization.tin : "-" }}
        </p>
        <p class="text-[#A2A5B9]">
          {{ $t("fullName") }}
        </p>
        <p class="font-medium text-[#0096B2] uppercase">
          {{ organization?.organization?.director.first_name }} {{ organization?.organization?.director.middle_name }} {{ organization?.organization?.director.last_name }}
        </p>
        <p class="text-[#A2A5B9]">
          {{ $t("address") }}
        </p>

        <p class="font-medium text-[#0096B2] ">
          {{ organization?.organization.address }}
        </p>
        <p class="mt-2 text-[#A2A5B9]">
          {{
            $t("numberPhone")
          }}
        </p>
        <p v-for="(item, index) in organization?.organization?.director.phone_numbers" :key="index" class="font-medium text-[#0096B2]">
          {{ item?.number ? item?.number : "-" }}
        </p>
        <div v-if="organization?.organization?.director.phone_numbers.length === 0">
          <p class="font-medium text-[#0096B2]">
            -
          </p>
        </div>
        <p class="mt-2 text-[#A2A5B9]">
          {{ $t("email") }}
        </p>
        <p class="font-medium text-[#0096B2]">
          {{ organization?.organization.director.email ? organization?.organization.director.email : "-" }}
        </p>
        <p class="mt-2 text-[#A2A5B9]">
          {{ $t("website") }}
        </p>
        <p class="font-medium text-[#0096B2]">
          {{ organization?.organization.website ? organization?.organization.website : "-" }}
        </p>

        <ul v-for="(item, index) in organization?.organization.bank_accounts" :key="index" class="font-medium text-[#0096B2] ">
          <li class="py-1">
            <p class="text-[#A2A5B9]">
              {{ $t("bankName") }}
            </p>
            {{ item?.bank_name }}
          </li>
          <li class="py-1">
            <p class="text-[#A2A5B9]">
              {{ $t("mfo") }}
            </p>
            {{ item?.mfo }}
          </li>
          <li class="py-1">
            <p class="text-[#A2A5B9]">
              {{ $t("bankName") }}
            </p>
            {{ item?.account_number }}
          </li>
        </ul>
        <div class="bg-[#DFE2E9] w-full h-[0.5px] my-2" />
      </div>
      <div
        class="w-full relative flex gap-2 mt-2 items-center border-[1px] border-[#DFE2E9] py-2 px-3 rounded-md text-[#D65E81]"
        @click="handleLogoutAndRemoveToken"
      >
        <Logout />
        <p class="cursor-pointer">
          {{ $t("exitTheOffice") }}
        </p>
      </div>
    </div>
  </a-drawer>
</template>
