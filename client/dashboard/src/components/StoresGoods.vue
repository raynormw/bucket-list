<template>
  <div id="stores_goods" class="container">
    <section>
      <h1 class="title"> Store :  </h1>
      <h1 class="title"> Location :  </h1>
    </section>
    <section class="section" id="form_stores_goods">
      <div class="field">
        <label class="label"> Good ID </label>
        <div class="control">
          <input v-model='goodsIdForm' type="text" class="input" placeholder="Input goods id here...">
        </div>
        <label class="label"> Price </label>
        <div class="control">
          <input v-model='priceForm' type="text" class="input" placeholder="Input price here">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="postGoodsStore" class="button is-primary" >Submit</button>
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
              <th> Goods Name </th>
              <th> Price </th>
              <th> Delete Goods From Store </th>
              <th> Update Price </th>
            </tr>
          </tfoot>
          <tbody>
            <!-- <tr v-for='store in stores'>
              <td> {{stores.indexOf(store) + 1}} </td>
              <td> {{store.id}} </td>
              <td> {{store.name}} </td>
              <td> {{store.lat_long}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(store)" > Delete </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(store)'> Update </button> </td>
              <td> <button class="button" type="button"> <router-link to=`/store/${store.id}`></router-link> </button> </td>
            </tr> -->
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
      storesGoods: [],
      goodsIdForm: '',
      priceForm: '',
      updateModal: 'modal',
      goodsIdFormUpdate: '',
      priceFormUpdate: ''
    }
  },
  methods: {
    getGoodsStores: function () {
      var self = this
      axios.get(`http://localhost:3000/api/stores/$route.params.store_id/getgoods`)
      .then(function (storesGoods) {
        self.storesGoods = storesGoods.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    adGoodsStores: function () {
      var self = this
      axios.post(`http://localhost:3000/api/stores/$route.params.store_id/addgoods`, {
        good_id: self.goodsIdForm,
        price: self.priceForm
      })
      .then(function (store) {
        self.getGoodsStores()
        self.emptyStoreForm()
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
    // confirmDelete: function (store) {
    //   var self = this
    //   var choice = confirm(`Are you sure want to delete this?\n Goods Id: ${store.id} \n Name: ${store.name} \n Latitude Longitude: ${store.lat_long}`)
    //   if (choice === true) {
    //     axios.delete(`http://localhost:3000/api/stores/${store.id}`)
    //     .then(function (msg) {
    //       self.getStores()
    //     })
    //     .catch(function (err) {
    //       console.log(err)
    //     })
    //   }
    // },
    showUpdateModal: function (store) {
      var self = this
      self.updateModal = 'modal is-active'
      self.UpdateStoreId = store.id
      self.UpdateStoreName = store.name
      self.UpdateStoreLat = store.lat_long[0]
      self.UpdateStoreLng = store.lat_long[1]
    },
    closeModal: function () {
      var self = this
      self.updateModal = 'modal'
      self.UpdateStoreId = ''
      self.UpdateStoreName = ''
      self.UpdateStoreLat = ''
      self.UpdateStoreLng = ''
    },
    submitStoreUpdate: function () {
      var self = this
      axios.put(`http://localhost:3000/api/stores/${self.UpdateStoreId}`,
        {
          name: self.UpdateStoreName,
          lat_long: [self.UpdateStoreLat, self.UpdateStoreLng]
        })
      .then(function (result) {
        self.closeModal()
        self.getStores()
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getStores()
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
#form_store {
  width: 25%
}
</style>
