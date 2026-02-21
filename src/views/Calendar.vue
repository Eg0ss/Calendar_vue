<script setup>
import { ref } from 'vue'
import Todo from '../components/Todo.vue'
import Input from '@/components/Input.vue'
import Notif from '@/components/Notif.vue'
const day = ref('')
const modal = ref(false)
const editingTask = ref(null)
const notification = ref({ show: false, message: '', type: 'success' })




// Fonction utilitaire pour déclencher la notif
function ViewNotif(msg, type = 'success') {
  notification.value = { show: true, message: msg, type }
  
  // Cache la notification après 3 secondes
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}
// Tableau de joours de la semaine
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// Fonction pour recevoir le jour cliqué depuis le composant Todo
function dayfunc(data) {
  day.value = data
}
// Tableau pour stocker les tâches
const tasks = ref([])
// -------------------------------------------------------------
// Fonction pour supprimer une tâche
function deletetask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  ViewNotif('Tâche supprimée avec succès 👍', 'error')
}
// -------------------------------------------------------------
// Fonction pour ajouter une tâche
function submitTask(taskTitle) {
  if (editingTask.value) {
    // Mode Edition
    const index = tasks.value.findIndex(t => t.id === editingTask.value.id);
    
    if (index !== -1) {
      tasks.value[index].title = taskTitle
      ViewNotif('Tâche mise à jour !')
    }
    editingTask.value = null // Reset après modification
  } else {
    // Mode Ajout
    tasks.value.push({ id: Date.now(), title: taskTitle, day: day.value })
    ViewNotif('Nouvelle tâche ajoutée !✔')
  }
  deletemodale()
}
// -------------------------------------------------------------------------
// fonction pour éditer une tâche
function edittask(id) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) {
    editingTask.value = { ...task } // On crée une copie pour ne pas modifier l'original direct
    day.value = task.day // On s'assure que le titre du jour correspond
    showmodale()
  }
}
// ----------------------------------------------------------------------
// Les fonction qui me permettent d'afficher le modal et de le supprimer
function showmodale() {
  modal.value = true
}
function deletemodale() {
  modal.value = false
  editingTask.value = null
}
// -----------------------------------------------------------------
// Function final du drag and drop 
function moveTask({ id, newDay }) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.day = newDay
  }
}
function readtask() {
  ViewNotif('Veuillez entrer une tâche à ajouté 🙏', 'error')
}
</script>
<template>
  <div class="calendar-container">
    <Transition name="slide">
      <Notif 
        v-if="notification.show" 
        :message="notification.message" 
        :type="notification.type" 
      />
    </Transition>

    </div>
  <div class="calendar-container">
    <div id="entête">
      <div class="calendar-hero">
        <img src="/public/calendar.avif" alt="Calendar illustration" />
        <h1>Bienvenue sur Calendar.todoDev</h1>
        <span>Organisez vos tâches par jour et suivez votre planning facilement.</span>
      </div>
      <div class="overlay">
        <Transition name="fade">
          <Input v-if="modal" @add-task="submitTask" @readtask="readtask" :days="day" @close="deletemodale" />
        </Transition>
      </div>
    </div>
    <header class="calendar-header">
      <h1>Calendar App</h1>
      <button class="btn-new" @click="showmodale">+ New Event</button>
    </header>

    <div class="days-grid">
  <Todo
  v-for="day in weekDays"
  :key="day"
  :dayName="day"
  @clickday="dayfunc"
  :tasks="tasks.filter((t) => t.day === day)"
  @delete-task="deletetask"
  @edit-task="edittask"
  @move-task="moveTask"
/>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
/* Animation pour la notification */
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
#entête {
  padding-top: 100px;
  display: flex;
  justify-content: space-around;
  background-image: url(/public/images.webp);
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.712);
  background-blend-mode: darken;
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
h1 {
  font-family: 'Fredoka', sans-serif;
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(45deg, #3b82f6, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #ddd;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  animation: fadeSlideDown 0.6s ease;
}

/* ===== TITLE ===== */
.calendar-header h1 {
  font-family: 'Fredoka', sans-serif;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #3b82f6, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: default;
  transition: transform 0.3s ease;
}

/* Petit effet bounce au hover */
.calendar-header h1:hover {
  transform: scale(1.05);
}

/* ===== BUTTON ===== */
.btn-new {
  font-family: 'Fredoka', sans-serif;
  background: linear-gradient(45deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 14px 22px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

/* Hover smooth */
.btn-new:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.5);
}

/* Click effect */
.btn-new:active {
  transform: scale(0.95);
}

/* ===== Animation entrée ===== */
@keyframes fadeSlideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
