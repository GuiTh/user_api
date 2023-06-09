import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterComponent from '../views/RegisterComponent.vue'
import AboutView from '../views/AboutView.vue'
import Login from '../views/LoginComponent.vue'
import UsersComponent from '../views/UsersComponent.vue'
import axios from 'axios'
import EditComponent from '../views/EditComponent.vue'
import UserNoAdminComponent from '../views/UserNoAdminComponent.vue'


function adminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

    axios.post('https://backend-user-api-xv22.onrender.com/validate',{}, req).then(res =>{
      console.log(res)
      next()
    }).catch(err =>{
      console.log(err)
      next('/login')
    });
  }else{
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path:'/register',
    name: 'register',
    component: RegisterComponent
  },
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path:'/user',
    name:'user',
    component: UserNoAdminComponent,
  },
  {
    path:'/admin/users',
    name:'users',
    component: UsersComponent,
    beforeEnter: adminAuth
  },
  {
    path:'/admin/users/edit/:id',
    name:'UserEdit',
    component:EditComponent,
    beforeEnter: adminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
