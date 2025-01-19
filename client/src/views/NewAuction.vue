<template>
 <div class="container mt-5">
      <h2 class="mb-4">Nuova Asta</h2>
      <form @submit.prevent="createNewauction">
        <div class="mb-3">
          <label for="auction-title" class="form-label">Titolo</label>
          <input
            type="text"
            id="auction-title"
            v-model="newAuction.title"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="auction-description" class="form-label">Descrizione</label>
          <input
            type="text"
            id="auction-description"
            v-model="newAuction.description"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="auction-endDate" class="form-label">Data di fine:</label>
          <input
            type="datetime-local"
            id="auction-endDate"
            v-model="newAuction.endDate"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="auction-startingPrice" class="form-label">Offerta di partenza</label>
          <input
            type="number"
            id="auction-startingPrice"
            v-model="newAuction.startingPrice"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Crea Asta</button>
        <button type="button" class="btn btn-secondary" @click="$emit('changePage', 'mainpage')">Annulla</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newAuction: {
          title: '',
          description: '',
          endDate: '', 
          startingPrice: ''
        },
      };
    },
    methods: {
        async createNewauction() {
        try {
          const response = await fetch('http://localhost:3000/api/auctions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              title: this.newAuction.title, 
              description: this.newAuction.description,
              endDate: this.newAuction.endDate,
              startingPrice: this.newAuction.startingPrice,
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
            this.$emit('changePage', 'mainpage');
            this.newAuction.title = '';
            this.newAuction.description = '';
            this.newAuction.endDate = '';
            this.newAuction.startingPrice = '';
          }, 1000);
        } catch (error) {
            this.editMessages(false, error.msg);
          setTimeout(() => {
            this.newAuction.title = '';
            this.newAuction.description = '';
            this.newAuction.endDate = '';
            this.newAuction.startingPrice = '';
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
  
  