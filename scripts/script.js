const selector = document.getElementById("selector")

async function fetchingCategories() {
  let promise = fetch("http://localhost:8083/api/categories");
  let response = await promise;
  let data = await response.json();
  console.log(data);
  populateCategories(data)
}

fetchingCategories();

async function fetchingTodos() {
  let promise = fetch("http://localhost:8083/api/todos");
  let response = await promise;
  let data = await response.json();
  console.log(data);
}

fetchingTodos();

function populateCategories(name) {
  for (let i = 0; i < name.length; i++) {
    let newOptions = document.createElement("option");
    newOptions.value = name[i].id
    newOptions.innerText = name[i].name
    selector.appendChild(newOptions)
  }
}

function todoCards(todos){
todos.forEach((todo)=>{

})
}

