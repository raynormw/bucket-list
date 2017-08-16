<!-- <template>
  <div id="carts" class="container">
    <section class="section" id="create_cart_item_form">
      <h1 class="title"> Post Cart Item </h1>
      <div class="field">
        <label class="label"> Member Id </label>
        <div class="control">
          <input v-model='memberIdCartForm' type="text" class="input" placeholder="Input member id here...">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="postCart" class="button is-primary" >Submit</button>
        </div>
        <div class="control">
          <button @click='emptyCartForm' class="button is-link">Cancel</button>
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
              <th> Member Name </th>
              <th> Member Email </th>
              <th> Delete </th>
              <th> Cart Items </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> No </th>
              <th> Id </th>
              <th> Member Id </th>
              <th> Member Name </th>
              <th> Member Email </th>
              <th> Delete </th>
              <th> Cart Items </th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for='cart in carts'>
              <td> {{carts.indexOf(cart) + 1}} </td>
              <td> {{cart.id}} </td>
              <td> {{cart.member.name}} </td>
              <td> {{member.email}} </td>
              <td> {{member.password}} </td>
              <td> <button class="button" type="button" @click="confirmDelete(cart)" > Delete </button> </td>
              <td> <router-link :to="{ path: '/cart/' + cart.id}"> <button type="button" class="button"> Cart Items </button> </router-link> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'stores',
  data () {
    return {
      carts: [],
      memberIdCartForm: ''
    }
  },
  methods: {
    getCarts: function () {
      var self = this
      axios.get('http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/carts')
      .then(function (carts) {
        self.carts = carts.data
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    postCart: function () {
      var self = this
      axios.post('http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/carts', {
        member_id: self.memberIdCartForm
      })
      .then(function (cart) {
        self.getCarts()
        self.emptyCartForm()
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    emptyCartForm: function () {
      var self = this
      self.memberIdCartForm = ''
    }
    confirmDelete: function (cart) {
      var self = this
      var choice = confirm(`Are you sure want to delete this?\n Id: ${cart.id} \n Member Id : ${cart.member_id}`)
      if (choice === true) {
        axios.delete(`http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api/carts/${cart.id}`)
        .then(function (msg) {
          self.getCarts()
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    }
  },
  created: function () {
    this.getCarts()
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
</style> -->
