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
      _id: ObjectId('6787c17d6c4a61131561d5e4'),
      id: 1,
      username: 'Prof.Informatica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Paperino',
      surname: 'Disney'
    },
    {
      _id: ObjectId('6787c1c06c4a61131561d5e5'),
      id: 2,
      username: 'Prof.Chimica',
      password: '$2a$10$0TcOkYnBm9yPawe6e4B2uehayP7wAF0htw6KzeMFBD2xKI8Z.KJKa',
      name: 'Walter',
      surname: 'White'
    },
    {
      _id: ObjectId('6787c2006c4a61131561d5e6'),
      id: 3,
      username: 'Prof.Matematica',
      password: '$2a$10$Of/mDMjhcy1xUiYz9bTSteR6D1KbYf83bTjTYoUXGSP9hTaZcJJZu',
      name: 'Chiara',
      surname: 'Algebra'
    },
    {
      _id: ObjectId('6787c26b6c4a61131561d5e7'),
      id: 4,
      username: 'Prof.Letteratura',
      password: '$2a$10$933mDsP3lKd99IAL/1s1buuKmGck7zAzEAHAoYV3dlJwBF7XZcmbe',
      name: 'Dante',
      surname: 'Alighieri'
    },
    {
      _id: ObjectId('6787c29a6c4a61131561d5e8'),
      id: 5,
      username: 'Prof.Geologia',
      password: '$2a$10$eGt/9bXfkLwsfmHNeD1.UOPJtZaygJO8THi.a9kPfHF7qUagCXQwC',
      name: 'Serena',
      surname: 'Fossile'
    },
    {
      _id: ObjectId('6787c2d16c4a61131561d5e9'),
      id: 6,
      username: 'Prof.Medicina',
      password: '$2a$10$cITg4D6uwmFFalNz8daTgOtyhNvC96tqFrt2I.cZYuiy96xIqMF5O',
      name: 'Gregory',
      surname: 'House'
    },
    {
      _id: ObjectId('6787c2f26c4a61131561d5ea'),
      id: 7,
      username: 'Prof.Architettura',
      password: '$2a$10$XyBnCwMYqhwLu/CQr.N7ZOX7Okw4NZzVAkU2hPbzHv9p5BB8C6CMq',
      name: 'Ted',
      surname: 'Mosby'
    },
    {
      _id: ObjectId('6787c3006c4a61131561d5eb'),
      id: 8,
      username: 'Prof.Fisica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Albert',
      surname: 'Einstein'
    },
    {
      _id: ObjectId('6787c31a6c4a61131561d5ec'),
      id: 9,
      username: 'Prof.Psicologia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Sigmund',
      surname: 'Freud'
    },
    {
      _id: ObjectId('6787c3336c4a61131561d5ed'),
      id: 10,
      username: 'Prof.Economia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'John',
      surname: 'Maynard Keynes'
    },
    {
      _id: ObjectId('6787c34c6c4a61131561d5ee'),
      id: 11,
      username: 'Prof.Storia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Napoleon',
      surname: 'Bonaparte'
    },
    {
      _id: ObjectId('6787c35d6c4a61131561d5ef'),
      id: 12,
      username: 'Prof.LinguaInglese',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'William',
      surname: 'Shakespeare'
    },
    {
      _id: ObjectId('6787c36e6c4a61131561d5f0'),
      id: 13,
      username: 'Prof.Filosofia',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Socrates',
      surname: 'Philosophus'
    },
    {
      _id: ObjectId('6787c37f6c4a61131561d5f1'),
      id: 14,
      username: 'Prof.Musica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Ludwig',
      surname: 'Beethoven'
    },
    {
      _id: ObjectId('6787c3806c4a61131561d610'),
      id: 15,
      username: 'SegreteriaDidattica',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Segreteria',
      surname: 'Didattica'
    },
    {
      _id: ObjectId('6787c3916c4a61131561d611'),
      id: 16,
      username: 'studente1',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Bobby',
      surname: 'Spaghetti'
    },
    {
      _id: ObjectId('6787c3a16c4a61131561d612'),
      id: 17,
      username: 'studente2',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Luna',
      surname: 'Moonbeam'
    },
    {
      _id: ObjectId('6787c3b16c4a61131561d613'),
      id: 18,
      username: 'studente3',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Ziggy',
      surname: 'Stardust'
    },
    {
      _id: ObjectId('6787c3c16c4a61131561d614'),
      id: 19,
      username: 'studente4',
      password: '$2a$10$fJJMBMP2LF2ICaL0OQjaNefbB5ftCUTgTYpHPgN6.FI51IRSTSrfK',
      name: 'Pixel',
      surname: 'Doodle'
    },
    {
      _id: ObjectId('6787c3d16c4a61131561d615'),
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
      _id: ObjectId('6787c3ff6c4a61131561d5ec'),
      id: 1,
      id_user: 2,
      title: 'Voto: 30',
      description: 'Esame di Breaking Bad',
      endDate: ISODate('2025-01-24T15:19:00.000Z'),
      startingPrice: 20,
      assignedTo: 18,
      currentPrice: 25,
      expired: false
    },
    {
      _id: ObjectId('6787c4516c4a61131561d5ed'),
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
      _id: ObjectId('6787c4a06c4a61131561d5f0'),
      id: 3,
      id_user: 1,
      title: 'Voto: 27',
      description: 'Esame di Digitalizzazione dei Paperi, valutazione per veri amanti della carta e inchiostro',
      endDate: ISODate('2025-01-22T14:00:00.000Z'),
      startingPrice: 10,
      assignedTo: 16,
      currentPrice: 30,
      expired: false
    },
    {
      _id: ObjectId('6787c4b16c4a61131561d5f1'),
      id: 4,
      id_user: 2,
      title: 'Voto: 28',
      description: 'Esame di Chimica degli Elementi Fantastici, per chi vuole essere il prossimo alchimista',
      endDate: ISODate('2025-01-25T16:30:00.000Z'),
      startingPrice: 25,
      assignedTo: 16,
      currentPrice: 35,
      expired: false
    },
    {
      _id: ObjectId('6787c4c16c4a61131561d5f2'),
      id: 5,
      id_user: 3,
      title: 'Voto: 29',
      description: 'Esame di Geometria non Euclidea, ideale per chi ama pensare fuori dagli schemi',
      endDate: ISODate('2025-01-23T17:00:00.000Z'),
      startingPrice: 30,
      assignedTo: 16,
      currentPrice: 40,
      expired: false
    },
    {
      _id: ObjectId('6787c4d26c4a61131561d5f3'),
      id: 6,
      id_user: 4,
      title: 'Voto: 24',
      description: 'Esame di Letteratura Antica, per chi ama gli scritti di Virgilio e Omero',
      endDate: ISODate('2025-01-18T12:00:00.000Z'),
      startingPrice: 15,
      assignedTo: 17,
      currentPrice: 17,
      expired: false
    },
    {
      _id: ObjectId('6787c4e36c4a61131561d5f4'),
      id: 7,
      id_user: 5,
      title: 'Voto: 30',
      description: 'Esame di Geologia Interplanetaria, per chi sogna di esplorare Marte',
      endDate: ISODate('2025-01-26T18:15:00.000Z'),
      startingPrice: 40,
      assignedTo: 20,
      currentPrice: 45,
      expired: false
    },
    {
      _id: ObjectId('6787c4f46c4a61131561d5f5'),
      id: 8,
      id_user: 6,
      title: 'Voto: 28L',
      description: 'Esame di Diagnostica Medica per Esperti in Emergenze, per chi vuole essere un genio della medicina',
      endDate: ISODate('2025-01-28T19:00:00.000Z'),
      startingPrice: 50,
      assignedTo: 16,
      currentPrice: 55,
      expired: false
    },
    {
      _id: ObjectId('6787c5056c4a61131561d5f6'),
      id: 9,
      id_user: 7,
      title: 'Voto: 30',
      description: 'Esame di Progettazione Architettonica Avanzata, per chi ha sogni di costruire la casa del futuro',
      endDate: ISODate('2025-01-30T20:00:00.000Z'),
      startingPrice: 60,
      assignedTo: 18,
      currentPrice: 63,
      expired: false
    },
    {
      _id: ObjectId('6787c5166c4a61131561d5f7'),
      id: 10,
      id_user: 1,
      title: 'Voto: 26',
      description: "Esame di Teoria della Sostanza Liquida, per chi ama l'acqua e tutti i suoi misteri",
      endDate: ISODate('2025-02-02T13:30:00.000Z'),
      startingPrice: 12,
      assignedTo: 19,
      currentPrice: 13,
      expired: false
    },
    {
      _id: ObjectId('6787c5276c4a61131561d5f8'),
      id: 11,
      id_user: 2,
      title: 'Voto: 29L',
      description: 'Esame di Alchimie e Reazioni Strane, per chi non ha paura di mescolare ingredienti misteriosi',
      endDate: ISODate('2025-02-05T14:45:00.000Z'),
      startingPrice: 35,
      assignedTo: 20,
      currentPrice: 36,
      expired: false
    },
    {
      _id: ObjectId('6787c5386c4a61131561d5f9'),
      id: 12,
      id_user: 3,
      title: 'Voto: 30',
      description: 'Esame di Teoria del Paradosso, per chi ama le sfide logiche e gli enigmi matematici',
      endDate: ISODate('2025-02-03T15:20:00.000Z'),
      startingPrice: 20,
      assignedTo: 17,
      currentPrice: 23,
      expired: false
    },
    {
      _id: ObjectId('6787c5496c4a61131561d5fa'),
      id: 13,
      id_user: 4,
      title: 'Voto: 27',
      description: 'Esame di Divinità e Miti Strani, per chi è pronto a incontrare gli dei della letteratura',
      endDate: ISODate('2025-02-06T17:00:00.000Z'),
      startingPrice: 18,
      assignedTo: 16,
      currentPrice: 19,
      expired: false
    },
    {
      _id: ObjectId('6787c55a6c4a61131561d5fb'),
      id: 14,
      id_user: 5,
      title: 'Voto: 24',
      description: 'Esame di Geomorfologia Extraordinaria, per chi è affascinato dalla geologia dei mondi sconosciuti',
      endDate: ISODate('2025-02-08T18:30:00.000Z'),
      startingPrice: 22,
      assignedTo: 19,
      currentPrice: 24,
      expired: false
    },
    {
      _id: ObjectId('6787c56b6c4a61131561d5fc'),
      id: 15,
      id_user: 6,
      title: 'Voto: 30L',
      description: 'Esame di Trattamenti Medici Inusuali, per chi ha sempre desiderato lavorare in un ospedale di fantascienza',
      endDate: ISODate('2025-02-10T19:00:00.000Z'),
      startingPrice: 45,
      assignedTo: 18,
      currentPrice: 46,
      expired: false
    },
    {
      _id: ObjectId('6787c57c6c4a61131561d5fd'),
      id: 16,
      id_user: 7,
      title: 'Voto: 28',
      description: 'Esame di Tecniche per la Progettazione di Case Sospese, per chi è interessato alla domotica avanzata',
      endDate: ISODate('2025-02-12T20:10:00.000Z'),
      startingPrice: 50,
      assignedTo: 20,
      currentPrice: 53,
      expired: false
    },
    {
      _id: ObjectId('6787c58d6c4a61131561d5fe'),
      id: 17,
      id_user: 8,
      title: 'Voto: 30',
      description: 'Esame di Progettazione di Stadi Sostenibili, per chi vuole costruire il campo da calcio del futuro',
      endDate: ISODate('2025-02-15T21:00:00.000Z'),
      startingPrice: 45,
      assignedTo: 19,
      currentPrice: 50,
      expired: false
    },
    {
      _id: ObjectId('6787c59e6c4a61131561d5ff'),
      id: 18,
      id_user: 9,
      title: 'Voto: 27L',
      description: 'Esame di Teoria della Crescita Sostenibile, per chi vuole un mondo migliore',
      endDate: ISODate('2025-02-20T22:00:00.000Z'),
      startingPrice: 48,
      assignedTo: 20,
      currentPrice: 55,
      expired: false
    },
    {
      _id: ObjectId('6787c3706c4a61131561d5eb'),
      id: 19,
      id_user: 1,
      title: 'Voto: 30L',
      description: "Alto voto per l'esame di Mouse&Tastiera 1 per persone con alti standard",
      endDate: ISODate('2025-01-19T15:16:00.000Z'),
      startingPrice: 15,
      assignedTo: 16,
      currentPrice: 20,
      expired: false
    }
  ]
);

db = db.getSiblingDB('db');
db.createCollection('bids');
db.getCollection('bids').insertMany(
  [
    {
      _id: ObjectId('6787ce58a72fb825da1f20e4'),
      id: 1,
      auction_id: 0,
      id_user: 17,
      bidAmount: 18,
      timestamp: ISODate('2025-01-15T15:10:00.524Z')
    },
    {
      _id: ObjectId('6787ce69a72fb825da1f20e5'),
      id: 2,
      auction_id: 1,
      id_user: 18,
      bidAmount: 25,
      timestamp: ISODate('2025-01-15T15:20:10.524Z')
    },
    {
      _id: ObjectId('6787ce7aa72fb825da1f20e6'),
      id: 3,
      auction_id: 2,
      id_user: 16,
      bidAmount: 52,
      timestamp: ISODate('2025-01-15T15:30:25.524Z')
    },
    {
      _id: ObjectId('6787ce8ba72fb825da1f20e7'),
      id: 4,
      auction_id: 3,
      id_user: 19,
      bidAmount: 12,
      timestamp: ISODate('2025-01-15T15:35:45.524Z')
    },
    {
      _id: ObjectId('6787ce9ca72fb825da1f20e8'),
      id: 5,
      auction_id: 4,
      id_user: 20,
      bidAmount: 11,
      timestamp: ISODate('2025-01-15T15:40:00.524Z')
    },
    {
      _id: ObjectId('6787ceadc72fb825da1f20e9'),
      id: 6,
      auction_id: 5,
      id_user: 18,
      bidAmount: 33,
      timestamp: ISODate('2025-01-15T15:50:30.524Z')
    },
    {
      _id: ObjectId('6787cebed72fb825da1f20ea'),
      id: 7,
      auction_id: 6,
      id_user: 17,
      bidAmount: 35,
      timestamp: ISODate('2025-01-15T15:55:10.524Z')
    },
    {
      _id: ObjectId('6787ceced72fb825da1f20eb'),
      id: 8,
      auction_id: 7,
      id_user: 20,
      bidAmount: 45,
      timestamp: ISODate('2025-01-15T16:00:25.524Z')
    },
    {
      _id: ObjectId('6787ceded72fb825da1f20ec'),
      id: 9,
      auction_id: 8,
      id_user: 16,
      bidAmount: 55,
      timestamp: ISODate('2025-01-15T16:05:40.524Z')
    },
    {
      _id: ObjectId('6787ceeed72fb825da1f20ed'),
      id: 10,
      auction_id: 9,
      id_user: 18,
      bidAmount: 63,
      timestamp: ISODate('2025-01-15T16:10:50.524Z')
    },
    {
      _id: ObjectId('6787cf0fd72fb825da1f20ee'),
      id: 11,
      auction_id: 10,
      id_user: 19,
      bidAmount: 13,
      timestamp: ISODate('2025-01-15T16:20:05.524Z')
    },
    {
      _id: ObjectId('6787cf1ed72fb825da1f20ef'),
      id: 12,
      auction_id: 11,
      id_user: 20,
      bidAmount: 36,
      timestamp: ISODate('2025-01-15T16:25:30.524Z')
    },
    {
      _id: ObjectId('6787cf2fd72fb825da1f20f0'),
      id: 13,
      auction_id: 12,
      id_user: 17,
      bidAmount: 23,
      timestamp: ISODate('2025-01-15T16:30:15.524Z')
    },
    {
      _id: ObjectId('6787cf40d72fb825da1f20f1'),
      id: 14,
      auction_id: 13,
      id_user: 16,
      bidAmount: 19,
      timestamp: ISODate('2025-01-15T16:35:50.524Z')
    },
    {
      _id: ObjectId('6787cf51d72fb825da1f20f2'),
      id: 15,
      auction_id: 14,
      id_user: 19,
      bidAmount: 24,
      timestamp: ISODate('2025-01-15T16:40:00.524Z')
    },
    {
      _id: ObjectId('6787cf62d72fb825da1f20f3'),
      id: 16,
      auction_id: 15,
      id_user: 18,
      bidAmount: 46,
      timestamp: ISODate('2025-01-15T16:45:10.524Z')
    },
    {
      _id: ObjectId('6787cf73d72fb825da1f20f4'),
      id: 17,
      auction_id: 16,
      id_user: 20,
      bidAmount: 53,
      timestamp: ISODate('2025-01-15T16:50:25.524Z')
    },
    {
      _id: ObjectId('6787cf84d72fb825da1f20f5'),
      id: 18,
      auction_id: 17,
      id_user: 19,
      bidAmount: 50,
      timestamp: ISODate('2025-01-15T16:55:40.524Z')
    },
    {
      _id: ObjectId('6787cf95d72fb825da1f20f6'),
      id: 19,
      auction_id: 18,
      id_user: 20,
      bidAmount: 55,
      timestamp: ISODate('2025-01-15T17:00:10.524Z')
    }, 
    {
      _id: ObjectId('6787ce47a72fb825da1f20e3'),
      id: 20,
      auction_id: 0,
      id_user: 16,
      bidAmount: 17,
      timestamp: ISODate('2025-01-15T15:03:35.524Z')
    }
  ]
);
