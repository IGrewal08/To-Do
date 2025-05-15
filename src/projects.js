class CreateProject {
    constructor(name) {
        this.name = name;
        this.todo = [];
    }

    printArray() {
        this.todo.forEach(item => {
            console.log(item);
        });
    }

    addToDo(ToDoItem) {
        this.todo.push(ToDoItem);
    }
}

/* Import at DOM and javascript */
export default CreateProject;