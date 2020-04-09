<template>
  <div >
    <div class="container">
      <ul class="collection with-header">
        <li class="collection-item avatar">
          <div id="google-signin-button" ></div>
          <div class="secondary-content options-task flex" id="other-options" @click="showOther">
              <div class="row">
                <button class="btn waves-effect waves-light" type="submit" name="action" ref="other1" @click="showForm('register')">Register
                </button>
              </div>
              <div class="row">
                <button class="btn waves-effect waves-light" type="submit" name="action" ref="other2" @click="showForm('google')">Google
                </button>
              </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

          // <div class="secondary-content options-task flex" id="other-options" @click="showOther">
          //     <div class="row">
          //       <button class="btn waves-effect waves-light" type="submit" name="action" ref="other1" @click="showForm('login')">Login
          //       </button>
          //     </div>
          //     <div class="row">
          //       <button class="btn waves-effect waves-light" type="submit" name="action" ref="other2" @click="showForm('google')">Google
          //       </button>
          //     </div>
          // </div>

export default {
  name: 'Google',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  // mounted() {
  //   gapi.signin2.render('google-signin-button', {
  //     onsuccess: this.onSignIn
  //   })
  // },
  methods: {
    onSignIn (user) {
      const profile = user.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    },
    login() {
      let data = {}
      data.email = this.email;
      data.password = this.password;
      this.axios(data, 'login')
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
      if(type == 'login') {
        this.$emit('emitIsLogin');
      } else {
        this.$emit('emitIsRegister');
      }
    },
    axios(data, url) {
      let self = this;
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
  height: 500px !important;
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