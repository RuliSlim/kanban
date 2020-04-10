<template>
  <div class="">
    <div class="row">
      <div class="col s12 l3 pisah" v-for="cat in cats">
        <Category  :key="cat.id" :cat="cat"
          @emitCreate="refresh"
        ></Category> <!-- component category-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Category from './card/Category.vue';

let base_url = "https://kanbaaam.herokuapp.com/";
let token = localStorage.getItem("access_token");

export default {
  name: 'CardComponent',
  components: {
    Category
  },
  data() {
    return{
      cats: [],
    }
  },

  methods: {
    getAll() {
      axios({
        method: 'GET',
        url: base_url + 'tasks',
        headers: {
          access_token: token
        }
      })
      .then(result => {
          console.log(result.data)
          this.cats=result.data.cats
          console.log(this.cats, 'YOu token')
      })
      .catch((err) => {
        console.log(err)
        this.$toasted.error(err.response.data.message, {duration: 3000});
      })
    },
    refresh(){
      this.getAll()
    },
  },
  // lifecycle
  mounted() {
    if(token) {
      this.getAll()
    }
  }
}
// color pallete
// #a8e6cf • #dcedc1 • #ffd3b6 • #ffaaa5 • #ff8b94
</script>

<style scoped>
/* Toast */
.toast{
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;
  position: absolute;
  z-index: 999;
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
    height: 130px !important;
    overflow: hidden;
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

  .avatar .options-task{
    display: none;
    positions: relative !important;
  }
  .avatar:hover > .options-task{
    display: block;
  }
/*    */
</style>