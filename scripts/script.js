const userId = document.getElementById("userId");
const userDropdown = document.getElementById("userDropdown");
const toDoDetailsDiv = document.getElementById("toDoDetailsDiv");
const categorySelect = document.getElementById("categorySelect")

async function user(params) {
  let promise = fetch("http://localhost:8083/api/users");
  let response = await promise;
  let data = await response.json();
  console.log(data);
  populateUsers(data);
  populateUsersDrop(data);
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
  todos.forEach((todo) => {
    const cardContainers = document.createElement("div");
    cardContainers.className = "card bodyOfCard";
    cardContainers.style.width = "18rem";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = todo.category;

    const cardLine = document.createElement("hr");

    // const cardSubtitle = document.createElement("h6");
    // cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
    // cardSubtitle.innerText = `$${productCost.toFixed(2)}`;

    const cardText = document.createElement("p");
    cardText.className = "card-text";

    // if (productUnits === 0) {
    //   // const cardText = document.createElement("p");
    //   // cardText.className = "card-text";
    //   cardText.textContent = "Out of Stock!";
    // } else {
    //   // const cardText = document.createElement("p");
    //   // cardText.className = "card-text";
    //   cardText.textContent = `Avaliable units: ${productUnits}`;
    // }

    // const cardText2 = document.createElement("p");
    // cardText2.className = "card-text";
    // cardText2.textContent = `Supplier: ${productSupplier}`;

    // const cardLink = document.createElement("a");
    // cardLink.href = `productsDetails.html?productId=${productId}`;
    // cardLink.innerText = "See More";

    // cardBody.appendChild(cardTitle);
    // cardBody.appendChild(cardLine);
    // cardBody.appendChild(cardSubtitle);
    // cardBody.appendChild(cardText);
    // cardBody.appendChild(cardText2);
    // cardBody.appendChild(cardLink);
    cardContainers.appendChild(cardBody);

    toDoDetailsDiv.appendChild(cardContainers);
  });
}

async function createTodo() {
    
}