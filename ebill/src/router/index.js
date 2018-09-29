import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'

import AssignCard from '@/components/AssignCard'
import AllowOrders from '@/components/AllowOrders'
import Test from '@/components/Test'
import Nav from '@/components/Nav'


import BindCard from '@/components/BindCard'
import BillDetail from '@/components/BillDetail'
import BillHistory from '@/components/BillHistory'
import AssignCardIllustate from '@/components/AssignCardIllustate'
import BillSuccess from '@/components/BillSuccess'
import SendEmail from '@/components/SendEmail'
import Register from '@/components/Register'
import Flash from '@/components/Flash'
import BillHistoryDetail from '@/components/BillHistoryDetail'
import DownloadTicket from '@/components/DownloadTicket'
import Ticketdesc from '@/components/Ticketdesc'
import CancelAssignCard from '@/components/CancelAssignCard'


Vue.use(Router)
const COMP_MAP = {
 billHistory:BillHistory
};

let DeaultPage = COMP_MAP[window.state]?COMP_MAP[window.state]:Flash
console.log("sadfjklsdfjk"+window.state);


export default new Router({
  mode:'hash',
  base: __dirname,
  routes: [
    // {
    //   path: '/',
    //   name: 'Nav',
    //   component: Nav
    // },

    {
      path: '/',
      name: 'Flash',
      component: DeaultPage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/assignCard',
      name: 'AssignCard',
      component: AssignCard
    },
    {
      path: '/allowOrders',
      name: 'AllowOrders',
      component: AllowOrders
    },
    { path: '/bindCard', component:BindCard},
    { path: '/billDetail',component:BillDetail},
    { path: '/billHistory',component:BillHistory},
    { path: '/assignCardIllustate',component:AssignCardIllustate},
    { path: '/billSuccess',component:BillSuccess},
    { path: '/sendEmail',component:SendEmail},
    { path: '/register',component:Register},
    { path: '/flash',component:Flash},
    { path: '/bill_history_detail',component:BillHistoryDetail},
    { path: '/download-ticket',component:DownloadTicket},
    { path: '/test',component:Test},
    { path: '/ticket_desc',component:Ticketdesc},
    { path:'/cancelCard',component:CancelAssignCard}
  ]
})
