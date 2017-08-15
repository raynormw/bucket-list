'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Goods', [{
      name: 'Minyak Goreng Bimoli Spesial',
      url_pict: null,
      barcode: '8992628030137',
      goods_size: '5 Liter',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Minyak Goreng Bimoli Spesial',
      url_pict: null,
      barcode: '8992628032148',
      goods_size: '2 Liter',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Minyak Goreng Bimoli Spesial',
      url_pict: null,
      barcode: '8992628034142',
      goods_size: '1 Liter',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Minyak Goreng Filma Botol',
      url_pict: null,
      barcode: '8992826111027',
      goods_size: '500 ml',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Minyak Goreng Kunci Mas',
      url_pict: null,
      barcode: '8992826112017',
      goods_size: '225 ml',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gulaku Kuning',
      url_pict: null,
      barcode: '8995177102058',
      goods_size: '1 Kg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gulaku Hijau - DUS',
      url_pict: null,
      barcode: '8995177101129',
      goods_size: '1 Kg / 20 Pcs',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gula Pasir LA KU',
      url_pict: null,
      barcode: '8993428103021',
      goods_size: '1 Kg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gula Premium PSM',
      url_pict: null,
      barcode: '8997013630015',
      goods_size: '1 Kg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Beras Kepala Jago Hijau',
      url_pict: null,
      barcode: '-',
      goods_size: '25 Kg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Beras Rojo Lele',
      url_pict: null,
      barcode: '-',
      goods_size: '5 Kg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Susu Beruang (Bear Brand)',
      url_pict: null,
      barcode: '8992696404441',
      goods_size: '189 ml',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Susu Beruang (Bear Brand) - DUS',
      url_pict: null,
      barcode: '08850124003133',
      goods_size: '189 ml 30 pcs',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Dancow Calcium Plus',
      url_pict: null,
      barcode: '8992696423404',
      goods_size: '250 g',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Baygon Natural Orange',
      url_pict: null,
      barcode: '8998899400334',
      goods_size: '600ml',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Baygon Oil Spray GD',
      url_pict: null,
      barcode: '8998899001357',
      goods_size: '600ml',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'ABC Cappucino Coffee Cream',
      url_pict: null,
      barcode: '711844165809',
      goods_size: '600ml',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'ABC Cappucino Coklat',
      url_pict: null,
      barcode: '711844165854',
      goods_size: '600ml',
      createdAt: new Date(),
      updatedAt: new Date()
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
