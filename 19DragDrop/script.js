const draggable_list = document.getElementById('draggable-list');
const check =document.getElementById('check');

const richestPeople = [
    'Jeff Bezos', 'Bill Gates', 'Warren Bufett',
    'Bernard Arault','Carlos Slim Helu','Amancio Ortega',
    'Larray Ellison','Mark Zuckerberg','Michael Bloomberg','Larry Page'
];

const listItems = [];

let dragStartIndex;

createList();


function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a,b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });

        addEventListener();
}

function dragStart() {
    // console.log('Event: dragStart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
    // console.log('Event: dragEnter');
    this.classList.add('over')
}
function dragLeave() {
    // console.log('Event: dragLeave');
    this.classList.remove('over');
}
function dragOver(e) {
    // console.log('Event: dragOver');
    e.preventDefault();
}
function dragDrop() {
    // console.log('Event: dragDrop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}
function swapItems(start,end) {
    const itemOne = listItems[start].querySelector('.draggable');
    const itemTwo = listItems[end].querySelector('.draggable');

    listItems[start].appendChild(itemTwo);
    listItems[end].appendChild(itemOne);
}
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }

    });
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click',checkOrder);