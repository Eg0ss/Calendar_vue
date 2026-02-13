<script setup>
import Todo from '../components/Todo.vue';
import Input from '@/components/Input.vue'

const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
];
</script>

<template>
    <div class="calendar-container">
        <header class="calendar-header">
            <h1>Calendar App</h1>
            <button class="btn-new">+ New Event</button>
        </header>

        <div class="days-grid">
            <Todo v-for="day in weekDays" :key="day" :dayName="day" />
        </div>
    </div>
    <div id="container">
        <Input />
        <Todo />
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
