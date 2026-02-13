<script setup>

defineProps({
    dayName: String
});
</script>
    <template>
        <div class="day-column">
            <div class="day-title">
                {{ dayName }}
            </div>
            <div class="task-list"></div>
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
}
</style>