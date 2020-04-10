<template>
  <div :class="['modal', open ? 'open' : '']" :style="[open ? modalStyle : '']">
    <div class="modal-content valign-wrapper">
      <ul class="collection with-header">
        <div v-if="type == 'delete'">
          <li class="collection-header">
            <h4>Are You sure you want to <span class="title type">{{type}}</span> <span class="title">"{{task.title}}"</span> ?
            </h4>
            <span>Input Category first</span>
          </li>
        </div>
        <div v-if="type == 'edit'">
          <li class="collection-header">
            <h4>Are You sure you want to <span class="title type">{{type}}</span> <span class="title">"{{task.title}}"</span> ?
            </h4>
            <input type="text" v-bind:value="task.title" ref="valueInput">
            <form >
                <p v-for="cat in cats">
                  <label>
                    <input ref="valueInput2" name="category" type="radio" v-if="cat.id === catId" checked  v-bind:value="`${cat.id}`" v-model="newId"/>
                    <input ref="valueInput2" name="category" type="radio" v-else v-bind:value="`${cat.id}`" v-model="newId"/>
                    <span>{{cat.name }}</span>
                  </label>
                </p>
            </form>
          </li>
        </div>
        <!-- PUT and DELETE methods -->
        <button class="btn-floating btn-large waves-effect waves-light red right pulse actions" @click="onClick(); $emit('close')">Yes</button>
        <button class="btn-floating btn-large waves-effect waves-light left pulse actions" @click="$emit('close')">No</button>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:'ModalContent',
  props: ['open', 'modalStyle', 'task', 'type', 'catId'],
  data() {
    return {
      newTitle: null,
      cats: null,
      newId: null,
    }
  },
  mounted() {
    axios({
      methods: 'get',
      url: 'https://kanbaaam.herokuapp.com/categories'
    })
      .then(res => {
        this.cats = res.data;
      })
      .catch(err => {
        this.$toasted.error(err.response.data.message)});
  },
  methods: {
    onClick() {
      if(this.type == 'delete') {
        this.$emit('backToCard')
      }else{
        let data = {
          title: this.$refs.valueInput.value,
          CategoryId: this.newId
        }
        this.$emit('backToCard', data);
        // console.log(this.$refs.valueInput.value)
      }
    }
  }
}
</script>

<style scoped>
  .actions{
    position: relative;
    top: 10px;
  }
  .modal{
    border: none;
    background-color: #dcedc1;
    border-radius: 2rem;
  }
  .modal-content {
    border: none !important;
    position: relative;
    top: 20%;
  }
  ul{
    border-radius: 2rem;
  }
  li.collection-header{
    border-radius: 2rem;
    border: none;
    color: #ff8b94;
  }
  span{
    font-size: 2rem !important;
  }
  span.type{
    font-weight: bold;
    text-decoration: underline;
    color: red;
  }
  span.title{
    text-transform: capitalize;
  }
  ul {
    width: 100%;
    height: 100%;
  }
</style>