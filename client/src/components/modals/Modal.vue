<template>
  <div :class="['modal', open ? 'open' : '']" :style="[open ? modalStyle : '']">
    <div class="modal-content valign-wrapper">
      <ul class="collection with-header">
        <div v-if="type == 'delete'">
          <li class="collection-header">
            <h4>Are You sure you want to <span class="title type">{{type}}</span> <span class="title">"{{title}}"</span> ?
            </h4>
          </li>
        </div>
        <div v-if="type == 'edit'">
          <li class="collection-header">
            <h4>Are You sure you want to <span class="title type">{{type}}</span> <span class="title">"{{title}}"</span> ?
            </h4>
            <input type="text" v-bind:value="title" ref="valueInput">
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
export default {
  name:'ModalContent',
  props: ['open', 'modalStyle', 'title', 'id', 'type'],
  data() {
    return {
      newTitle: null,
    }
  },
  methods: {
    onClick() {
      if(this.type == 'delete') {
        this.$emit('backToCard')
      }else{
        this.$emit('backToCard', this.$refs.valueInput.value);
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