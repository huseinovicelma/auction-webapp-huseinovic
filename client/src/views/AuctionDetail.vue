<template>
    <div class="container mt-5">
      <div class="row mb-4 justify-content-center">
        <div class="col-md-8">
          <div class="card bg-dark text-white shadow-lg rounded-3 border-0">
            <div class="card-header bg-dark text-white text-center border-bottom">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold fs-4">{{ auctionDetail.title }}</h5>
                <span v-if="auctionDetail.expired" class="badge bg-danger text-white fs-6 py-2 px-3">Scaduta</span>
                <span v-else class="badge bg-success text-white fs-6 py-2 px-3">Attiva</span>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text mb-3 text-muted fs-6">{{ auctionDetail.description }}</p>
              <div class="text-light fs-5">
                <strong class="fs-6">Creata da:</strong> <em>{{ auctionDetail.createdusername }}</em>
              </div>
              <div class="mb-2 text-light fs-5">
                <strong class="fs-6">Offerta corrente:</strong> <span class="fs-4">€{{ auctionDetail.currentPrice }}</span>
              </div>
              <div class="text-light fs-5">
                <strong class="fs-6">Fornita da:</strong> <em>{{ auctionDetail.assignedTousername }}</em>
              </div>
      
              <div v-if="!auctionDetail.expired" class="mt-4 text-center">
                <p class="text-white fs-5 mb-0"><strong>Scadenza:</strong></p>
                <p class="text-light fs-6 mb-0">{{ auctionDetail.endDate }}</p>
              </div>
            </div>
      
            <div class="card-footer">
              <small>ID Asta: <span class="auction-id">{{ auctionDetail.id }}</span></small>
            </div>
          </div>
        </div>
      </div>
    
      <div v-if="isLoggedIn">
        <div class="row mb-4">
          <div class="col-md-12">
            <div class="btn-group w-100" role="group">
              <button 
                class="btn btn-lg btn-outline-primary w-50" 
                :class="{'active': showbids === 'allBids'}" 
                @click.stop="showbids = 'allBids'; loadAllBids">
                Lista offerte
              </button>
              <button v-if="!isOwner && !auctionDetail.expired"
                class="btn btn-lg btn-outline-primary w-50" 
                :class="{'active': showbids === 'newBid'}" 
                @click="showbids = 'newBid'">
                Nuova offerta
              </button>
              <button v-if="isOwner && !auctionDetail.expired"
                class="btn btn-lg btn-outline-primary w-50" 
                :class="{'active': showbids === 'modifyauction'}" 
                @click.stop="showbids = 'modifyauction'">
                Modifica Asta
              </button>
              <button v-if="isOwner && !auctionDetail.expired"
                class="btn btn-lg btn-outline-primary w-50" 
                @click.stop="confirmDeleteAuction">
                Cancella Asta
              </button>
            </div>
          </div>
        </div>
    
        <div v-if="showbids === 'allBids'" class="row">
          <div v-if="bids.length">
            <div class="row">
              <div 
                v-for="bid in bids" 
                :key="bid.id" 
                class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex"
              >
                <div class="card bg-dark text-white shadow-sm w-100">
                  <div class="card-body p-3">
                    <p class="card-text mb-1">Valore Offerta: €{{ bid.bidAmount }}</p>
                    <small class="d-block mb-2">Data: {{ bid.timestamp }}</small>
                    <p class="card-text mb-0">Utente: <span class="bid-username">{{ bid.username }}</span></p>
                  </div>
                  <div class="card-footer p-2">
                    <small>ID Offerta: <span class="bid-id">{{ bid.id }}</span></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!bids.length" class="alert alert-warning" role="alert">
            Non ci sono ancora state offerte per l'asta
          </div>
        </div>

        <div v-if="showbids === 'newBid'" class="row">
          <div class="col-12 mt-4">
            <div class="card bg-dark text-white shadow-sm w-100">
              <div class="card-body">
                <form @submit.prevent="insertNewBid">
                  <div class="mb-3">
                    <label for="bidAmount" class="form-label">Importo Offerta</label>
                    <input
                      type="number"
                      id="bidAmount"
                      class="form-control"
                      v-model="newBid.bidAmount"
                      placeholder="Inserisci l'importo"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Invia Offerta</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showbids === 'modifyauction'" class="row">
          <div class="col-12 mt-4">
            <div class="card bg-dark text-white shadow-sm w-100">
              <div class="card-body">
                <h2 class="mb-4">Modifica Asta</h2>
                <form @submit.prevent="editAuction(auctionDetail.id)">
                  <div class="mb-3">
                    <label for="edit-title" class="form-label">Nuovo titolo</label>
                    <input
                      type="text"
                      id="edit-title"
                      v-model="modifyAuction.title"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="edit-description" class="form-label">Nuova descrizione</label>
                    <input
                      type="text"
                      id="edit-description"
                      v-model="modifyAuction.description"
                      class="form-control"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Invia Modifica</button>
                  <button type="button" class="btn btn-secondary" @click="$emit('changePage', 'login')">Annulla</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isLoggedIn && !auctionDetail.expired" class="alert alert-warning" role="alert">
        <a @click="$emit('changePage', 'login')" class="links">Accedi</a> 
        o <a @click="$emit('changePage', 'Signin')" class="links">Registrati</a> per fare un'offerta!
      </div>
      <div v-if="!isLoggedIn && auctionDetail.expired" class="alert alert-warning" role="alert">
        <a @click="$emit('changePage', 'login')" class="links">Accedi</a> 
        o <a @click="$emit('changePage', 'Signin')" class="links">Registrati</a> 
        per visualizzare lo storico delle offerte!
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isLoggedIn: Boolean,
      id: Number
    },
    data() {
      return{
        auctionDetail: [], 
        showbids: 'allBids', 
        bids: [],
        newBid: {
        bidAmount: 0,
        },
        isOwner: false, 
        modifyAuction: {
        title: '',
        description: '',
        },
      };
    },
    mounted() {
      this.loadAuctionDetail(this.$route.params.id);
    },
    watch: {
    "$route.params.id": {
      handler(newId) {
        this.loadAuctionDetail(newId);
      },
      immediate: true,
    },
  },
    methods: {
      async loadAuctionDetail(auction_id) {
        this.auction_id = auction_id;
        const url = `http://localhost:3000/api/auctions/${auction_id}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.auctionDetail = [];
          this.auctionDetail = await response.json();
          const endDate = this.auctionDetail.endDate;

          const result = await fetch(`http://localhost:3000/api/users/${this.auctionDetail.assignedTo}`);
          let user = await result.json();
          this.auctionDetail.assignedTousername = user.username;

          const secondresult = await fetch(`http://localhost:3000/api/users/${this.auctionDetail.id_user}`);
          user = await secondresult.json();
          this.auctionDetail.createdusername = user.username;
          this.checkOwner();
          if (this.showbids === 'allBids') {
            this.loadAllBids(auction_id);
          } 

        } catch (error) {
          //console.error(error.message);
        }
      },
      async loadAllBids() {
        const url = `http://localhost:3000/api/auctions/${this.auctionDetail.id}/bids`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.bids = await response.json();
          for (const bid of this.bids) {
            const result = await fetch(`http://localhost:3000/api/users/${bid.id_user}`);
            const user = await result.json();
            bid.username = user.username;
          }
          this.bids.reverse();
        } catch (error) {
          //console.error(error.message);
        }
      },
      async insertNewBid() {
        try {
          const response = await fetch(`http://localhost:3000/api/auctions/${this.auctionDetail.id}/bids`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              bidAmount: this.newBid.bidAmount
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }

          const result = await response.json();
          this.editMessages(true, result.msg);

          setTimeout(() => {
            this.$emit('changePage', 'mainpage')
            this.showbids = 'allBids';
            this.newBid.bidAmount = '';
          }, 1000);

        } catch (error) {
            this.editMessages(false, error.msg);
          setTimeout(() => {
            this.newBid.bidAmount = '';
          }, 2000);
        }
      },
      async editAuction(){
        try {
          const response = await fetch(`http://localhost:3000/api/auctions/${this.auctionDetail.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: this.modifyAuction.title,
              description: this.modifyAuction.description,
            }),
            credentials: 'include',
          });

          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }
          const result = await response.json();
          this.editMessages(true, result.msg);
          setTimeout(() => {
            this.$emit('changePage', 'mainpage')
            this.modifyAuction.title = '';
            this.modifyAuction.description = '';
          }, 1000);
        } catch (error) {
            this.editMessages(false, error.msg);
          setTimeout(() => {
            this.modifyAuction.title = '';
            this.modifyAuction.description = '';
          }, 2000);
        }
      },
      async confirmDeleteAuction() {
        if (confirm("Sicuro di voler proseguire?")) {
          await this.deleteAuction(this.auctionDetail.id); 
        }
      },
      async deleteAuction() {
        try {
          const response = await fetch(`http://localhost:3000/api/auctions/${this.auctionDetail.id}`, {
            method: 'DELETE',
            credentials: 'include',
          });

          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }
          const result = await response.json();
          this.editMessages(true, result.msg);
          setTimeout(() => {
            this.$emit('changePage', 'mainpage')
          }, 1000);
        } catch (error) {
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
      async checkOwner() {
        const url = "http://localhost:3000/api/whoami";
        try {
          const response = await fetch(url, {
                credentials: 'include', 
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.user = await response.json();
          if (this.auctionDetail.id_user === this.user.id) {
            this.isOwner = true;
          }
          else {
            this.isOwner = false;
          }
        } catch (error) {
          const errore = error.msg;
        }
      },
    },
  };
  </script>
  
  