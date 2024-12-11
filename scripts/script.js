const userId = document.getElementById("userSelectId");
const userDropdown = document.getElementById("userDropdown");
const toDoDetailsDiv = document.getElementById("toDoDetailsDiv");

/////////////////////new_todo.html form\\\\\\\\\\\\\\\\\\\\\\
const priority = document.getElementById("priority");
const categorySelect = document.getElementById("categorySelect");
const todoDescription = document.getElementById("todoDescription");
const deadline = document.getElementById("deadline");

async function user() {
  try {
    let promise = fetch("http://localhost:8083/api/users");
    let response = await promise;
    let data = await response.json();
    console.log(data);
    populateUsersDrop(data);
  } catch (error) {
    console.error("error code:", error);
  }
}

user();

async function userForCreatingPost(params) {
  try {
    let promise = fetch("http://localhost:8083/api/users");
    let response = await promise;
    let data = await response.json();
    console.log(data);
    populateUsers(data);
  } catch (error) {
    console.error("error code:", error);
  }
}

userForCreatingPost();

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
    categorySelect.appendChild(newOptions);
  }
}

async function fetchingCategories() {
  categorySelect.innerHTML = "";
  let promise = fetch("http://localhost:8083/api/categories");
  let response = await promise;
  let data = await response.json();
  console.log(data);
  //  for(let i = 0; i < data.length; i++){
  //   if(data[i].id == user){
  populateCategories(data);
  // }
  //  }
}

// function populateDropdown(data, dropdowns){
//   for(let i = 0; i < data.length; i++){
//     const option = document.createElement("option");
//     option.value = data[i].id;
//     option.innerText = data[i].name;
//     dropdownElement.appendChild(option);
// }
// }

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
    cardText.textContent = `Description: ${todo.description}`;

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    const cardPriority = document.createElement("p");
    cardPriority.className = "card-text";
    cardPriority.textContent = `Description: ${todo.deadline}`;
    cardFooter.appendChild(cardPriority);

    let completedButton = document.createElement("input");
    completedButton.type = "checkbox";

    let label = document.createElement("label");
    label.innerText = `${todo.completed}`;
    label.style.display = "inline";

    completedButton.addEventListener("click", async () => {
      const state = completedButton.checked;
      label.innerText = state ? "Completed" : "Not Completed";
      if (completedButton.checked) {
        cardTitle.style.textDecoration = "line-through";
        cardText.style.textDecoration = "line-through";
      } else {
        cardTitle.style.textDecoration = "none";
        cardText.style.textDecoration = "none";
      }
      // cardTitle.style.textDecoration = "line-through"
      // cardText.style.textDecoration = "line-through"

      try {
        const response = await fetch(`http://localhost:8083/api/todos/${todo.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: state }),
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        console.log(`Todo ${todo.id} updated to completed: ${state}`);
      } catch (error) {
        console.error("Failed to update todo:", error);
        alert("Failed to update the todo status. Please try again.");
      }
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardFooter);
    cardContainer.appendChild(cardBody);
    cardBody.appendChild(label);
    cardBody.appendChild(completedButton);

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

async function createTodo(event) {
  event.preventDefault();

  const priority = document.getElementById("priority");
  const categorySelect = document.getElementById("categorySelect");
  const todoDescription = document.getElementById("todoDescription");
  const deadline = document.getElementById("deadline");

  let todoData = {
    userid: Number(userId.value),
    category: categorySelect.value,
    deadline: deadline.value,
    description: todoDescription.value.trim(),
    priority: priority.value,
    // deadline: "",
  };

  try {
    let promise = fetch("http://localhost:8083/api/todos", {
      method: "POST",
      body: JSON.stringify(todoData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("error");
  }
}
