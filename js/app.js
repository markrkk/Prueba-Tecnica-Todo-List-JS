const todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("#addButton");
const todoList = document.querySelector("#todoList");
const deleteCompletedButton = document.querySelector("#deleteCompletedButton");
const deleteAllButton = document.querySelector("#deleteAllButton");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.dataset.index = index;

        if (todo.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const span = document.createElement("span");
        span.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");

        checkbox.addEventListener("change", () => {
            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();

    if (text === "") {
        return;
    }

    const newTodo = {
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = "";
    saveTodos();
    renderTodos();
}

addButton.addEventListener("click", () => {
    addTodo();
});

todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

deleteCompletedButton.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    renderTodos();
});

deleteAllButton.addEventListener("click", () => {
    todos = [];
    saveTodos();
    renderTodos();
});

renderTodos();
