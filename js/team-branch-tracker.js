const items = document.querySelectorAll('.item')
const columns = document.querySelectorAll('.column')

items.forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
});

function dragStart() {
    console.log('drag started')
}

function dragEnd() {
    console.log('drag ended')
}