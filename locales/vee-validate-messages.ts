export default {
  en: {
    messages: {
      email: 'Please enter a valid email address',
      required: 'Please fill out this field',
      length: 'Input length must be exactly [specified length] characters',
      min: ({ rule }: any) => {
        const min = rule.params[0]
        return `Minimum requirement of characters is ${min}`
      },
    },
  },
  ru: {
    messages: {
      required: 'Пожалуйста, заполните это поле',
      email: 'Пожалуйста, введите действительный адрес электронной почты',
      length: ({ rule }: any) => {
        const length = rule.params[0]
        return `Длина ввода должна быть ровно ${length} символов.`
      },
      min: ({ rule }: any) => {
        const min = rule.params[0]
        return `Минимальное количество ${min} символов`
      },
    },
  },
  uz: {
    messages: {
      required: 'Iltimos, ushbu maydonni to\'ldiring',
      email: 'Iltimos, to\'g\'ri pochta manzilini kiriting',
      length: 'Kiritilgan matn uzunligi {n} belgidan iborat boʻlishi kerak',
      min: ({ rule }: any) => {
        const min = rule.params[0]
        return `Belgilar minimal soni ${min}`
      },
    },
  },
}
