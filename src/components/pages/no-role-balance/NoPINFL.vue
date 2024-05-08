<template>
  <div class="flex flex-col justify-center h-[80vh] items-center">
    <UserAvatar />
    <p class="text-center text-2xl font-bold mt-5">
      {{ t('uDontHaveAccess') }}
    </p>
    <p class="my-3 text-[gray]">
      {{ t('RCPModule') }}
    </p>
    <Form ref="FormRef">
      <div class="flex flex-col">
        <Field v-slot="{ errors }"   rules="required" :model-value="isEditPinfl" name="enterYourPINFL">
          <MaskInput v-model="isEditPinfl" :options="{ mask: '0000 0000 0000 00' }"
                      :class="{ 'has-error': errors.length }" class="text-center" :placeholder="t('enterYourPINFL')" />
          <div class="helper-message">
            <ErrorMessage name="enterYourPINFL" />
          </div>
        </Field>
        <a-button @click="submit" type="primary" class="mt-1">
          {{ $t('сonfirm') }}
        </a-button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from '../../../assets/icons/userNope.svg'
import { getUserInfoById, updateUserInfo } from '~/services/userInformation'
import { notification } from 'ant-design-vue'
import { DEFAULT_ERROR_MESSAGE, SAVED_SUCCESSFULLY } from '~/utils/constants'
import { useServerError } from '~/services/useServerError'

const { organization } = useOrganizationStore()
const { t } = useI18n()
const loading = ref(false)
const userData = ref(null)
const FormRef = ref()
const submitLoading = ref(false)
const isEditPinfl = ref('')
const { getFieldErrors } = useServerError()
const user = ref(organization.user)
const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await getUserInfoById(organization.user.id)
    userData.value = data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
const emits = defineEmits(['update:visible'])
const DEFAULT_DATA = {
  user_id: '',
  is_director: false,
  first_name: '',
  last_name: '',
  middle_name: '',
  pinfl: '',
  tin: '',
  website: '',
  email: '',
  lat: 0,
  lng: 0,
  address: '',
  status: 0,
  logo_name: '',
  phone_numbers: [
    {
      id: '',
      number: '',
      status: 0
    }
  ]
}
const form = ref({
  user_id: user.value.id,
  is_director: user.value.is_director,
  first_name: user.value.first_name,
  last_name: user.value.last_name,
  middle_name: user.value.middle_name,
  pinfl: user.value.pinfl,
  tin: user.value.tin,
  website: user.value.website,
  email: user.value.email,
  lat: user.value.latitude,
  lng: user.value.longitude,
  address: user.value.address,
  status: user.value.status,
  logo_name: user.value.logo_name ? user.value.logo_name : '',
  phone_numbers: [
    {
      id: user.value.phone_numbers[0].id,
      number: user.value.phone_numbers[0].number,
      status: user.value.phone_numbers[0].status
    }
  ]
})
const submit = async () => {
  const validate = await FormRef.value.validate()
  if (validate && validate.valid) {
    submitLoading.value = true
    try {
      await updateUserInfo({ ...form.value, pinfl: isEditPinfl.value })
      emits('update:visible')
      notification.success({
        message: SAVED_SUCCESSFULLY
      })
      form.value = { ...DEFAULT_DATA }
      setTimeout(() => {
        FormRef.value.resetForm()
      })
    } catch (err: any) {
      notification.error({
        message: DEFAULT_ERROR_MESSAGE
      })
      FormRef.value.setErrors(getFieldErrors(err))
    } finally {
      submitLoading.value = false
    }
  }
}
fetchData()
</script>

<style scoped>

</style>



