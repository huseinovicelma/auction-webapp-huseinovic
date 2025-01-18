<template>
    <div class="container mt-5">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Cerca asta..." v-model="searchQuery" />
        <button class="btn btn-outline-primary" @click="filterAsta">Cerca</button>
      </div>
      <div v-for="auction in auctions" :key="auction.id" class="col-12 mb-4">
          <div class="card bg-dark text-white shadow-sm w-100" id="clickableCard" @click.stop="$emit('changePage', 'auctiondetail', auction.id)">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <h5 class="card-title">{{ auction.title }}</h5>
                <!-- Badge indicante se l'asta è attiva o scaduta -->
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "",
        auctions: [],
        auctionsNotFiltered: [],
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        const url = "http://localhost:3000/api/auctions";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.auctionsNotFiltered = await response.json();
          this.auctions = this.auctionsNotFiltered;
        } catch (error) {
          console.error(error.message);
        }
      },
      async filterAsta() {
        this.auctions = this.auctionsNotFiltered;
        this.auctions = this.auctions.filter(auction => {
          const matchesTitle = auction.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                               auction.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                               auction.id.toString().includes(this.searchQuery)

          return matchesTitle;
        });
        this.searchQuery = '';
      },
      viewDetails(id) {
        this.$emit("changePage", "auctionDetail", id);
      },
    },
  };
  </script>
  
 
  