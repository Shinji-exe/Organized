const userId = document.getElementById("userId");
const userDropdown = document.getElementById("userDropdown");
const toDoDetailsDiv = document.getElementById("toDoDetailsDiv");
const categorySelect = document.getElementById("categorySelect");

async function user(params) {
  try {
    let promise = fetch("http://localhost:8083/api/users");
    let response = await promise;
    let data = await response.json();
    console.log(data);
    populateUsersDrop(data);
    populateUsers(data);
  } catch (error) {
    console.error("error code:", error);
  }
}

user();

async function fetchingCategories() {
  let user = userId.value;

  let promise = fetch("http://localhost:8083/api/categories");
  let response = await promise;
  let data = await response.json();
  console.log(data);
  populateCategories(data);
}

// fetchingCategories();

async function fetchingTodos() {
  try {
    const response = await fetch("http://localhost:8083/api/todos");
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    console.log(data);
    todoCards(data);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
}

fetchingTodos();

function populateUsers(name) {
  for (let i = 0; i < name.length; i++) {
    let newOptions = document.createElement("option");
    newOptions.value = name[i].id;
    newOptions.innerText = name[i].name;
    userId.appendChild(newOptions);
  }
}

function populateUsersDrop(name) {
  for (let i = 0; i < name.length; i++) {
    let newOptions = document.createElement("option");
    newOptions.value = name[i].id;
    newOptions.innerText = name[i].name;
    userDropdown.appendChild(newOptions);
  }
}

function populateCategories(todo) {
  for (let i = 0; i < todo.length; i++) {
    let newOptions = document.createElement("option");
    newOptions.value = todo[i].id;
    newOptions.innerText = todo[i].name;
    // userI.appendChild(newOptions);
  }
}

function todoCards(todos) {
  toDoDetailsDiv.innerHTML = "";
  todos.forEach((todo) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card bodyOfCard";
    cardContainer.style.width = "18rem";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = todo.category;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = `Description: ${todo.description}`; // Example property

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardContainer.appendChild(cardBody);
    toDoDetailsDiv.appendChild(cardContainer);
  });
}

async function filterTodo() {
  toDoDetailsDiv.innerHTML = "";
  let nameValue = Number(userDropdown.value);
  // if (nameValue) {
  try {
    const response = await fetch(`http://localhost:8083/api/todos/byuser/${nameValue}`);
    const data = await response.json();
    let todoFilter = data.filter((todo) => todo.userid === nameValue);
    console.log(todoFilter);
    todoCards(todoFilter);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
  // } else {
  //   toDoDetailsDiv.innerHTML = "";
  // }
}

async function createTodo() {
  let todoData = {};
}
