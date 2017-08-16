<template>
  <div id="stores" class="container">
    <section class="section" id="form_goods">
      <div class="field">
        <label class="label"> Goods Barcode </label>
        <div class="control">
          <input v-model='goodsBarcode' type="text" class="input" placeholder="Insert goods barcode here">
        </div>
        <label class="label"> Goods name </label>
        <div class="control">
          <input v-model='goodsName' type="text" class="input" placeholder="Goods name">
        </div>
        <label class="label"> Goods URL Picture </label>
        <div class="control">
          <input v-model='goodsUrlPict' type="text" class="input" placeholder="Insert URl picture here">
        </div>
        <label class="label"> Goods Description </label>
        <div class="control">
          <input v-model='goodsDesc' type="text" class="input" placeholder="Insert goods description here">
        </div>
        <label class="label"> Goods Size </label>
        <div class="control">
          <input v-model='goodsSize' type="text" class="input" placeholder="Insert goods size here">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="postGoods" class="button is-primary" >Submit</button>
        </div>
        <div class="control">
          <button @click='emptyGoodsForm' class="button is-link">Cancel</button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Barcode </th>
              <th> Goods Name </th>
              <th> URl Picture </th>
              <th> Description </th>
              <th> Goods Size </th>
              <th> Delete Goods </th>
              <th> Update Goods </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Barcode </th>
              <th> Goods Name </th>
              <th> URl Picture </th>
              <th> Description </th>
              <th> Goods Size </th>
              <th> Delete Goods </th>
              <th> Update Goods </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='good in goods'>
              <td> {{goods.indexOf(good) + 1}} </td>
              <td> {{good.id}} </td>
              <td> {{good.barcode}} </td>
              <td> {{good.name}} </td>
              <td id="wrap_cell"> {{good.url_pict}} </td>
              <td> {{good.desc}} </td>
              <td> {{good.goods_size}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(good)" > Delete </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(good)'> Update </button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div :class='updateModal'>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Store</p>
          <button @click='closeModal' class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label"> Goods Barcode </label>
            <div class="control">
              <input v-model='UpdateGoodsBarcode' type="text" class="input" placeholder="Insert goods barcode here">
            </div>
            <label class="label"> Goods Name </label>
            <div class="control">
              <input v-model='UpdateGoodsName' type="text" class="input">
            </div>
            <label class="label"> Goods URL Picture </label>
            <div class="control">
              <input v-model='UpdateGoodsUrlPict' type="text" class="input">
            </div>
            <label class="label"> Goods Description </label>
            <div class="control">
              <input v-model='UpdateGoodsDesc' type="text" class="input">
            </div>
            <label class="label"> Goods Size </label>
            <div class="control">
              <input v-model='UpdateGoodsSize' type="text" class="input">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click='submitGoodsUpdate'>Save changes</button>
          <button class="button" @click='closeModal'>Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'goods',
  data () {
    return {
      goods: [],
      goodsBarcode: '',
      goodsName: '',
      goodsUrlPict: '',
      goodsDesc: '',
      goodsSize: '',
      updateModal: 'modal',
      UpdateGoodsBarcode: '',
      UpdateGoodsId: '',
      UpdateGoodsName: '',
      UpdateGoodsUrlPict: '',
      UpdateGoodsDesc: '',
      UpdateGoodsSize: ''
    }
  },
  methods: {
    getGoods: function () {
      var self = this
      axios.get('http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/goods')
      .then(function (goods) {
        self.goods = goods.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postGoods: function () {
      var self = this
      axios.post('http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/goods', {
        barcode: self.goodsBarcode,
        name: self.goodsName,
        url_pict: self.goodsUrlPict,
        desc: self.goodsDesc,
        goods_size: self.goodsSize
      })
      .then(function (goods) {
        self.getGoods()
        self.emptyGoodsForm()
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    emptyGoodsForm: function () {
      var self = this
      self.goodsName = ''
      self.goodsUrlPict = ''
      self.goodsDesc = ''
      self.goodsBarcode = ''
      self.goodsSize = ''
    },
    confirmDelete: function (goods) {
      var self = this
      var choice = confirm(`Are you sure want to delete this?\n Id: ${goods.id} \n Barcode: ${goods.barcode} \n Name: ${goods.name} \n URl Pict: ${goods.url_pict} \n Description: ${goods.desc}`)
      if (choice === true) {
        axios.delete(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/goods/${goods.id}`)
        .then(function (msg) {
          self.getGoods()
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    },
    showUpdateModal: function (goods) {
      var self = this
      self.updateModal = 'modal is-active'
      self.UpdateGoodsId = goods.id
      self.UpdateGoodsName = goods.name
      self.UpdateGoodsUrlPict = goods.url_pict
      self.UpdateGoodsDesc = goods.desc
      self.UpdateGoodsBarcode = goods.barcode
      self.UpdateGoodsSize = goods.goods_size
    },
    closeModal: function () {
      var self = this
      self.updateModal = 'modal'
      self.UpdateStoreId = ''
      self.UpdateStoreName = ''
      self.UpdateStoreLat = ''
      self.UpdateStoreLng = ''
    },
    submitGoodsUpdate: function () {
      var self = this
      axios.put(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/goods/${self.UpdateGoodsId}`,
        {
          name: self.UpdateGoodsName,
          url_pict: self.UpdateGoodsUrlPict,
          desc: self.UpdateGoodsDesc,
          barcode: self.UpdateGoodsBarcode,
          goods_size: self.UpdateGoodsSize
        })
      .then(function (result) {
        self.closeModal()
        self.getGoods()
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getGoods()
  }
}
</script>

<style>
#stores {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#form_goods {
  width: 25%
}

#wrap_cell {
  text-wrap: normal;
  word-wrap: break-word;
}

.table {
  max-width: 90%
}
</style>
