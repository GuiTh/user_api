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
        <p>Nome:</p>
        <input type="text" placeholder="Nome do Usuario" class="input" v-model="name">
        <p>E-mail:</p>
        <input type="email" placeholder="email@email.com" class="input" v-model="email">
        <p>Senha:</p>
        <input type="password" placeholder="******" class="input" v-model="password">
        <hr>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-one-quarter">
              <button @click="register" class="button is-success">Cadastrar</button>
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
    name: '',
    password: '',
    email: '',
    error: undefined,
  }
},
methods:{
  register(){
    axios.post('https://backend-user-api-xv22.onrender.com/user',{
      name: this.name,
      password: this.password,
      email: this.email
    }).then(res =>{
      console.log(res)
      this.$router.push({name: "home"})
    }).catch(err =>{
      var msgErro = err.response.data.err
      this.error = msgErro
    })
    }
  }
}
</script>

<style>

</style>