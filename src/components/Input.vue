<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close', 'add-task'])
const props = defineProps({
  days: String,
})
const taskText = ref('')
const submitTask = () => {
  if (taskText.value.trim() === '') {
    alert('Please enter a task')
    return
  }
  emit('add-task', taskText.value)
  console.log(taskText.value)
  taskText.value = ''
}
</script>

<template>
  <div class="modal">
    <div class="modal-header">
      <h3>Add a new event</h3>
      <button id="quit" @click="$emit('close')">✕</button>
    </div>
    <h2>{{ props.days }}</h2>
    <input type="text" placeholder="New event..." v-model="taskText" />

    <button class="submit" @click="submitTask">Submit</button>
  </div>
</template>

<style scoped>
 
#quit {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid red;
  color: red;
  background-color: rgba(255, 0, 0, 0.24);
  cursor: pointer;
}
h2 {
  color: red;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

input {
  width: 90%;
  padding: 8px;
  margin-bottom: 12px;
}

.submit {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px;
  width: 30%;
  border-radius: 6px;
}

h1 {
  color: #3b82f6;
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

span {
  color: white;
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
