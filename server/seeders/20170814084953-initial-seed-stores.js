'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Stores', [{
      name: 'Indomaret Tanah Kusir 2',
      lat_long: [-6.258129, 106.782308],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ranch Market Pondok Indah',
      lat_long: [-6.262535, 106.784161],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Alfamart Darama Putra Raya',
      lat_long: [-6.254726, 106.783699],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Giant Blok M',
      lat_long: [-6.243690, 106.797519],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Hero Pondok Indah Mall 1',
      lat_long: [-6.265655, 106.784906],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Super Indo Mampang',
      lat_long: [-6.260995, 106.829432],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Lion Parcel Fatmawati',
      lat_long: [-6.264241, 106.798406],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Lotte Mart Fatmawati',
      lat_long: [-6.276683, 106.797343],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Alfamart Patal Senayan',
      lat_long: [-6.218670, 106.793796],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Lotte Mart Ratu Plaza',
      lat_long: [-6.226832, 106.801388],
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Stores', [{
      name: 'Indomaret Tanah Kusir 2',
      lat_long: [-6.258129, 106.782308]
    }, {
      name: 'Ranch Market Pondok Indah',
      lat_long: [-6.262535, 106.784161]
    }, {
      name: 'Alfamart Darama Putra Raya',
      lat_long: [-6.254726, 106.783699]
    }, {
      name: 'Giant Blok M',
      lat_long: [-6.243690, 106.797519]
    }, {
      name: 'Hero Pondok Indah Mall 1',
      lat_long: [-6.265655, 106.784906]
    }, {
      name: 'Super Indo Mampang',
      lat_long: [-6.260995, 106.829432]
    }, {
      name: 'Lion Parcel Fatmawati',
      lat_long: [-6.264241, 106.798406]
    }, {
      name: 'Lotte Mart Fatmawati',
      lat_long: [-6.276683, 106.797343]
    }, {
      name: 'Alfamart Patal Senayan',
      lat_long: [-6.218670, 106.793796]
    }, {
      name: 'Lotte Mart Ratu Plaza',
      lat_long: [-6.226832, 106.801388]
    }], {})
  }
}
