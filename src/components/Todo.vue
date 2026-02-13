<script setup>
import { defineEmits, defineProps } from 'vue';
const props = defineProps({
    dayName: String,
    tasks: Array
});
console.log(props.tasks);

const emit = defineEmits(['clickday'], ['delete-task'], ['edit-task']);

const sendClick = () => {
    emit('clickday', props.dayName);
    console.log(props.dayName);
}
const delet = (id) => {
    emit('delete-task', id);
    console.log("Task deleted:", id);

}
const edit = (id) => {
    emit('edit-task', id);
}
</script>
<template>
    <div class="day-column">
        <div class="day-title" @click="sendClick">
            {{ dayName }}
        </div>
        <div class="task-list" v-for="(tache, index) in tasks" :key="index">
            <p> {{ tache.title }}</p>
            <button @click="delet(tache.id)">🗑</button>
            <button @click="edit(tache.id)">🖊</button>
        </div>
    </div>
</template>


<style scoped>
.day-column {
    border: 0.5px solid #eee;
    min-height: 100px;
    text-align: center;
}

.day-title {
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.task-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #eee;
}

.task-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin: 8px 0;
    padding: 10px 16px;
    transition: box-shadow 0.2s;
}

.task-list:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    background: #f8fafd;
}

.task-list p {
    margin: 0;
    font-size: 1rem;
    color: #333;
    flex: 1;
    text-align: left;
}

.task-list button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    margin-left: 8px;
    transition: color 0.2s;
}

.task-list button:hover {
    color: #1976d2;
}
</style>