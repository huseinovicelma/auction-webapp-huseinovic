<template>
    <div id="app">
      <Navbar
        :isLoggedIn="isLoggedIn" 
        :username="user.username" 
        @changePage="changePage" 
        @logout="logout" 
      />
      <div class="container mt-5">
      <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
        {{ successMessage }}
      </div>
    
      <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
      </div>
    </div>
      <router-view 
        :isLoggedIn="isLoggedIn" 
        :user="user" 
        @changePage="changePage"
        @userLoggedIn="handleUserLogin" 
        @editMsg="editMessages" 
      />
    </div>


  </template>
  
  <script>
  import Navbar from "./components/Navbar.vue";
  
  export default {
    data() {
      return {
        isLoggedIn: false,
        user: {
          username: "",
          name: "",
          surname: "",
        },
        username: '',
        userId: 0,
        successMessage: '',
        errorMessage: '',
      };
    },
    mounted() { 
      this.checkLogin();
    },
    methods: {
      changePage(page, data = null) {
        if (data) {
          this.$router.push({
            name: page,
            params: { id: data }, 
          });
        } else {
          this.$router.push({ name: page });
        }
      },
      async logout() {
        try {
          const response = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include', 
          });
      
          if (!response.ok) {
            throw new Error('Errore durante il logout');
          }
      
          this.isLoggedIn = false;
          this.username = '';
          this.userId = 0;
          this.user = [];
          this.successMessage = '';
          this.errorMessage = '';
        } catch (error) {
          //console.error('Errore durante il logout:', error.message);
        }
      },
      handleUserLogin(userData) {
        this.isLoggedIn = userData.isLoggedIn;
        if (this.isLoggedIn) {
            this.user = userData.user;
            this.userId = userData.userId;
            this.username = userData.username;
        }
       },
       editMessages(data) {
        if (data.success) {
            this.successMessage = data.successMessage;

        } else {
            this.errorMessage = data.errorMessage;
        }
        setTimeout(() => {
              this.successMessage = '';
              this.errorMessage = '';
            }, 1000);
       },
       async checkLogin() {
        try {
          const response = await fetch('http://localhost:3000/api/checklogin', {
            method: 'GET',
            credentials: 'include', 
          });
      
          if (!response.ok) {
            throw new Error('Sessione non valida o scaduta');
          }
      
          const user = await response.json();
          this.isLoggedIn = true;
          this.user = user;
          this.username = user.username;
          this.userId = user.id;
          this.changePage('mainpage');
        } catch (error) {
          const errore = error.msg;
          this.isLoggedIn = false;
          this.username = '';
          this.userId = 0;
          this.user = [];
          this.changePage('mainpage');
        }
      },
        
       
    },
    components: {
      Navbar,
    },
  };
  </script>
