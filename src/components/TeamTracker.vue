<script>
import $ from "jquery";
$.getJSON("config.json", function (config) {
  const defaultColumn = $(".default-column");
  console.log(config);
  if (Object.prototype.hasOwnProperty.call(config, "people")) {
    config.people.forEach((personData) => {
      var person = $("<li/>")
        .addClass("item")
        .html(personData.name)
        .attr("draggable", "true");
      defaultColumn.append(person);
    });
  }

  if (Object.prototype.hasOwnProperty.call(config, "teams")) {
    const container = $(".container");
    config.teams.forEach((teamData) => {
      var team = $("<ul/>")
        .addClass("column")
        .append("<h1>" + teamData.name + "</h1>");
      container.append(team);
    });
  }
  // Wait for async getJSON before querying for items
  init();
});

function init() {
  const items = $(".item");
  const columns = $(".column");

  items.each(function () {
    this.addEventListener("dragstart", dragStart);
    this.addEventListener("dragend", dragEnd);
  });
  columns.each(function () {
    this.addEventListener("drop", dragDrop);
    this.addEventListener("dragover", dragOver);
    // this.addEventListener('dragenter', dragEnter);
    // this.addEventListener('dragleave', dragLeave);
  });
}

let dragItem = null;

function dragStart() {
  console.log("dragstart");
  dragItem = this;
  setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
  this.className = "item";
  dragItem = null;
}

// The dragover event must be overridden for the drop event to be fired correctly.
function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  if (dragItem) {
    this.append(dragItem);
  }
}

// Unused but could be used for styling on enter and exit (shimmer/throb/colour-shift effect)
// function dragEnter() {
//     console.log('drag entered');
// }

// function dragLeave() {
//     console.log('drag left');
// }
</script>

<style>
@import "../assets/team-tracker.css";
</style>

<template>
  <main>
    <div class="container">
      <ul class="column default-column">
        <h1>Unassigned</h1>
      </ul>
    </div>
  </main>
</template>
