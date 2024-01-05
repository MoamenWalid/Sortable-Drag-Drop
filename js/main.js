// Document 
const container = document.querySelector('.container');
const button = document.querySelector('button');

// Variables
let drop = null;

// Array 
const pushRich = [];

const richPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
]

const checked = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

// Get random 10 people from array [rich People]
for(let counter = 0; counter <= richPeople.length; counter++) {
  const randomName = richPeople[Math.floor(Math.random() * richPeople.length)];
  pushRich.push(randomName);
  richPeople.splice(richPeople.indexOf(randomName), 1);
  counter = 0;
}

createPerson();

// Function to add persons to container
function addPersons() {
  pushRich.forEach((person, index) => {
    container.innerHTML += `
    <div class="draggable">
      <div class="person" draggable="true" id=${index}>
        ${person}
        <i class="fa-solid fa-grip-lines"></i>
      </div>
    </div>
    `
  })

  makeDrag();
}

function createPerson() {
  addPersons();
}

function dragStart() {
  drop = this.id;
  this.style.opacity = '.5';
}

function dragEnd() {
  drop = null;
  this.style.opacity = '1';
}

function dargOver(e) {
  e.preventDefault();
  this.children[0].style.background = '#4caf5033';
}

function dragLeave() {
  this.children[0].style.background = '#f7f5f5';
}

function dragDrop() {
  this.children[0].style.background = '#f7f5f5';
  changePersons(drop, this.children[0].id);
  checkOrder();
}

// // Function to change persons when drop
function changePersons(fromIndex, toIndex) {
  const itemOne = pushRich[fromIndex];
  const itemTwo = pushRich[toIndex];

  pushRich.splice(fromIndex, 1, itemTwo);
  pushRich.splice(toIndex, 1, itemOne);
  container.innerHTML = '';
  addPersons(pushRich);
  //
}

function makeDrag() {
  const persons = document.querySelectorAll('.person');

  persons.forEach((person) => {
    person.addEventListener('dragstart', dragStart);
    person.addEventListener('dragend', dragEnd);
    person.parentElement.addEventListener('dragover', dargOver);
    person.parentElement.addEventListener('dragleave', dragLeave);
    person.parentElement.addEventListener('drop', dragDrop);
  })
}

function checkOrder() {
  checked.forEach((personUp, index) => {
    pushRich.forEach((personRand, counter) => {
      if (personUp == personRand && index == counter) {    
        document.querySelectorAll('.person')[counter].classList.add('checked');
      }
    })
  })
}

button.addEventListener('click', checkOrder);