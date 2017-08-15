<template>
  <div id="stores_goods" class="container">
    <section>
      <h1 class="title"> Store : {{storeName}} </h1>
      <h1 class="title"> Location : {{storeLoc}} </h1>
    </section>
    <section class="section" id="form_stores_goods">
      <div class="field">
        <label class="label"> Good ID </label>
        <div class="control">
          <input v-model='goodsIdForm' type="text" class="input" placeholder="Input goods id here...">
        </div>
        <label class="label"> Price </label>
        <div class="control">
          <input v-model='priceForm' type="text" class="input" placeholder="Input price here...">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="postGoodsStores" class="button is-primary" >Submit</button>
        </div>
        <div class="control">
          <button @click='emptyGoodsStoreForm' class="button is-link">Cancel</button>
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
              <th> Good Id </th>
              <th> Goods Name </th>
              <th> Price </th>
              <th> Delete Goods From Store </th>
              <th> Update Price </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Good Id </th>
              <th> Goods Name </th>
              <th> Price </th>
              <th> Delete Goods From Store </th>
              <th> Update Price </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='goods in storesGoods'>
              <td> {{storesGoods.indexOf(goods) + 1}} </td>
              <td> {{goods.id}} </td>
              <td> {{goods.good_id}} </td>
              <td> {{goods.Good.name}} </td>
              <td> {{goods.price}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(goods)" > Delete </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(goods)'> Update </button> </td>
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
            <label class="label"> Good ID </label>
            <div class="control">
              <input disabled v-model='goodsIdFormUpdate' type="text" class="input" >
            </div>
            <label class="label"> Price </label>
            <div class="control">
              <input v-model='priceFormUpdate' type="text" class="input">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click='submitStoreGoodsUpdate'>Save changes</button>
          <button class="button" @click='closeModal'>Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'stores',
  data () {
    return {
      storeName: '',
      storeLoc: '',
      storesGoods: [],
      goodsIdForm: '',
      priceForm: '',
      updateModal: 'modal',
      storeIdFormUpdate: '',
      goodsIdFormUpdate: '',
      priceFormUpdate: ''
    }
  },
  methods: {
    getStore: function () {
      var self = this
      axios.get(`http://ec2-13-59-91-91.us-east-2.compute.amazonaws.com:3000/api/stores/${self.$route.params.store_id}/`)
      .then(function (store) {
        self.storeName = store.data.name
        self.storeLoc = store.data.lat_long
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getGoodsStores: function () {
      var self = this
      axios.get(`http://ec2-13-59-91-91.us-east-2.compute.amazonaws.com:3000/api/stores/${self.$route.params.store_id}/getgoods`)
      .then(function (storesGoods) {
        self.storesGoods = storesGoods.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postGoodsStores: function () {
      var self = this
      axios.post(`http://ec2-13-59-91-91.us-east-2.compute.amazonaws.com:3000/api/stores/${self.$route.params.store_id}/addgoods`, {
        good_id: self.goodsIdForm,
        price: self.priceForm
      })
      .then(function (store) {
        self.getGoodsStores()
        self.emptyGoodsStoreForm()
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    emptyGoodsStoreForm: function () {
      var self = this
      self.goodsIdForm = ''
      self.priceForm = ''
    },
    confirmDelete: function (goods) {
      var self = this
      var choice = confirm(`Are you sure want to delete this goods from this store?\n Id: ${goods.id} \n Goods Id: ${goods.good_id} \n Goods Name: ${goods.Good.name} \n Store: ${goods.Store.name}`)
      if (choice === true) {
        axios.delete(`http://localhost:3000/api/stores/${goods.store_id}/${goods.good_id}`)
        .then(function (msg) {
          self.getGoodsStores()
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    },
    showUpdateModal: function (goods) {
      var self = this
      self.updateModal = 'modal is-active'
      self.storeIdFormUpdate = goods.store_id
      self.goodsIdFormUpdate = goods.good_id
      self.priceFormUpdate = goods.price
    },
    closeModal: function () {
      var self = this
      self.updateModal = 'modal'
      self.goodsIdFormUpdate = ''
      self.priceFormUpdate = ''
    },
    submitStoreGoodsUpdate: function () {
      var self = this
      axios.put(`http://ec2-13-59-91-91.us-east-2.compute.amazonaws.com:3000/${self.storeIdFormUpdate}/${self.goodsIdFormUpdate}/pricing`,
        {
          price: self.priceFormUpdate
        })
      .then(function (result) {
        self.closeModal()
        self.getGoodsStores()
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getStore()
    this.getGoodsStores()
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
#form_stores_goods {
  width: 25%
}
</style>
