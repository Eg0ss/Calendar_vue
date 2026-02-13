<script setup>
const emit = defineEmits(['close', 'add-task'])
</script>

<template>
  <div id="entête">
    <div class="calendar-hero">
      <img src="/public/calendar.avif" alt="Calendar illustration" />
      <h1>Bienvenue sur Calendar.todoDev</h1>
      <p>Organisez vos tâches par jour et suivez votre planning facilement.</p>
    </div>
    <div class="overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Add a new event</h3>
          <button id="quit" @click="$emit('close')">✕</button>
        </div>

        <h2></h2>

        <input type="text" placeholder="New event..." v-model="taskText" />

        <button class="submit" @click="submitTask">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#entête {
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
}
.calendar-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.calendar-hero img {
  max-width: 400px;
  border-radius: 10px;
}
#quit {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid red;
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
  color: white;
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
p {
  color: white;
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
