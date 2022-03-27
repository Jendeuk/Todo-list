// Timer
// Get timer related DOM elements.
const timerDisplay = document.getElementById("timer-display");
const buttonStart = document.getElementById("button-start");
const buttonStop = document.getElementById("button-stop");
const buttonReset = document.getElementById("button-reset");

// Here, I have chosen to use constructor notation with the keyword "class" instead of functions, the reason of using
// "class" instead of "function" is mostly the same as in using "let" instead of "var". It has also more features,
// which can make developing easier in the long run, since there exist better modern documentation on this.
// Timer-class declaration.
/** Implementation of the task 3. I. a) Timer class */
class Timer {
  // Constructor that takes in seconds, minutes and hours as parameters.
  constructor(seconds, minutes, hours) {
    /** Implementation of the task 3. I. b & c) 5 properties and 3 methods */
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;
    this.display = "00:00:00";
    this.date = new Date("June 6, 2000 00:00:00"); // Initializes Date, a built-in object for use with the timer.
  }
  setTimer(seconds, minutes, hours) {
    this.display = `${hours}:${minutes}:${seconds}`; // Updates the display with given parameters.
  }
  // Resets the timer by setting all variables and fields to 0.
  resetTimer() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    /** Implementation of the task 3. II. e) method of Date (Date.setMinutes) */
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setHours(this.hours);
    this.setTimer("00", "00", "00");
  }
  // Method that adds/count up the timer by adding +1 seconds to the Date instance.
  // The Date object will automatically add up minutes and dates when the seconds hits 60, as well as setting seconds back to 0 again.
  // However, using Date is a limitation as it doesn't let us have the timer go further than 23 hours.
  countTimer() {
    // Update the date object
    this.date.setSeconds(this.seconds + 1);
    this.seconds = this.date.getSeconds();
    this.minutes = this.date.getMinutes();
    this.hours = this.date.getHours();

    // Update the display with zero padding using the inbuilt String method (String.padStart).
    // This is done by making the integers of seconds, minutes and hours into a string first by concatination,
    // to get access to the String methods.
    /** Implementation of the task 3. II. c) method of String (String.padStart)*/
    this.setTimer(
      ("" + this.seconds).padStart(2, "0"),
      ("" + this.minutes).padStart(2, "0"),
      ("" + this.hours).padStart(2, "0")
    );
  }
}
// Initializes a timer object instance with the "new" keyword.
const timer = new Timer(0, 0, 0);

// Function to count up the timer as well as updating the html with the timer display
const countTimer = () => {
  timer.countTimer();
  /** Implementation of the task 3. I. e) display timer information to interface */
  timerDisplay.innerHTML = timer.display;
};
// Eventlisteners for the respective timer related buttons.
buttonStart.addEventListener("click", () => {
  // Starts the timer on a second interval (1000ms). The setInterval function from the Window object
  // returns a number. This number is added to the timer as a property to later be cleared.
  /** Implementation of the task 3. I. d) add property to timer (Timer.interval) */
  /** Implementation of the task 3. II. a) method of window (Window.setInterval) */
  if (!timer.interval) timer.interval = window.setInterval(countTimer, 1000);
});
buttonStop.addEventListener("click", () => {
  window.clearInterval(timer.interval); // Clears the interval property of timer object.
  /** Implementation of the task 3. I. d) delete property of timer (Timer.interval) */
  delete timer.interval; // Deletes the property from the timer object.
});
buttonReset.addEventListener("click", () => {
  window.clearInterval(timer.interval);
  delete timer.interval;
  timer.resetTimer(); // Reset the timer.
  timerDisplay.innerHTML = timer.display; // Updates the timer.
});

// Todo
// Get todolist related DOM elements.
const stats = document.getElementById("stats");
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosDiv = document.getElementById("todos");

// TodoElement class declaration.
/** Implementation of the task 3. I. a) TodoElement class */
class TodoElement {
  // Constructor that takes in text and completed as parameters, color and date is set with a default if not given.
  constructor(text, completed, color = undefined, date = new Date()) {
    /** Implementation of the task 3. I. b & c) 5 properties and 1 method*/
    this.text = text;
    this.completed = completed;
    this.colors = ["#aa6f73", "#66545e"];
    // Randomize a color from the array above with methods from the Math object.
    /** Implementation of the task 3. II. d) */
    this.color =
      color || this.colors[Math.floor(Math.random() * this.colors.length)];
    this.date = date;
  }
  // Method to mark the todoElement as completed.
  setCompleted(check) {
    this.completed = check;
  }
}

// TodoList class declaration
/** Implementation of the task 3. I. a) TodoList class */
class TodoList {
  // Constructor that takes in a listname as parameter, used to differentiate from other TodoList instances if there are.
  constructor(name) {
    /** Implementation of the task 3. I. b & c) 5 properties and 5 methods*/
    this.name = name;
    this.todos = [];
    this.total = this.todos.length;
    // Uses filter method from Array object as a functional way of filtering out completed todos.
    this.finished = this.todos.filter((todo) => todo.completed).length;
    this.stats = "0 / 0 ( 0% )"; // Display for stats (finished / total (percent%)).

    this.loadTodos(); // Initializes the todoList.
  }
  loadTodos() {
    // Retrieve todos from localStorage if exists, else set todos as an empty array.
    const todos = JSON.parse(window.localStorage.getItem("todos")) || [];
    this.todos.length = 0; // Reset the current todoList, if there were any elements already loaded.
    // Loop through the parsed todos and push in the elements as TodoElement objects using the constructor notation.
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      let todoElement = new TodoElement(
        todo.text,
        todo.completed,
        todo.color,
        todo.date
      );
      this.todos.push(todoElement);
    }
  }
  // Method to add in more todoElements, updates the stats and localstorage for each call.
  addTodo(text) {
    let todoElement = new TodoElement(text, false);
    this.todos.push(todoElement);
    this.updateTodo();
  }
  // Method to delegate setCompleted to the todoElement, and also update
  setCompleted(index, check) {
    this.todos[index].setCompleted(check);
    this.updateTodo();
  }
  // Method to remove todoElement using splice method of Array as arrays are mutable.
  removeTodo(index) {
    this.todos.splice(index, 1);
    this.updateTodo();
  }
  // Method to update the display stats and the localstorage.
  updateTodo() {
    this.total = this.todos.length;
    this.finished = this.todos.filter((todo) => todo.completed).length;
    /** Implementation of the task 3. III. a) decision through if and else if */
    const percent = Math.round((this.finished / this.total) * 100) || 0;
    if (percent === 100) {
      this.stats = "Finished all tasks ( 100% )";
    } else {
      this.stats = `${this.finished} / ${this.total} ( ${percent}% )`;
    }
    window.localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
// Initializes a todoList object instance with the listname "What to do?"
const todoList = new TodoList("What to do?");

// Function to update the HTML by looping through the todoElements of todoList.
const update = () => {
  todosDiv.innerHTML = ""; // Starts by clearing all the todo elements.
  // For loop, going through the TodoElement instances.
  /** Implementation of the task 3. III. b) for loop to display elements in an array (TodoList.todos)*/
  for (let i = 0; i < todoList.todos.length; i++) {
    const todo = todoList.todos[i];
    /** Implementation of the task 3. II. b) method of Document (Document.createElement)*/
    const todoElement = document.createElement("div"); // Create a "div" HTML element
    const p = document.createElement("p");
    if (todo.completed) p.classList.add("completed"); // Add "completed" class if the todoElement is marked as completed
    p.innerText = todo.text;
    p.style.color = todo.color;

    // Add checkbox from feedback for better affordance.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    // Add remove button to support mobile phones.
    const buttonDelete = document.createElement("a");
    buttonDelete.className = "btn";
    buttonDelete.innerText = "X";
    // Add a hitbox area for marking the todoElement.
    const hitbox = document.createElement("div");

    // Add eventlistener for marking the todoElement.
    hitbox.onclick = () => {
      p.classList.toggle("completed");
      todoList.setCompleted(i, p.classList.contains("completed"));
      update();
    };

    // Add eventlistener for removing the todoElement.
    buttonDelete.addEventListener("click", (e) => {
      todoList.removeTodo(i);
      update();
    });

    // Append the elements to DOM.
    /** Implementation of the task 3. I. e) display information about TodoList/TodoElement object to interface */
    todoElement.appendChild(p);
    todoElement.appendChild(checkbox);
    todoElement.appendChild(hitbox);
    todoElement.appendChild(buttonDelete);
    todosDiv.appendChild(todoElement);
  }
  stats.innerText = todoList.stats; // Updates the todoList stats
};
// Eventlistener for submitting/adding new todoElements.
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Disable the form from refreshing the page.
  let todoText = input.value;
  if (todoText != "") {
    // Add todo only if there are texts written.
    todoList.addTodo(todoText);
    input.value = "";
    update();
  }
});

// Initializes the todoList on page load,
if (todoList) {
  todoList.updateTodo();
  update();
}
/** Implementation of the task 3. II. b) method of Document (Document.lastModified) */
document.getElementById("lastModified").innerText = document.lastModified; // Added to show the usage of a property of Document object.
