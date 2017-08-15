<template>
  <div id="baskets_items" class="container">
    <section class="section" id="form_basket_items">
      <h1 class="title"> Basket Item Form</h1>
      <div class="field">
        <label class="label"> Basket Id </label>
        <div class="control">
          <input v-model='basketIdItemsForm' type="text" class="input" placeholder="Basket Id">
        </div>
        <label class="label"> Goods Id </label>
        <div class="control">
          <input v-model='goodsIdItemsForm' type="text" class="input" placeholder="Goods Id">
        </div>
        <label class="label"> Quantity </label>
        <div class="control">
          <input v-model='quantityItemsForm' type="text" class="input" placeholder="Quantity">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="postBasketItem" class="button is-primary" >Submit</button>
        </div>
        <div class="control">
          <button @click='emptyBasketItemForm' class="button is-link">Cancel</button>
        </div>
      </div>
    </section>
    <!-- <section class="section">
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Store Name </th>
              <th> Latitude Longitude </th>
              <th> Delete Store </th>
              <th> Update Store </th>
              <th> Store Goods </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Store Name </th>
              <th> Latitude Longitude </th>
              <th> Delete Store </th>
              <th> Update Store </th>
              <th> Store Goods </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='store in stores'>
              <td> {{stores.indexOf(store) + 1}} </td>
              <td> {{store.id}} </td>
              <td> {{store.name}} </td>
              <td> {{store.lat_long}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(store)" > Delete </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(store)'> Update </button> </td>
              <td> <router-link :to="{ path: '/store/' + store.id}"> <button type="button" class="button"> Store Goods </button> </router-link> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section> -->
    <!-- <div :class='updateModal'>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Store</p>
          <button @click='closeModal' class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label"> Store name </label>
            <div class="control">
              <input v-model='UpdateStoreName' type="text" class="input">
            </div>
            <label class="label"> Latitude </label>
            <div class="control">
              <input v-model='UpdateStoreLat' type="text" class="input">
            </div>
            <label class="label"> Longitude </label>
            <div class="control">
              <input v-model='UpdateStoreLng' type="text" class="input">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click='submitStoreUpdate'>Save changes</button>
          <button class="button" @click='closeModal'>Cancel</button>
        </footer>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'basket_items',
  data () {
    return {
      basketItems: [],
      basketIdItemsForm: '',
      goodsIdItemsForm: '',
      quantityItemsForm: ''
    }
  },
  methods: {
    getBasketItems: function () {
      var self = this
      axios.get(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/baskets/getitems/${self.route.params.basket_id}`)
      .then(function (basketItems) {
        self.basketItems = basketItems.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postBasketItem: function () {
      var self = this
      // axios.post('http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/stores', {
      //   name: self.storeName,
      //   lat_long: [self.storeLat, self.storeLng]
      // })
      // .then(function (store) {
      //   self.getStores()
      //   self.emptyStoreForm()
      // })
      // .catch(function (err) {
      //   console.log(err)
      // })
    },
    emptyBasketItemForm: function () {

    }
    // confirmDelete: function (store) {
    //   var self = this
    //   var choice = confirm(`Are you sure want to delete this?\n Id: ${store.id} \n Name: ${store.name} \n Latitude Longitude: ${store.lat_long}`)
    //   if (choice === true) {
    //     axios.delete(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/stores/${store.id}`)
    //     .then(function (msg) {
    //       self.getStores()
    //     })
    //     .catch(function (err) {
    //       console.log(err)
    //     })
    //   }
    // },
    // showUpdateModal: function (store) {
    //   var self = this
    //   self.updateModal = 'modal is-active'
    //   self.UpdateStoreId = store.id
    //   self.UpdateStoreName = store.name
    //   self.UpdateStoreLat = store.lat_long[0]
    //   self.UpdateStoreLng = store.lat_long[1]
    // },
    // closeModal: function () {
    //   var self = this
    //   self.updateModal = 'modal'
    //   self.UpdateStoreId = ''
    //   self.UpdateStoreName = ''
    //   self.UpdateStoreLat = ''
    //   self.UpdateStoreLng = ''
    // },
    // submitStoreUpdate: function () {
    //   var self = this
    //   axios.put(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/stores/${self.UpdateStoreId}`,
    //     {
    //       name: self.UpdateStoreName,
    //       lat_long: [self.UpdateStoreLat, self.UpdateStoreLng]
    //     })
    //   .then(function (result) {
    //     self.closeModal()
    //     self.getStores()
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //   })
    // }
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
