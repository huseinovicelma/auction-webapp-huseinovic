<template>
<div class="container mt-5">
      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Cerca utente..."
                aria-label="Cerca Utente"
                aria-describedby="search-button"
                v-model="searchUser" 
              />
              <button
                class="btn btn-outline-primary"
                type="button"
                id="search-button"
                @click="filterUsers" 
              >
                <i class="bi bi-search"></i> Cerca
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div
          v-for="user in users"
          :key="user.id"
          class="col-12 mb-4"
        >
          <div
            class="card bg-dark text-white shadow-lg rounded-3 w-100"
            id="clickableUserCard"
            @click="viewUser(user.id)"
            style="transition: transform 0.3s ease, box-shadow 0.3s ease;"
          >
            <div class="card-body">
              <div class="d-flex flex-column align-items-start">
                <h5 class="card-title fw-bold fs-4 mb-2">{{ user.username }}</h5>
                <p class="card-text text-muted">{{ user.name }} {{ user.surname }}</p>
              </div>
            </div>
            <div
              class="card-footer bg-dark text-white d-flex justify-content-between align-items-center"
              style="border-top: 1px solid #444;"
            >
              <small class="text-muted">User ID: <span class="user-id">{{ user.id }}</span></small>
              <span class="badge bg-primary">Click for details</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        searchUser: "",
        users: [],
        usersNotFiltered: [],
      };
    },
    mounted() {
      this.loadUsers();
    },

    methods: {
      async loadUsers() {
        const url = "http://localhost:3000/api/users";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.usersNotFiltered = await response.json();
          this.users = this.usersNotFiltered;
        } catch (error) {
          console.error(error.message);
        }
      },
      async filterUsers() {
        this.users = this.usersNotFiltered;
        this.users = this.users.filter(user => {
          const matches = user.username.toLowerCase().includes(this.searchUser.toLowerCase()) || 
                              user.name.toLowerCase().includes(this.searchUser.toLowerCase()) ||
                              user.surname.toLowerCase().includes(this.searchUser.toLowerCase()) ||
                              user.id.toString().includes(this.searchUser)

          return matches;
        });
        this.searchUser = '';
      },
      viewUser(id) {
        this.$emit("changePage", "userDetail", id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles for user list */
  </style>
  