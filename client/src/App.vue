<template>
  <div>
    <NavBar :isLogin="isLogin" @emitLogout="logOut" :withGoogle="withGoogle"></NavBar>
    <Login v-if="!isLogin && formLogin" @emitToken="isLogin=true" :isLogin="isLogin" 
      @emitIsRegister="formRegister = !formRegister; formLogin = false;"
      @emitWithGoogle="withGoogle = true;"
    >
    </Login>
    <Register v-if="!isLogin && formRegister" @emitToken="isLogin=true" :isLogin="isLogin"
      @emitIsLogin="formLogin = !formLogin; formRegister = false;" 
    >
    </Register>
    <CardComponent v-if="isLogin"/></CardComponent>
  </div>
</template>

<script>
import NavBar from './components/navbar/NavBar';
import CardComponent from './components/CardList';
import Login from './components/user/login';
import Register from './components/user/register';

export default {
  name: 'App',
  components: {
    NavBar,
    CardComponent,
    Login,
    Register,
  },
  data() {
    return {
      isLogin: false,
      formRegister: false,
      formGoogle: false,
      formLogin: true,
      withGoogle: false
    }
  },
  methods: {
    saveData() {
      this.isLogin = data;
    },
    logOut() {
      this.isLogin = false;
    }
  },
  created() {
    localStorage.getItem('access_token') ? this.isLogin = true : this.isLogin = false;
  }
}
</script>