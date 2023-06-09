<template>
  <div>
    <h1>Painel adm</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Id</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for=" user in users"  :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td v-if="user.role == 0">Usuario Comum</td>
            <td v-if="user.role == 1">Administrador</td>
            <td>
             <router-link :to="{name: 'UserEdit', params:{id: user.id}}"> <button class="button is-success">Editar</button> </router-link>
              <button class="button is-danger" @click="viewModal(user.id)">Deletar</button>
            </td>
          </tr>

        </tbody>
      </table>


      <div  :class="{modal: true, 'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-content">

          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Você deseja deletar o usuario?
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>Depois de confirmado, a ação não pode ser desfeita!</p>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
              <a href="#" class="card-footer-item" @click="deleteUser()">Sim, deletar</a>
            </footer>
          </div>
          </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
      </div>



  </div>
</template>

<script>
import axios from 'axios'
export default {
created(){

  var req = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

  axios.get('https://backend-user-api-xv22.onrender.com/user', req).then(res =>{
    console.log(res.data)
    this.users = res.data
  }).catch(err =>{
    console.log(err)
  })
},
data(){
    return{
      users:[],
      showModal: false,
      deleteUserId: -1
    }
},
methods:{
  hideModal(){
    this.showModal = false
  },
  viewModal(id){
    console.log("id do usuario: "+ id)
    this.showModal = true
    this.deleteUserId = id
  },
  deleteUser(){

    var req = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

    axios.delete('https://backend-user-api-xv22.onrender.com/user/'+this.deleteUserId, req).then(res =>{
      console.log(res)
      this.showModal = false
      this.users = this.users.filter(u => u.id != this.deleteUserId)
    }).catch(err =>{
      console.log(err)
      this.showModal = false
    })
  }
}
}
</script>

<style>

</style>