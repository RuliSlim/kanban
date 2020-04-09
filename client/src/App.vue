<template>
  <div>
    <NavBar :isLogin="isLogin" @emitLogout="logOut"></NavBar>
    <Login v-if="!isLogin && formLogin" @emitToken="saveData" :isLogin="isLogin" @emitIsRegister="formRegister = !formRegister; formLogin = false" @emitIsGoogle="formGoogle = !formGoogle"
    ></Login>
    <Register v-if="!isLogin && formRegister" @emitToken="saveData" :isLogin="isLogin" @emitIsLogin="formLogin = !formLogin; formRegister = false" @emitIsGoogle="formGoogle = !formGoogle"></Register>
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
    Register
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
    console.log('YOO')
    localStorage.getItem('access_token') ? this.isLogin = true : this.isLogin = false;
  }
}
</script>