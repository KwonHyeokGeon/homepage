import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MemberView from '../views/MemberView.vue'

import CompanyView from '../views/CompanyView.vue'
import GreetingView from '../views/Company/GreetingView.vue'
import HistoryView from '../views/Company/HistoryView.vue'
import InteriorView from '../views/Company/InteriorView.vue'
import DirectionView from '../views/Company/DirectionView.vue'

import BusinessView from '../views/BusinessView.vue'
import BusinessView1 from '../views/Business/BusinessView1.vue'
import BusinessView2 from '../views/Business/BusinessView2.vue'
import BusinessView3 from '../views/Business/BusinessView3.vue'

import ProductView from '../views/ProductView.vue'
import ProductView1 from '../views/Product/ProductView1.vue'
import ProductView2 from '../views/Product/ProductView2.vue'
import ProductView3 from '../views/Product/ProductView3.vue'

import CsView from '../views/CsView.vue'
import GalleryView from '../views/Cs/GalleryView.vue'
import NoticeView from '../views/Cs/NoticeView.vue'
import NoticeList from '../views/Cs/NoticeList.vue'
import NoticeModify from '../views/Cs/NoticeModify.vue'
import NoticeWrite from '../views/Cs/NoticeWrite.vue'
import NoticeRead from '../views/Cs/NoticeRead.vue'


import QnaView from '../views/Cs/QnaView.vue'
import OnlineView from '../views/Cs/OnlineView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/member',
    name: 'MemberView',
    component: MemberView
  },
  {
    path: '/company',
    name: 'CompanyView',
    component: CompanyView,
    redirect: "/company/greetings",
    children: [
      {
        path: "/company/greetings",
        name: 'GreetingView',
        component: GreetingView
      },
      {
        path: "/company/history",
        name: 'HistoryView',
        component: HistoryView
      },
      {
        path: "/company/interior",
        name: 'InteriorView',
        component: InteriorView
      },
      {
        path: "/company/direction",
        name: 'DirectionView',
        component: DirectionView
      }
    ]
  },
  {
    path: '/business',
    name: 'BusinessView',
    component: BusinessView,
    redirect: "/business/business1",
    children: [
      {
        path: "/business/business1",
        name: 'BusinessView1',
        component: BusinessView1
      },
      {
        path: "/business/business2",
        name: 'BusinessView2',
        component: BusinessView2
      },
      {
        path: "/business/business3",
        name: 'BusinessView3',
        component: BusinessView3
      }
    ]
  },
  {
    path: '/product',
    name: 'ProductView',
    component: ProductView,
    redirect: "/product/product1",
    children: [
      {
        path: "/product/product1",
        name: 'ProductView1',
        component: ProductView1
      },
      {
        path: "/product/product2",
        name: 'ProductView2',
        component: ProductView2
      },
      {
        path: "/product/product3",
        name: 'ProductView3',
        component: ProductView3
      }
    ]
  },
  {
    path: '/cs',
    name: 'CsView',
    component: CsView,
    redirect: "/cs/gallery",
    children: [
      {
        path: "/cs/notice",
        name: 'NoticeView',
        component: NoticeView,
        redirect: "/cs/notice/list",
        children: [
          {
            path: "/cs/notice/list",
            name: "NoticeList",
            component: NoticeList
          },
          {
            path: "/cs/notice/write",
            name: "NoticeWrite",
            component: NoticeWrite
          },
          {
            path: "/cs/notice/read",
            name: "NoticeRead",
            component: NoticeRead
          },
          {
            path: "/cs/notice/modify",
            name: "NoticeModify",
            component: NoticeModify
          }
        ]
      },
      {
        path: "/cs/online",
        name: 'OnlineView',
        component: OnlineView,
        redirect: "/cs/online/counsel",
        children: [
          // {
          //   path: "/cs/online/list",
          //   name: "OnlineList",
          //   component: () => import('@/views/Cs/OnlineList.vue')
          // },
          {
            path: "/cs/online/counsel",
            name: "OnlineCounsel",
            component: () => import('@/views/Cs/OnlineCounsel.vue')
          }
        ]
      },
      {
        path: "/cs/qna",
        name: 'QnaView',
        component: QnaView,
        redirect: "/cs/qna/list",
        children: [
          {
            path: "/cs/qna/list",
            name: "QnaList",
            component: () => import('@/views/Cs/QnaList.vue')
          },
          {
            path: "/cs/qna/write",
            name: "QnaWrite",
            component: () => import('@/views/Cs/QnaWrite.vue')
          },
          {
            path: "/cs/qna/read",
            name: "QnaRead",
            component: () => import('@/views/Cs/QnaRead.vue')
          }
        ]
      },
      {
        path: "/cs/gallery",
        name: 'GalleryView',
        component: GalleryView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
