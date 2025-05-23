import storage from "./storage";
import CreateProject from "./projects";
import { createToDo } from "./todo";
import { DOMProject, searchForProject } from "./DOMElements";

export function addProject() {

    const body = document.querySelector("body");

    const block = document.createElement('div');
    block.classList.add('block');

    const form = document.createElement('forum');
    form.classList.add("new-project");

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute("for", "todo-title");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "todo-title");
    titleInput.setAttribute("name", "todo-title");
    titleInput.setAttribute("required", "");
    titleInput.setAttribute("value", "default");

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const projects = document.querySelector(".projects ul");
        
        const defaultProject = new CreateProject(titleInput.value);

        const sampleTodo = createToDo("Sample Title", 
            "description for this todo item", 
            new Date(),
            1
        );

        defaultProject.addToDo(sampleTodo);
        storage.addProject(defaultProject);

        const newProject = document.createElement("li");
        newProject.textContent = titleInput.value;

        projects.appendChild(newProject);

        newProject.addEventListener('click', (event) => {
            const currentProjectName = event.target.textContent;
            const currentProject = searchForProject(currentProjectName);
            DOMProject(defaultProject);
        });

        event.target.parentNode.parentNode.parentNode.remove();

        DOMProject(defaultProject);

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

    form.appendChild(buttons);

    block.appendChild(form);
    body.appendChild(block);
}