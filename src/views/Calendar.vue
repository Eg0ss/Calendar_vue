<script setup>
import { ref } from 'vue';
import Todo from '../components/Todo.vue';
import Input from '@/components/Input.vue'
const day = ref('');
// Tableau de joours de la semaine
const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
];
// Fonction pour recevoir le jour cliqué depuis le composant Todo
function dayfunc(data) {
    day.value = data;
}
// Tableau pour stocker les tâches
const tasks = ref([]);
// Fonction pour supprimer une tâche
function deletetask(id) {
    tasks.value = tasks.value.filter(task => task.id !== id);
    console.log("tableau mis a jour", tasks.value);
}
// Fonction pour ajouter une tâche
function submitTask(task) {
    tasks.value.push({ id: Date.now(), title: task, day: day.value });
    console.log("tableu mis a jour", tasks.value);
}
// fonction pour éditer une tâche
function edittask(id) {
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.value[index].title = prompt("Edit task title:", tasks.value[index].title);
        console.log("tableau mis a jour", tasks.value);
    }
}
</script>
<template>
    <div class="calendar-container">
        <div id="container">
            <Input @add-task="submitTask" :days="day" />
        </div>
        <header class="calendar-header">
            <h1>Calendar App</h1>
            <button class="btn-new">+ New Event</button>
        </header>

        <div class="days-grid">
            <Todo v-for="day in weekDays" :key="day" :dayName="day" @clickday="dayfunc"
                :tasks="tasks.filter(t => t.day === day)" @delete-task="deletetask" @edit-task="edittask" />
        </div>
    </div>
</template>

<style scoped>
.days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    border: 1px solid #ddd;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.btn-new {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
}

#container {
    background-color: black;
}
</style>
