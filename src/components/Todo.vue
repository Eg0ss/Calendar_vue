<template>
    <div class="todo">
        <h4>{{ day }}</h4>

        <ul>
            <li v-for="(task, index) in tasks" :key="index">

                {{ task }}
            </li>
        </ul>
    </div>
</template>

<script setup>

defineProps(["day", "tasks"])
</script>

<style scoped>
.todo {

    background: #f9fafb;

    padding: 10px;

    border-radius: 6px;

    min-height: 120px;

}

h4 {

    font-size: 14px;

    margin-bottom: 8px;

    font-weight: 600;

}

ul {

    list-style: none;

    padding: 0;

}

li {

    background: #e5e7eb;

    margin-bottom: 5px;

    padding: 5px;

    border-radius: 4px;

    font-size: 13px;

}
</style>