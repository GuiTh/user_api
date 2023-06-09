<template>
    <div>
      <h2>Registro de usuarios</h2>
      <hr>
      <div class="columns  is-centered">
        <div class="column is-half">
          <div v-if="error != undefined">
            <div class="notification is-danger">
              {{ error }}
            </div>
          </div>
          <p>E-mail:</p>
          <input type="email" placeholder="email@email.com" class="input" v-model="email">
          <p>Senha:</p>
          <input type="password" placeholder="******" class="input" v-model="password">
          <hr>
          <div class="columns">
            <div class="column"></div>
            <div class="column is-one-quarter">
              <button @click="login" class="button is-success">Logar</button>
            </div>
            <div class="column is-one-quarter">
              <router-link to="/"><button class="button is-danger">Voltar</button> </router-link>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
  data(){
    return{
      password: '',
      email: '',
      error: undefined,
    }
  },
  methods:{
    login(){
    axios.post('https://backend-user-api-xv22.onrender.com/login',{
        password: this.password,
        email: this.email
    }).then(res =>{
        localStorage.setItem('token', res.data.token)
        this.$router.push({name:'user'})
    }).catch(err =>{
        var msgErro = err.response
        this.error = msgErro
    })
      }
    }
  }
  </script>
  
  <style>
  
  </style>