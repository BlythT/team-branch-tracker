<template>
  <div id="app">
    <h1>Team Tracker</h1>
    <KanbanBoard />
  </div>
</template>

<script>
import KanbanBoard from './components/KanbanBoard.vue';

export default {
  name: 'App',
  components: {
    KanbanBoard,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>
