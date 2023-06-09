<template>
    <div>
        <h1>Conheça meus outros projetos</h1>
        <hr>
        <div class="column is-two-quarters">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-96x96">
                            <img src="../assets/geradorQrCode.jpg" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">Gerador QrCode</p>
                            <a href="https://geraqrcode.netlify.app"><p class="subtitle is-6">Veja</p></a>
                        </div>
                        </div>

                        <div class="content">
                            Um gerador de QR Code moderno e intuitivo, construído utilizando ReactJs. 
                            
                            O objetivo desta ferramenta é permitir que os usuários gerem facilmente QR Codes personalizados para uma variedade de finalidades, como compartilhamento de informações, links para sites, detalhes de contato e muito mais.
                        <br>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-96x96">
                            <img src="../assets/taxas_de_cambio.jpg" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">Currency Api</p>
                            <a href="https://apiconversor.netlify.app"><p class="subtitle is-6">Veja</p></a>
                        </div>
                        </div>

                        <div class="content">
                            Um conversor de Moedas feito em react que converte qualquer valor em tempo real atraves da Api <a href="https://freecurrencyapi.com">free currency Api</a>
                        <br>
                        </div>
                    </div>
                </div>
                <hr>
                <a href="https://guithportifolio.netlify.app"><button class="button is-success">Veja mais no meu Portifolio</button></a>
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