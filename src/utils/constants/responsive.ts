import { type NotificationPlacement } from 'ant-design-vue'

export const isMobile = window.innerWidth <= 500
export const isHideSidebar = window.innerWidth <= 1300

export const notificationPlacement: NotificationPlacement = isMobile ? 'bottom' : 'topRight'
