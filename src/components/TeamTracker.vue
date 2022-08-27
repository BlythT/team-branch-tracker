<script>
import config from "../../config.json";

export default {
  data() {
    let people = [];
    let teams = [];
    if (Object.prototype.hasOwnProperty.call(config, "people")) {
      config.people.forEach((personData, index) => {
        people.push({ id: index, name: personData.name });
      });
    }

    if (Object.prototype.hasOwnProperty.call(config, "teams")) {
      config.teams.forEach((branch) => {
        teams.push({ name: branch.name });
      });

      return {
        people: people,
        branches: teams,
        dragItem: null,
      };
    }
  },
  methods: {
    dragStart(e) {
      this.dragItem = e.target;
      setTimeout(() => (this.className = "invisible"), 0);
    },

    dragEnd() {
      this.dragItem = null;
    },

    dragDrop(e) {
      if (this.dragItem) {
        e.target.append(this.dragItem);
      }
    },

    // Unused but could be used for styling on enter and exit (shimmer/throb/colour-shift effect)
    // dragEnter() {
    //   console.log("drag entered");
    // },

    // dragLeave() {
    //   console.log("drag left");
    // },
  },
};
</script>

<style>
@import "../assets/team-tracker.css";
</style>

<template>
  <main>
    <div class="container">
      <ul class="column default-column" @dragover.prevent @drop="dragDrop">
        <h1>Unassigned</h1>
        <li
          class="item"
          draggable="true"
          v-for="person in people"
          :key="person.id"
          @dragstart="dragStart"
          @dragend="dragEnd"
        >
          {{ person.name }}
        </li>
      </ul>
      <ul
        class="column"
        v-for="branch in branches"
        :key="branch.name"
        @dragover.prevent
        @drop.self="dragDrop"
      >
        <h1>{{ branch.name }}</h1>
      </ul>
    </div>
  </main>
</template>
