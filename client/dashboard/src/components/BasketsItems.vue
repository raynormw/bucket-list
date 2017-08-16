<template>
  <div id="baskets_items" class="container">
    <section class="section" id="form_basket_items">
      <h1 class="title"> Basket Item Form</h1>
      <div class="field">
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
    <section class="section">
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Goods Id</th>
              <th> Basket Id </th>
              <th> Goods Barcode </th>
              <th> Goods Name </th>
              <th> Goods Size </th>
              <th> Quantity </th>
              <th> Remove Item </th>
              <th> Update Quantity </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Goods Id</th>
              <th> Basket Id </th>
              <th> Goods Barcode </th>
              <th> Goods Name </th>
              <th> Goods Size </th>
              <th> Quantity </th>
              <th> Remove Item </th>
              <th> Update Quantity </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='basketItem in basketItems'>
              <td> {{basketItems.indexOf(basketItem) + 1}} </td>
              <td> {{basketItem.id}} </td>
              <td> {{basketItem.goods_id}} </td>
              <td> {{basketItem.basket_id}} </td>
              <td> {{basketItem.Good.barcode}} </td>
              <td> {{basketItem.Good.name}} </td>
              <td> {{basketItem.Good.goods_size}} </td>
              <td> {{basketItem.quantity}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(basketItem)" > Remove Item </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(basketItem)'> Update </button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div :class='updateModal'>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Quantity</p>
          <button @click='closeModal' class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label"> Quantity </label>
            <div class="control">
              <input v-model='UpdateBasketItemQuantity' type="text" class="input">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click='submitBasketItemUpdate'>Save changes</button>
          <button class="button" @click='closeModal'>Cancel</button>
        </footer>
      </div>
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
      goodsIdItemsForm: '',
      quantityItemsForm: '',
      updateModal: 'modal',
      UpdateBasketItemQuantity: '',
      UpdateBasketItemBasketId: '',
      UpdateBasketItemGoodsId: ''
    }
  },
  methods: {
    getBasketItems: function () {
      var self = this
      axios.get(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/baskets/getitems/${self.$route.params.basket_id}`)
      .then(function (basketItems) {
        self.basketItems = basketItems.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postBasketItem: function () {
      var self = this
      axios.post(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000//api/baskets/${self.$route.params.basket_id}/additem`, {
        goods_id: self.goodsIdItemsForm,
        quantity: self.quantityItemsForm
      })
      .then(function (store) {
        self.getBasketItems()
        self.emptyBasketItemForm()
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    emptyBasketItemForm: function () {
      var self = this
      self.goodsIdItemsForm = ''
      self.quantityItemsForm = ''
    },
    confirmDelete: function (basketItem) {
      var self = this
      var choice = confirm(`Are you sure want to delete this item ?\n Id: ${basketItem.id} \n Basket Id: ${basketItem.basket_id} \n Goods Id: ${basketItem.goods_id} \n Quantity: ${basketItem.quantity} \n Goods Name: ${basketItem.Good.name}`)
      if (choice === true) {
        axios.delete(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api/baskets/${basketItem.basket_id}/${basketItem.goods_id}/removeitem`)
        .then(function () {
          self.getBasketItems()
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    },
    showUpdateModal: function (basketItem) {
      var self = this
      self.updateModal = 'modal is-active'
      self.UpdateBasketItemQuantity = basketItem.quantity
      self.UpdateBasketItemBasketId = basketItem.basket_id
      self.UpdateBasketItemGoodsId = basketItem.goods_id
    },
    closeModal: function () {
      var self = this
      self.updateModal = 'modal'
      self.UpdateBasketItemQuantity = ''
      self.UpdateBasketItemBasketId = ''
      self.UpdateBasketItemGoodsId = ''
    },
    submitBasketItemUpdate: function () {
      var self = this
      axios.put(`http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000//api/baskets/${self.UpdateBasketItemBasketId}/${self.UpdateBasketItemGoodsId}/editpcs`,
        {
          quantity: self.UpdateBasketItemQuantity
        })
      .then(function (result) {
        self.closeModal()
        self.getBasketItems()
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getBasketItems()
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
