<template>
  <nav class="navbar navbar-light bg-body-tertiary">
    <div class="container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
      <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
        <!-- Navbar Brand -->
        <router-link class="navbar-brand me-lg-4" to="/">LaureAsta</router-link>
        <ul class="navbar-nav d-flex flex-column flex-lg-row mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Lista utenti</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/newauction">Crea Nuova Asta</router-link>
          </li>
        </ul>
      </div>

      <div v-if="!isLoggedIn" class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
        <router-link class="btn btn-primary me-lg-3 mb-2 mb-lg-0" to="/login">Login</router-link>
        <router-link class="btn btn-primary me-lg-3 mb-2 mb-lg-0" to="/signin">Registrazione</router-link>
      </div>

      <div v-if="isLoggedIn" class="d-flex align-items-center position-relative">
        <button class="btn btn-secondary" @click="toggleMenu">
          Ciao, {{ username }}
        </button>
        <div v-if="menuVisible" class="custom-menu">
          <router-link class="menu-item" to="/profile">Profilo</router-link>
          <a class="menu-item" href="#" @click="$emit('logout')">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  props: {
    isLoggedIn: Boolean,
    username: String
  },
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenu() {
      this.menuVisible = false;
    },
    handleClickOutside(event) {
      // Verifica se il clic è avvenuto fuori dal menu
      if (!this.$el.contains(event.target)) {
        this.closeMenu();
      }
    }
  },
  mounted() {
    // Aggiunge il listener all'evento click sul documento
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    // Rimuove il listener all'evento click sul documento
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>


<style scoped>
.custom-menu {
  color:white;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2d3436;
  border: 1px solid #000000;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1050;
}

.menu-item {
  display: block;
  padding: 8px 12px;
  color: white;
  text-decoration: none;
}

.menu-item:hover {
  background-color: black;
}
</style>
