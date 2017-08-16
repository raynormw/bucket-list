<template>
  <div id="stores" class="container">
    <section class="section" id="create_member_form">
      <h1 class="title"> Create Member </h1>
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
    <section class="section" id="signin_form">
      <div class="field">
        <label class="label"> Email </label>
        <div class="control">
          <input v-model='memberEmailSigninForm' type="text" class="input" placeholder="Input email of member here...">
        </div>
        <label class="label"> Password </label>
        <div class="control">
          <input v-model='memberPasswordSigninForm' type="password" class="input" placeholder="Input password of member here...">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="signinMember" class="button is-primary" >Submit</button>
        </div>
        <div class="control">
          <button @click='emptySignInForm' class="button is-link">Cancel</button>
        </div>
      </div>
      <p> Token returned from previous signin : {{token}} </p>
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
              <th> Delete Member </th>
              <th> Update Member </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Member Name </th>
              <th> Member Email </th>
              <th> Member Password (Hashed) </th>
              <th> Delete Member </th>
              <th> Update Member </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='member in members'>
              <td> {{members.indexOf(member) + 1}} </td>
              <td> {{member.id}} </td>
              <td> {{member.name}} </td>
              <td> {{member.email}} </td>
              <td> {{member.password}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(member)" > Delete </button> </td>
              <td> <button class="button" type="button" @click='showUpdateModal(member)'> Update </button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div :class='updateModal'>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Member</p>
          <button @click='closeModal' class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label"> Member name </label>
            <div class="control">
              <input v-model='updateMemberName' type="text" class="input">
            </div>
            <label class="label"> Email </label>
            <div class="control">
              <input v-model='updateMemberEmail' type="text" class="input">
            </div>
            <label class="label"> Password </label>
            <div class="control">
              <input v-model='updateMemberPassword' type="text" class="input">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click='submitMemberUpdate'>Save changes</button>
          <button class="button" @click='closeModal'>Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'members',
  data () {
    return {
      members: [],
      memberNameForm: '',
      memberEmailForm: '',
      memberPasswordForm: '',
      memberEmailSigninForm: '',
      memberPasswordSigninForm: '',
      token: '',
      updateModal: 'modal',
      updateMemberId: '',
      updateMemberName: '',
      updateMemberEmail: '',
      updateMemberPassword: ''
    }
  },
  methods: {
    getMembers: function () {
      var self = this
      axios.get('http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/members')
      .then(function (members) {
        self.members = members.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postMember: function () {
      var self = this
      axios.post('http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/members/signup', {
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
    signinMember: function () {
      var self = this
      axios.post(`http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/members/signin`, {
        email: self.memberEmailSigninForm,
        password: self.memberPasswordSigninForm
      })
      .then(function (token) {
        self.token = token.data
      })
      .catch(function (err) {
        self.token = err
      })
    },
    emptyMemberForm: function () {
      var self = this
      self.memberNameForm = ''
      self.memberEmailForm = ''
      self.memberPasswordForm = ''
    },
    emptySignInForm: function () {
      var self = this
      self.memberEmailSigninForm = ''
      self.memberPasswordSigninForm = ''
    },
    confirmDelete: function (member) {
      var self = this
      var choice = confirm(`Are you sure want to delete this member?\n Id: ${member.id} \n Name: ${member.name} \n Email: ${member.email}`)
      if (choice === true) {
        axios.delete(`http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/members/${member.id}/delete`)
        .then(function () {
          self.getMembers()
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    },
    showUpdateModal: function (member) {
      var self = this
      self.updateModal = 'modal is-active'
      self.updateMemberId = member.id
      self.updateMemberName = member.name
      self.updateMemberEmail = member.email
      self.updateMemberPassword = member.password
    },
    closeModal: function () {
      var self = this
      self.updateModal = 'modal'
      self.updateMemberId = ''
      self.updateMemberName = ''
      self.updateMemberEmail = ''
      self.updateMemberPassword = ''
    },
    submitMemberUpdate: function () {
      var self = this
      axios.put(`http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/members/${self.updateMemberId}/update`,
        {
          name: self.updateMemberName,
          email: self.updateMemberEmail,
          password: self.updateMemberPassword
        })
      .then(function (result) {
        self.closeModal()
        self.getMembers()
      })
      .catch(function (err) {
        console.log(err)
      })
    }
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
#signin_form {
  width: 25%
}
</style>
