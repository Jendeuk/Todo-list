//Timer
let seconds = 00;
let tens = 00;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let buttonStart = document.getElementById("button-start");
let buttonStop = document.getElementById("button-stop");
let buttonReset = document.getElementById("button-reset");

// WHAT TO DO LIST:
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

let interval; //Here is to store timer values
//this function will run when you click on start
function startTimer() {
  tens++;

  if (tens < 9) {
    appendTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    appendTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      //since it doesnt work to only add todo.completed, I will add todo && so u can still add more list while it saved.
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      //whenever we click on the list, we want it to toggle it, toggle as complete.

      update(); //update the localStorage function.
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove(); //right click will remove the input completely.

      update(); //update the localStorage function.
    });

    todosUL.appendChild(todoEl);

    //now I will empty the input by:
    input.value = ""; //make it empty

    update(); //update the localStorage function.
  }
}
function update() {
  //Here I will update localStorage with a new object
  const todosEl = document.querySelectorAll("li"); //this is the list items

  const todos = []; //the todos will be the array of the todos

  todosEl.forEach((noteEl) => {
    todos.push({
      text: noteEl.innerText,
      completed: noteEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Buttons for the timer
buttonStart.onclick = function () {
  interval = setInterval(startTimer);
};

buttonStop.onclick = function () {
  clearInterval(interval);
};

buttonReset.onclick = function () {
  clearInterval(interval);
  tens = "00";
  seconds = "00";
  appendSeconds.innerHTML = seconds;
  appendTens.innerHTML = tens;
};

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Don't want it to be submitted

  addTodo();
});
