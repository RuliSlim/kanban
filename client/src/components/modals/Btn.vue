<template>
  <button @click="$emit('trigger')"  class="waves-effect waves-light btn-flat modal-trigger">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'btnTrigger',
}
</script>