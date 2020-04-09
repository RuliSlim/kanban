<template>
  <div >
    <div class="container">
      <ul class="collection with-header">
        <li class="collection-item avatar">
            <form class="row" @submit.prevent="login">
              <div class="col s12">
                <div class="input-field row inputRow">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="icon_prefix" type="email" class="validate" v-model="email">
                  <label for="icon_prefix">Email</label>
                </div>
                <div class="input-field row inputRow">
                  <i class="material-icons prefix">phone</i>
                  <input id="icon_telephone" type="password" class="validate" v-model="password">
                  <label for="icon_telephone">Password</label>
                </div>
                <div class="input-field row inputRow">
                  <button class="btn-floating btn-large waves-effect waves-light" type="submit">Login</button>
                </div>
              </div>
            </form>
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
import axios from 'axios'
let base_url = "http://localhost:3000/user/"
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      let data = {}
      data.email = this.email;
      data.password = this.password;
      this.axios(data, 'login')
      // console.log(this.email, this.password);
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
    axios(data, url) {
      let self = this;
      axios({
        method: "POST",
        url: base_url + url,
        data: data
      })
        .then(res => {
          // this.saveData(data);
          this.loggedIn = true;
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('username', res.data.username);
          self.$emit('emitToken', this.loggedIn);
          console.log(res.data, 'token')
        })
        .catch(err => {
          console.log('Yo')
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>
/* Toast */
.toast{
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 80%;
  border-radius: 2rem;
  animation: fade_in_show2 2s;
}

/* Input field task */
  .collection-item.avatar.input-task{
    height: 50px !important;
    padding: 0 2rem !important;
    width: 95%;
    display: none;
    animation: fade_in_show 1s;
  }
    /* display: add form */
    @keyframes fade_in_show {
      0% {
        opacity: 0;
        transform: scale(0)
      }
      100% {
        opacity: 1;
        transform: scale(1)
      }
  }

  input.validate{
    width: 100% !important;
    border-bottom: 1px solid #dcedc1;
  }

  button#submit{
    float: right;
    position: absolute;
    right: 2px;
  }

  /* add task*/
  #add-task{
    float: right;
    margin-top: 40px;
  }

/* collection list task */ 
  .collection.with-header .collection-header{
    background-color: #ffaaa5;
  }
  .title:disabled{
    border: none;
    opacity: 1;
    color: white;
  }
  .collection{
    border: 0;
    border-radius: 2rem;
    background-color:  #ffd3b6;
    margin: 1.25rem 0;
    height: auto !important;
  }
  .collection-item {
    background-color: #ffd3b6;
    margin: 1.25rem 0;
    padding: 1rem;
    height: auto !important;
    overflow: hidden;
  }
  .collection-item form{
    width: 80%;
  }
  input.validate{
    width: 80% !important;
  }
  /* icons collection*/ 
  .iconOption {
    margin-top: -50px;
    margin-bottom: -50px;
  } 
  i {
    color: #a8e6cf;
  }
  .collection .collection-item.avatar .secondary-content {
    position: absolute;
    right: 30px;
  }
  .flex{
    display: flex;
    flex-direction: row;
    align-content: space-around;
  }

  .avatar .options-task#other-options{
    display: block;
    positions: absolute !important;
    right: 0px;
    border: 3px solid #dcedc1;
    background-color:  #dcedc1;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    height: 190px;
  }

  #other-options div button{
    position: relative;
    top: 50px;
    width: 95%;
    text-align: center;
    display: none;
  }

  #other-options:hover{
    cursor: pointer;
    display: block;
  }
/*    */
</style>