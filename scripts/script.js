const userId = document.getElementById("userSelectId");
const userDropdown = document.getElementById("userDropdown");
const toDoDetailsDiv = document.getElementById("toDoDetailsDiv");

/////////////////////new_todo.html form\\\\\\\\\\\\\\\\\\\\\\
const priority = document.getElementById("priority");
const categorySelect = document.getElementById("categorySelect");
const todoDescription = document.getElementById("todoDescription");
const deadline = document.getElementById("deadline");
const addTodoButton = document.getElementById("addTodoButton");

async function loadUsers() {
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
    newOptions.value = todo[i].name;
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

async function initialize() {
  await loadUsers();
  //Set dropdown to user.queryString
  filterTodo();
}

initialize();

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
        cardPriority.style.textDecoration = "line-through";
      } else {
        cardTitle.style.textDecoration = "none";
        cardText.style.textDecoration = "none";
        cardPriority.style.textDecoration = "none";
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

    let buttonGrouping = document.createElement("div");
    buttonGrouping.className = "mt-3";

    let editTodo = document.createElement("button");
    editTodo.className = "me-2";
    editTodo.innerText = "Edit";
    buttonGrouping.appendChild(editTodo);

    editTodo.addEventListener("click", () => {
      location.href = "edit_todo.html";
    });

    let deleteTodo = document.createElement("button");
    deleteTodo.innerText = "Delete";
    buttonGrouping.appendChild(deleteTodo);

    deleteTodo.addEventListener("click", () => {
      location.href = "delete_todo.html";
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardFooter);
    cardContainer.appendChild(cardBody);
    cardBody.appendChild(label);
    cardBody.appendChild(completedButton);
    cardBody.appendChild(buttonGrouping);

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

// Example of adding an error display element:
// In your HTML: <div id="error-message" style="color: red;"></div>

async function createUser(event) {
  event.preventDefault();

  let formData = new FormData();

  let userData = {
    name: document.getElementById("fullNameField").value.trim(),
    username: document.getElementById("emailField").value.trim(),
    email: document.getElementById("emailField").value.trim(),
    password: document.getElementById("passwordField").value.trim(),
    imageProfile: document.getElementById("imageProfile").value,
  };

  // formData.append("name", document.getElementById("fullNameField").value.trim())
  // formData.append("username", document.getElementById("usernameField").value.trim())
  // formData.append("name", document.getElementById("emailField").value.trim())
  // formData.append("name", document.getElementById("passwordField").value.trim())

  // let imageProfile = document.getElementById("imageProfile").files[0]
  // if(imageProfile){
  //   formData.append("imageProfile", imageProfile)
  // }else{
  //   console.error("No File")
  // }

  try {
    let promise = fetch("http://localhost:8083/api/users", {
      method: "POST",
      // body: JSON.stringify(userData),
      body: JSON.stringify(userData),
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



function togglePassword() {
  const passwordField = document.getElementById("passwordField");
  const passwordField2 = document.getElementById("passwordField2");
  const passwordLabel = document.getElementById("passwordLabel");
  if (passwordField.type === "password" && passwordField2.type === "password") {
    passwordField.type = "text";
    passwordField2.type = "text";
    passwordLabel.innerText = "Hide Password";
  } else {
    passwordField.type = "password";
    passwordField2.type = "password";
    passwordLabel.innerText = "Show Password";
  }
}
