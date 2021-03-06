//该文件专门用于创建整个应用的路由器
import { createRouter, createWebHistory } from 'vue-router'

import Register from '../views/register/Register.vue'

//管理端组件
import Manage from '../views/manage/manage.vue'
import CheckRegistered from '../views/manage/check/CheckRegistered.vue'
import CheckPersonal from '../views/manage/check/CheckPersonal.vue'
import CheckCenter from '../views/manage/check/CheckCenter.vue'
import CheckAppointment from '../views/manage/check/CheckAppointment.vue'
import ModifyCenter from '../views/manage/operation/ModifyCenter.vue'
import ModifyRating from '../views/manage/operation/ModifyRating.vue'
import ModifyRatingList from '../views/manage/operation/ModifyRatingList.vue'
import CheckDetialPoint from '../views/manage/check/CheckDetialPoint.vue'
import ModifyProcess from '../views/manage/operation/ModifyProcess.vue'
import ModifyStatus from '../views/manage/operation/ModifyStatus.vue'
import ModifyQueue from '../views/manage/operation/ModifyQueue.vue'
import ModifyMessage from '../views/manage/operation/ModifyMessage.vue'


import Login from '../views/login/Login.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [

        // 登录界面
        {
            path: '/login',
            name: '',
            component: Login,

        },

        // 注册界面
        {
            path: '/register',
            name: '',
            component: Register,
        },

        // 管理端页面路由跳转
        {
            path: '/manage',
            name: '',
            component: Manage,
            children: [

                //查看已报名学生
                {
                    path: 'checkregistered',
                    name: '',
                    component: CheckRegistered,
                },

                // 查看学生的报名表
                {
                    path: 'checkpersonal',
                    name: '',
                    component: CheckPersonal,
                },

                //查看管理员个人中心
                {
                    path: 'checkcenter',
                    name: '',
                    component: CheckCenter,
                },

                //全部学生的评分
                {
                    path: 'modifyratinglist',
                    name: '',
                    component: ModifyRatingList,
                },

                //管理预约时间
                {
                    path: 'modifyprocess',
                    name: '',
                    component: ModifyProcess,
                },

                //修改进程
                {
                    path: 'modifystatus',
                    name: '',
                    component: ModifyStatus,
                },

                //管理员修改当前叫号
                {
                    path: 'modifyqueue',
                    name: '',
                    component: ModifyQueue,
                },

                //查看详细分数信息
                {
                    path: 'checkdetialpoint',
                    name: 'checkdetialpoint',
                    component: CheckDetialPoint,
                },

                //查看管理员个人中心
                {
                    path: 'checkcenter',
                    name: '',
                    component: CheckCenter,
                },

                //修改管理员信息
                {
                    path: 'modifycenter',
                    name: 'modifycenter',
                    component: ModifyCenter,
                },

                //对学生进行评分评价
                {
                    path: 'modifyrating',
                    name: 'modifyrating',
                    component: ModifyRating,
                },

                // 推送信息
                {
                    path: 'modifymessage',
                    component: ModifyMessage,
                },

                // 查看某个时间段已预约的人
                {
                    path: 'checkappointment',
                    component: CheckAppointment
                }
            ]
        },
    ]
})

export default router