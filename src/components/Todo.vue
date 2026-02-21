<script setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps({
  dayName: String,
  tasks: Array,
})


const emit = defineEmits(['clickday', 'delete-task', 'edit-task', 'move-task'])


//Fonction pour pour renvoyer les infos à calendar.vue
const sendClick = () => {
  emit('clickday', props.dayName)
  console.log(props.dayName)
}
const delet = (id) => {
  emit('delete-task', id)
  console.log('Task deleted:', id)
}
const edit = (id) => {
  emit('edit-task', id)
}
// Drag truck pour drag and droper

const dragStart = (event, id) => {
  event.dataTransfer.setData('taskId', id)
}

const dragOver = (event) => {
  event.preventDefault()
}

const dropTask = (event) => {
  const id = Number(event.dataTransfer.getData('taskId'))
  emit('move-task', { id, newDay: props.dayName })
}


</script>
<template>
  <div class="day-column" @dragover="dragOver" @drop="dropTask">
    <!-- Noublie pas que les fonctions s'appliquent  sur  la div -->
    <div class="day-title" @click="sendClick">
      {{ dayName }}
    </div>

    <div
      class="task-list"
      v-for="tache in tasks"
      :key="tache.id"
      draggable="true"
      @dragstart="(e) => dragStart(e, tache.id)"
    >
    <!-- Cette ligne est très importante -->
      <p>{{ tache.title }}</p>
      <button @click="delet(tache.id)">❌</button>
      <button @click="edit(tache.id)">🖊</button>
    </div>

  </div>
</template>


<style scoped>
.day-column {
  /* background: white; */
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  transition: transform 0.25s ease;
}

.day-column:hover {
  transform: translateY(-4px);
}

.day-title {
  font-weight: 600;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.day-title:hover {
  background: #3b82f6;
  color: white;
}

.task-list {
  background: #f9fafb;
  padding: 8px 10px;
  border-radius: 6px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeInTask 0.3s ease;
  transition: all 0.2s ease;
   cursor: grab;
}

.task-list:hover {
  background: #e0f2fe;
}

.task-list button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s ease;
}
.task-list:active {
  opacity: 0.5;
  cursor: grabbing;
}

.task-list button:hover {
  transform: scale(1.2);
}

@keyframes fadeInTask {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
