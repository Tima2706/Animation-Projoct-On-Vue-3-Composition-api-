<script lang="ts" setup>
import TelegramIcon from '~/assets/icons/telegram.svg'
import FacebookIcon from '~/assets/icons/instagram.svg'
import InstagramIcon from '~/assets/icons/facebook.svg'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const date = new Date()
const currentYear = ref(date.getFullYear())
</script>

<template>
  <div class="bg-[#2B3747] h-[100px] flex items-center px-[50px]">
    <div class="flex items-center flex-grow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="76"
        height="43"
        viewBox="0 0 76 43"
        fill="none"
      >
        <g opacity="0.2">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.9729 2.71215C25.5665 0.906761 21.6012 0 17.0729 0H0V18.1052H39.3841C39.0161 15.27 38.1688 12.6542 36.8423 10.3037C35.0065 7.05078 32.3834 4.52161 28.977 2.70809L28.9729 2.71215ZM39.2556 25.6491H0V43H17.0729C21.5604 43 25.5053 42.077 28.9158 40.2228C32.3222 38.3727 34.9535 35.8232 36.8097 32.5661C38.0173 30.4498 38.833 28.1441 39.2556 25.6491ZM51.6633 25.6491H63.6572V43H51.6633V25.6491ZM63.6572 18.1052H51.6633V9.51489H39.592V0H75.1615V9.51489H63.6572V18.1052Z"
            fill="#7A8A9D"
          />
        </g>
      </svg>
      <p class="px-[40px] flex-grow text-center">
        <span class="text-[#A8BCD2] text-[15px]"
        >© {{ currentYear }} — OOO «DT Ecosystem». {{ t('allRightsReserved') }} |
        </span>
        <a class="text-[#2BBBDE]" href="https://dt.uz/privacy-policy">{{ t('privacyPolicy') }}</a>
      </p>
      <a href="https://t.me/DT_ECOSYSTEM" class="social-btn"><TelegramIcon /></a>
      <a href="https://t.me/DT_ECOSYSTEM" class="social-btn"><FacebookIcon /></a>
      <a href="https://t.me/DT_ECOSYSTEM" class="social-btn"><InstagramIcon /></a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.social-btn {
  width: 32px;
  height: 32px;
  color: #7a8a9d;
  border-radius: 4px;
  background: #3f4c5d;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #fff;
    background: #2bbbde;
  }
  & + & {
    margin-left: 15px;
  }
}
</style>
