<template>
    <div class="container mt-5">
        <h2 class="mb-4">Registrazione</h2>
      <form @submit.prevent="handleRegistration">
        <div class="mb-3">
          <label for="signup-name" class="form-label">Name</label>
          <input
            type="text"
            id="signup-name"
            v-model="registrationData.name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="signup-surname" class="form-label">Surname</label>
          <input
            type="text"
            id="signup-surname"
            v-model="registrationData.surname"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="signup-username" class="form-label">Username</label>
          <input
            type="text"
            id="signup-username"
            v-model="registrationData.username"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="signup-password" class="form-label">Password</label>
          <input
            type="password"
            id="signup-password"
            v-model="registrationData.password"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Registrati</button>
        <button type="button" class="btn btn-secondary" @click="$emit('changePage', 'mainpage')">Annulla</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        registrationData: {
          username: '',
          password: '',
          name: '', 
          surname: ''
        },
      };
    },
    methods: {
        async handleRegistration() {
        try {
          const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.registrationData.username,
              password: this.registrationData.password,
              name: this.registrationData.name, 
              surname: this.registrationData.surname
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }
          const result = await response.json();
          this.editMessages(true, result.msg);
          setTimeout(() => {
            this.$emit("changePage", "mainpage");
          }, 1000);
        } catch (error) {
          this.editMessages(false, error.msg);
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
        this.registrationData.username = '';
        this.registrationData.password = '';
        this.registrationData.name = ''; 
        this.registrationData.surname = ''
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
  }};
  </script>
  
  