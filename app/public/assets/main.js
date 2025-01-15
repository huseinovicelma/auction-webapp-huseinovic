const { createApp } = Vue


const app = createApp({
    data: function() {
      return {
        dropdownOpen: false,
        auctionsNotFiltered: [],
        auctions: [],
        isLoggedIn: false,   // Stato di login
        isOwner: false,
        username: '',
        userId: 0,
        loginData: {
          username: '',
          password: ''
        },
        modifyAuction: {
          title: '',
          description: ''
        },
        registrationData: {
          username: '',
          password: '',
          name: '', 
          surname: ''
        },
        newAuction: {
          title: '',
          description: '',
          endDate: '', 
          startingPrice: ''
        },
        user: [], 
        createdAuctions: [],
        wonAuctions: [],
        currentView: 'mainpage',
        showView: 'created',
        showbids: 'allBids',
        bids: [],
        newBid: {
          bidAmount: ''
        },
        auctionDetail: [],
        usersNotFiltered:[],
        users:[],
        searchQuery: '',
        searchUser: '',
        successMessage: '',
        errorMessage: '',
      }
    }, 
    mounted() {
      this.getData();
      this.checkLogin();
    },
    methods: {
      //gestione modifica pagina corrente
      showPage(view) {
        this.currentView = view; 
        if (this.currentView === 'mainpage'){
          this.getData();
        };
        if (this.currentView === 'profile'){
          this.showProfile();
        };
        if (this.currentView === 'userList'){
          this.loadUsers();
        }
      },
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
            credentials: 'include', // Include il cookie di sessione
          });
      
          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }
      
          const result = await response.json();
          this.successMessage = result.msg;
          this.isLoggedIn = true;
          this.username = result.username;
          this.userId = result.id;
          this.user = result;
      
          setTimeout(() => {
            this.showPage('mainpage');
            this.loginData.username = '';
            this.loginData.password = '';
            this.successMessage = '';
          }, 1000);
        } catch (error) {
          this.errorMessage = error.msg;
          setTimeout(() => {
            this.loginData.username = '';
            this.loginData.password = '';
            this.errorMessage = '';
          }, 2000);
        }
      },
      
      //gestione dropdown menu DA RIVEDERE  
      toggleDropdown(event) {
        const dropdownMenu = this.$refs.dropdownMenu;
    
        // Se il menu è aperto, chiudilo
        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.remove('show');
          document.removeEventListener('click', this.closeDropdownOnClickOutside);
        } else {
          // Altrimenti, aprilo
          dropdownMenu.classList.add('show');
          // Aggiungi un listener per chiudere il menu cliccando fuori
          document.addEventListener('click', this.closeDropdownOnClickOutside);
        }
      },
      closeDropdownOnClickOutside(event) {
        const dropdownMenu = this.$refs.dropdownMenu;
        const button = this.$refs.dropdownButton;
    
        // Verifica se i riferimenti esistono
        if (!dropdownMenu || !button) {
            document.removeEventListener('click', this.closeDropdownOnClickOutside);
            return;
        }
    
        // Verifica se il clic è al di fuori del menu e del pulsante
        if (!dropdownMenu.contains(event.target) && !button.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            document.removeEventListener('click', this.closeDropdownOnClickOutside);
        }
    },
    
      //fetch delle aste
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
      //filtro aste con barra di ricerca
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
      //carica dati per profilo utente
      async showProfile() {
        const url = "http://localhost:3000/api/whoami";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.user = await response.json();
          await this.loadUserWonAuctions(this.user.id);
          await this.loadUserCreatedAuctions(this.user.id);
        } catch (error) {
          console.error(error.message);
        }
      },
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
            if (result.token) {
                localStorage.setItem('jwtToken', result.token);
            }
            this.successMessage = result.msg;
            this.isLoggedIn = true;
            this.username = result.username;
            this.userId = result.id;
            this.user = result;
            localStorage.setItem('user', this.user);


            setTimeout(() => {
                this.showPage('mainpage');
                this.loginData.username = '';
                this.loginData.password = '';
                this.successMessage = '';
            }, 1000);

        } catch (error) {
            this.errorMessage = error.msg;
            setTimeout(() => {
                this.loginData.username = '';
                this.loginData.password = '';
                this.errorMessage = '';
            }, 2000);
          }
        },


      
      //gestione registrazione
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
          this.successMessage = result.msg;
          setTimeout(() => {
            this.showPage('login');
            this.successMessage = '';
          }, 1000);
        } catch (error) {
          this.errorMessage = error.msg;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
        this.registrationData.username = '';
        this.registrationData.password = '';
        this.registrationData.name = ''; 
        this.registrationData.surname = ''
      },
      //carica aste vinte da un utente
      async loadUserWonAuctions(userId) {
        const wonUrl = `http://localhost:3000/api/auctions?assignedTo=${userId}`;

        try {
          const wonresponse = await fetch(wonUrl);
          this.wonAuctions = await wonresponse.json();

        } catch (error) {
          console.error('Errore durante il caricamento delle aste:', error);
        }
      },
      //carica aste create da un utente
      async loadUserCreatedAuctions(userId) {
        // Ottieni le aste create
        const createdUrl = `http://localhost:3000/api/auctions?userId=${userId}`;

        try {
          const createdresponse = await fetch(createdUrl);
          this.createdAuctions = await createdresponse.json();
        } catch (error) {
          console.error('Errore durante il caricamento delle aste:', error);
        }
      },
      //controlla se una certa asta appartiene all'utente
      async checkOwner() {
        const url = "http://localhost:3000/api/whoami";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.user = await response.json();
        } catch (error) {
          console.error(error.message);
        }
        if (this.auctionDetail.id_user === this.user.id) {
          this.isOwner = true;
        }
        else {
          this.isOwner = false;
        }
      },
      //carica dettaglio asta
      async loadAuctionDetail(auction_id) {
        this.currentView = 'auctionDetail';
        this.showbids = 'allBids';
        const url = `http://localhost:3000/api/auctions/${auction_id}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          this.auctionDetail = [];
          this.auctionDetail = await response.json();
          const result = await fetch(`http://localhost:3000/api/users/${this.auctionDetail.assignedTo}`);
          user = await result.json();
          this.auctionDetail.assignedTousername = user.username;

          const secondresult = await fetch(`http://localhost:3000/api/users/${this.auctionDetail.id_user}`);
          user = await secondresult.json();
          this.auctionDetail.createdusername = user.username;
          this.checkOwner();
          if (this.showbids === 'allBids') {
            this.loadAllBids(auction_id);
          } 

        } catch (error) {
          console.error(error.message);
        }
      },
      //carica tutte le offerte fatte per un'asta
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
            user = await result.json();
            bid.username = user.username;
          }
          this.bids.reverse();
        } catch (error) {
          console.error(error.message);
        }
      },
      //gestisce nuova offerta
      async insertNewBid() {
        try {
          const response = await fetch(`http://localhost:3000/api/auctions/${this.auctionDetail.id}/bids`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specifica il tipo di contenuto
            },
            body: JSON.stringify({
              bidAmount: this.newBid.bidAmount// Sostituisci con i tuoi dati
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }

          const result = await response.json();
          this.successMessage = result.msg;
          setTimeout(() => {
            this.showPage('mainpage');
            this.showbids = 'allBids';
            this.successMessage = '';
            this.newBid.bidAmount = '';
          }, 1000);

        } catch (error) {
          this.errorMessage = error.msg;
          setTimeout(() => {
            this.errorMessage = '';
            this.newBid.bidAmount = '';
          }, 2000);
        }
      },
      //gestisce modica asta
      async editAuction(auction_id){
        const id = auction_id;
        try {
          const response = await fetch(`http://localhost:3000/api/auctions/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: this.modifyAuction.title,
              description: this.modifyAuction.description,
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }
          const result = await response.json();
          this.successMessage = result.msg;
          setTimeout(() => {
            this.showPage('mainpage');
            this.modifyAuction.title = '';
            this.modifyAuction.description = '';
            this.successMessage = '';
          }, 1000);
        } catch (error) {
          this.errorMessage = error.msg;
          setTimeout(() => {
            this.modifyAuction.title = '';
            this.modifyAuction.description = '';
            this.errorMessage = '';
          }, 2000);
        }
      },
      //conferma elimina asta
      async confirmDeleteAuction(auctionId) {
        if (confirm("Sicuro di voler proseguire?")) {
          await this.deleteAuction(auctionId); 
        }
      },
      //elimina asta
      async deleteAuction(auction_id) {
        const id = auction_id;
        try {
          const response = await fetch(`http://localhost:3000/api/auctions/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            const error = await response.json();
            throw { msg: error.msg };
          }
          const result = await response.json();
          this.successMessage = result.msg;
          setTimeout(() => {
            this.showPage('mainpage');
            this.successMessage = '';
          }, 1000);
        } catch (error) {
          this.errorMessage = error.msg;
          setTimeout(() => {
            this.loginData.username = '';
            this.loginData.password = '';
            this.errorMessage = '';
          }, 2000);
        }
      },
      //gestisce nuova asta
      async createNewauction() {
        try {
          const response = await fetch('http://localhost:3000/api/auctions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specifica il tipo di contenuto
            },
            body: JSON.stringify({
              title: this.newAuction.title, // Sostituisci con i tuoi dati
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
          this.successMessage = result.msg;
          this.isLoggedIn = true;
          this.user = result;
          setTimeout(() => {
            this.showPage('mainpage');
            this.newAuction.title = '';
            this.newAuction.description = '';
            this.newAuction.endDate = '';
            this.newAuction.startingPrice = '';
            this.successMessage = '';
          }, 1000);
        } catch (error) {
          this.errorMessage = error.msg;
          setTimeout(() => {
            this.newAuction.title = '';
            this.newAuction.description = '';
            this.newAuction.endDate = '';
            this.newAuction.startingPrice = '';
            this.errorMessage = '';
          }, 2000);
        }
      },
      //carica tutti gli utente
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
      //filtra utenti con ricerca
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
      //carica singolo user
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
      async checkLogin() {
        try {
          const response = await fetch('http://localhost:3000/api/checklogin', {
            method: 'GET',
            credentials: 'include', // Include il cookie di sessione
          });
      
          if (!response.ok) {
            throw new Error('Sessione non valida o scaduta');
          }
      
          const user = await response.json();
          this.isLoggedIn = true;
          this.user = user;
          this.username = user.username;
          this.userId = user.id;
          this.showPage('mainpage');
        } catch (error) {
          console.log('Errore durante il check-login:', error.message);
          this.isLoggedIn = false;
          this.username = '';
          this.userId = 0;
          this.user = [];
          this.showPage('mainpage');
        }
      },
      
      //gestisce logout(fa finta)
      async logout() {
        try {
          const response = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Include il cookie di sessione
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
      
          // Torna alla pagina principale
        } catch (error) {
          console.error('Errore durante il logout:', error.message);
        }
      },
      
    
    
      //modifica data a partire da ISOdate salvata su db
}

});

app.mount('#app');




// fare script di inizializzazione docker 
// modificare dockerfile ecc in modo che sia pronto per essere mandato 
// test test test 
