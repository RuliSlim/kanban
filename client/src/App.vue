<template>
  <div>
    <NavBar :isLogin="isLogin" @emitLogout="logOut"></NavBar>
    <Login v-if="!isLogin && formLogin" @emitToken="isLogin=true" :isLogin="isLogin" 
      @emitIsRegister="formRegister = !formRegister; formLogin = false; formGoogle = false" @emitIsGoogle="formGoogle = !formGoogle; formLogin = false; formRegister = false"
    >
    </Login>
    <Register v-if="!isLogin && formRegister" @emitToken="isLogin=true" :isLogin="isLogin"
      @emitIsLogin="formLogin = !formLogin; formRegister = false; formGoogle = false" @emitIsGoogle="formGoogle = !formGoogle; formRegister = false; formLogin = false"
    >
    </Register>
    <Google v-if="!isLogin && formGoogle" @emitToken="isLogin=true" :isLogin="isLogin"
      @emitIsLogin="formLogin = !formLogin; formRegister = false; formGoogle = false" @emitIsRegister="formRegister = !formRegister; formLogin = false; formGoogle = false"
    >
    </Google>
    <CardComponent v-if="isLogin"/></CardComponent>
  </div>
</template>

<script>
import NavBar from './components/navbar/NavBar';
import CardComponent from './components/CardList';
import Login from './components/user/login';
import Register from './components/user/register';
import Google from './components/user/google.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    CardComponent,
    Login,
    Register,
    Google
  },
  data() {
    return {
      isLogin: false,
      formRegister: false,
      formGoogle: false,
      formLogin: true
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