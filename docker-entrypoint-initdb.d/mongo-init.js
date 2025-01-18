db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
        role: "readWrite",
        db: "db"
    }
  ]
});
db = db.getSiblingDB('db');
db.createCollection('users');
db.getCollection('users').insertMany(
  [
    {
      id: 1,
      username: 'Prof.Informatica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Paperino',
      surname: 'Disney'
    },
    {
      id: 2,
      username: 'Prof.Chimica',
      password: '$2a$10$0TcOkYnBm9yPawe6e4B2uehayP7wAF0htw6KzeMFBD2xKI8Z.KJKa',
      name: 'Walter',
      surname: 'White'
    },
    {
      id: 3,
      username: 'Prof.Matematica',
      password: '$2a$10$Of/mDMjhcy1xUiYz9bTSteR6D1KbYf83bTjTYoUXGSP9hTaZcJJZu',
      name: 'Chiara',
      surname: 'Algebra'
    },
    {
      id: 4,
      username: 'Prof.Letteratura',
      password: '$2a$10$933mDsP3lKd99IAL/1s1buuKmGck7zAzEAHAoYV3dlJwBF7XZcmbe',
      name: 'Dante',
      surname: 'Alighieri'
    },
    {
      id: 5,
      username: 'Prof.Geologia',
      password: '$2a$10$eGt/9bXfkLwsfmHNeD1.UOPJtZaygJO8THi.a9kPfHF7qUagCXQwC',
      name: 'Serena',
      surname: 'Fossile'
    },
    {
      id: 6,
      username: 'Prof.Medicina',
      password: '$2a$10$cITg4D6uwmFFalNz8daTgOtyhNvC96tqFrt2I.cZYuiy96xIqMF5O',
      name: 'Gregory',
      surname: 'House'
    },
    {
      id: 7,
      username: 'Prof.Architettura',
      password: '$2a$10$XyBnCwMYqhwLu/CQr.N7ZOX7Okw4NZzVAkU2hPbzHv9p5BB8C6CMq',
      name: 'Ted',
      surname: 'Mosby'
    },
    {
      id: 8,
      username: 'Prof.Fisica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Albert',
      surname: 'Einstein'
    },
    {
      id: 9,
      username: 'Prof.Psicologia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Sigmund',
      surname: 'Freud'
    },
    {
      id: 10,
      username: 'Prof.Economia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'John',
      surname: 'Maynard Keynes'
    },
    {
      id: 11,
      username: 'Prof.Storia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Napoleon',
      surname: 'Bonaparte'
    },
    {
      id: 12,
      username: 'Prof.LinguaInglese',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'William',
      surname: 'Shakespeare'
    },
    {
      id: 13,
      username: 'Prof.Filosofia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Socrates',
      surname: 'Philosophus'
    },
    {
      id: 14,
      username: 'Prof.Musica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Ludwig',
      surname: 'Beethoven'
    },
    {
      id: 15,
      username: 'SegreteriaDidattica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Segreteria',
      surname: 'Didattica'
    },
    {
      id: 16,
      username: 'studente1',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Bobby',
      surname: 'Spaghetti'
    },
    {
      id: 17,
      username: 'studente2',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Luna',
      surname: 'Moonbeam'
    },
    {
      id: 18,
      username: 'studente3',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Ziggy',
      surname: 'Stardust'
    },
    {
      id: 19,
      username: 'studente4',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Pixel',
      surname: 'Doodle'
    },
    {
      id: 20,
      username: 'studente5',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Cleo',
      surname: 'Sparkle'
    }
  ]
);

db = db.getSiblingDB('db');
db.createCollection('auctions');
db.getCollection('auctions').insertMany(
  [
    {
      id: 1,
      id_user: 2,
      title: 'Voto: 30',
      description: 'Esame di Breaking Bad',
      endDate: ISODate('2025-01-24T15:19:00.000Z'),
      startingPrice: 20,
      assignedTo: 2,
      currentPrice: 20,
      expired: false
    },
    {
      id: 2,
      id_user: 4,
      title: 'Voto: 18',
      description: 'Voto per esame di Alfabeto 1, per quelli a cui piace accontentarsi',
      endDate: ISODate('2025-01-17T15:20:00.000Z'),
      startingPrice: 50,
      assignedTo: 16,
      currentPrice: 52,
      expired: false
    },
    {
      id: 3,
      id_user: 1,
      title: 'Voto: 27',
      description: 'Esame di Digitalizzazione dei Paperi, valutazione per veri amanti della carta e inchiostro',
      endDate: ISODate('2025-01-22T14:00:00.000Z'),
      startingPrice: 10,
      assignedTo: 19,
      currentPrice: 12,
      expired: false
    },
    {
      id: 4,
      id_user: 2,
      title: 'Voto: 28',
      description: 'Esame di Chimica degli Elementi Fantastici, per chi vuole essere il prossimo alchimista',
      endDate: ISODate('2025-01-25T16:30:00.000Z'),
      startingPrice: 20,
      assignedTo: 19,
      currentPrice: 22,
      expired: false
    },
    {
      id: 5,
      id_user: 3,
      title: 'Voto: 29',
      description: 'Esame di Geometria non Euclidea, ideale per chi ama pensare fuori dagli schemi',
      endDate: ISODate('2025-01-23T17:00:00.000Z'),
      startingPrice: 30,
      assignedTo: 3,
      currentPrice: 30,
      expired: false
    },
    {
      id: 6,
      id_user: 4,
      title: 'Voto: 24',
      description: 'Esame di Letteratura Antica, per chi ama gli scritti di Virgilio e Omero',
      endDate: ISODate('2025-01-18T12:00:00.000Z'),
      startingPrice: 12,
      assignedTo: 16,
      currentPrice: 13,
      expired: false
    },
    {
      id: 7,
      id_user: 5,
      title: 'Voto: 30',
      description: 'Esame di Geologia Interplanetaria, per chi sogna di esplorare Marte',
      endDate: ISODate('2025-01-26T18:15:00.000Z'),
      startingPrice: 23,
      assignedTo: 18,
      currentPrice: 23,
      expired: false
    },
    {
      id: 8,
      id_user: 6,
      title: 'Voto: 28L',
      description: 'Esame di Diagnostica Medica per Esperti in Emergenze, per chi vuole essere un genio della medicina',
      endDate: ISODate('2025-01-28T19:00:00.000Z'),
      startingPrice: 0,
      assignedTo: 16,
      currentPrice: 2,
      expired: false
    },
    {
      id: 9,
      id_user: 7,
      title: 'Voto: 30',
      description: 'Esame di Progettazione Architettonica Avanzata, per chi ha sogni di costruire la casa del futuro',
      endDate: ISODate('2025-01-30T20:00:00.000Z'),
      startingPrice: 22,
      assignedTo: 17,
      currentPrice: 22,
      expired: false
    },
    {
      id: 10,
      id_user: 1,
      title: 'Voto: 26',
      description: "Esame di Teoria della Sostanza Liquida, per chi ama l'acqua e tutti i suoi misteri",
      endDate: ISODate('2025-02-02T13:30:00.000Z'),
      startingPrice: 12,
      assignedTo: 1,
      currentPrice: 12,
      expired: false
    },
    {
      id: 11,
      id_user: 2,
      title: 'Voto: 29L',
      description: 'Esame di Alchimie e Reazioni Strane, per chi non ha paura di mescolare ingredienti misteriosi',
      endDate: ISODate('2025-02-05T14:45:00.000Z'),
      startingPrice: 30,
      assignedTo: 16,
      currentPrice: 30,
      expired: false
    },
    {
      id: 12,
      id_user: 3,
      title: 'Voto: 30',
      description: 'Esame di Teoria del Paradosso, per chi ama le sfide logiche e gli enigmi matematici',
      endDate: ISODate('2025-02-03T15:20:00.000Z'),
      startingPrice: 12,
      assignedTo: 20,
      currentPrice: 12,
      expired: false
    },
    {
      id: 13,
      id_user: 4,
      title: 'Voto: 27',
      description: 'Esame di Divinità e Miti Strani, per chi è pronto a incontrare gli dei della letteratura',
      endDate: ISODate('2025-02-06T17:00:00.000Z'),
      startingPrice: 14,
      assignedTo: 18,
      currentPrice: 15,
      expired: false
    },
    {
      id: 14,
      id_user: 5,
      title: 'Voto: 24',
      description: 'Esame di Geomorfologia Extraordinaria, per chi è affascinato dalla geologia dei mondi sconosciuti',
      endDate: ISODate('2025-02-08T18:30:00.000Z'),
      startingPrice: 42,
      assignedTo: 16,
      currentPrice: 52,
      expired: false
    },
    {
      id: 15,
      id_user: 6,
      title: 'Voto: 30L',
      description: 'Esame di Trattamenti Medici Inusuali, per chi ha sempre desiderato lavorare in un ospedale di fantascienza',
      endDate: ISODate('2025-02-10T19:00:00.000Z'),
      startingPrice: 45,
      assignedTo: 6,
      currentPrice: 45,
      expired: false
    },
    {
      id: 16,
      id_user: 7,
      title: 'Voto: 28',
      description: 'Esame di Tecniche per la Progettazione di Case Sospese, per chi è interessato alla domotica avanzata',
      endDate: ISODate('2025-02-12T20:10:00.000Z'),
      startingPrice: 30,
      assignedTo: 18,
      currentPrice: 30,
      expired: false
    },
    {
      id: 17,
      id_user: 8,
      title: 'Voto: 30',
      description: 'Esame di Progettazione di Stadi Sostenibili, per chi vuole costruire il campo da calcio del futuro',
      endDate: ISODate('2025-02-15T21:00:00.000Z'),
      startingPrice: 45,
      assignedTo: 17,
      currentPrice: 30,
      expired: false
    },
    {
      id: 18,
      id_user: 9,
      title: 'Voto: 27L',
      description: 'Esame di Teoria della Crescita Sostenibile, per chi vuole un mondo migliore',
      endDate: ISODate('2025-02-20T22:00:00.000Z'),
      startingPrice: 48,
      assignedTo: 19,
      currentPrice: 53,
      expired: false
    },
    {
      id: 19,
      id_user: 1,
      title: 'Voto: 30L',
      description: "Alto voto per l'esame di Mouse&Tastiera 1 per persone con alti standard",
      endDate: ISODate('2025-01-19T15:16:00.000Z'),
      startingPrice: 15,
      assignedTo: 20,
      currentPrice: 15,
      expired: false
    },
    {
      id: 20,
      id_user: 15,
      title: 'Sala Atti',
      description: "Aula calda ed accogliente, ideale per lezioni ed esami",
      endDate: ISODate('2025-01-23T15:16:00.000Z'),
      startingPrice: 1000,
      assignedTo: 1,
      currentPrice: 1000,
      expired: false
    }
  ]
);

db = db.getSiblingDB('db');
db.createCollection('bids');
db.getCollection('bids').insertMany(
  [
    {
      id: 1,
      auction_id: 2,
      id_user: 18,
      bidAmount: 30,
      timestamp: ISODate('2025-01-13T15:50:30.524Z')
    },
    {
      id: 2,
      auction_id: 2,
      id_user: 16,
      bidAmount: 52,
      timestamp: ISODate('2025-01-15T15:50:30.524Z')
    },
    {
      id: 3,
      auction_id: 3,
      id_user: 19,
      bidAmount: 12,
      timestamp: ISODate('2025-01-21T14:00:00.000Z')
    },
    {
      id: 4,
      auction_id: 4,
      id_user: 19,
      bidAmount: 22,
      timestamp: ISODate('2025-01-20T16:30:00.000Z')
    },
    {
      id: 5,
      auction_id: 4,
      id_user: 17,
      bidAmount: 20,
      timestamp: ISODate('2025-01-19T16:30:00.000Z')
    },
    {
      id: 6,
      auction_id: 6,
      id_user: 18,
      bidAmount: 12,
      timestamp: ISODate('2025-01-15T12:00:00.000Z')
    },
    {
      id: 7,
      auction_id: 6,
      id_user: 16,
      bidAmount: 13,
      timestamp: ISODate('2025-01-17T12:00:00.000Z')
    },
    {
      id: 8,
      auction_id: 7,
      id_user: 18,
      bidAmount: 23,
      timestamp: ISODate('2025-01-16T18:15:00.000Z')
    },
    {
      id: 9,
      auction_id: 18,
      id_user: 16,
      bidAmount: 52,
      timestamp: ISODate('2025-01-17T22:00:00.000Z')
    },
    {
      id: 10,
      auction_id: 19,
      id_user: 20,
      bidAmount: 15,
      timestamp: ISODate('2025-01-17T15:16:00.000Z')
    },
    {
      id: 11,
      auction_id: 8,
      id_user: 16,
      bidAmount: 2,
      timestamp: ISODate('2025-01-18T19:00:00.000Z')
    },
    {
      id: 12,
      auction_id: 9,
      id_user: 17,
      bidAmount: 22,
      timestamp: ISODate('2025-01-22T20:00:00.000Z')
    },
    {
      id: 13,
      auction_id: 11,
      id_user: 16,
      bidAmount: 30,
      timestamp: ISODate('2025-01-20T14:45:00.000Z')
    },
    {
      id: 14,
      auction_id: 12,
      id_user: 20,
      bidAmount: 12,
      timestamp: ISODate('2025-01-17T15:20:00.000Z')
    },    
    {
      id: 15,
      auction_id: 13,
      id_user: 16,
      bidAmount: 14,
      timestamp: ISODate('2025-01-20T17:00:00.000Z')
    },
    {
      id: 16,
      auction_id: 13,
      id_user: 18,
      bidAmount: 15,
      timestamp: ISODate('2025-01-22T17:00:00.000Z')
    },    
    {
      id: 17,
      auction_id: 14,
      id_user: 16,
      bidAmount: 52,
      timestamp: ISODate('2025-01-20T18:30:00.000Z')
    },
    {
      id: 18,
      auction_id: 16,
      id_user: 18,
      bidAmount: 30,
      timestamp: ISODate('2025-01-12T20:10:00.000Z')
    },   
    {
      id: 19,
      auction_id: 17,
      id_user: 17,
      bidAmount: 30,
      timestamp: ISODate('2025-01-15T21:00:00.000Z')
    },
    {
      id: 20,
      auction_id: 18,
      id_user: 19,
      bidAmount: 53,
      timestamp: ISODate('2025-01-18T22:00:00.000Z')
    },    
    {
      id: 21,
      auction_id: 20,
      id_user: 1,
      bidAmount: 1000,
      timestamp: ISODate('2025-01-18T22:00:00.000Z')
    } 

  ]
);
