<template>
<div class="container mt-5">
      <div class="row mb-4 justify-content-center">
        <div class="col-md-8">
          <div class="card bg-dark text-white shadow-lg border-0">
            <div class="card-header bg-dark text-white text-center">
              <h4 class="mb-0">Profilo di {{ user.username }}</h4>
            </div>
            <div class="card-body">
              <div class="d-flex flex-column align-items-start">
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
      

      <div class="row mb-4">
        <div class="col-md-12">
          <div class="btn-group w-100" role="group">
            <button 
              class="btn btn-lg btn-outline-primary w-50" 
              :class="{'active': showView === 'created'}" 
              @click="showView = 'created'">
              Aste Create
            </button>
            <button 
              class="btn btn-lg btn-outline-primary w-50" 
              :class="{'active': showView === 'won'}" 
              @click="showView = 'won'">
              Aste Vinte
            </button>
          </div>
        </div>
      </div>

      <div v-if="showView === 'created' && createdAuctions.length" class="row">
        <div v-for="auction in createdAuctions" :key="auction.id" class="col-12 mb-4">
          <div class="card bg-dark text-white shadow-sm w-100" id="clickableCard" @click.stop="$emit('changePage', 'auctiondetail', auction.id)">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <h5 class="card-title">{{ auction.title }}</h5>
                <span
                  v-if="auction.expired"
                  class="badge bg-danger ms-auto">Scaduta</span>
                <span
                  v-else
                  class="badge bg-success ms-auto">Attiva</span>
              </div>
              <p class="card-text">{{ auction.description }}</p>
              <small class="d-block">Data di fine: {{ auction.endDate }}</small>
            </div>
            <div
            class="card-footer d-flex justify-content-between align-items-center"
            style="border-top: 1px solid #444;"
            >
              <small>ID Asta: <span class="auction-id">{{ auction.id }}</span></small>
              <span class="badge custom-orange">Click for details</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showView === 'won' && wonAuctions.length" class="row">
        <div v-for="auction in wonAuctions" :key="auction.id" class="col-12 mb-4">
          <div class="card bg-dark text-white shadow-sm w-100" id="clickableCard" @click.stop="$emit('changePage', 'auctiondetail', auction.id)">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <h5 class="card-title">{{ auction.title }}</h5>
                <span
                  v-if="auction.expired"
                  class="badge bg-danger ms-auto">Scaduta</span>
                <span
                  v-else
                  class="badge bg-success ms-auto">Attiva</span>
              </div>
              <p class="card-text">{{ auction.description }}</p>
              <small class="d-block">Data di fine: {{ auction.endDate }}</small>
            </div>
            <div
            class="card-footer d-flex justify-content-between align-items-center"
            style="border-top: 1px solid #444;"
            >
              <small>ID Asta: <span class="auction-id">{{ auction.id }}</span></small>
              <span class="badge custom-orange">Click for details</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showView === 'won' && !wonAuctions.length" class="alert alert-warning" role="alert">
        Non hai ancora vinto alcuna asta!
      </div>
      <div v-if="showView === 'created' && !createdAuctions.length" class="alert alert-warning" role="alert">
          Non hai ancora creato un'asta, <a @click="$emit('changePage', 'newauction')" class="links">crea una nuova asta!</a>
       </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: [],
        wonAuctions: [],
        createdAuctions: [],
        showView: 'created',
      };

    },
    mounted() {
      this.showProfile();
    },
    methods: {
      async showProfile() {
        const url = "http://localhost:3000/api/whoami";
        try {
          const response = await fetch(url, {
                credentials: 'include',
          });

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.user = await response.json();
          await this.loadUserWonAuctions(this.user.id);
          await this.loadUserCreatedAuctions(this.user.id);
        } catch (error) {
          //console.error(error.message);
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
          //console.error('Errore durante il caricamento delle aste:', error);
        }
      },
      async loadUserCreatedAuctions(userId) {
        // Ottieni le aste create
        const createdUrl = `http://localhost:3000/api/auctions?userId=${userId}`;

        try {
          const createdresponse = await fetch(createdUrl);
          this.createdAuctions = await createdresponse.json();
        } catch (error) {
          //console.error('Errore durante il caricamento delle aste:', error);
        }
      },
    },
  };
  </script>
