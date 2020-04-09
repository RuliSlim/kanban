<template>
  <div>
    <ModalContent v-if="showModal" :open="showModal" :modalStyle="modalStyle" @close="showModal = false"
      :id="id" :title="title" :type="type" @backToCard="backToCard($event)">
    </ModalContent>
    <btnTrigger @trigger="showModal = true"><slot></slot></btnTrigger>
  </div>
</template>
  
<script>
  import btnTrigger from './Btn.vue'
  import ModalContent from './Modal.vue'
  export default {
    name: 'Modal-btn',
    props: ['id', 'title', 'type'],
    data() {
      return {
        showModal: false,
        modalStyle: {
          'display': 'block', 
          'z-index': 1003,
          'opacity': 1,
          'transform': 'scaleX(1); top: 10%',
          'position': 'fixed',
          'top': '20%',
          'left': '0%',
          'width': '80vw',
          'height': '80vh'
        }
      }
    },
    methods: {
      backToCard(data) {
        this.showModal = false;
        this.$emit('backToCard', data);
      }
    },
    components: {btnTrigger, ModalContent}
  }
</script>