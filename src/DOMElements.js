import "/src/styles.css";

import storage from "./storage";
import CreateProject from "./projects";
import { createToDo } from "./todo";
import { editTodo, deleteTodo, createTodoDOM } from "./todoSetting";
import { calHome } from "./home";
import { addProject } from "./createProject.js";
import { compareDesc } from "date-fns";

const elements = {
    menu: document.querySelectorAll(".menu ul > *"),
    projects: document.querySelectorAll(".projects ul > *"),
    content: document.querySelector(".content"),
    create_project: document.querySelector(".create-project")

}

elements.menu.forEach(element => {
    element.addEventListener('click', (event) => {
        switch(event.target.textContent) {
            case "Home": DOMHome()
            break;
            case "Today": DOMToday(currentDate);
            break;
            case "Upcoming": ; //WIP
        }
    });
});

elements.projects.forEach(element => {
    element.addEventListener('click', (event) => {
        const currentProjectName = event.target.textContent;
        removeNodes();
        const currentProject = searchForProject(currentProjectName);
        DOMProject(currentProject);
    });
});

elements.create_project.addEventListener('click', () => {
    addProject();
});

function removeNodes() {
    while (elements.content.firstChild) {
        elements.content.removeChild(elements.content.firstChild);
    }
}

export function searchForProject(currentProjectName) {
    let selectedProject;
    storage.getStorage().forEach(project => {
        if (project.name === `${currentProjectName}`) {
            selectedProject = project;
        }
    });
    return selectedProject;
}

function DOMHome() {
    removeNodes();
    const text = [{ heading1: "Total Projects: ", heading2: "Total Todos: " },
        { heading1: "Todos Due Today: ", heading2: "Total Todos Completed: " }]

    const homeTitle = document.createElement("div");
    homeTitle.classList.add("home-title");

    const homeHeader = document.createElement("h1");
    homeHeader.textContent = "Home";

    const cards = document.createElement("div");
    cards.classList.add("cards");

    for (let i = 0; i < text.length; i++) {

        let tempArr = [];

        tempArr = calHome(i, storage);

        const card = document.createElement("div");
        card.classList.add("card");
        const heading1 = document.createElement("h2");
        heading1.textContent = `${text[i].heading1}` + tempArr[0];
        const heading2 = document.createElement("h2");
        heading2.textContent = `${text[i].heading2}` + tempArr[1];

        card.appendChild(heading1);
        card.appendChild(heading2);

        cards.appendChild(card);
    }

    homeTitle.appendChild(homeHeader);
    elements.content.appendChild(homeTitle);
    elements.content.appendChild(cards);
}

function DOMToday(currentDate) {
    removeNodes();
    const todayArr = [];
    storage.getStorage().forEach(project => {
        project.todo.forEach(todo => {
            if (compareDesc(currentDate.toLocaleDateString(), todo.dueDate.toLocaleDateString()) === 0) {
                todayArr.push(todo);
            }
        });
    });

    const todayTitle = document.createElement("div");
    todayTitle.classList.add("home-title");

    const todayHeader = document.createElement("h1");
    todayHeader.textContent = "Deadline's Today";

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-items");

    todayArr.forEach(object => {
        const item = document.createElement("div");
        item.classList.add("item");

        const data = document.createElement("div");
        data.classList.add("data");

        const heading = document.createElement("h3");
        heading.textContent = object.title;

        const description = document.createElement("p");
        description.textContent = object.description;

        const date = document.createElement("div");
        date.setAttribute("id", "due-date");
        let todayDate = object.dueDate;
        date.textContent = (todayDate.getMonth() + 1) + "-" + todayDate.getDate() + "-" + todayDate.getFullYear();

        item.appendChild(data);
        data.appendChild(heading);
        data.appendChild(description);
        data.appendChild(date);

        todoItem.appendChild(item);
    });

    todayTitle.appendChild(todayHeader);

    elements.content.appendChild(todayTitle);
    elements.content.appendChild(todoItem);

}

export function DOMProject(currentProject) {
    removeNodes();
    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-title");

    const projectHeader = document.createElement("h1");
    projectHeader.textContent = currentProject.name;

    const projectSetting = document.createElement("div");
    projectSetting.classList.add("project-title-settings");

    const sortButton = document.createElement("select");
    sortButton.textContent = "Sort";
    sortButton.setAttribute("id", "sort");

    const deadline = document.createElement("option");
    deadline.textContent = "Deadline";
    deadline.value = "Deadline";

    const priority = document.createElement("option");
    priority.textContent = "Priority";
    priority.value = "Priority";

    const alphabetical = document.createElement("option");
    alphabetical.textContent = "A-Z";
    alphabetical.value = "A-Z";

    sortButton.appendChild(deadline);
    sortButton.appendChild(priority);
    sortButton.appendChild(alphabetical);

    sortButton.addEventListener("change", (event) => {
        console.log(event);
        console.log(event.target.value);
        switch(event.target.value) {
            case "Deadline": {
                //WIP
            }
            case "Priority": {
                currentProject.todo.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
                const todoItems = document.querySelector(".todo-items");
                todoItems.remove();
                DOMToDoItem(currentProject);
            }
            case "A-Z": {
                //WIP
            }
        }

    });

    const settingButton = document.createElement("button");
    settingButton.textContent = "Setting";
    settingButton.setAttribute("id", "setting");

    settingButton.addEventListener('click', (event) => {
        //WIP
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("id", "delete");

    deleteButton.addEventListener('click', (event) => {
        alert("Warning! You are permanently deleting this project!");
        const currentProjectName = currentProject.name;
        storage.deleteProject(currentProjectName);
        const currProjects = document.querySelectorAll(".projects ul > *");
        currProjects.forEach(element => {
            if (element.textContent === currentProjectName) {
                element.remove();
            }
        });
        DOMHome();
    });

    projectSetting.appendChild(sortButton);
    projectSetting.appendChild(settingButton);
    projectSetting.appendChild(deleteButton);

    projectTitle.appendChild(projectHeader);
    projectTitle.appendChild(projectSetting);
    elements.content.appendChild(projectTitle);

    DOMToDoItem(currentProject);
}

export function DOMToDoItem(currentProject) {

    const todoObjects = currentProject.todo;

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-items");

    todoObjects.forEach(object => {

        const item = document.createElement("div");
        item.classList.add("item");

        const radioInput = document.createElement("input");
        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("name", "todo-item-complete");

        radioInput.addEventListener('change', (event) => {
            alert("Todo marked as completed!");
            event.target.parentNode.parentNode.remove();
            deleteTodo(object, todoObjects);
            storage.appendTodos();
            DOMToDoItem(currentProject);
        });

        const data = document.createElement("div");
        data.classList.add("data");

        const heading = document.createElement("h3");
        heading.textContent = object.title;

        const description = document.createElement("p");
        description.textContent = object.description;

        const date = document.createElement("div");
        date.setAttribute("id", "due-date");
        let todayDate = object.dueDate;
        date.textContent = (todayDate.getMonth() + 1) + "-" + todayDate.getDate() + "-" + todayDate.getFullYear();

        const options = document.createElement("div");
        options.classList.add("item-options");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("id", "edit-todo");

        editButton.addEventListener('click', () => {
            editTodo(object, currentDate, todoItem, currentProject);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("id", "delete-todo");

        deleteButton.addEventListener('click', (event) => {
            alert("Warning! You are permanently deleting this Todo item!");
            event.target.parentNode.parentNode.remove();
            deleteTodo(object, todoObjects);
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
    newItem.textContent = "+ To-Do";
    newTodoItem.appendChild(newItem);
    newItem.addEventListener('click', () => {
        createTodoDOM(currentProject, currentDate, todoItem);
    });

    todoItem.appendChild(newTodoItem);

    elements.content.appendChild(todoItem);
}

const defaultProject = new CreateProject('Project');

const sampleTodo = createToDo("Sample Title", 
    "description for this todo item", 
    new Date(),
    1
);

defaultProject.addToDo(sampleTodo);
storage.addProject(defaultProject);

const currentDate = new Date();
DOMHome();