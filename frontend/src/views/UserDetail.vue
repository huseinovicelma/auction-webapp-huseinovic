<template>
<div class="container mt-5">
      <div class="row mb-4 justify-content-center">
        <div class="col-md-8">
          <div class="card bg-dark text-white shadow-lg border-0">
            <div class="card-header bg-dark text-white text-center">
              <h4 class="mb-0">{{ user.username }}</h4>
            </div>
            <div class="card-body">
              <div class="d-flex flex-column align-items-start">
                <!-- Dettagli utente senza l'ID -->
                <p><strong>Nome:</strong> {{ user.name }}</p>
                <p><strong>Cognome:</strong> {{ user.surname }}</p>
              </div>
            </div>
            <div class="card-footer bg-dark text-white">
              <small>ID Utente: <span class="user-id">{{ user.id }}</span></small>
            </div>
          </div>
        </div>
      </div>
      <div v-if="wonAuctions.length">
        <div class="row mb-4">
          <div class="col-md-12">
            <div class="btn-group w-100" role="group">
                <button
                class="btn btn-lg btn-outline-primary w-50" 
                id = "wonauctions" >
                Aste Vinte
              </button>
            </div>
          </div>
        </div>
        <div class="container mt-5">
        <table class="table table-dark table-striped table-hover shadow-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Titolo</th>
              <th scope="col">Descrizione</th>
              <th scope="col">Prezzo Finale (€)</th>
              <th scope="col">Data di Fine</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="auction in wonAuctions" :key="auction.id"  @click.stop="viewDetails(auction.id)">
              <td>{{ auction.id }}</td>
              <td>{{ auction.title }}</td>
              <td>{{ auction.description }}</td>
              <td>{{ auction.currentPrice }}</td>
              <td>{{ auction.endDate }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div v-if="!wonAuctions.length" class="alert alert-warning" role="alert">
        L'utente non ha ancora vinto alcuna asta!
      </div>
    </div>
    
      </template>
      
      <script>
      export default {
        props: {
        id: Number
        },
        data() {
          return {
            user: [],
            wonAuctions:[],
          };
        },
        mounted() {
          this.loadUser(this.$route.params.id);
        },
        methods: {
            async loadUser(userid) {
                const url = `http://localhost:3000/api/users/${userid}`;
                try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                this.user = await response.json();
                await this.loadUserWonAuctions(this.user.id);
                } catch (error) {
                console.error(error.message);
                }
            },
            async loadUserWonAuctions(userId) {
                const wonUrl = `http://localhost:3000/api/auctions?assignedTo=${userId}`;

                try {
                const wonresponse = await fetch(wonUrl);
                const wonAuctions = await wonresponse.json();
                this.wonAuctions = [];
                for (let auction of wonAuctions) {
                  if (auction.expired){
                    this.wonAuctions.push(auction);
                  }
                }
                } catch (error) {
                console.error('Errore durante il caricamento delle aste:', error);
                }
            },
          viewDetails(id) {
            this.$emit("changePage", "auctiondetail", id);
        },
        },
      };
      </script>
      
      <style scoped>
      /* Custom styles for user list */
      </style>
      