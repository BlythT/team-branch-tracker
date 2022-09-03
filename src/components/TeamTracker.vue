<!-- eslint-disable prettier/prettier -->
<script>
import config from "../../config.json";

export default {
  data() {
    let unassigned = { teamid: 0, people: [] };

    // Remove any invalid teams from state
    const validTeams = config.teams.map((team) => team.id);
    config.state.forEach((team, index) => {
      if (!validTeams.includes(team.teamid)) {
        config.state.splice(index, 1); // Remove invalid team from state now that people have been moved
      }
    });

    // Add any missing teams from state
    const stateTeams = config.state.map((team) => team.teamid)
    const missingTeams = validTeams.filter((teamid) => !stateTeams.includes(teamid))
    missingTeams.forEach((teamid) => {
      config.state.push({"teamid": teamid, people: []})
    })

    // If people config contains a person not in state, assign to unnasigned
    let assignedUsers = [];
    config.state.forEach((team) => {
      assignedUsers = assignedUsers.concat(team.people);
    });

    config.people.forEach((person) => {
      if (!assignedUsers.includes(person.id)) {
        unassigned.people.push(person.id);
      }
    });

    config.state.unshift(unassigned);
    console.log(config.state);

    return {
      people: config.people,
      teams: config.teams,
      dragItem: null,
      state: config.state
    };
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

    getTeam(teamid) {
      const out = this.teams.filter(team => team.id === teamid)[0]
      if (out) {
        return out
      }
      return {id: teamid, name: "unknown team", description: "unknown team"}
    },

    getPerson(personid) {
      const out = this.people.filter(person => person.id === personid)[0]
      if (out) {
        return out
      }
      return {id: personid, name: "unkown person", description: "unkown person"}
    }

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
      <ul
        class="column"
        v-for="team in state"
        :key="team.teamid"
        @dragover.prevent
        @drop.self="dragDrop"
      >
        <h1>{{ getTeam(team.teamid).name }}</h1>
        <li
          class="item"
          draggable="true"
          v-for="personid in team.people"
          :key="personid"
          @dragstart="dragStart"
          @dragend="dragEnd"
        >
          {{ personid }}
        </li>
      </ul>
    </div>
  </main>
</template>
