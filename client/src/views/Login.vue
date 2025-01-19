<template>
    <div class="container mt-5">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="login-username" class="form-label">Username</label>
          <input type="text" id="login-username" v-model="loginData.username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="login-password" class="form-label">Password</label>
          <input type="password" id="login-password" v-model="loginData.password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Accedi</button>
        <button type="button" class="btn btn-secondary" @click="$emit('changePage', 'mainpage')">Annulla</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loginData: {
          username: "",
          password: "",
        },
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await fetch('http://localhost:3000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.loginData.username,
                password: this.loginData.password,
            }),
            credentials: 'include',
          });

          if (!response.ok) {
              const error = await response.json();
              throw { msg: error.msg };
          }

          const result = await response.json();
          this.$emit("userLoggedIn", {
              isLoggedIn: true,
              user: result,
              userId: result.id,
              username: result.username,
            });
            this.editMessages(true, result.msg);
            

          setTimeout(() => {
              this.$emit("changePage", "mainpage");
              this.loginData.username = '';
              this.loginData.password = '';
          }, 1000);

        } catch (error) {
          this.$emit("userLoggedIn", {
            isLoggedIn: false,
            });
          this.editMessages(false, error.msg);
          setTimeout(() => {
              this.loginData.username = '';
              this.loginData.password = '';
          }, 2000);
          }
      },
      editMessages(success, message) {
        if (success) {
          this.$emit("editMsg", {
            success: true,
            successMessage: message,
          });
        } else {
        this.$emit("editMsg", {
            success: false,
            errorMessage: message,
          });
        }
      },
    },
  };
  </script>
  
  