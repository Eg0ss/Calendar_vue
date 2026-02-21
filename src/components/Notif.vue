<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'success' // success, error, info
  }
})
</script>

<template>
  <div class="notif-container" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.notif-container {
  position: fixed;
  top: 80px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
}
.success { background-color: #4caf50; }
.error { background-color: red; }
</style>