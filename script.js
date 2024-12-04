
//find the elements

const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


//showmessage

const showMessage = (text, status) =>{
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
        messageElement.textContent = "";
        messageElement.classList.remove("bg-success");
    },1000);
};


 //create todo

 const createTodo = (todoId, todoValue) => {

    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span><button class ="btn" id="deleteButton>" 
    <i class=" fa fa-trash"> </i> </button></span>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("deleteButton");
    deleteButton.addEventListener("click",deleteTodo);

 };

 //delete todo

 const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.
    parentElement.parentElement;

    todoLists.removeChild(selectedTodo);
    showMessage("todo is deleted","denger");

  
    let todos = geTodosFromLocalStorage();
    todos = todos.filter((todo)=> todo.todoId!= selectedTodo.id);

    localStorage.setItem("mytodos",JOSON.stringify(todos));

 };

 //get todos fromlocal storage
 const geTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos")) : [];

 };

//add todo

const addTodo = (event)=> {

    event.preventDefault();
    const todoValue = todoInput.value;

    //unique id

    const todoId = Date.now().toString();
   
    createTodo(todoId,todoValue);
    showMessage("Todo is added", "success");

    //add todo to local storages
     const todos = geTodosFromLocalStorage();
     todos.push({todoId, todoValue}) ;
     localStorage.setItem("mytodos",JSON.stringify(todos)
    );

    todoInput.value = "";

};

//loadTodos
const loadTodos = () => {

  const todos = geTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId,todo.todoValue)) ;

};


//adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
