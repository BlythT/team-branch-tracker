const items = document.querySelectorAll('.item');
const columns = document.querySelectorAll('.column');

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

columns.forEach(column => {
    column.addEventListener('drop', dragDrop);
    column.addEventListener('dragover', dragOver);

    // column.addEventListener('dragenter', dragEnter);
    // column.addEventListener('dragleave', dragLeave);
});

let dragItem = null;

function dragStart() {
    dragItem = this;
    setTimeout(() => this.className = 'invisible', 0);
}

function dragEnd() {
    this.className = 'item';
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