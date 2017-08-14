'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Stores', [{
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
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {})
    */
  }
}
