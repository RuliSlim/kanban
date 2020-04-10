<template>
  <div>
    <nav>
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="" v-if="isLogin" @click.prevent="logOut">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['isLogin', 'withGoogle'],
  name: 'NavBar',
  data() {
    return {
    }
  },
  methods: {
    logOut() {
      // this.isLogin = false;
      let self = this;
      if(this.withGoogle) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('username');
          localStorage.removeItem('withgoogle');
          self.$emit('emitLogout');
        });
      } else {
          localStorage.removeItem('withgoogle');
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        self.$emit('emitLogout');
      }
    }
  }
}
</script>