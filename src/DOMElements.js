import "/src/styles.css";

import storage from "./storage";
import CreateProject from "./projects";
import { createToDo } from "./todo";

const elements = {
    home: document.querySelector("#home"),
    today: document.querySelector("#today"),
    upcoming: document.querySelector("#upcoming"),
    inbox: document.querySelector("#inbox"),

    projects: document.querySelectorAll(".projects ul"),

    content: document.querySelector(".content")

}

elements.projects.forEach(element => {
    element.addEventListener('click', (event) => {
        const currentProjectName = event.target.textContent;

        removeNodes();
        const currentProject = searchForProject(currentProjectName);
        DOMProject(currentProject);

        /*
        0. clear all other dom on content div (
        1. search through storage array to find this project
        2. get that object
        3. create appropriate dom elements
        4. add event listener at bottom of last to-do item
        5. add dom creator and update project by pushing this item to list
        6. (optional to delete a to-do item and rebuild list, add sort feature and rebuild list)
        7. (add ability to delete this project)
        */
    });
});

function removeNodes() {
    while (elements.content.firstChild) {
        elements.content.removeChild(elements.content.firstChild);
    }
}

function searchForProject(currentProjectName) {
    let selectedProject;
    storage.getStorage().forEach(project => {
        if (project.name === `${currentProjectName}`) {
            selectedProject = project;
        }
    });
    return selectedProject;
}

function DOMProject(currentProject) {
    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-title");

    const projectHeader = document.createElement("h1");
    projectHeader.textContent = currentProject.name;

    const projectSetting = document.createElement("div");
    projectSetting.classList.add("project-title-settings");

    const sortButton = document.createElement("button");
    sortButton.textContent = "Sort";
    sortButton.setAttribute("id", "sort");

    sortButton.addEventListener('click', (event) => {
        //new module
    });

    const settingButton = document.createElement("button");
    settingButton.textContent = "Setting";
    settingButton.setAttribute("id", "setting");

    settingButton.addEventListener('click', (event) => {
        //new module
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("id", "delete");

    deleteButton.addEventListener('click', (event) => {
        // new module
    });

    projectSetting.appendChild(sortButton);
    projectSetting.appendChild(settingButton);
    projectSetting.appendChild(deleteButton);

    projectTitle.appendChild(projectHeader);
    projectTitle.appendChild(projectSetting);
    elements.content.appendChild(projectTitle);

    DOMToDoItem(currentProject);
}

function DOMToDoItem(currentProject) {

    const todoObject = currentProject.todo;

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-items");

    todoObject.forEach(object => {

        console.log(object);
        const item = document.createElement("div");
        item.classList.add("item");

        const radioInput = document.createElement("input");
        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("name", "todo-item-complete");

        radioInput.addEventListener('change', (event) => {

        });

        const data = document.createElement("div");
        data.classList.add("data");

        const heading = document.createElement("h3");
        heading.textContent = object.title;

        const description = document.createElement("p");
        description.textContent = object.description;

        const date = document.createElement("div");
        date.setAttribute("id", "due-date");
        const todayDate = object.dueDate;
        date.textContent = todayDate.getMonth() + 1 + "-" + todayDate.getDay() + "-" + todayDate.getFullYear();

        const options = document.createElement("div");
        options.classList.add("item-options");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("id", "edit-todo");

        editButton.addEventListener('click', (event) => {
            //new module
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("id", "delete-todo");

        deleteButton.addEventListener('click', (event) => {
            event.target.parentNode.parentNode.remove();
            // remove this todo object from the array as well (in new module)
        });

        item.appendChild(radioInput);
        item.appendChild(data);
        data.appendChild(heading);
        data.appendChild(description);
        data.appendChild(date);
        item.appendChild(options);
        options.appendChild(editButton);
        options.appendChild(deleteButton);

        todoItem.appendChild(item);
    });

    const newTodoItem = document.createElement('div');
    newTodoItem.classList.add("newToDoItem");

    const newItem = document.createElement('button');
    newItem.textContent = "+ New To-Do";
    newTodoItem.appendChild(newItem);

    todoItem.appendChild(newTodoItem);

    elements.content.appendChild(todoItem);
}

const firstProject = new CreateProject('Project');

const ToDo1 = createToDo("first title", 
    "first long description of todo that continues forever, and i am waiting for it to end or stop so it won't over flow the todo item window!!!", 
    new Date(2025, 6, 1),
    1
);

const ToDo2 = createToDo("second title", 
    "second long description of todo", 
    new Date(2025, 6, 1), 
    6
);

firstProject.addToDo(ToDo1);
firstProject.addToDo(ToDo2);

storage.addProject(firstProject);

/*
Home could include progress (completed task - create another array in storage.js to store completed tasks...)
inbox could include upcoming deadlines
*/
/*
eventlistener for header
*/

/*
function to create/generate items in content
*/

/* Add functions to change and edit todo object on a new module */
function changeTitle(newTitle, ToDoObject) {
    ToDoObject.title = newTitle;
}