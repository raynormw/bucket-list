<template>
  <div id="stores" class="container">
    <section class="section" id="create_member_form">
      <div class="field">
        <label class="label"> Name </label>
        <div class="control">
          <input v-model='memberNameForm' type="text" class="input" placeholder="Input name of member here...">
        </div>
        <label class="label"> Email </label>
        <div class="control">
          <input v-model='memberEmailForm' type="text" class="input" placeholder="Input email of member here...">
        </div>
        <label class="label"> Password </label>
        <div class="control">
          <input v-model='memberPasswordForm' type="password" class="input" placeholder="Input password of member here...">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="postMember" class="button is-primary" >Submit</button>
        </div>
        <div class="control">
          <button @click='emptyMemberForm' class="button is-link">Cancel</button>
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
              <th> Member Name </th>
              <th> Member Email </th>
              <th> Member Password (Hashed) </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Member Name </th>
              <th> Member Email </th>
              <th> Member Password (Hashed) </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='member in members'>
              <td> {{members.indexOf(member) + 1}} </td>
              <td> {{member.id}} </td>
              <td> {{member.name}} </td>
              <td> {{member.email}} </td>
              <td> {{member.password}} </td>
              <!-- <td> <button class="button" type="button" @click="confirmDelete(store)" > Delete </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(store)'> Update </button> </td>
              <td> <router-link :to="{ path: '/store/' + store.id}"> <button type="button" class="button"> Store Goods </button> </router-link> </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </section>
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
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'stores',
  data () {
    return {
      members: [],
      memberNameForm: '',
      memberEmailForm: '',
      memberPasswordForm: '',
      updateModal: 'modal',
      updateMemberName: '',
      updateMemberEmail: '',
      updateMemberPassword: ''
    }
  },
  methods: {
    getMembers: function () {
      var self = this
      axios.get('http://localhost:3000/api/members')
      .then(function (members) {
        self.members = members.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postMember: function () {
      var self = this
      axios.post('http://localhost:3000/api/members/signup', {
        name: self.memberNameForm,
        email: self.memberEmailForm,
        password: self.memberPasswordForm
      })
      .then(function (store) {
        self.getMembers()
        self.emptyMemberForm()
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    emptyMemberForm: function () {
      var self = this
      self.memberNameForm = ''
      self.memberEmailForm = ''
      self.memberPasswordForm = ''
    },
    // confirmDelete: function (store) {
    //   var self = this
    //   var choice = confirm(`Are you sure want to delete this?\n Id: ${store.id} \n Name: ${store.name} \n Latitude Longitude: ${store.lat_long}`)
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
    // showUpdateModal: function (store) {
    //   var self = this
    //   self.updateModal = 'modal is-active'
    //   self.updateMemberName = store.id
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
    //   axios.put(`http://localhost:3000/api/stores/${self.UpdateStoreId}`,
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
    this.getMembers()
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
#create_member_form {
  width: 25%
}
</style>
