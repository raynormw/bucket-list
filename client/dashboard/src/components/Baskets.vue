<template>
  <div id="baskets" class="container">
    <section class="section" id="form_basket">
      <h1 class="title"> Basket Form</h1>
      <div class="field">
        <label class="label"> Member Id </label>
        <div class="control">
          <input v-model='memberIdBasketForm' type="text" class="input" placeholder="Member Id">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="postBasket" class="button is-primary" >Submit</button>
        </div>
        <div class="control">
          <button @click='emptyBasketForm' class="button is-link">Cancel</button>
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
              <th> Member Id </th>
              <th> Delete Basket </th>
              <th> Update Basket </th>
              <th> Basket Items </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Member Id </th>
              <th> Delete Basket </th>
              <th> Update Basket </th>
              <th> Basket Items </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='basket in baskets'>
              <td> {{baskets.indexOf(basket) + 1}} </td>
              <td> {{basket.id}} </td>
              <td> {{basket.member_id}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(basket)" > Delete </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(basket)'> Update </button> </td>
              <td> <router-link :to="{ path: '/basket/' + basket.id}"> <button type="button" class="button"> Basket Items </button> </router-link> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div :class='updateModal'>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Basket</p>
          <button @click='closeModal' class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label"> Member Id </label>
            <div class="control">
              <input v-model='UpdateMemberId' type="text" class="input">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click='submitBasketUpdate'>Save changes</button>
          <button class="button" @click='closeModal'>Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'baskets',
  data () {
    return {
      baskets: [],
      memberIdBasketForm: '',
      updateModal: 'modal',
      UpdateMemberId: '',
      UpdateMemberIdOld: '',
      UpdateBasketId: ''
    }
  },
  methods: {
    getBaskets: function () {
      var self = this
      axios.get('http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/baskets')
      .then(function (baskets) {
        self.baskets = baskets.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postBasket: function () {
      var self = this
      axios.post('http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/baskets/createbasket', {
        member_id: self.memberIdBasketForm
      })
      .then(function (basket) {
        self.getBaskets()
        self.emptyBasketForm()
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    emptyBasketForm: function () {
      var self = this
      self.memberIdBasketForm = ''
    },
    confirmDelete: function (basket) {
      var self = this
      var choice = confirm(`Are you sure want to delete this?\n Id: ${basket.id} \n Member Id: ${basket.member_id}`)
      if (choice === true) {
        axios.delete(`http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/baskets/${basket.id}/delete`, {
          member_id: basket.member_id
        })
        .then(function () {
          self.getBaskets()
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    },
    showUpdateModal: function (basket) {
      var self = this
      self.updateModal = 'modal is-active'
      self.UpdateMemberIdOld = basket.member_id
      self.UpdateMemberId = basket.member_id
      self.UpdateBasketId = basket.id
    },
    closeModal: function () {
      var self = this
      self.updateModal = 'modal'
      self.UpdateMemberId = ''
      self.UpdateBasketId = ''
      self.UpdateMemberIdOld = ''
    },
    submitBasketUpdate: function () {
      var self = this
      axios.put(`http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/baskets/${self.UpdateBasketId}/${self.UpdateMemberIdOld}`,
        {
          member_id: self.UpdateMemberId
        })
      .then(function (result) {
        self.closeModal()
        self.getBaskets()
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getBaskets()
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
