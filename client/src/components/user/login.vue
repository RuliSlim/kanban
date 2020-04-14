<template>
  <div >
    <div class="container">
      <ul class="collection with-header">
        <li class="collection-item avatar">
            <button class="circle prefix" v-on:click="google">
              <i class="fab fa-google">G</i>
            </button>
            <form class="row" @submit.prevent="login">
              <div class="col s12">
                <div class="input-field row inputRow">
                  <i class="material-icons prefix">email</i>
                  <input id="email_prefix" type="email" class="validate" v-model="email">
                  <label for="email_prefix">Email</label>
                </div>
                <div class="input-field row inputRow">
                  <i class="material-icons prefix">phone</i>
                  <input id="icon_telephone" type="password" class="validate" v-model="password">
                  <label for="icon_telephone">Password</label>
                </div>
                <div class="input-field row inputRow">
                  <button class="btn-floating btn-large waves-effect waves-light pulse" type="submit">Login</button>
                </div>
              </div>
            </form>
          <div class="secondary-content options-task flex" id="other-options" @click="showOther">
            <div class="row">
              <button class="btn waves-effect waves-light" type="submit" name="action" ref="other1" @click="showForm('register')">Register
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let base_url = "https://kanbaaam.herokuapp.com/user/"
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  mounted() {
  },
  methods: {
    login() {
      let data = {};
      data.email = this.email;
      data.password = this.password;
      this.vueAxios(data, 'login');
    },
    google(user) {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // let self = this;
          axios({
            method: "post",
            url: "https://kanbaaam.herokuapp.com/user/google",
            data: {
              token: GoogleUser.getAuthResponse().id_token
            }
          })
          .then((response) => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem("user",response.data.email);
              this.$emit('emitWithGoogle');
          })
          .catch(err => {
            this.$toasted.error(err.response.data.message, {duration: 3000});
          });
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {duration: 3000})});
      
    },
    showOther(){
      if(this.$refs.other1.style.display == 'none') {
        this.$refs.other1.style.display = 'block';
        this.$refs.other2.style.display = 'block';
      } else {
        this.$refs.other1.style.display = 'none';
        this.$refs.other2.style.display = 'none';
      }
    },
    showForm(type) {
      if(type == 'register') {
        this.$emit('emitIsRegister');
      } else {
        this.$emit('emitIsGoogle');
      }
    },
    vueAxios(data, url) {
      let self = this;
      let urlG = url
      axios({
        method: "POST",
        url: base_url + url,
        data: data
      })
        .then(res => {
          this.loggedIn = true;
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('username', res.data.username);
          self.$emit('emitToken', this.loggedIn);
          this.$toasted.success('Welcome back ' + res.data.username, {duration: 3000})
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {duration: 3000})
        })
    }
  }
}
</script>

<style scoped>
/* Input field task */
ul.collection.with-header{
  margin-top: 20% !important;
}
input.validate{
  width: 100% !important;
  border-bottom: 1px solid #dcedc1 !important;
}
.collection{
  border: 0 !important;
  border-radius: 2rem !important;
  background-color:  #ffd3b6 !important;
  margin: 1.25rem 0 !important;
  height: auto !important;
}
.collection-item {
  background-color: #ffd3b6 !important;
  margin: 1.25rem 0 !important;
  padding: 1rem !important;
  height: auto !important;
  overflow: hidden;
}
.collection-item form{
  width: 80% !important;
}
input.validate{
  width: 80% !important;
}
i {
  color: #a8e6cf !important;
}
.avatar .options-task#other-options{
  display: block ;
  /* position: absolute !important;
  right: 0px !important; */
  border: 13px solid #dcedc1 !important;
  background-color:  #dcedc1 !important;
  border-top-left-radius: 2rem !important;
  border-bottom-left-radius: 2rem !important;
  height: 190px !important;
}
#other-options div button{
  position: relative !important;
  top: 40px !important;
  width: 95% !important;
  text-align: center !important;
  display: none ;
}
#other-options:hover{
  cursor: pointer !important;
  display: block ;
}
</style>