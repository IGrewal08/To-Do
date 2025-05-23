import { format, sub } from "date-fns";
import { DOMToDoItem } from "./DOMElements"
import { createToDo } from "./todo";

export function editTodo(currentTodo, currentDate, todoItem, currentProject) {

    const body = document.querySelector("body");

    const block = document.createElement('div');
    block.classList.add('block');

    const form = document.createElement('forum');
    form.classList.add("edit-todo");

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute("for", "todo-title");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "todo-title");
    titleInput.setAttribute("name", "todo-title");
    titleInput.setAttribute("required", "");
    titleInput.setAttribute("value", currentTodo.title);

    const descLabel = document.createElement('label');
    descLabel.setAttribute("for", "descLabel");
    descLabel.textContent = "Description";
    const descInput = document.createElement('textarea');
    descInput.setAttribute("id", "todo-title");
    descInput.setAttribute("name", "todo-title");
    descInput.setAttribute("cols", "50");
    descInput.setAttribute("rows", "10");
    descInput.setAttribute("required", "");
    descInput.setAttribute("value", currentTodo.description);
    descInput.textContent = currentTodo.description;

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute("for", "due-date");
    dateLabel.textContent = "Deadline";
    const dateInput = document.createElement('input');
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "due-date");
    dateInput.setAttribute("name", "due-date");
    const date = format(currentDate, 'yyyy-MM-dd');
    dateInput.setAttribute("value", format(currentTodo.dueDate, 'yyyy-MM-dd'));
    dateInput.setAttribute("min", date);

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute("for", "priority");
    priorityLabel.textContent = "Priority (1 > Highest  |   5 > Lowest)";
    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("id", "priority");
    prioritySelect.setAttribute("name", "priority");

    for (let i = 1; i <= 5; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", i);
        option.textContent = i;
        prioritySelect.appendChild(option);
    }

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        currentTodo.title = titleInput.value;
        currentTodo.description = descInput.value;
        const newDate = new Date(dateInput.value);
        newDate.setDate(newDate.getDate() + 1);
        currentTodo.dueDate = newDate;
        currentTodo.priority = prioritySelect.value;
        event.target.parentNode.parentNode.parentNode.remove();

        todoItem.remove();
        DOMToDoItem(currentProject);
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener('click', (event) => {
        event.target.parentNode.parentNode.parentNode.remove();
    });

    buttons.appendChild(submitButton);
    buttons.appendChild(cancelButton);


    form.appendChild(titleLabel);
    form.appendChild(titleInput);

    form.appendChild(descLabel);
    form.appendChild(descInput);

    form.appendChild(dateLabel);
    form.appendChild(dateInput);

    form.appendChild(priorityLabel);
    form.appendChild(prioritySelect);

    form.appendChild(buttons);

    block.appendChild(form);
    body.appendChild(block);

}

export function deleteTodo(currentTodo, todoObjects) {
    for (let i = 0; i < todoObjects.length; i++) {
        if (todoObjects[i].title === currentTodo.title) {
            todoObjects.splice(i, 1);
        }
    }
}

export function createTodoDOM(currentProject, currentDate, todoItem) {

    const body = document.querySelector("body");

    const block = document.createElement('div');
    block.classList.add('block');

    const form = document.createElement('forum');
    form.classList.add("edit-todo");

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute("for", "todo-title");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "todo-title");
    titleInput.setAttribute("name", "todo-title");
    titleInput.setAttribute("required", "");
    titleInput.setAttribute("value", "");

    const descLabel = document.createElement('label');
    descLabel.setAttribute("for", "descLabel");
    descLabel.textContent = "Description";
    const descInput = document.createElement('textarea');
    descInput.setAttribute("id", "todo-title");
    descInput.setAttribute("name", "todo-title");
    descInput.setAttribute("cols", "50");
    descInput.setAttribute("rows", "10");
    descInput.setAttribute("required", "");
    descInput.setAttribute("value", "");
    descInput.textContent = "";

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute("for", "due-date");
    dateLabel.textContent = "Deadline";
    const dateInput = document.createElement('input');
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "due-date");
    dateInput.setAttribute("name", "due-date");
    const date = format(currentDate, 'yyyy-MM-dd');
    dateInput.setAttribute("value", date);
    dateInput.setAttribute("min", date);

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute("for", "priority");
    priorityLabel.textContent = "Priority (1 > Highest  |   5 > Lowest)";
    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("id", "priority");
    prioritySelect.setAttribute("name", "priority");

    for (let i = 1; i <= 5; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", i);
        option.textContent = i;
        prioritySelect.appendChild(option);
    }

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const newDate = new Date(dateInput.value);
        newDate.setDate(newDate.getDate() + 1);
        const todo = createToDo(titleInput.value, descInput.value, newDate, prioritySelect.value);
        currentProject.addToDo(todo);
        event.target.parentNode.parentNode.parentNode.remove();

        todoItem.remove();
        DOMToDoItem(currentProject);
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener('click', (event) => {
        event.target.parentNode.parentNode.parentNode.remove();
    });


    buttons.appendChild(submitButton);
    buttons.appendChild(cancelButton);


    form.appendChild(titleLabel);
    form.appendChild(titleInput);

    form.appendChild(descLabel);
    form.appendChild(descInput);

    form.appendChild(dateLabel);
    form.appendChild(dateInput);

    form.appendChild(priorityLabel);
    form.appendChild(prioritySelect);

    form.appendChild(buttons);

    block.appendChild(form);
    body.appendChild(block);

}