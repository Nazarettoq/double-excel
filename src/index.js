import { Router } from '@core/Routing/Router'
import { DashboardPage } from '@/pages/DashboardPage'
import { ExcelPage } from '@/pages/ExcelPage'
import './scss/index.scss'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
