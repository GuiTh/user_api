<template>
  <div>
   <h2>Bem vindo ao meu projeto de cadastro e edição de usuarios</h2>
   <hr>
   <div class="contnainer">
      <h3>Sobre:</h3>
      <p>Esse projeto foi realizado utilizando 
        <strong>Node.Js, Express, Knex e Mysql</strong> para o backend e <br>
        <strong>Vue.js, Vue Router, bulma e axios</strong> para o frontend, <br>
        se trata de uma Api de cadastro, visualização, edição e deleção de usuarios 
        com validação de usuario admin. <br>
      </p>
    </div>
<hr>
   <div class="columns">
     <div class="column">
    </div>
    <div class="column">
      <router-link to="/login"><button class="button is-success">Login</button></router-link>
    </div>
    <div class="column">
      <router-link to="/register"><button class="button is-success">Criar conta</button></router-link>
    </div>
    <div class="column">
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
}
</script>
